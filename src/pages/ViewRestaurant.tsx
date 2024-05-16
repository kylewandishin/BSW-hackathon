import 'tailwindcss/tailwind.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';

interface Ingredient {
  company: string;
  ingredient: string;
  lbsPerWeek: string;
  locallySourced: boolean;
}

interface Restaurant {
  id: number;
  name: string;
  url: string;
  location: string;
  customersPerWeek: string;
  foodWasteDealing: boolean;
  gasOrElectricStove: boolean;
  greenEnergy: number;
  ingredients: Array<Ingredient>;
  sustainabilityScore: number;
}

export default function ViewRestaurant() {
  const location = useLocation();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  let count = 0;
  useEffect(() => {
    const retrieveData = async () => {
      const querySnapshot = await getDocs(collection(db, 'sustainabilityForm'));
      const fetchedRestaurants = querySnapshot.docs.map((doc) => {
        const {
          restaurantName,
          sustainabilityScore,
          address,
          customersPerWeek,
          foodWasteDealing,
          gasOrElectricStove,
          greenEnergy,
          ingredients,
        } = doc.data();
        return {
          id: count++,
          sustainabilityScore,
          name: restaurantName,
          url: restaurantName
            .replace(/\s+/g, '-')
            .replace(/[\\/]/g, '')
            .toLowerCase(),
          location: address,
          customersPerWeek,
          foodWasteDealing,
          gasOrElectricStove,
          greenEnergy,
          ingredients,
        };
      });
      setRestaurants(fetchedRestaurants);
    };

    retrieveData();
  }, []);
  useEffect(() => {
    const foundRestaurant = restaurants.find(
      (r) => r.url === location.pathname.split('/')[2],
    );
    setRestaurant(foundRestaurant || null);
  }, [restaurants, location.pathname]);

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <header className="py-4 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {restaurant?.name}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-row justify-between items-start">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Restaurant Details
          </h1>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">Gas Stove Usage</h2>
            {restaurant?.gasOrElectricStove ? (
              <div className="bg-green-300 rounded-md px-3 py-1 mt-2">
                Uses gas stove
              </div>
            ) : (
              <div className="bg-red-300 rounded-md px-3 py-1 mt-2">
                Does not use gas stove
              </div>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Green Energy Usage
            </h2>
            <div
              className={`rounded-md px-3 py-1 mt-2 ${restaurant?.greenEnergy ? 'bg-green-300' : 'bg-red-300'}`}
            >
              {restaurant?.greenEnergy}% green
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Food Waste Dealing
            </h2>
            {restaurant?.foodWasteDealing ? (
              <div className="bg-green-300 rounded-md px-3 py-1 mt-2">
                Deals with food waste
              </div>
            ) : (
              <div className="bg-red-300 rounded-md px-3 py-1 mt-2">
                Does not manage food waste
              </div>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Ingredients Used
            </h2>
            <ul className="list-disc pl-6 mt-2">
              {restaurant?.ingredients.map((ingredient) => (
                <li key={ingredient.ingredient}>{ingredient.ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full max-w-sm">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-bold">
              {restaurant?.sustainabilityScore || 0}/100
            </span>
          </div>
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={10}
            percent={(restaurant?.sustainabilityScore || 0) / 100}
            colors={['#FFC371', '#81C784']}
            className="w-full"
            hideText={true}
          />
        </div>
      </main>
    </div>
  );
}
