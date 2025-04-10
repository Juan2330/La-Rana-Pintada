import React from "react";
import logo from "../assets/logo3.jpeg";
import imagen from "../assets/Imagen.jpeg";
import "../index.css";

const HomeStyled = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-20 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <nav className="relative flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-6">
            <div className="flex items-center">
              <img className="h-20 w-20 rounded-full object-cover" src={logo} alt="Logo" />
            </div>
            <div className="flex items-center">
              <a
                href="https://linktr.ee/ranapintada?fbclid=PAZXh0bgNhZW0CMTEAAaapvXw4NqsuLPCxxwHGNSSUqIpPv_ozyqWZCSFsgDKQ5LmJ_lbrLBtnnKI_aem_NSzJMmprHMfBYi3BAlGFrQ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FCD7CF] text-[#7d6d64] font-semibold py-2 px-6 rounded-full shadow hover:bg-[#FBE0DA] hover:shadow-md transition duration-300 ease-in-out"
                style={{ fontFamily: "Monaco" }}
              >
                Contáctanos
              </a>
            </div>
          </nav>

          <main className="mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline" style={{ fontFamily: "Lucida Handwriting" }}>
                  <span className="text-[#7d6d64]">La Rana Pintada</span>
                </span>
              </h1>
              <p className="text-[#DEB887] text-2xl mt-2" style={{ fontFamily: "Monaco" }}>
                @laranapintada
              </p>
              <p className="mt-3 text-gray-500 text-lg sm:mt-5 sm:text-xl md:mt-5 lg:mx-0" style={{ fontFamily: "Garamond" }}>
                Tote Bags personalizadas, pintadas a mano, ecológicas y amigables con el medio ambiente 🐸🌷🍃
              </p>
            </div>
          </main>
        </div>
      </div>

      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img className="h-full w-full object-cover sm:h-82 md:h-106 lg:w-full lg:h-full" src={imagen} alt="Fondo" />
      </div>
    </div>
  );
};

export default HomeStyled;