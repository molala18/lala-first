import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins Couldn't Be Loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create and Edit Cabin
  let query = supabase.from("cabins");

  //A) CREATE

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) EDIT
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins Couldn't Be Created");
  }

  // 2. Upload Image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete Cabin on Error
  if (storageError) {
    const cabinId = data[0]?.id;
    if (cabinId) {
      await supabase.from("cabins").delete().eq("id", cabinId);
    }
    console.error(storageError);
    throw new Error(
      "Cabins Image Couldn't Be Uploaded And The Cabin Wasn't Created"
    );
  }

  return data;
}

// export async function createCabin(newCabin) {
//   const imageName = `${Math.random()}-${newCabin.imge.name}`.replaceAll(
//     "/",
//     ""
//   );

//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   //1) Create Cabin

//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...newCabin, image: imagePath }])
//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabins Couldn't Be Created");
//   }

//   //2) Upload Image

//   // const avatarFile = event.target.files[0];
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   //3. Delete The Cabin if There Was An Error Uploading the Image

//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "Cabins Image Couldn't Be Uploaded And The Cabin Wasn't Created"
//     );
//   }

//   return data;
// }

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins Couldn't Be Deleted");
  }
  return data;
}
