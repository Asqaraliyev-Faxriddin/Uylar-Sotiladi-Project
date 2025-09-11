import React, { useState, useEffect, useCallback } from "react";
import Header from "../sahifalar/Header";
import Footer from "../sahifalar/Footer";
import Properties from "../sahifalar/properties";
import RasmlarCarusel from "../sahifalar/trr";
import { useUserStore } from "../store/UserStore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Heart } from "lucide-react";
import axios from "axios";
import { Snackbar, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const { properties, setUylar, user, setHouseId } = useUserStore();
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [open, setOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const showSnackbar = useCallback((msg, sev = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginPrompt(true);
      return null;
    }
    try {
      const res = await axios.get("http://localhost:3000/profile/my/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.data?.id) return res.data.data;
      setShowLoginPrompt(true);
      return null;
    } catch (err) {
      if (err.response?.status === 401) setShowLoginPrompt(true);
      return null;
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/houses");
      const malumotlar = res.data.data.map((el, index) => {
        let features = {};
        try {
          features = JSON.parse(el.features || "{}");
        } catch {}
        return {
          id: el.id || index + 1,
          img: el.img,
          title: el.title,
          profileImg: el.profileImg,
          address: el.address,
          country: el.country,
          beds: features.rooms || 0,
          baths: features.bathrooms || 0,
          garage: features.garage || 0,
          size: el.size || "1200 Sq Ft",
          hearth: false,
          likeCount: el.likeCount || 0,
          user: el.user || {},
          price: el.price || 0,
          discount: el.discount || 0,
        };
      });
      setUylar(malumotlar);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const toggleFavorite = async (id, currentHeart) => {
    const u = await checkToken();
    if (!u) return;

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3000/favorites",
        { like: !currentHeart, userId: u.id, houseId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = properties.map((house) =>
        house.id === id
          ? {
              ...house,
              hearth: !currentHeart,
              likeCount: currentHeart
                ? house.likeCount - 1
                : house.likeCount + 1,
            }
          : house
      );
      setUylar(updated);

      showSnackbar(
        currentHeart ? "Removed from favorites ❤️‍🔥" : "Added to favorites ❤️",
        "success"
      );
    } catch (err) {
      console.error("Favorite xatosi:", err);
      showSnackbar("Xatolik yuz berdi", "error");
    }
  };

  const goToHouse = async (id) => {
    const u = await checkToken();
    if (!u) return;
    setHouseId(id);
    navigate("/house/about");
  };

  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 2200,
    autoplay: true,
    autoplaySpeed: 120,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <Header />

      <div className="max-w-screen-xl mx-auto px-4 mt-4">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-start gap-4 p-4 rounded-md w-full box-border overflow-x-auto">
          <button className="flex items-center gap-2 bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 whitespace-nowrap">
            <img src="./img/001-loupe.png" alt="" className="w-4 h-4" />
            Search
          </button>
        </div>
      </div>

      <div className="w-full mt-6">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <Slider {...mainSliderSettings}>
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
                  <p className="text-lg md:text-xl font-semibold mb-4">{house.price}</p>

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

                  <div className="relative mt-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(house.id, house.hearth);
                      }}
                      disabled={loadingId === house.id}
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
        )}
      </div>

      <Properties />

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

      {/* Snackbar */}
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

      {/* Login Prompt */}
      <Snackbar
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            fontWeight: 500,
            p: 2,
            borderRadius: 3,
            minWidth: "400px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: 5,
          }}
        >
          <span>Login qilasizmi?</span>
          <div>
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setShowLoginPrompt(false);
                navigate("/login");
              }}
            >
              Ha
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={() => setShowLoginPrompt(false)}
            >
              Yo‘q
            </Button>
          </div>
        </Alert>
      </Snackbar>
    </>
  );
}

export default Home;
