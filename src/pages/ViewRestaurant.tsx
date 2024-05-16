import 'tailwindcss/tailwind.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import GaugeChart from 'react-gauge-chart';

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
    const {
      restaurantName,
      address,
      customersPerWeek,
      foodWasteDealing,
      gasOrElectricStove,
      greenEnergy,
      ingredients,
    } = doc.data();
    return {
      id: count++,
      score: 1,
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

      <main className="container mx-auto px-4 py-8 flex flex-row justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Restaurant Details
          </h1>

          <div className="flex flex-row items-center mt-2">
            <h2 className="text-xl font-bold text-gray-800 px-4">
              Gas Stove Usage
            </h2>
            {restaurant?.gasOrElectricStove ? (
              <div className="bg-green-300 rounded-md px-3 py-1">
                Uses gas stove
              </div>
            ) : (
              <div className="bg-red-300 rounded-md px-3 py-1">
                Does not use gas stove
              </div>
            )}
          </div>

          <div className="flex flex-row items-center mt-2">
            <h2 className="text-xl font-bold text-gray-800 px-4">
              Green Energy Usage
            </h2>
            {restaurant?.greenEnergy ? (
              <div className="bg-green-300 rounded-md px-3 py-1">
                {restaurant?.greenEnergy}% green
              </div>
            ) : (
              <div className="bg-red-300 rounded-md px-3 py-1">
                {restaurant?.greenEnergy}% green
              </div>
            )}
          </div>

          <div className="flex flex-row items-center mt-2">
            <h2 className="text-xl font-bold text-gray-800 px-4">
              Food waste dealing
            </h2>
            {restaurant?.foodWasteDealing ? (
              <div className="bg-green-300 rounded-md px-3 py-1">
                Deals out food waste
              </div>
            ) : (
              <div className="bg-red-300 rounded-md px-3 py-1">
                Does not manage food waste
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-800 px-4 mt-2">
            Ingredients Used
          </h2>
          <ul className="px-8">
            {restaurant?.ingredients.map(
              (ingredient: { company: string; ingredient: string }) => (
                <li key={ingredient.ingredient}>{ingredient.ingredient}</li>
              ),
            )}
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold">{restaurant?.score}/10</span>
          </div>
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={10}
            percent={restaurant?.score / 10}
            colors={['#FFC371', '#81C784']}
          />
        </div>
      </main>
    </div>
  );
}
