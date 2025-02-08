import React from "react";

const PlantInfo = ({ plant, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md z-50 p-5 lg:p-16 custom-scrollbar">
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden w-full h-full max-w-7xl max-h-5/6 m-4 flex flex-col md:flex-row relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-white text-2xl font-bold"
        >
          &times;
        </button>

        {/* Left Section - Image */}
        <div className="w-full md:w-[30%] p-4 flex items-start justify-start">
          <div className="w-full h-0 pb-[100%] relative bg-gray-700 rounded-lg overflow-hidden border-2 mt-4 ml-4">
            <img
              src={plant.image.value}
              alt={plant.name}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right Section - Plant Data */}
        <div className="w-full md:w-[70%] p-6 overflow-auto text-white font-smooch">
          <h2 className="text-4xl font-bold mb-4">{plant.name}</h2>
          <p className="text-xl mb-2">
            <strong className="text-spotify-green">Best Light Condition:</strong> {plant.best_light_condition}
          </p>
          <p className="text-xl mb-2">
            <strong className="text-spotify-green">Best Soil Type:</strong> {plant.best_soil_type}
          </p>
          <p className="text-xl mb-2">
            <strong className="text-spotify-green">Common Uses:</strong> {plant.common_uses}
          </p>
          <p className="text-xl mb-2">
            <strong className="text-spotify-green">Cultural Significance:</strong> {plant.cultural_significance}
          </p>
          <p className="text-xl mb-2">
            <strong className="text-spotify-green">Toxicity:</strong> {plant.toxicity}
          </p>
          <p className="text-xl mb-2">
            <strong className="text-spotify-green">Best Watering:</strong> {plant.best_watering}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlantInfo;