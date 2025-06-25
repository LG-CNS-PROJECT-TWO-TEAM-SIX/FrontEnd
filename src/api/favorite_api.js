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
    const res = await instance.get(`/${userId}/favorites`, { headers });
    return res.data.data;
}

const FAVORITE_PREFIX = "/user/v1";

export const addFavorite = async (newsId) => {
  const token = localStorage.getItem("accessToken");
  return instance.post(`${FAVORITE_PREFIX}/favorite`, { newsId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const removeFavorite = async (favoriteId) => {
  const token = localStorage.getItem("accessToken");
  return instance.delete(`${FAVORITE_PREFIX}/favorite/${favoriteId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};