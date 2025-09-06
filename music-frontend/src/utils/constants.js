export const BASE_URL =
  location.hostname === "fluffy-space-cod-pwgxwq5gq4vc7w7p-5173.app.github.dev"
    ? "https://fluffy-space-cod-pwgxwq5gq4vc7w7p-3000.app.github.dev"
    : location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://music-backend-wy5e.onrender.com";
