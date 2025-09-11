import React, { useState } from "react";
import { useUserStore } from "./store/UserStore";
import Footer from "./sahifalar/Footer";
import Header from "./sahifalar/Header";
import { Heart, Bed, Bath, Car, MapPin } from "lucide-react";

function HouseAbout() {
  const { properties, houseId } = useUserStore();
  const house = properties.find((p) => p.id === Number(houseId));

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  if (!house) {
    return <div className="text-center py-10">Uy topilmadi</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Yuborilgan contact ma’lumotlari:", form);
    alert("Xabaringiz yuborildi ✅");
  };

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            {house.title}
            <span className="flex items-center gap-1 text-red-500 text-lg">
              <Heart size={22} className="fill-red-500" />
              {house.likeCount}
            </span>
          </h1>
          <p className="text-gray-600">
            {house.address}, {house.country}
          </p>
          <p className="text-lg font-semibold mt-2 text-blue-700">
            ${house.price}/mo
          </p>
        </div>

        {/* Main Image */}
        <img
          src={house.img}
          alt={house.title}
          className="w-full h-96 object-cover rounded-2xl shadow-xl"
        />

        {/* Rooms Images */}
        {house.rooms_images?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {house.rooms_images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Room ${i + 1}`}
                className="rounded-lg shadow-md object-cover w-full h-40 hover:scale-105 transition"
              />
            ))}
          </div>
        )}

        {/* Features Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-xl">
            <Bed size={20} /> {house.beds} Beds
          </div>
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-xl">
            <Bath size={20} /> {house.baths} Baths
          </div>
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-xl">
            <Car size={20} /> {house.garage} Garage
          </div>
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-xl">
            <MapPin size={20} /> {house.size}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{house.description}</p>
        </div>

        {/* Property Details */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-semibold">Price:</span> ${house.price}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {house.address},{" "}
              {house.country}
            </p>
            <p>
              <span className="font-semibold">Build Year:</span>{" "}
              {new Date(house.build_year).getFullYear()}
            </p>
            <p>
              <span className="font-semibold">Bedrooms:</span> {house.beds}
            </p>
            <p>
              <span className="font-semibold">Bathrooms:</span> {house.baths}
            </p>
            <p>
              <span className="font-semibold">Property Type:</span>{" "}
              {house.beds > 4
                ? "Luxury House"
                : house.beds > 2
                ? "Apartment"
                : "Loft / Small Home"}
            </p>
            <p>
              <span className="font-semibold">Size:</span> {house.size}
            </p>
          </div>
        </div>

        {/* Features Lists */}
        {house.features?.length > 0 && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <div className="flex flex-wrap gap-2">
              {house.features.map((f, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {house.extraFeatures?.length > 0 && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Extra Features</h2>
            <div className="flex flex-wrap gap-2">
              {house.extraFeatures.map((f, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {house.documents?.length > 0 && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Documents</h2>
            <ul className="list-disc list-inside text-blue-600">
              {house.documents.map((doc, i) => (
                <li key={i}>
                  <a href={`/docs/${doc}.pdf`} download>
                    {doc}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Location Map */}
        {house.location?.map_url && (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <iframe
              src={`https://www.google.com/maps?q=${house.location.latitude},${house.location.longitude}&hl=es;z=14&output=embed`}
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              className="rounded-xl border"
            ></iframe>
          </div>
        )}

        {/* User Info */}
        <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-4">
          {house.user?.profileImg && (
            <img
              src={house.user.profileImg}
              alt="user"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold">
              {house.user?.firstName} {house.user?.lastName}
            </p>
            <p className="text-gray-500 text-sm">E’lon beruvchi</p>
          </div>
        </div>

        <div className="my-10 p-8 rounded-2xl shadow-2xl max-w-md mx-auto bg-white">
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
    Bog‘lanish
  </h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="text"
      name="name"
      placeholder="Ismingiz"
      value={form.name}
      onChange={handleChange}
      className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition"
      required
    />
    <input
      type="tel"
      name="phone"
      placeholder="Telefon"
      value={form.phone}
      onChange={handleChange}
      className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition"
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition"
    />
    <textarea
      name="message"
      placeholder="Xabaringiz"
      value={form.message}
      onChange={handleChange}
      className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition resize-none"
      rows={4}
    ></textarea>
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition"
    >
      ✉️ Yuborish
    </button>
  </form>
</div>

      </div>

      <Footer />
    </>
  );
}

export default HouseAbout;
