import { useCallback, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Snackbar, Alert, Button } from "@mui/material";
import Header from "./sahifalar/Header";
import Footer from "./sahifalar/Footer";
import { useUserStore } from "./store/UserStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UylarGrid() {
  const { properties, setUylar, setHouseId } = useUserStore();
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Snackbar state
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

  // Token tekshirish
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

      if (res.data && res.data.data?.id) {
        return res.data.data;
      } else {
        setShowLoginPrompt(true);
        return null;
      }
    } catch (err) {
      console.log("Token xatosi:", err);
      setShowLoginPrompt(true);
      return null;
    }
  };

  // Backenddan uylarni olish
  const uylar_Ol = async () => {
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
          price: el.price || 0,
          discount: el.discount || 0,
          hearth: el.hearth || false,
          likeCount: el.likeCount || 0,
          user: el.user || {},
        };
      });
      setUylar(malumotlar);
    } catch (err) {
      console.error("Uylarni olishda xato:", err);
      showSnackbar("Uylarni olishda xato!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    uylar_Ol();
  }, []);

  // Like bosilganda backendga yuborish
  const toggleFavorite = async (houseId, currentHeart, e) => {
    e?.stopPropagation();
    const user = await checkToken();
    if (!user) return;

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:3000/favorites",
        {
          like: !currentHeart,
          userId: user.id,
          houseId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updated = properties.map((prop) =>
        prop.id === houseId
          ? {
              ...prop,
              hearth: !currentHeart,
              likeCount: currentHeart ? prop.likeCount - 1 : prop.likeCount + 1,
            }
          : prop
      );
      setUylar(updated);

      showSnackbar(
        currentHeart ? "Removed from favorites 💔" : "Added to favorites ❤️",
        "success"
      );
    } catch (err) {
      console.error("Favorite xatosi:", err);
      showSnackbar("Xatolik yuz berdi!", "error");
    }
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 10);

  const goToHouse = async (id) => {
    const user = await checkToken();
    if (!user) return;
    setHouseId(id);
    navigate("/house/about");
  };

  return (
    <>
      <Header />
      <div className="p-6 sm:p-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Properties</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Nulla quis curabitur velit volutpat auctor bibendum consectetur sit.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, visibleCount).map((prop) => (
              <div
                key={prop.id}
                className="p-2 cursor-pointer"
                onClick={() => goToHouse(prop.id)}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="relative">
                    <img
                      src={prop.img}
                      alt={prop.title}
                      className="w-full h-52 sm:h-60 object-cover"
                    />
                    {prop.user?.profileImg && (
                      <img
                        src={prop.user.profileImg}
                        alt="Agent"
                        className="absolute -bottom-6 left-5 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white object-cover"
                      />
                    )}
                  </div>

                  <div className="pt-10 px-4 sm:px-5 pb-5">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      {prop.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mb-3">
                      {prop.address}, {prop.country}
                    </p>

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
                        onClick={(e) => toggleFavorite(prop.id, prop.hearth, e)}
                        className="relative"
                      >
                        <Heart
                          className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
                            prop.hearth
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {prop.likeCount || 0}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {visibleCount < properties.length && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Ko‘proq ko‘rish
            </button>
          </div>
        )}
      </div>
      <Footer />

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      {/* Login prompt */}
      <Snackbar
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
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
            <Button color="inherit" size="small" onClick={() => setShowLoginPrompt(false)}>
              Yo‘q
            </Button>
          </div>
        </Alert>
      </Snackbar>
    </>
  );
}
