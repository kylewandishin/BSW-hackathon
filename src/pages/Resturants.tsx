// import React from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
}

const restaurants: Array<Restaurant> = [
  {
    id: 1,
    name: 'Green Eatery',
    description: 'A cozy place offering organic and locally sourced meals.',
    imageUrl: 'https://via.placeholder.com/150',
    location: '123 Green St, Springfield',
  },
  {
    id: 2,
    name: 'Eco Diner',
    description: 'Sustainable dining with a focus on plant-based dishes.',
    imageUrl: 'https://via.placeholder.com/150',
    location: '456 Eco Ave, Springfield',
  },
];

export default function Resturants() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">Restaurants</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {restaurant.name}
                </h2>
                <p className="text-gray-600">{restaurant.description}</p>
                <p className="text-gray-800 mt-2 font-semibold">
                  {restaurant.location}
                </p>
                <Link
                  to={`/restaurant/${restaurant.id}`}
                  className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} ECO-bites. All rights reserved.
          </p>
          <nav className="flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-400">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-gray-400">
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}