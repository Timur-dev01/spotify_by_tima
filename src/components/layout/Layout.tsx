import { Bell, Home, Search, Users } from "lucide-react";
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Layout: React.FC = () => {
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token =
        hash
          ?.substring(1)
          ?.split("&")
          ?.find((el) => el.startsWith("access_token"))
          ?.split("=")[1] ?? null;

      window.location.hash = "";
      window.localStorage.setItem("token", token || "");
    }
  }, []);

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
              <Home color="white" size={35}></Home>
            </Link>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" color="white"></Search>
              <Input
                type="text"
                placeholder="Что хочешь включить"
                className="pl-12"
              />
            </div>
          </div>
          <div className="flex gap-5">
            <Button>Узнать больше о Premium</Button>
            <Users color="white"></Users>
            <Bell color="white"></Bell>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="fix bottom-0 bg-black">
        
      </footer>
    </>
  );
};

export default Layout;
