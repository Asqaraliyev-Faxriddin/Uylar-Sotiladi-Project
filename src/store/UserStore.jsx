import { create } from "zustand";

export const useUserStore = create((set)=>({
    fullname:"",
    pass:"",
    phone:"",
    isDark:"",

    otp:"",
    properties: [
        {
          id: 1,
          img: "https://picsum.photos/600/400?random=1",
          rooms_images: [
            "https://picsum.photos/600/400?random=11",
            "https://picsum.photos/600/400?random=12",
            "https://picsum.photos/600/400?random=13"
          ],
          title: "New Apartment Nice View",
          profileImg:"https://picsum.photos/600/400?random=33",
          address: "Quincy St, Brooklyn, NY, USA",
          country: "USA",
          price: 7500,
          discount: 2800,
          build_year: new Date("2018-06-15"),
          description: "A modern apartment with a breathtaking city view, located in the heart of Brooklyn. Perfect for families or young professionals.",
          features: ["Balcony", "Central Heating", "Elevator", "Gym Access"],
          extraFeatures: ["Smart Home System", "Underground Parking"],
          documents: ["Ownership Certificate", "Insurance Papers"],
          isActive: true,
          beds: 4,
          baths: 5,
          garage: 1,
          likeCount: 3,
          size: "1200 Sq Ft",
          hearth: true,
      
          
          location: {
            map_url: "https://maps.google.com/?q=Quincy+St,+Brooklyn,+NY,+USA",
            latitude: "40.6892",
            longitude: "-73.9425"
          },
      
          // 👤 User
          user: {
            firstName: "John",
            lastName: "Doe",
            profileImg: "https://randomuser.me/api/portraits/men/11.jpg"
          }
        },
        {
          id: 2,
          img: "https://picsum.photos/600/400?random=2",
          rooms_images: [
            "https://picsum.photos/600/400?random=21",
            "https://picsum.photos/600/400?random=22",
            "https://picsum.photos/600/400?random=23"
          ],
          title: "Modern Luxury House",
          profileImg:"https://picsum.photos/600/400?random=43",

          address: "Sunset Blvd, Los Angeles, CA, USA",
          country: "USA",
          price: 12500,
          discount: 5200,
          build_year: new Date("2020-09-10"),
          description: "Spacious luxury house with a modern interior and large backyard. Located near Sunset Boulevard.",
          features: ["Swimming Pool", "Jacuzzi", "Fireplace"],
          extraFeatures: ["Solar Panels", "Private Cinema"],
          documents: ["Ownership Certificate"],
          isActive: true,
          beds: 5,
          baths: 4,
          garage: 2,
          likeCount: 3443,
          size: "2000 Sq Ft",
          hearth: false,
      
          location: {
            map_url: "https://maps.google.com/?q=Sunset+Blvd,+Los+Angeles,+CA,+USA",
            latitude: "34.0983",
            longitude: "-118.3267"
          },
          user: {
            firstName: "Emily",
            lastName: "Clark",
            profileImg: "https://randomuser.me/api/portraits/women/22.jpg"
          }
        },
        {
          id: 3,
          img: "https://picsum.photos/600/400?random=3",
          rooms_images: [
            "https://picsum.photos/600/400?random=31",
            "https://picsum.photos/600/400?random=32"
          ],
          title: "Cozy Family Home",
          address: "Lake View, Chicago, IL, USA",
          country: "USA",
          price: 4500,
          discount: 1800,
          build_year: new Date("2015-03-25"),
          description: "A warm and cozy family home near the lake. Ideal for families seeking peace and quiet.",
          features: ["Garden", "Basement", "Garage"],
          extraFeatures: ["Guest House"],
          documents: ["Ownership Certificate", "Renovation Documents"],
          isActive: true,
          beds: 3,
          baths: 2,
          profileImg:"https://picsum.photos/600/400?random=25",

          garage: 1,
          likeCount: 344,
          size: "950 Sq Ft",
          hearth: true,
      
          location: {
            map_url: "https://maps.google.com/?q=Lake+View,+Chicago,+IL,+USA",
            latitude: "41.9404",
            longitude: "-87.6536"
          },
          user: {
            firstName: "Michael",
            lastName: "Brown",
            profileImg: "https://randomuser.me/api/portraits/men/33.jpg"
          }
        },
        {
          id: 4,
          img: "https://picsum.photos/600/400?random=4",
          rooms_images: [
            "https://picsum.photos/600/400?random=41",
            "https://picsum.photos/600/400?random=42",
            "https://picsum.photos/600/400?random=43",
            "https://picsum.photos/600/400?random=44"
          ],
          title: "Luxury Villa with Garden",
          address: "Beverly Hills, Los Angeles, CA",
          country: "USA",
          price: 18500,
          discount: 10000,
          build_year: new Date("2019-01-05"),
          description: "An extravagant villa located in Beverly Hills with a private garden and premium facilities.",
          features: ["Swimming Pool", "Large Garden", "Sauna"],
          extraFeatures: ["Wine Cellar", "Home Theater"],
          documents: ["Ownership Certificate", "Tax Documents"],
          isActive: true,
          beds: 6,
          baths: 5,
          profileImg:"https://picsum.photos/600/400?random=28",

          garage: 3,
          likeCount: 343,
          size: "3000 Sq Ft",
          hearth: false,
      
          location: {
            map_url: "https://maps.google.com/?q=Beverly+Hills,+Los+Angeles,+CA",
            latitude: "34.0736",
            longitude: "-118.4004"
          },
          user: {
            firstName: "Sophia",
            lastName: "Martinez",
            profileImg: "https://randomuser.me/api/portraits/women/44.jpg"
          }
        },
        {
          id: 5,
          img: "https://picsum.photos/600/400?random=5",
          rooms_images: [
            "https://picsum.photos/600/400?random=51",
            "https://picsum.photos/600/400?random=52"
          ],
          title: "Modern Loft Apartment",
          address: "Downtown, Miami, FL",
          country: "USA",
          price: 4200,
          discount: 2000,
          build_year: new Date("2017-07-20"),
          description: "A trendy loft apartment located in Downtown Miami with modern amenities and stylish design.",
          features: ["Loft Style", "City View", "Balcony"],
          extraFeatures: ["Coworking Space", "Shared Rooftop"],
          documents: ["Ownership Certificate"],
          isActive: true,
          beds: 2,
          baths: 2,
          profileImg:"https://picsum.photos/600/400?random=39",

          garage: 1,
          likeCount: 13,
          size: "900 Sq Ft",
          hearth: false,
      
          location: {
            map_url: "https://maps.google.com/?q=Downtown,+Miami,+FL",
            latitude: "25.7743",
            longitude: "-80.1937"
          },
          user: {
            firstName: "David",
            lastName: "Wilson",
            profileImg: "https://randomuser.me/api/portraits/men/55.jpg"
          }
        }
      ]
,      


    token2:"",
    houseId:"1",
    
    setHouseId:(houseId)=> set({houseId}),


    setFullname:(fullname)=> set({fullname}),
    setPass:(pass)=> set({pass}),
    setIsDark:(isDark)=> set({isDark}),

    setPhone:(phone)=> set({phone}),
    setOtp:(otp)=> set({otp}),

  setUylar: (properties) => set({ properties }),  
  setToken:(token) => set({ token}),  



}))