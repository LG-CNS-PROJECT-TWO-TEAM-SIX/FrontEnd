import instance from "./axiosInstance";
import { jwtDecode } from "jwt-decode";

//JWT, UserId
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
    return res.data; // array of FavoriteResponseDto
}

export async function addFavorite({ newsLink, newsTitle, newsSummary, newsThumbnail, newsCategory }) {
    const { headers, userId } = authHeader();
    const payload = { userId, newsLink, newsTitle, newsSummary, newsThumbnail, newsCategory };
    const res = await instance.post("/favorite", payload, { headers });
    return res.data;
}

export async function removeFavorite(favoriteId) {
    const { headers } = authHeader();
    await instance.delete(`/favorite/${favoriteId}`, { headers });
}