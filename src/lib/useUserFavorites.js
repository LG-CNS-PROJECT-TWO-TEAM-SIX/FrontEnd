import { getUserFavorites } from "../api/user_api";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";


function getUserIdFromToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const decode = jwtDecode(token);
    const userId = decode?.userId;
    return userId;
  } catch (err) {
    console.error("Token decoding error:", err);
    return null;
  }
}
export default function useUserFavorites() {
  const userId = getUserIdFromToken();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: getUserFavorites,
    retry: false,
  });
  return {
    favoritesLoading: isLoading,
    favorites: data,
    isFavorites: !isError,
  };
}
