import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Heart } from "lucide-react";
import { Snackbar, Alert } from "@mui/material";

import { useUserStore } from "../store/UserStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PropertiesCarousel() {
  const { properties, setUylar, setHouseId } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  async function uylar_Ol() {
    try {
      setLoading(true);
      let data = await axios.get("http://localhost:3000/houses");

      let malumotlar = data.data.data.map((el, index) => {
        let features = {};
        try {
          features = JSON.parse(el.features || "{}");
        } catch (e) {
          features = {};
        }

        return {
          id: el.id || index + 1,
          img: el.img,
          title: el.title,
          address: el.address,
          country: el.country,
          beds: features.rooms || 0,
          baths: features.bathrooms || 0,
          garage: features.garage || 0,
          size: el.size || "1200 Sq Ft",
          oldPrice: `$${el.discount || 0}/mo`,
          newPrice: `$${el.price || 0}/mo`,
          hearth: false,
          likeCount: el.likeCount || 0,
          user: el.user || {},
          price: el.price || 0,
          discount: el.discount || 0,
        };
      });

      setUylar(malumotlar); // ✅ store ga yozamiz
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Token muddati tugagan, qaytadan login qiling.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    uylar_Ol();
  }, []);

  // ❤️ Like toggle qilish funksiyasi
  const toggleFavorite = (id, currentHeart) => {
    const updated = properties.map((prop) =>
      prop.id === id
        ? {
            ...prop,
            hearth: !currentHeart,
            likeCount: currentHeart ? prop.likeCount - 1 : prop.likeCount + 1,
          }
        : prop
    );

    setUylar(updated);

    setAlertMessage(
      currentHeart ? "Removed from favorites ❤️‍🔥" : "Added to favorites ❤️"
    );
    setShowAlert(true);
  };

  // 🔗 House detail sahifasiga yo‘naltirish
  const goToHouse = (id) => {
    setHouseId(id);
    navigate("/house/about");
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 600,
    slidesToShow: 3, // 🖥️ Desktop default
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1440, // Katta laptop (2 ta chiqarish mumkin)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // O‘rtacha laptop / kichik monitor
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // 📱 Planshet
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // 📱 Kichik telefon
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  

  return (
    <div className="p-10">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold mb-2">Recommended</h1>
        <p className="text-gray-500">
          Nulla quis curabitur velit volutpat auctor bibendum consectetur sit.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <Slider {...settings}>
          {properties.map((prop) => (
            <div key={prop.id} className="p-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                      For Sale
                    </span>
                    {prop.isActive && (
                      <span className="bg-green-500 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                        Active
                      </span>
                    )}
                  </div>

                  {/* 🔗 Rasm bosilganda house detail sahifasiga o'tadi */}
                  <button
                    onClick={() => goToHouse(prop.id)}
                    className="w-full relative"
                  >
                    <img
                      src={prop.img}
                      alt={prop.title}
                      className="w-full h-52 sm:h-60 object-cover"
                    />
                    <span
                      className="absolute bottom-3 right-3 bg-blue-600 text-white p-3 rounded-full shadow-lg 
                                 transition-all duration-300 ease-in-out"
                    >
                      ➜
                    </span>
                  </button>

                  {/* User Image */}
                  {prop.user?.profileImg && (
                    <img
                      src={prop.user.profileImg}
                      alt={`${prop.user.firstName} ${prop.user.lastName}`}
                      className="absolute -bottom-6 left-5 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white object-cover"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pt-10 px-4 sm:px-5 pb-5">
                  <h3 className="text-base sm:text-lg font-semibold mb-1">
                    {prop.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3">
                    {prop.address}, {prop.country}
                  </p>

                  {/* Features */}
                  <div className="flex justify-between text-center text-gray-600 mb-4">
                    <div className="flex flex-col items-center">
                      <img
                        src="https://img.icons8.com/ios-filled/20/000000/bed.png"
                        alt="Beds"
                      />
                      <span className="text-xs sm:text-sm mt-1">{prop.beds}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="https://img.icons8.com/ios-filled/20/000000/bath.png"
                        alt="Baths"
                      />
                      <span className="text-xs sm:text-sm mt-1">{prop.baths}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="https://img.icons8.com/ios-filled/20/000000/garage.png"
                        alt="Garage"
                      />
                      <span className="text-xs sm:text-sm mt-1">{prop.garage}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="https://img.icons8.com/ios-filled/20/000000/area-chart.png"
                        alt="Size"
                      />
                      <span className="text-xs sm:text-sm mt-1">{prop.size}</span>
                    </div>
                  </div>

                  {/* Price + Heart */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="line-through text-gray-400 text-xs sm:text-sm mb-1">
                        ${prop.discount}/mo
                      </p>
                      <p className="text-blue-600 font-bold text-base sm:text-lg">
                        ${prop.price}/mo
                      </p>
                    </div>

                    <button
                      onClick={() => toggleFavorite(prop.id, prop.hearth)}
                      className="relative"
                    >
                      <Heart
                        className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
                          prop.hearth
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }`}
                      />
                      {/* Like count badge */}
                      <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {prop.likeCount}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}

      <Snackbar
        open={showAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
