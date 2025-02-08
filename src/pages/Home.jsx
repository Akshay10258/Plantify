import React, { useEffect, useRef } from 'react';
import Card from '../components/Card';
import plant1 from '../assets/image1.png';
import plant2 from '../assets/image2.png';
import plant6 from '../assets/image6.png';
import plant3 from '../assets/image3.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const cards = [
    { title: 'My Garden', description: 'Learn about plants & create your E-Garden', image: plant1, link: '/garden' },
    { title: 'Analytics', description: 'Plant moisture & temperature analytics.', image: plant2, link: '/analytics' },
    { title: 'Disease Detection', description: 'Plant disease identification and diagnosis.', image: plant3, link: '/disease-detection' },
    { title: 'Community', description: 'Community for plant enthusiasts and lovers.', image: plant6, link: '/community' },
  ];

  const mainRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = mainRef.current.querySelectorAll('.opacity-0');
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col" ref={mainRef}>
        <main className="container mx-auto mt-6 flex flex-col justify-center items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-smooch mb-10 text-white text-center opacity-0">
            Grow Smarter with <p className="text-spotify-green">GREENTHUMB</p>
          </h1>
          <div className="text-sm font-mono mb-10 text-white text-center max-w-xl opacity-0">
            At Plantify, we’re here to support farmers with easy-to-use tools for moisture control, disease detection, and a community of plant enthusiasts. Together, we can help your crops thrive and your farm flourish.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {cards.map((card, index) => (
              <Card
                link={card.link}
                key={index}
                title={card.title}
                description={card.description}
                image={card.image}
                className="transform transition-transform duration-300 hover:scale-95"
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
