import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BusinessIcon from "@mui/icons-material/Business";
import VillaIcon from "@mui/icons-material/Villa";


export default function PropertiesCarousel() {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const properties = [
    {
      id: 1,
      img: "https://picsum.photos/600/400?random=1",
      title: "New Apartment Nice View",
      location: "Quincy St, Brooklyn, NY, USA",
      beds: 4,
      baths: 5,
      garage: 1,
      size: "1200 Sq Ft",
      oldPrice: "$2,800/mo",
      newPrice: "$7,500/mo",
    },
    {
      id: 2,
      img: "https://picsum.photos/600/400?random=2",
      title: "Modern Luxury House",
      location: "Sunset Blvd, Los Angeles, CA, USA",
      beds: 5,
      baths: 4,
      garage: 2,
      size: "2000 Sq Ft",
      oldPrice: "$5,200/mo",
      newPrice: "$12,500/mo",
    },
    {
      id: 3,
      img: "https://picsum.photos/600/400?random=3",
      title: "Cozy Family Home",
      location: "Lake View, Chicago, IL, USA",
      beds: 3,
      baths: 2,
      garage: 1,
      size: "950 Sq Ft",
      oldPrice: "$1,800/mo",
      newPrice: "$4,500/mo",
    },
    {
      id: 4,
      img: "https://picsum.photos/600/400?random=4",
      title: "Luxury Villa with Garden",
      location: "Beverly Hills, Los Angeles, CA",
      beds: 6,
      baths: 5,
      garage: 3,
      size: "3000 Sq Ft",
      oldPrice: "$10,000/mo",
      newPrice: "$18,500/mo",
    },
    {
      id: 5,
      img: "https://picsum.photos/600/400?random=5",
      title: "Modern Loft Apartment",
      location: "Downtown, Miami, FL",
      beds: 2,
      baths: 2,
      garage: 1,
      size: "900 Sq Ft",
      oldPrice: "$2,000/mo",
      newPrice: "$4,200/mo",
    },
  ];

  const categories = [
    {
      title: "House",
      icon: <HouseIcon style={{ fontSize: 40 }} />,
      img: "./img/unsplash_XbwHrt87mQ0.png",
    },
    {
      title: "Apartment",
      icon: <ApartmentIcon style={{ fontSize: 40 }} />,
      img: "./img/unsplash_5q1KnUjtjaM.png",
    },
    {
      title: "Office",
      icon: <BusinessIcon style={{ fontSize: 40 }} />,
      img: "./img/unsplash_b_79nOqf95I.png",
    },
    {
      title: "Villa",
      icon: <VillaIcon style={{ fontSize: 40 }} />,
      img: "./img/unsplash_ZtC4_rPCRXA.png",
    },
  ];


  const settings = {
    dots: true,     
    infinite: false,     
    speed: 500,
    slidesToShow: 3,    
    slidesToScroll: 3,   
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="p-10">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold mb-2">Recommended</h1>
        <p className="text-gray-500">Nulla quis curabitur velit volutpat auctor bibendum consectetur sit.</p>
      </div>

      <Slider {...settings}>
  {properties.map((prop) => (
    <div key={prop.id} className="p-2">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          {/* For Sale va Featured badge'lar */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
              For Sale
            </span>
            <span className="bg-yellow-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
              Featured
            </span>
          </div>

          {/* Asosiy rasm */}
          <img
            src={prop.img}
            alt={prop.title}
            className="w-full h-60 object-cover"
          />

          {/* Agent rasmi */}
          <img
            src={`https://i.pravatar.cc/100?img=${prop.id}`}
            alt="Agent"
            className="absolute -bottom-6 left-5 w-14 h-14 rounded-full border-4 border-white"
          />
        </div>

        <div className="pt-10 px-5 pb-5">
          <h3 className="text-lg font-semibold mb-1">{prop.title}</h3>
          <p className="text-gray-500 text-sm mb-4">{prop.location}</p>

          {/* Icons with text below */}
          <div className="flex justify-between text-center text-gray-600 mb-4">
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios-filled/24/000000/bed.png"
                alt="Beds"
              />
              <span className="text-sm mt-1">{prop.beds}</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios-filled/24/000000/bath.png"
                alt="Baths"
              />
              <span className="text-sm mt-1">{prop.baths}</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios-filled/24/000000/garage.png"
                alt="Garage"
              />
              <span className="text-sm mt-1">{prop.garage}</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://img.icons8.com/ios-filled/24/000000/area-chart.png"
                alt="Size"
              />
              <span className="text-sm mt-1">{prop.size}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="line-through text-gray-400 text-sm mb-1">
                {prop.oldPrice}
              </p>
              <p className="text-blue-600 font-bold text-lg">
                {prop.newPrice}
              </p>
            </div>

            <button
              onClick={() => toggleFavorite(prop.id)}
              className={`text-2xl ${
                favorites[prop.id] ? "text-red-500" : "text-gray-400"
              }`}
            >
              {favorites[prop.id] ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</Slider>

      <section className="bg-white py-12">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-2xl font-bold mb-3">Why Choose Us?</h2>
    <p className="text-gray-500 max-w-2xl mx-auto">
      Nulla quis curabitur velit volutpat auctor bibendum consectetur sit.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
      {[
        { icon: "./img/ere.png", title: "Trusted By Thousands" },
        { icon: "./img/house 1.png", title: "Wide Range Of Properties" },
        { icon: "./img/calculator.png", title: "Financing Made Easy" },
        { icon: "./img/maps.png", title: "See Neighborhoods" },
      ].map((item, i) => (
        <div
          key={i}
          className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-center mb-3">
            <img src={item.icon} alt="" className="w-12 h-12" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-500 text-sm">
            With over 1 million+ homes for sale available on the website, Trulia
            can match you with a house you will want to call home.
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
<section className="bg-white py-12">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-2xl font-bold mb-3">Category</h2>
    <p className="text-gray-500 max-w-2xl mx-auto">
      Nulla quis curabitur velit volutpat auctor bibendum consectetur sit.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
        >
          <img
            src={cat.img}
            alt={cat.title}
            className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300 brightness-77   "
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-black bg-opacity-60 p-4 rounded-full text-white mb-3">
              {cat.icon}
            </div>
            <h3 className="font-semibold text-lg text-white drop-shadow-md">
              {cat.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>






    </div>
  );
}
