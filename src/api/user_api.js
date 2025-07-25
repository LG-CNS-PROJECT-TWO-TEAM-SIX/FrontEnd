import instance from './axiosInstance';

const USER_PREFIX = '/api/user/v1';

//회원가입
export const signup = async ({ email, password, name, interests }) => {
  try {
    const res = await instance.post(
      `${USER_PREFIX}/auth/sign-up`,
      { email, password, name, interests }
    );
    localStorage.setItem("email",email);
    return res.data.data;
  } catch (error) {
    console.error('signup error:', error);
    throw error;
  }
};

//로그인
export const login = async ({ email, password }) => {
  try {
    const res = await instance.post(
      `${USER_PREFIX}/auth/login`,
      { email, password }
    );
    const { accessToken, refreshToken } = res.data.data;
    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    localStorage.setItem('accessToken', accessToken);
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('login error:', error);
    throw error;
  }
};

export const logout = async () => {
  // 1. 클라이언트 상태 먼저 정리
  localStorage.removeItem('accessToken');
  localStorage.removeItem('email');

  delete instance.defaults.headers.common.Authorization;

  try {
    // 2. 서버에 로그아웃 통보 (실패해도 크게 상관없음)
    const res = await instance.delete(`${USER_PREFIX}/auth/logout`);
    return res.data.data;
  } catch (error) {
    console.warn('logout error (무시 가능):', error.response?.status);
    return null; // 에러를 굳이 던지지 않아도 됨
  }
};

//이메일 중복 체크
export const checkEmail = async (email) => {
  try {
    const res = await instance.post(
      `${USER_PREFIX}/auth/email`,
      { email }
    );
    return res.data.data;
  } catch (error) {
    console.error('checkEmail error:', error);
    throw error;
  }
};

//내 정보 조회
export const getMe = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if(!token){
      return null;
    }
    const res = await instance.get(`${USER_PREFIX}/user`, {headers: {
        Authorization: `Bearer ${token}`
      }});
    return res.data.data;
  } catch (error) {
    console.error('getMe error:', error);
    throw error;
  }
};

//회원 정보 수정
export const editUser = async (userData) => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await instance.put(`${USER_PREFIX}/user`, userData,{headers: {
        Authorization: `Bearer ${token}`
      }});
    return res.data.data;
  } catch (error) {
    console.error('editUser error:', error);
    throw error;
  }
};

//회원 탈퇴
export const deleteUser = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await instance.delete(`${USER_PREFIX}/user`,{headers: {
        Authorization: `Bearer ${token}`
      }});
    return res.data.data;
  } catch (error) {
    console.error('deleteUser error:', error);
    throw error;
  }
};

//특정 사용자 조회
export const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await instance.get(`${USER_PREFIX}/user/${userId}`,{headers: {
        Authorization: `Bearer ${token}`
      }});
    return res.data.data;
  } catch (error) {
    console.error('getUserById error:', error);
    throw error;
  }
};

//관심사 등록
export const addInterest = async (interests) => {
  try {
    const res = await instance.post(
      `${USER_PREFIX}/interest`,
      { interests }
    );
    return res.data.data;
  } catch (error) {
    console.error('addInterest error:', error);
    throw error;
  }
};

export const getInterests = async (userId) => {
  try {
    const token = localStorage.getItem('accessToken');
    const res = await instance.get(`${USER_PREFIX}/interest/${userId}`,{headers: {
        Authorization: `Bearer ${token}`
      }});
    return res.data;
  } catch (error) {
    console.error('getInterests error:', error);
    throw error;
  }
};

export const deleteInterests = async (userId) => {
  try {
    const res = await instance.delete(`${USER_PREFIX}/interest/${userId}`);
    return res.data.data;
  } catch (error) {
    console.error('deleteInterests error:', error);
    throw error;
  }
};

export const getUserInterests = getInterests;
export const deleteAccount      = deleteUser;

export const getUserFavorites = async ({ queryKey }) => {
  const [, userId] = queryKey; // ["favorites", userId] 구조
  try {
    const token = localStorage.getItem("accessToken");
    const res = await instance.get(`${USER_PREFIX}/favorites/${userId}`,{ headers: {
        Authorization: `Bearer ${token}`
      }});
    console.log("user fav res: ",res);
    return res.data ?? [];
  } catch (error) {
    console.error('getUserFavorites error:', error);
    throw error;
  }
};
