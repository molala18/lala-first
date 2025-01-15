import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,

    onSuccess: (user) => {
      //   console.log(user);

      toast.success(
        "Account Was Succefully Created! Please Verify From The Email Address"
      );
    },
  });
  return { signUp, isLoading };
}
