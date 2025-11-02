import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const CLIENT_ID = "9d701d9a4e994bd59228319abc5c5fbf";
const REDIRECT_URI = "https://spotify-copy-by-tima.netlify.app/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

// ⚙️ — генерим случайное состояние (для безопасности)
function generateRandomString(length: number) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => possible[x % possible.length])
    .join("");
}

// ⚙️ — PKCE: генерим code_verifier и code_challenge
async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const Login: React.FC = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    const codeVerifier = localStorage.getItem("code_verifier");

    fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier!,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ TOKEN:", data);
        localStorage.setItem("token", data.access_token);
        window.history.replaceState({}, document.title, "/"); // убираем code из URL
      })
      .catch((err) => console.error("❌ Ошибка токена:", err));
  }, []);

  const handleLogin = async () => {
    const state = generateRandomString(16);
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem("code_verifier", codeVerifier);

    const scope =
      "user-read-private user-read-email playlist-modify-public playlist-modify-private";

    const authUrl = `${AUTH_ENDPOINT}?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      scope
    )}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
      <Card className="bg-[#181818] p-10 rounded-2xl shadow-lg w-[380px] text-center border-none">
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
              alt="Spotify"
              className="w-36 mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold mb-3">Войти в Spotify</h1>
            <p className="text-gray-400 mb-6 text-sm">
              Подключитесь к своему аккаунту, чтобы продолжить.
            </p>
            <Button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-400 text-black font-semibold py-2 px-6 rounded-full transition-transform duration-200 hover:scale-105"
            >
              Войти с помощью Spotify
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
