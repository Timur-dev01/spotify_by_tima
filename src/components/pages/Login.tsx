import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const Login: React.FC = () => {
  const spotify = {
    client_id: "9d701d9a4e994bd59228319abc5c5fbf",
    REDIRECT_URI: "https://spotify-copy-by-tima.netlify.app/", // <--- поменяй на ссылку сайта
    AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
    RESPONSE_TYPE: "token",
    SCOPE: "user-read-private user-read-email playlist-modify-public playlist-read-private"
  };

  const handleLogin = () => {
    const { client_id, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE, SCOPE } = spotify;
    const authUrl = `${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(
      SCOPE
    )}`;
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
      <Card className="bg-[#181818] p-10 rounded-2xl shadow-lg w-[380px] text-center border-none">
        <CardContent>
          <h1 className="text-3xl font-bold mb-6">Войти в Spotify</h1>
          <Button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold py-2 px-6 rounded-full transition-transform duration-200 hover:scale-105"
          >
            Войти с помощью Spotify
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
