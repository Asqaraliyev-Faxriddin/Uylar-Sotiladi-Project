import React from "react";
import { Heart } from "lucide-react";
import Header from "./sahifalar/Header";
import Footer from "./sahifalar/Footer";
import { useUserStore } from "./store/UserStore";
import { useNavigate } from "react-router-dom";

function Favorite() {
  const { properties, setUylar, setHouseId } = useUserStore();
  const navigate = useNavigate();

  // faqat hearth:true bo'lganlarni chiqaramiz
  const favoriteHouses = properties.filter((house) => house.hearth === true);

  // ❤️ Like bosilganda +1 yoki -1
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

  // uyga o'tish
  const goToHouse = (id) => {
    setHouseId(id);
    navigate("/house/about");
  };

  return (
    <>
      <Header />

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">❤️ My Favorite Properties</h1>

        {favoriteHouses.length === 0 ? (
          <p className="text-gray-500">Hali sevimlilarga uy qo‘shilmagan.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteHouses.map((house) => (
              <div
                key={house.id}
                className="rounded-xl shadow-lg overflow-hidden bg-white"
              >
                {/* Uy rasmi */}
                <button
                  onClick={() => goToHouse(house.id)}
                  className="w-full relative"
                >
                  <img
                    src={house.img}
                    alt={house.title}
                    className="w-full h-52 sm:h-60 object-cover"
                  />
                  <span className="absolute bottom-3 right-3 bg-blue-600 text-white p-3 rounded-full shadow-lg transition">
                    ➜
                  </span>
                </button>

                {/* Uy ma'lumotlari */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{house.title}</h2>
                  <p className="text-gray-500 text-sm">{house.address}</p>

                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      ${house.price}
                    </span>
                    <span className="text-sm text-gray-400">{house.size}</span>
                  </div>

                  {/* Like tugmasi */}
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => toggleFavorite(house.id)}
                      className="relative"
                    >
                      <Heart
                        className={`w-6 h-6 cursor-pointer transition ${
                          house.hearth
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }`}
                      />
                      {house.likeCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                          {house.likeCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-[93px]">
        <Footer />
      </div>
    </>
  );
}

export default Favorite;
