import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_ROOT = 'http://localhost:8080';  // ← 여기까지만

// 인증 불필요
const plain = axios.create({
  baseURL: API_ROOT,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,   // 쿠키 기반 리프레시 토큰 API(POST /token) 도 이걸 써야 받을 수 있음
});

// 인증 필요
const auth = axios.create({
  baseURL: API_ROOT,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
auth.interceptors.request.use(cfg => {
  const token = localStorage.getItem('accessToken');
  console.log('[Auth Interceptor] token:', token);
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// ——— auth-less APIs ———

// 이메일 중복 확인
export const checkEmail = async email => {
  // 반드시 v1 포함
  const { data } = await plain.post(
    '/api/user/v1/auth/email',
    { email }
  );
  return data;
};

// 로그인
export const login = async creds => {
  const { data } = await plain.post(
    '/api/user/v1/auth/login',
    creds
  );
  const tok = data.result?.accessToken;
  if (tok) localStorage.setItem('accessToken', tok);
  return data;
};

// 회원가입
export const signup = async info => {
  const { data } = await plain.post(
    '/api/user/v1/auth/sign-up',
    info
  );
  return data;
};

// ——— auth-required APIs ———

export const getMe = async () => {
  const { data } = await auth.get('/api/user/v1/user');
  return data.result;
};

export const logout = async () => {
  const { data } = await auth.delete('/api/user/v1/auth/logout');
  return data;
};

// 회원 정보 수정
export const editUser = async ({ name, email, interests }) => {
  return auth.put('/user', { name, email, interests });
};

// 회원 탈퇴
export const deleteAccount = async () => {
  return auth.delete('/user');
};

// 내 좋아요 목록 조회
export const getUserFavorites = async () => {
  const token = localStorage.getItem('accessToken');
  const { userId } = jwtDecode(token);
  return auth.get(`/user/${userId}/favorites`);
};

// 내 관심사 조회
export const getUserInterests = async () => {
  const token = localStorage.getItem('accessToken');
  const { userId } = jwtDecode(token);
  return auth.get(`/interest/${userId}`);
};

// 관심사 추가
export const addInterest = async ({ userId, keywords }) => {
  return auth.post('/interest', { userId, name: keywords });
};

// 관심사 삭제
export const deleteInterest = async ({ userId, removeKeyword }) => {
  return auth.delete(`/interest/delete/${userId}`, {
    data: { name: removeKeyword }
  });
};
