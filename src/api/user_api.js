import instance from './axiosInstance';

const USER_PREFIX = '/user/v1';

//회원가입
export const signup = async ({ email, password, name, interests }) => {
  try {
    const res = await instance.post(
      `${USER_PREFIX}/auth/sign-up`,
      { email, password, name, interests }
    );
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

//로그아웃
export const logout = async () => {
  try {
    const res = await instance.delete(`${USER_PREFIX}/auth/logout`);
    localStorage.removeItem('accessToken');
    delete instance.defaults.headers.common.Authorization;
    return res.data.data;
  } catch (error) {
    console.error('logout error:', error);
    throw error;
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
    const res = await instance.get(`${USER_PREFIX}/user`);
    return res.data.data;
  } catch (error) {
    console.error('getMe error:', error);
    throw error;
  }
};

//회원 정보 수정
export const editUser = async (userData) => {
  try {
    const res = await instance.put(`${USER_PREFIX}/user`, userData);
    return res.data.data;
  } catch (error) {
    console.error('editUser error:', error);
    throw error;
  }
};

//회원 탈퇴
export const deleteUser = async () => {
  try {
    const res = await instance.delete(`${USER_PREFIX}/user`);
    return res.data.data;
  } catch (error) {
    console.error('deleteUser error:', error);
    throw error;
  }
};

//특정 사용자 조회
export const getUserById = async (userId) => {
  try {
    const res = await instance.get(`${USER_PREFIX}/user/${userId}`);
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
    const res = await instance.get(`${USER_PREFIX}/interest/${userId}`);
    return res.data.data;
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
export const getUserFavorites = async (userId) => {
  try {
    const res = await instance.get(`${USER_PREFIX}/favorite/${userId}`);
    return res.data.data;
  } catch (error) {
    console.error('getUserFavorites error:', error);
    throw error;
  }
};
