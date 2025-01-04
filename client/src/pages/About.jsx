import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">About Us</h1>
        <p className="text-gray-700 leading-relaxed mb-6">
          Welcome to our real estate platform! We specialize in connecting property buyers, renters, and sellers to fulfill their real estate needs effortlessly. Whether you're looking to buy your dream home, find a rental property, or list your property for sale or rent, we've got you covered.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Buying Section */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Buy Properties</h2>
            <p className="text-gray-600">
              Explore a wide range of properties for sale, from luxurious villas to affordable apartments. Find the perfect property that suits your needs and budget.
            </p>
          </div>

          {/* Renting Section */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Rent Properties</h2>
            <p className="text-gray-600">
              Discover rental properties in prime locations. Whether you need a short-term rental or a long-term lease, we have options for you.
            </p>
          </div>

          {/* Adding Property Section */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">List Your Property</h2>
            <p className="text-gray-600">
              Have a property to sell or rent? List it on our platform and reach a wide audience of potential buyers and renters.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-700">
            Our mission is to make real estate transactions seamless and hassle-free. We pride ourselves on providing reliable services and a user-friendly platform for all your property needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
