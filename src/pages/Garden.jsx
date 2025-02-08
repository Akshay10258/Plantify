import React, { useState } from "react";
import PlantCard from "../components/PlantCard";
import PlantInfo from "../components/PlantInfo";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Garden = () => {
  const [plantQuery, setPlantQuery] = useState("");
  const [plants, setPlants] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Handle image upload or capture
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch plant data (using dummy data for now)
  const fetchPlantData = async () => {
    const newPlant = {
      id: Date.now(), // Unique ID for each plant
      name: "Money Plant",
      image: {
        value: "https://plant-id.ams3.cdn.digitaloceanspaces.com/knowledge_base/wikidata/a2e/a2e50db3e546224552e430fd73906104327e93ef.jpg",
      },
      edible_parts: null,
      watering: null,
      best_light_condition: "This plant thrives in full sun to partial shade. It needs at least six hours of direct sunlight each day for optimal growth. If grown indoors, placing it near a south-facing window is ideal. However, it can tolerate some shade, especially in hotter climates where too much direct sunlight can cause stress.",
      best_soil_type: "The ideal soil for this plant is well-draining and rich in organic matter. A loamy soil with a slightly acidic to neutral pH is best. Adding compost or well-rotted manure can improve soil fertility and structure. Avoid heavy clay soils that retain too much water, as this can lead to root rot.",
      common_uses: "Common uses for this plant include ornamental purposes in gardens and landscapes. It is also used in floral arrangements and bouquets due to its attractive appearance. Additionally, some parts of the plant are used in traditional medicine, although caution is advised due to its toxicity.",
      cultural_significance: "This plant holds cultural significance in various regions. It is often associated with love and beauty in many cultures. In some traditions, it is used in ceremonies and celebrations. Its presence in gardens and public spaces often symbolizes peace and tranquility.",
      toxicity: "This plant is toxic to both humans and animals. Ingesting any part of the plant can cause symptoms such as nausea, vomiting, and diarrhea. Pets, especially cats and dogs, should be kept away from it to prevent accidental poisoning. Always wear gloves when handling the plant to avoid skin irritation.",
      best_watering: "Watering should be done consistently but not excessively. The soil should be kept moist but not waterlogged. It's best to water in the morning so the plant has time to absorb moisture before the heat of the day. During the growing season, regular watering is crucial, but in the winter, the frequency can be reduced. Always check the top inch of soil; if it feels dry, it's time to water."
    };
    setPlants([...plants, newPlant]);
  };

  // Handle delete plant
  const handleDeletePlant = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
  };

  // Handle get data
  const handleGetData = (plant) => {
    setSelectedPlant(plant);
  };

  // Handle close pop-up
  const handleClosePopup = () => {
    setSelectedPlant(null);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black/55 backdrop-blur-md text-white p-8 font-mono text-sm mt-6 overflow-hidden w-full">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-green-500 text-center font-smooch">
        E-Garden
      </h1>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Left Section - Upload Box */}
        <div className="w-full lg:w-1/4">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-full">
            <div className="mb-4">
              <div className="relative w-full pt-[100%] bg-gray-800 rounded-lg overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                ) : (
                  <label className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-400 cursor-pointer">
                    <span>Upload / Capture</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
            <input
              type="text"
              placeholder="Search plant name..."
              className="w-full bg-gray-800 text-white p-2 rounded-lg focus:outline-none font-mono text-xs md:text-sm"
              value={plantQuery}
              onChange={(e) => setPlantQuery(e.target.value)}
            />
            <button
              onClick={fetchPlantData}
              className="w-full bg-green-500 text-black px-4 py-2 rounded-full mt-4 font-mono text-sm"
            >
              ADD
            </button>
          </div>
        </div>

        {/* Right Section - Plant Cards */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plants.length > 0 ? (
            plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onGetData={() => handleGetData(plant)}
                onDelete={() => handleDeletePlant(plant.id)}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 min-h-[400px] flex items-center justify-center col-span-full">
              No plants added yet. Upload an image or search for a plant.
            </div>
          )}
        </div>
      </div>

      {/* Plant Info Pop-up */}
      {selectedPlant && <PlantInfo plant={selectedPlant} onClose={handleClosePopup} />}
    </div>
    <Footer/>
    </>
  );
};

export default Garden;
