import api from "@/services/api";

export async function login(email, password) {
  const response = await api.post("/users/sign_in", {
    user: { email, password },
  });

  const authHeader = response.headers["authorization"];
  let token = null;

  if (authHeader) {
    token = authHeader.replace("Bearer ", "").trim();
  }
  return {
    token,
    user: response.data?.user || null,
  };
}

export async function signup(email, password) {
  return api.post("/users", {
    user: {
      email,
      password,
      password_confirmation: password,
    },
  });
}
