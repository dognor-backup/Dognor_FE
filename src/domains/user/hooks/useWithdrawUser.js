import { useMutation } from "@tanstack/react-query";
import { withdrawUser } from "../api/user";

export const useWithdrawUser = () => {
  return useMutation(withdrawUser);
};
