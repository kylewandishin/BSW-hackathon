// import React from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-green-50 text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to ECO-bites
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 mb-8">
            Your partner in sustainable and eco-friendly dining
          </p>
          <Link
            to="/learn-more"
            className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg md:text-xl hover:bg-green-400 transition-colors"
          >
            Learn More
          </Link>
        </section>

        <section className="py-20 px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-12">
            Our Mission
          </h2>
          <div className="flex flex-col md:flex-row items-stretch justify-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white shadow-lg rounded-lg p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Helping Businesses Become More Sustainable
              </h3>
              <p className="text-gray-600 flex-grow">
                We provide tools and resources to help businesses adopt
                sustainable practices and reduce their environmental impact.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Promoting Sustainable Establishments
              </h3>
              <p className="text-gray-600 flex-grow">
                We promote and support businesses that prioritize sustainability
                and eco-friendliness.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex-1 flex flex-col">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Sponsoring Locally Sourced Ingredients
              </h3>
              <p className="text-gray-600 flex-grow">
                We sponsor the use of locally sourced ingredients to support
                local farmers and reduce the carbon footprint of food
                transportation.
              </p>
            </div>
          </div>
        </section>
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
