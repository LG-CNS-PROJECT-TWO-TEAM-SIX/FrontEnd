import { getMe } from "../api/user_api";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
