import React from "react";

const PlantCard = ({ plant, onGetData, onDelete }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-2 flex flex-col items-center font-smooch">
      {/* Image Section */}
      <div className="w-90% aspect-square bg-gray-800 rounded-lg overflow-hidden m-4 border-2 border-white transition-transform transform hover:scale-95">
        <img
          src={plant.image.value}
          alt={plant.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Plant Name */}
      <div className="flex-1 text-center">
        <h3 className="text-3xl font-medium">{plant.name}</h3>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-6 mb-2">
        <button
          onClick={onGetData}
          className="bg-green-500 text-xl text-black px-4 py-2 rounded-full transition-transform transform hover:scale-95"
        >
          Get Data
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-xl text-white px-4 py-2 rounded-full transition-transform transform hover:scale-95"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default PlantCard;
