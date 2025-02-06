import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <nav className="p-4 text-spotify-green w-full z-50 bg-black/30 backdrop-blur-sm font-smooch text-xl">
        <div className="flex justify-between items-center container mx-auto">
          <Link to={'/'}>
            <h1 className="text-4xl font-bold px-6">Plantify</h1>
          </Link>
          <div className="flex justify-between items-center gap-6 text-white">
            <p>About</p>
            <p>Contact</p>
            <button
              onClick={() => { setIsModalOpen(true); setIsSignUp(false); }}
              className="bg-spotify-green text-black font-smooch px-6 py-1.5 rounded-full"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 font-smooch text-xl">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative m-4">
            <button
              className="absolute top-2 right-4 text-black text-4xl "
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
            {isSignUp && (
              <>
                <div className="flex justify-center mb-3">
                  <label className="w-20 h-20 flex items-center justify-center border-2 border-dashed rounded-full cursor-pointer relative overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span className="text-sm text-gray-500">Add</span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 border rounded-2xl mb-3"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-2xl mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded-2xl mb-3"
            />
            <button className="w-full bg-spotify-green text-black p-2 rounded-2xl font-semibold">
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
            <p className="text-center mt-3">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <span
                className="text-spotify-green cursor-pointer"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Login' : 'Sign Up'}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
