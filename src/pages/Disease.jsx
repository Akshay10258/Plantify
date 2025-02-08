import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Disease = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plantData, setPlantData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Handle image upload or capture
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setUploadedImage(reader.result); // Store the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock API call to fetch plant data
  const fetchPlantData = async () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate a response from an API
      const mockResponse = {
        diseaseDiagnosis: "Powdery Mildew",
        healthStatus: "Unhealthy",
        cropIdentification: "Tomato Plant",
        suggestions: [
          "Apply fungicide to affected areas.",
          "Ensure proper air circulation around the plant.",
          "Remove and destroy infected leaves.",
        ],
        interactiveFeatures: {
          chatSupport: true,
          videoTutorials: false,
        },
        geolocation: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
        date: "2023-10-15",
      };
      setPlantData(mockResponse);
      setImagePreview(null); // Reset the image preview in the upload section
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-screen bg-black/55 backdrop-blur-md text-white p-8 max-w-none mx-auto font-smooch text-sm mt-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-green-500 text-center font-smooch">
          Plant Disease Detection
        </h1>
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Left Section - Upload Box */}
          <div className="w-full lg:w-1/4">
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
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
              {/* Get Data Button */}
              <button
                onClick={fetchPlantData}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                disabled={!imagePreview || loading}
              >
                Get Data
              </button>
            </div>
          </div>

          {/* Right Section - Plant Data Display */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="text-center text-green-500">Loading...</div>
            ) : plantData ? (
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold mb-6 text-center">Plant Analysis Report</h2>
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Display the uploaded image on the right section with 1:1 aspect ratio */}
                  {uploadedImage && (
                    <div className="w-full md:w-[30%] p-4 flex items-start justify-start">
                      <div className="w-full h-0 pb-[100%] relative bg-gray-700 rounded-lg overflow-hidden border-2 mt-4 ml-4">
                        <img
                          src={uploadedImage}
                          alt="Plant"
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                  {/* Data Section */}
                  <div className="lg:w-2/3 space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-green-500">Disease Diagnosis:</h3>
                      <p className="text-xl">{plantData.diseaseDiagnosis}</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-green-500">Health Status:</h3>
                      <p className="text-xl">{plantData.healthStatus}</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-green-500">Crop Identification:</h3>
                      <p className="text-xl">{plantData.cropIdentification}</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-green-500">Suggestions:</h3>
                      <ul className="list-disc list-inside">
                        {plantData.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-xl">
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-green-500">Interactive Features:</h3>
                      <p className="text-xl">
                        Chat Support: {plantData.interactiveFeatures.chatSupport ? "Available" : "Not Available"}
                      </p>
                      <p className="text-xl">
                        Video Tutorials: {plantData.interactiveFeatures.videoTutorials ? "Available" : "Not Available"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-green-500">Geolocation and Date:</h3>
                      <p className="text-xl">
                        Latitude: {plantData.geolocation.latitude}, Longitude: {plantData.geolocation.longitude}
                      </p>
                      <p className="text-xl">Date: {plantData.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Upload an image to detect plant diseases.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Disease;
