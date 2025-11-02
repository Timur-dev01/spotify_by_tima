import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { Bell, Home, Search, Users } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Layout: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    let _token = window.localStorage.getItem("token");

    // если нет токена — достаём из URL
    if (!_token && hash) {
      _token =
        hash
          .substring(1)
          .split("&")
          .find((el) => el.startsWith("access_token"))
          ?.split("=")[1] ?? null;

      window.location.hash = "";
      if (_token) {
        window.localStorage.setItem("token", _token);
        setToken(_token);
      }
    } else {
      setToken(_token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ USER DATA:", data))
        .catch((err) => console.error("Ошибка:", err));
    }
  }, [token]);

  return (
    <>
      <header className="bg-[#000000] pt-5">
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
          <div className="flex gap-5">
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
