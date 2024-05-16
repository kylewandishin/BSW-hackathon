import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Histogram from '../components/Histogram';
import LineGraph from '../components/LineGraph';
import Chatbot from '../components/Chatbot';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

interface FormData {
  restaurantName: string;
  address: string;
  ingredients: {
    ingredient: string;
    company: string;
    lbsPerWeek: string;
    locallySourced: boolean;
  }[];
  recycle: boolean;
  takeoutContainers: string;
  utensils: string;
  foodWasteDealing: boolean;
  waterUsage: string;
  gasOrElectricStove: boolean;
  powerUsage: string;
  greenEnergy: number;
  veganVegetarianOptions: boolean;
  customersPerWeek: string;
}

const Dashboard: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser: User | null) => {
        if (currentUser) {
          const userDoc = doc(db, 'sustainabilityForms', currentUser.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            setFormData(docSnap.data() as FormData);
          }
        }
      },
    );

    return () => unsubscribe();
  }, []);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
      setNewGoal('');
    }
  };

  const handleToggleGoal = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal,
      ),
    );
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const labels = [
    'Water Usage (Gallons)',
    'Power Usage (kWh)',
    'Green Energy (%)',
    'Customers per Week',
  ];
  const companyValues = formData
    ? [
        parseInt(formData.waterUsage),
        parseInt(formData.powerUsage),
        formData.greenEnergy,
        parseInt(formData.customersPerWeek),
      ]
    : [0, 0, 0, 0];
  const goalValues = [500, 300, 100, 150]; // Recommended sustainable values

  return (
    <div className="pt-[5rem] container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      {/* New Wider Line Graph Section */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Weekly Metrics</h2>
        <div className="w-full h-96">
          <LineGraph
            labels={Array.from({ length: 10 }, (_, i) => `Week ${i + 1}`)}
            dataPoints={companyValues}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-2xl font-bold mb-2">Goals</h2>
          <form onSubmit={handleAddGoal} className="mb-4 flex items-center">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="flex-grow p-2 border rounded mb-2 md:mb-0"
              placeholder="Add a new goal"
            />
            <button
              type="submit"
              className="p-2 bg-green-500 text-white rounded ml-2"
            >
              Add Goal
            </button>
          </form>
          <ul className="text-left">
            {goals.map((goal) => (
              <li key={goal.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => handleToggleGoal(goal.id)}
                  className="mr-2"
                />
                <span
                  className={`flex-1 ${goal.completed ? 'line-through' : ''}`}
                >
                  {goal.text}
                </span>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-2xl font-bold mb-2">Graph</h2>
          <Histogram
            labels={labels}
            companyValues={companyValues}
            goalValues={goalValues}
          />
        </div>
      </div>
      <Chatbot /> {/* Add the Chatbot component */}
    </div>
  );
};

export default Dashboard;
