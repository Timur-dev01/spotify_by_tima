import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { Home, Search } from "lucide-react";
import { Input } from "../ui/input";

const CLIENT_ID = "9d701d9a4e994bd59228319abc5c5fbf";
const REDIRECT_URI = "https://spotify-copy-by-tima.netlify.app/";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const Layout: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any>(null);

  // 🧩 Проверяем: есть ли в URL ?code=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code && !token) {
      console.log("🔑 Code найден:", code);
      exchangeCodeForToken(code);
    }
  }, []);

  // 🧠 Функция обмена code → token
  async function exchangeCodeForToken(code: string) {
    const storedVerifier = localStorage.getItem("verifier");
    if (!storedVerifier) {
      console.error("❌ PKCE verifier не найден");
      return;
    }

    try {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: storedVerifier,
      });

      const res = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      const data = await res.json();
      console.log("🎟 TOKEN RESPONSE:", data);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);
        window.history.replaceState({}, document.title, "/"); // очистить ?code из URL
      } else {
        console.error("⚠️ Не удалось получить токен:", data);
      }
    } catch (e) {
      console.error("Ошибка при обмене кода на токен:", e);
    }
  }

  // 🎧 Когда есть токен — получаем профиль
  useEffect(() => {
    if (!token) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🎧 USER:", data);
        setUser(data);
      })
      .catch((err) => console.error("Ошибка:", err));
  }, [token]);

  return (
    <>
      <header className="bg-black pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              className="w-10 h-10"
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
              alt=""
            />
            <Link to="/">
              <Home color="white" size={35} />
            </Link>

            <div className="relative w-72">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                color="white"
              />
              <Input
                type="text"
                placeholder="Что хочешь включить"
                className="pl-12"
              />
            </div>
          </div>

          <div className="flex gap-5 items-center">
            {user ? (
              <div className="flex items-center gap-2">
                {user.images?.[0]?.url && (
                  <img
                    src={user.images[0].url}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                )}
                <span>{user.display_name}</span>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Не авторизован</span>
            )}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
