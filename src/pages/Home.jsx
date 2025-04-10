import React from "react";
import HomeStyled from "../components/HomeStyled";
import InstagramFeed from "../components/InstagramFeed";

const Home = () => {
  return (
    <div
      className="relative overflow-hidden min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #FBE8E4, #F9D5CE)',
      }}
    >
      <HomeStyled />
      <div className="py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 justify-center text-center">
          <span className="text-[#7d6d64]" style={{ fontFamily: "Monaco" }}>Últimas publicaciones</span>
        </h2>
        <div className="mt-6">
          <InstagramFeed userId={import.meta.env.VITE_INSTAGRAM_USER_ID} />
        </div>
      </div>
    </div>
  );
};

export default Home;
