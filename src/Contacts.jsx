import React, { useState } from "react";
import { useUserStore } from "./store/UserStore";
import { Phone, Mail, MapPin } from "lucide-react";
import axios from "axios";
import Header from "./sahifalar/Header"; 
import Footer from "./sahifalar/Footer";
import {
  Dialog,
  DialogContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function Contact() {
  const { isDark } = useUserStore();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    setLoading(true);
    setSuccess(null);

    try {
      const res = await axios.post(
        "https://faxriddin.bobur-dev.uz/api/contact",
        {
          fullName: formData.fullname,
          phone: formData.phone,
          message: formData.message,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 201) {
        setSuccess(true);
        setFormData({ fullname: "", phone: "", message: "" });
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error(err.response?.data || err);
      setSuccess(false);
    } finally {
      setLoading(false);
      // 2 soniyadan keyin Dialog avtomatik yopilsin
      setTimeout(() => setOpen(false), 2000);
    }
  };

  return (
    <>
      <Header />

      <div
        className={`min-h-screen pt-26 p-6 transition-colors duration-300 ${
          isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="max-w-[1200px] ml-[14%] mr-[17%] mt-8 flex flex-wrap justify-center md:justify-start gap-4 px-4">
          <h1 className="text-3xl font-bold mb-12 lg:text-[26px]">
            Savollaringiz bo‘lsa murojaat qiling
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div
            className={`flex flex-col items-center p-6 rounded-xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <Phone size={36} className="text-blue-500 mb-3" />
            <h3 className="font-semibold">Telefon</h3>
            <p className="text-sm text-gray-500 mt-1">+998 (90) 364 12 07</p>
          </div>

          <div
            className={`flex flex-col items-center p-6 rounded-xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <Mail size={36} className="text-blue-500 mb-3" />
            <h3 className="font-semibold">Elektron Pochta</h3>
            <p className="text-sm text-gray-500 mt-1">
              asqaraliyevfaxriddin2010@gmail.com
            </p>
          </div>

          <div
            className={`flex flex-col items-center p-6 rounded-xl shadow ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <MapPin size={36} className="text-blue-500 mb-3" />
            <h3 className="font-semibold">Manzil</h3>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Farg'ona vil., Farg'ona sh., 1-mavze, Faxriddin Academy
            </p>
          </div>
        </div>

        <div
          className={`shadow-lg rounded-2xl p-8 w-full max-w-lg mx-auto ${
            isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
          }`}
        >
          <h3 className="text-xl font-bold mb-6 text-center">
            Murojaatlarni shu yerdan jo‘nating!
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1">To‘liq ismingiz</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="F.I.Sh"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Telefon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="+998"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Xabar</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Matn"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Yuborish
            </button>
          </form>
        </div>

        {/* Status dialog */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent sx={{ textAlign: "center", p: 4 }}>
            {loading ? (
              <>
                <CircularProgress size={60} sx={{ color: "blue" }} />
                <Typography mt={2} fontWeight="bold">
                  Yuborilmoqda...
                </Typography>
              </>
            ) : success ? (
              <>
                <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
                <Typography mt={2} fontWeight="bold">
                  Muvaffaqiyatli jo'natildi
                </Typography>
              </>
            ) : (
              <>
                <ErrorOutlineIcon sx={{ fontSize: 60, color: "red" }} />
                <Typography mt={2} fontWeight="bold">
                  Jo'natilmadi
                </Typography>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </>
  );
}
