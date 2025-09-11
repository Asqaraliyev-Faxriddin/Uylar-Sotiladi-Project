import React from "react";
import Header from "../sahifalar/Header";
import Footer from "../sahifalar/Footer";
import Properties from "../sahifalar/properties";
import RasmlarCarusel from "../sahifalar/trr";
import { useUserStore } from "../store/UserStore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Heart } from "lucide-react";

function Home() {
  const { properties, setUylar } = useUserStore();

  const settings = {
    dots: true,
    infinite: true,
    speed: 2200,
    autoplay: true,
    autoplaySpeed: 120,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,  
  };

  // ❤️ Like bosilganda
  const toggleLike = (id) => {
    const updated = properties.map((house) =>
      house.id === id
        ? {
            ...house,
            hearth: !house.hearth,
            likeCount: house.hearth
              ? house.likeCount - 1
              : house.likeCount + 1,
          }
        : house
    );
    setUylar(updated);
  };

  return (
    <>
      <Header />

      {/* 🔍 Filter qatori */}
      <div className="max-w-screen-xl mx-auto px-4 mt-4">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-start gap-4 p-4 rounded-md w-full box-border overflow-x-auto">
          

          <button className="flex items-center gap-2 bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 whitespace-nowrap">
            <img src="./img/001-loupe.png" alt="" className="w-4 h-4" />
            Search
          </button>
        </div>
      </div>

      {/* 🏠 Slider qismi */}
      <div className="w-full mt-6">
        <Slider {...settings}>
          {properties.map((house) => (
            <div key={house.id} className="relative w-full">
              <img
                src={house.img}
                alt={house.title}
                className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 bg-black/40 rounded-2xl">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
                  {house.title}
                </h1>
                <p className="text-sm md:text-lg mb-1">{house.address}</p>
                <p className="text-lg md:text-xl font-semibold mb-4">
                  {house.price}
                </p>

                {/* Info icons */}
                <div className="flex justify-center gap-6 mt-2 flex-wrap">
                  <div className="flex flex-col items-center">
                    <img
                      src="https://img.icons8.com/ios-filled/30/ffffff/bed.png"
                      alt="Beds"
                      className="mb-1"
                    />
                    <span className="text-sm font-medium">{house.beds}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src="https://img.icons8.com/ios-filled/30/ffffff/bath.png"
                      alt="Baths"
                      className="mb-1"
                    />
                    <span className="text-sm font-medium">{house.baths}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src="https://img.icons8.com/ios-filled/30/ffffff/garage.png"
                      alt="Garage"
                      className="mb-1"
                    />
                    <span className="text-sm font-medium">{house.garage}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src="https://img.icons8.com/ios-filled/30/ffffff/area-chart.png"
                      alt="Size"
                      className="mb-1"
                    />
                    <span className="text-sm font-medium">{house.size}</span>
                  </div>
                </div>

                {/* ❤️ Like qismi */}
                <div className="relative mt-6">
                  <button
                    onClick={() => toggleLike(house.id)}
                    className="relative flex items-center justify-center"
                  >
                    <Heart
                      size={40}
                      className={`transition-colors duration-300 ${
                        house.hearth
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {house.likeCount}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Properties grid */}
      <Properties />

      {/* Banner */}
      <section className="w-full mt-8">
        <div className="relative w-full">
          <img
            src="./img/unsplash_g39p1kDjvSY.png"
            alt=""
            className="w-full h-[250px] md:h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-lg md:text-3xl font-bold text-white max-w-lg mb-4">
              Vermont Farmhouse With Antique Jail Is the Week's Most Popular Home
            </h1>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Read More
            </button>
          </div>
        </div>
      </section>

      <RasmlarCarusel />

      <Footer />
    </>
  );
}

export default Home;
