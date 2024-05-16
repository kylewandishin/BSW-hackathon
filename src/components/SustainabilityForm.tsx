import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaTrashAlt, FaPlus, FaRecycle } from 'react-icons/fa';
import { db, auth } from '../firebase'; // Ensure you import auth
import { collection, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface Ingredient {
  ingredient: string;
  company: string;
  lbsPerWeek: string;
  locallySourced: boolean;
}
//TODO: update past data
interface FormData {
  restaurantName: string;
  address: string;
  ingredients: Ingredient[];
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
  userId?: string; // Added userId to the form data
}

const SustainabilityForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    restaurantName: '',
    address: '',
    ingredients: [
      { ingredient: '', company: '', lbsPerWeek: '', locallySourced: false },
    ],
    recycle: false,
    takeoutContainers: '',
    utensils: '',
    foodWasteDealing: false,
    waterUsage: '',
    gasOrElectricStove: false,
    powerUsage: '',
    greenEnergy: 0,
    veganVegetarianOptions: false,
    customersPerWeek: '',
  });

  const [user, setUser] = useState<any>(null);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    }
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? checked : value;

    if (index !== undefined) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [name]: newValue,
      };
      setFormData({ ...formData, ingredients: updatedIngredients });
    } else {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { ingredient: '', company: '', lbsPerWeek: '', locallySourced: false },
      ],
    });
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = formData.ingredients.filter(
      (_, i) => i !== index,
    );
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      try {
        const userDoc = doc(collection(db, 'sustainabilityForms'), user.uid);
        await setDoc(userDoc, { ...formData, userId: user.uid });
        alert('Data saved successfully');
        console.log('formData:', JSON.stringify(formData, null, 2));
      } catch (error) {
        console.error('Error saving data:', error);
        alert('Failed to save data');
      }
    } else {
      alert('You must be logged in to submit the form');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block mb-2">
          Restaurant Name
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Address
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </label>
      </div>

      <fieldset className="mb-6">
        <legend className="text-2xl font-semibold mb-4">Ingredients</legend>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg">
            <label className="block mb-2">
              Ingredient
              <input
                type="text"
                name="ingredient"
                value={ingredient.ingredient}
                onChange={(e) => handleChange(e, index)}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </label>

            <label className="block mb-2">
              Company
              <input
                type="text"
                name="company"
                value={ingredient.company}
                onChange={(e) => handleChange(e, index)}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </label>

            <label className="block mb-2">
              Lbs per week
              <input
                type="text"
                name="lbsPerWeek"
                value={ingredient.lbsPerWeek}
                onChange={(e) => handleChange(e, index)}
                className="w-full p-2 border rounded-lg mt-1"
              />
            </label>

            <label className="block mb-2">
              Locally sourced?
              <input
                type="checkbox"
                name="locallySourced"
                checked={ingredient.locallySourced}
                onChange={(e) => handleChange(e, index)}
                className="ml-2"
              />
            </label>

            <button
              type="button"
              onClick={() => handleRemoveIngredient(index)}
              className="mt-2 p-2 bg-red-500 text-white rounded-lg flex items-center"
            >
              <FaTrashAlt className="mr-1" /> Remove Ingredient
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className="p-2 bg-blue-500 text-white rounded-lg flex items-center"
        >
          <FaPlus className="mr-1" /> Add Ingredient
        </button>
      </fieldset>

      <div className="mb-4">
        <label className="block mb-2 flex items-center">
          Do you recycle?
          <input
            type="checkbox"
            name="recycle"
            checked={formData.recycle}
            onChange={handleChange}
            className="ml-2"
          />
          <FaRecycle className="ml-2 text-green-500" />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          What takeout containers are made out of?
          <select
            name="takeoutContainers"
            value={formData.takeoutContainers}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select packaging type</option>
            <option value="Plastic">Plastic</option>
            <option value="Foam">Foam</option>
            <option value="Compostable">Compostable</option>
            <option value="Recyclable">Recyclable</option>
            <option value="Biodegradable">Biodegradable</option>
          </select>
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          What utensils are used?
          <select
            name="utensils"
            value={formData.utensils}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select utensil type</option>
            <option value="Plastic">Plastic</option>
            <option value="Compostable">Compostable</option>
          </select>
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Do you donate food waste and/or compost?
          <input
            type="checkbox"
            name="foodWasteDealing"
            checked={formData.foodWasteDealing}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          How much water do you use a month (Gallons)?
          <input
            type="text"
            name="waterUsage"
            value={formData.waterUsage}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Gas stove?
          <input
            type="checkbox"
            name="gasOrElectricStove"
            checked={formData.gasOrElectricStove}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          How much power do you use a month (kilowatt-hours)?
          <input
            type="text"
            name="powerUsage"
            value={formData.powerUsage}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          What percent of your energy comes from renewables (0-100%)?
          <input
            type="number"
            name="greenEnergy"
            value={formData.greenEnergy}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border rounded-lg"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Vegan/Vegetarian options?
          <input
            type="checkbox"
            name="veganVegetarianOptions"
            checked={formData.veganVegetarianOptions}
            onChange={handleChange}
            className="ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Customers/week
          <input
            type="text"
            name="customersPerWeek"
            value={formData.customersPerWeek}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </label>
      </div>

      <button
        type="submit"
        className="p-2 bg-green-500 text-white rounded-lg transition-transform transform hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
};

export default SustainabilityForm;
