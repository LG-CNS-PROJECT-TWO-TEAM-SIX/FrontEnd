import instance from "./axiosInstance";
import { jwtDecode } from "jwt-decode";

function authHeader() {
    const token = localStorage.getItem("accessToken");
    const { userId } = jwtDecode(token);
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        userId,
    };
}

export async function getMyFavorites() {
    const { headers, userId } = authHeader();
    const res = await instance.get(`/api/user/v1/favorites/${userId}`, { headers });
    return res.data;
}

const FAVORITE_PREFIX = "api/user/v1";

export const addFavorite = async (payload) => {
  const token = localStorage.getItem("accessToken");
  const { userId } = jwtDecode(token);
  const data = {userId:userId,...payload};
  return instance.post(`${FAVORITE_PREFIX}/favorite`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const removeFavorite = async (favoriteId) => {
  const token = localStorage.getItem("accessToken");
  return instance.delete(`${FAVORITE_PREFIX}/favorite/${favoriteId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};