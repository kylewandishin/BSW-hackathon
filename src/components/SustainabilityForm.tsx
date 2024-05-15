import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Ingredient {
  ingredient: string;
  company: string;
  lbsPerWeek: string;
  locallySourced: boolean;
}

interface FormData {
  ingredients: Ingredient[];
  recycle: boolean;
  takeoutContainers: string;
  foodWasteDealing: boolean;
  waterUsage: string;
  gasOrElectricStove: boolean;
  powerUsage: string;
  greenEnergy: number;
}

const SustainabilityForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    ingredients: [{ ingredient: '', company: '', lbsPerWeek: '', locallySourced: false }],
    recycle: false,
    takeoutContainers: '',
    foodWasteDealing: false,
    waterUsage: '',
    gasOrElectricStove: false,
    powerUsage: '',
    greenEnergy: 0
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? checked : value;

    if (index !== undefined) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [name]: newValue
      };
      setFormData({ ...formData, ingredients: updatedIngredients });
    } else {
      setFormData({
        ...formData,
        [name]: newValue
      });
    }
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { ingredient: '', company: '', lbsPerWeek: '', locallySourced: false }]
    });
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // TODO:
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Ingredients</legend>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index}>
            <label>
              Ingredient:
              <input
                type="text"
                name="ingredient"
                value={ingredient.ingredient}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <br />

            <label>
              Company:
              <input
                type="text"
                name="company"
                value={ingredient.company}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <br />

            <label>
              Lbs per week:
              <input
                type="text"
                name="lbsPerWeek"
                value={ingredient.lbsPerWeek}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <br />

            <label>
              Locally sourced?:
              <input
                type="checkbox"
                name="locallySourced"
                checked={ingredient.locallySourced}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <br />

            <button type="button" onClick={() => handleRemoveIngredient(index)}>
              Remove Ingredient
            </button>
            <br /><br />
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </fieldset>
      <br />

      <label>
        Do you recycle?:
        <input
          type="checkbox"
          name="recycle"
          checked={formData.recycle}
          onChange={handleChange}
        />
      </label>
      <br />

            <label>
        What takeout containers are made out of?:
        <select
          name="takeoutContainers"
          value={formData.takeoutContainers}
          onChange={handleChange}
        >
          <option value="">Select packaging type</option>
          <option value="Plastic">Plastic</option>
          <option value="Foam">Foam</option>
          <option value="Compostable">Compostable</option>
          <option value="Recyclable">Recyclable</option>
          <option value="Biodegradable">Biodegradable</option>
        </select>
      </label>
      <br />


      <label>
        Do you donate food waste and/or compost?:
        <input
          type="checkbox"
          name="foodWasteDealing"
          checked={formData.foodWasteDealing}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        How much water do you use a month (Gallons)?:
        <input
          type="text"
          name="waterUsage"
          value={formData.waterUsage}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Gas stove?:
        <input
          type="checkbox"
          name="gasOrElectricStove"
          checked={formData.gasOrElectricStove}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        How much power do you use a month (kilowatt-hours)?:
        <input
          type="text"
          name="powerUsage"
          value={formData.powerUsage}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        What percent of your energy comes from renewables (0-100%)?:
        <input
          type="number"
          name="greenEnergy"
          value={formData.greenEnergy}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SustainabilityForm;
