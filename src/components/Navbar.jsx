import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return ( 
    <nav className="p-4 text-spotify-green w-full z-50 bg-black/30 backdrop-blur-sm font-smooch text-xl">
      <div className="flex justify-between items-center container mx-auto">
        <Link to={"/"}> 
        <h1 className="text-4xl font-bold px-6">Plantify</h1>
        </Link>
        <div className="flex justify-between items-center gap-6 text-white">
          <p>About</p>
          <p>Contact</p>
          <button className="bg-spotify-green text-black text-bold px-6 py-1.5 rounded-full">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;