import React from 'react'
import Header from '../sahifalar/Header'
import Footer from '../sahifalar/Footer'
import Properties from '../sahifalar/properties'
import RasmlarCarusel from '../sahifalar/trr'

function Home() {
  return (
    <>
      <div className='w-full '>
        <Header />
      </div>

      <div className="container ml-[114px] w-[1400px] mx-auto px-4 mt-4">
        <div className="flex items-center justify-start gap-7 flex-nowrap overflow-x-auto p-4 rounded-md w-full box-border">
          <button className="flex items-center gap-1 border border-gray-200 rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 whitespace-nowrap">
            <img src="./img/Vector (1).png" alt="" className="w-4 h-4" />
            Enter an address, neighborhood, city, or ZIP code
          </button>

          <button className="flex items-center pr-[18px] pl-[18px] gap-1 border border-gray-200 rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 whitespace-nowrap">
            <img src="./img/car-key 1.png" alt="" /> Status
          </button>

          <button className="flex items-center gap-1 border border-gray-200 rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 whitespace-nowrap">
            <img src="./img/price 1.png" alt="" /> Price
          </button>

          <button className="flex items-center gap-1 border border-gray-200 rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 whitespace-nowrap">
            <img src="./img/setting-lines.png" alt="" className="w-4 h-4" />
            Advanced
          </button>

          <button className="flex items-center gap-2 bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 whitespace-nowrap">
            <img src="./img/001-loupe.png" alt="" className="w-4 h-4" />
            Search
          </button>
        </div>


        <div>
            
        </div>
      </div>

      <div className="relative mt-8 w-full">
        <img src="./img/unsplash_2gDwlIim3Uw.png" alt="" className="w-full h-auto" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
  <h1 className="text-4xl font-bold mb-2">Skyper Pool Apartment</h1>
  <p className="text-lg mb-1">112 Glenwood Ave Hyde Park, Boston, MA</p>
  <p className="text-xl font-semibold mb-4">$5,250/mo</p>

  {/* Icons with numbers */}
  <div className="flex justify-center gap-6 mt-2">
    {/* Beds */}
    <div className="flex flex-col items-center">
      <img
        src="https://img.icons8.com/ios-filled/30/ffffff/bed.png"
        alt="Beds"
        className="mb-1"
      />
      <span className="text-sm font-medium">4</span>
    </div>

    {/* Baths */}
    <div className="flex flex-col items-center">
      <img
        src="https://img.icons8.com/ios-filled/30/ffffff/bath.png"
        alt="Baths"
        className="mb-1"
      />
      <span className="text-sm font-medium">5</span>
    </div>

    {/* Garage */}
    <div className="flex flex-col items-center">
      <img
        src="https://img.icons8.com/ios-filled/30/ffffff/garage.png"
        alt="Garage"
        className="mb-1"
      />
      <span className="text-sm font-medium">1</span>
    </div>

    {/* Size */}
    <div className="flex flex-col items-center">
      <img
        src="https://img.icons8.com/ios-filled/30/ffffff/area-chart.png"
        alt="Size"
        className="mb-1"
      />
      <span className="text-sm font-medium">1200 Sq Ft</span>
    </div>
  </div>
</div>

      </div>
      



      <Properties/>
 
      <section className="w-full">
       <div className="relative mt-8 w-full">
        <img src="./img/unsplash_2gDwlIim3Uw.png" alt="" className="w-full h-auto" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
  <h1 className="text-3xl font-bold mb-2 w-[600px]">Vermont Farmhouse With Antique Jail Is
  the Week's Most Popular Home</h1>



</div>

      </div>

</section>


    <RasmlarCarusel/>




      <Footer />
    </>
  )
}

export default Home
