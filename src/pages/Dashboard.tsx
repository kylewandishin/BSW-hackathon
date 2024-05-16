import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Histogram from '../components/Histogram';
import LineGraph from '../components/LineGraph';
import CircularProgressBar from '../components/circularprogressbar.tsx';
import Chatbot from '../components/Chatbot';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

interface Ingredient {
  ingredient: string;
  company: string;
  lbsPerWeek: string;
  locallySourced: boolean;
}

interface FormData {
  restaurantName: string;
  address: string;
  ingredients: Array<Ingredient>;
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
  sustainabilityScore?: number;
}

const Dashboard: React.FC = () => {
  const [goals, setGoals] = useState<Array<Goal>>([]);
  const [newGoal, setNewGoal] = useState('');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [recommendations, setRecommendations] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser: User | null) => {
        if (currentUser) {
          const userDoc = doc(db, 'sustainabilityForm', currentUser.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const data = docSnap.data() as FormData;
            setFormData(data);
            await sendFormDataToServer(data);
          } else {
            console.log('No form data found for user.');
          }
        }
      },
    );

    return () => unsubscribe();
  }, []);

  const sendFormDataToServer = async (data: FormData) => {
    try {
      const res = await fetch('http://localhost:5001/call-bedrock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Give me recommendations to be more sustainable given data about my restaurant: ${JSON.stringify(data)}`,
        }),
      });
      const responseData = await res.json();
      setRecommendations(responseData.answer);
    } catch (error) {
      console.error('Error sending form data to server:', error);
    }
  };

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

  // Mock data for line graph
  const lineGraphDataPoints = [65, 65, 66, 70, 70, 70, 74, 70, 73, 72];

  return (
    <div className="pt-[5rem] container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <div className="mt-4 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Recommendations</h2>
        <p>{recommendations}</p>
      </div>
      {/* New Wider Line Graph Section */}
      <div className="mb-4 flex flex-wrap">
        <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Weekly Metrics
          </h2>
          <div className="w-full h-96">
            <LineGraph
              labels={Array.from({ length: 10 }, (_, i) => `Week ${i + 1}`)}
              dataPoints={lineGraphDataPoints}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Sustainability Score
          </h2>
          <CircularProgressBar
            value={formData?.sustainabilityScore || 0}
            text={`${formData?.sustainabilityScore || 0}%`}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
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
        <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Graph</h2>
          <Histogram
            labels={labels}
            companyValues={companyValues}
            goalValues={goalValues}
          />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <Chatbot formData={formData} /> {/* Pass formData to Chatbot */}
      </div>
    </div>
  );
};

export default Dashboard;
