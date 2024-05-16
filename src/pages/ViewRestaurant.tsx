import 'tailwindcss/tailwind.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
// import { useEffect } from 'react';
import default_resturant from '../assets/default_resturant.jpg';

interface Restaurant {
  id: number;
  name: string;
  url: string;
  location: string;
}

let restaurants: Array<Restaurant> = [];
let count = 0;

const retrieveData = async () => {
  const querySnapshot = await getDocs(collection(db, 'sustainabilityForm'));
  restaurants = querySnapshot.docs.map((doc) => {
    const { restaurantName, address } = doc.data();
    return {
      id: count++,
      name: restaurantName,
      url: restaurantName
        .replace(/\s+/g, '-')
        .replace(/[\\/]/g, '')
        .toLowerCase(),
      location: address,
    };
  });
};

retrieveData();

export default function ViewRestaurant() {
  const location = useLocation();
  const restaurant = restaurants.find(
    (r) => r.url === location.pathname.split('/')[2],
  );
  return (
    <div className="w-full">
      <header className="py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {restaurant?.name}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={default_resturant}
              alt="Restaurant Name"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
