import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Restaurant {
  id: number;
  name: string;
  score: number;
}

export default function Leaderboard() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const retrieveData = async () => {
      const querySnapshot = await getDocs(collection(db, 'sustainabilityForm'));
      const restaurantList: Restaurant[] = [];
      let count = 1;
      querySnapshot.forEach((doc) => {
        const { restaurantName, sustainabilityScore } = doc.data();
        restaurantList.push({
          id: count++,
          name: restaurantName,
          score: Number(sustainabilityScore), // Parse score as number
        });
      });
      // Sort restaurants by score in descending order
      restaurantList.sort((a, b) => b.score - a.score);
      setRestaurants(restaurantList);
    };

    retrieveData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Leaderboard</h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="py-3 px-5 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Rank
              </th>
              <th className="py-3 px-5 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-5 bg-blue-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr
                key={restaurant.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-4 px-5 border-b border-gray-200 text-sm">
                  {index + 1} {/* Display rank */}
                </td>
                <td className="py-4 px-5 border-b border-gray-200 text-sm">
                  {restaurant.name}
                </td>
                <td className="py-4 px-5 border-b border-gray-200 text-sm">
                  {restaurant.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
