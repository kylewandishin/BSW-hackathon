import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure you have TailwindCSS installed and configured
import Histogram from '../components/Histogram'; // Import the Histogram component
import LineGraph from '../components/LineGraph'; // Import the LineGraph component
import Chatbot from '../components/Chatbot'; // Import the Chatbot component

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [goals, setGoals] = useState<Array<Goal>>([]);
  const [newGoal, setNewGoal] = useState('');

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

  const labels = ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4', 'Metric 5']; // Replace with actual labels
  const companyValues = [10, 20, 30, 40, 50]; // Replace with actual company values
  const goalValues = [15, 25, 35, 45, 55]; // Replace with actual goal values

  return (
    <div className="pt-[5rem] container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      {/* New Smaller Line Graph Section */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Temp</h2>
        <div className="w-full h-64">
          <LineGraph labels={labels} data={companyValues} />
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
