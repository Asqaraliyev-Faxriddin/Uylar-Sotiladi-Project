import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  let navigate = useNavigate()

  const baseURL = "https://faxriddin.bobur-dev.uz";

  const sendOTP = async () => {
    setLoading(true);
    setStatus(null);
    try {
      await axios.post(`${baseURL}/verification/send`, {
        type: "reset_password",
        phone,
      });
      setStatus({ type: "success", message: "OTP yuborildi!" });
      setStep(2);
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || "Xatolik yuz berdi" });
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setStatus(null);
    try {
        console.log(otp);
        
      await axios.post(`${baseURL}/verification/verify`, {
        type: "reset_password",
        phone,
        otp:otp,
      });
      setStatus({ type: "success", message: "OTP tasdiqlandi!" });
      setStep(3);
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || "Xatolik yuz berdi" });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    // Validatsiya
    if (!phone || !otp || !password) {
      setStatus({ type: "error", message: "Barcha maydonlar to‘ldirilishi kerak!" });
      return;
    }
    if (!/^\+\d{12}$/.test(phone)) {
      setStatus({ type: "error", message: "Telefon raqam noto‘g‘ri formatda!" });
      return;
    }
   
    if (password.length < 8) {
      setStatus({ type: "error", message: "Parol kamida 8 belgidan iborat bo‘lishi kerak!" });
      return;
    }
  
    setLoading(true);
    setStatus(null);
  
    try {
      const res = await axios.post("https://faxriddin.bobur-dev.uz/auth/reset-password", {
        phone,
        otp,
        password,
      });
  
      setStatus({ type: "success", message: "Parol muvaffaqiyatli tiklandi!" });
   
      setPhone("");
      setOtp("");
      setPassword("");
      setStep(1);
      setTimeout(()=>{
      navigate("/login")
      },2000)
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Xatolik yuz berdi",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (<>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Parolni Tiklash
        </h2>

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="+998901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-gray-300 rounded-xl w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition duration-200"
            />
            <button
              onClick={sendOTP}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-transform duration-150 font-semibold"
            >
              {loading ? "Yuborilmoqda..." : "OTP yuborish"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="OTP kod"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="border border-gray-300 rounded-xl w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 transition duration-200"
            />
            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 active:scale-95 transition-transform duration-150 font-semibold"
            >
              {loading ? "Tasdiqlanmoqda..." : "OTP tasdiqlash"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="text"
              placeholder="Yangi parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-xl w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400 transition duration-200"
            />
            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 active:scale-95 transition-transform duration-150 font-semibold"
            >
              {loading ? "Tiklanmoqda..." : "Parolni tiklash"}
            </button>
          </>
        )}

        {status && (
          <p
            className={`mt-4 text-center font-medium ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>
    </div>
    </>
  );
}

export default ResetPassword;
