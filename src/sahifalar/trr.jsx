import { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Heart } from "lucide-react";
import { Snackbar, Alert } from "@mui/material";
import { useUserStore } from "../store/UserStore";
import { useNavigate } from "react-router-dom";

export default function RasmlarCarusel() {
  const { properties, setUylar, setHouseId } = useUserStore();
  const navigate = useNavigate();

  // ✅ Snackbar uchun state
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [open, setOpen] = useState(false);

  const showSnackbar = useCallback((msg, sev = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  // ✅ Component mount log
  useEffect(() => {
    console.log("Carousel mounted ✅");
  }, []);

  // ✅ Like toggle
  const toggleFavorite = (id, currentHeart) => {
    const updated = properties.map((el) =>
      el.id === id
        ? {
            ...el,
            hearth: !currentHeart,
            likeCount: currentHeart ? el.likeCount - 1 : el.likeCount + 1,
          }
        : el
    );
    setUylar(updated);

    // 🔔 Snackbar chiqishi
    showSnackbar(
      currentHeart ? "Removed from favorites ❤️‍🔥" : "Added to favorites ❤️",
      "success"
    );
  };

  // ✅ House/About ga o'tish
  const goToHouse = (id) => {
    setHouseId(id);
    navigate("/house/about");
  };

  // ✅ Slider sozlamalari
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="p-6 sm:p-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Recent Properties for Rent
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Nulla quis curabitur velit volutpat auctor bibendum consectetur sit.
        </p>
      </div>

      <Slider {...settings}>
        {properties.map((prop) => (
          <div key={prop.id} className="p-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* 📌 Top labels */}
              <div className="relative">
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                    For Sale
                  </span>
                  <span className="bg-yellow-500 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                    Featured
                  </span>
                </div>

                {/* 📌 Uy rasmi */}
                <button
                  onClick={() => goToHouse(prop.id)}
                  className="w-full relative"
                >
                  <img
                    src={prop.img}
                    alt={prop.title}
                    className="w-full h-52 sm:h-60 object-cover"
                  />
                  <span className="absolute bottom-3 right-3 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out">
                    ➜
                  </span>
                </button>

                {/* 📌 User avatar */}
                <img
                  src={
                    prop.user?.profileImg ||
                    `https://i.pravatar.cc/100?u=${prop.id}`
                  }
                  alt="Agent"
                  className="absolute -bottom-6 left-5 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white object-cover"
                />
              </div>

              {/* 📌 Uy ma’lumotlari */}
              <div className="pt-10 px-4 sm:px-5 pb-5">
                <h3 className="text-base sm:text-lg font-semibold mb-1">
                  {prop.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-3">
                  {prop.address}
                </p>

                {/* 📌 Stats */}
                <div className="flex justify-between text-center text-gray-600 mb-4">
                  <div className="flex flex-col items-center">
                    <img src="https://img.icons8.com/ios-filled/20/000000/bed.png" alt="Beds" />
                    <span className="text-xs sm:text-sm mt-1">{prop.beds}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="https://img.icons8.com/ios-filled/20/000000/bath.png" alt="Baths" />
                    <span className="text-xs sm:text-sm mt-1">{prop.baths}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="https://img.icons8.com/ios-filled/20/000000/garage.png" alt="Garage" />
                    <span className="text-xs sm:text-sm mt-1">{prop.garage}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="https://img.icons8.com/ios-filled/20/000000/area-chart.png" alt="Size" />
                    <span className="text-xs sm:text-sm mt-1">{prop.size}</span>
                  </div>
                </div>

                {/* 📌 Narx + Like */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="line-through text-gray-400 text-xs sm:text-sm mb-1">
                      ${prop.discount}
                    </p>
                    <p className="text-blue-600 font-bold text-base sm:text-lg">
                      ${prop.price}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleFavorite(prop.id, prop.hearth)}
                    className="flex items-center gap-1"
                  >
                    <Heart
                      className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
                        prop.hearth
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span className="text-sm text-gray-600">
                      {prop.likeCount}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* ✅ Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            fontWeight: 500,
            p: 2,
            borderRadius: 3,
            minWidth: "350px",
            boxShadow: 4,
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
