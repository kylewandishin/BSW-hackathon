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

      <main className="container mx-auto px-4 py-8 flex flex-row justify-center">
        <table className="">
          <tbody>
            <tr className="mb-5">
              <th className="text-3xl font-bold text-gray-800">
                Restaurant Information
              </th>
            </tr>
            <tr>
              <td className="flex flex-row items-center mt-5">
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
              </td>
            </tr>
            <tr>
              <td className="flex flex-row items-center mt-2">
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
              </td>
            </tr>
            <tr>
              <td className="flex flex-row items-center mt-2">
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
              </td>
            </tr>
            <tr>
              <td className="flex flex-row items-center mt-2">
                <h2 className="text-xl font-bold text-gray-800 px-4">
                  Ingredients Used
                </h2>
                <div className="px-4 grid gap-2 grid-cols-3">
                  {restaurant?.ingredients.map(
                    (ingredient: { company: string; ingredient: string }) => (
                      <div key={ingredient.ingredient} className="rounded-md p-1 bg-gray-300">
                        {ingredient.ingredient}
                      </div>
                    ),
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-col items-center mt-8 h-full">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold">{restaurant?.score}/10</span>
          </div>
          <div className="w-30 h-full flex items-center">
            <GaugeChart
              id="gauge-chart2"
              nrOfLevels={10}
              percent={restaurant?.score / 10}
              colors={['#FFC371', '#81C784']}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
