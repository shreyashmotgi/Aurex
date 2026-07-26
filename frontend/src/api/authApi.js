import api from "./axios";

export const googleLogin = async (credential) => {
  const res = await api.post("/auth/google-login", {
    credential,
  });

  return res.data;
};

// Signup
export const signupUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const res = await api.post("/auth/forgot-password", {
    email,
  });

  return res.data;
};

export const resetPassword = async (
  token,
  password
) => {

  const res = await api.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return res.data;
};