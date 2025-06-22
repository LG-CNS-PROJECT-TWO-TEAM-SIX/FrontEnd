import { getUserFavorites } from "../api/user_api";
import { useQuery } from "@tanstack/react-query";

export default function useUserFavorites() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["favorites"],
    queryFn: getUserFavorites,
    retry: false,
  });
  return {
    favoritesLoading: isLoading,
    favorites: data,
    isFavorites: !isError,
  };
}
