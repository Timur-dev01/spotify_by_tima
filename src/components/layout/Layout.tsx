import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { Bell, Home, Search, Users } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Layout: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const _token = localStorage.getItem("token");

    if (_token) {
      setToken(_token);
    } else {
      console.warn("⚠️ Токен не найден. Нужно авторизоваться.");
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Spotify API Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("🎧 USER DATA:", data);
        setUser(data);
      })
      .catch((err) => {
        console.error("❌ Ошибка при получении данных:", err);
        localStorage.removeItem("token");
        setToken(null);
      });
  }, [token]);

  return (
    <>
      <header className="bg-[#000000] pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              className="w-10 h-10"
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
              alt="Spotify Logo"
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
              <div className="flex items-center gap-3">
                <img
                  src={user.images?.[0]?.url}
                  alt={user.display_name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.display_name}</span>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Не авторизован</span>
            )}
            <Button>Узнать больше о Premium</Button>
            <Users color="white" />
            <Bell color="white" />
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
