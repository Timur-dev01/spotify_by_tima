import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const Login: React.FC = () => {
  const spotify = {
    client_id: "cf26c0bc0eb44c62bbcc52c1b00b9b03",
    REDIRECT_URI: "http://localhost:5173/",
    AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
    RESPONSE_TYPE: "token",
    SCOPE: "playlist-modify-public user-read-private user-read-email",
  };

  const handleLogin = () => {
    const authUrl = `${spotify.AUTH_ENDPOINT}?client_id=${spotify.client_id}&redirect_uri=${spotify.REDIRECT_URI}&response_type=${spotify.RESPONSE_TYPE}&scope=${spotify.SCOPE}`;
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
