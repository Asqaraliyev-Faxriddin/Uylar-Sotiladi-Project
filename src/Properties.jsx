import { useState } from "react";
import { Heart } from "lucide-react";
import Header from "./sahifalar/Header";
import Footer from "./sahifalar/Footer";
import { useUserStore } from "./store/UserStore";
import { useNavigate } from "react-router-dom";

export default function UylarGrid() {
  const { properties, setUylar, setHouseId, houseId } = useUserStore();
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();

  // ❤️ Like bosilganda +1 yoki -1 qiladi
  const toggleFavorite = (id) => {
    const updated = properties.map((el) =>
      el.id === id
        ? {
            ...el,
            hearth: !el.hearth,
            likeCount: el.hearth ? el.likeCount - 1 : el.likeCount + 1,
          }
        : el
    );
    setUylar(updated);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const goToHouse = (id) => {
    setHouseId(id);
    console.log("Selected houseId:", id);
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, visibleCount).map((prop) => (
            <div key={prop.id} className="p-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                      For Sale
                    </span>
                    <span className="bg-yellow-500 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                      Featured
                    </span>
                  </div>

                  <button onClick={() => goToHouse(prop.id)} className="w-full relative">
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

                  <img
                    src={`https://i.pravatar.cc/100?img=${prop.id}`}
                    alt="Agent"
                    className="absolute -bottom-6 left-5 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white"
                  />
                </div>

                <div className="pt-10 px-4 sm:px-5 pb-5">
                  <h3 className="text-base sm:text-lg font-semibold mb-1">
                    {prop.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3">
                    {prop.address}
                  </p>

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

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="line-through text-gray-400 text-xs sm:text-sm mb-1">
                        ${prop.price}
                      </p>
                      <p className="text-blue-600 font-bold text-base sm:text-lg">
                        ${prop.discount}
                      </p>
                    </div>

                    <button onClick={() => toggleFavorite(prop.id)} className="relative">
                      <Heart
                        className={`w-6 h-6 cursor-pointer transition ${
                          prop.hearth ? "text-red-500 fill-red-500" : "text-gray-400"
                        }`}
                      />
                      {prop.likeCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                          {prop.likeCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
    </>
  );
}
