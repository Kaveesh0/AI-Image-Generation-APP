import React from 'react';

const Card = ({ _id, name, prompt, imageUrl }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img className="w-full h-auto object-cover rounded-xl" src={imageUrl} alt={name} />
      <div className="group-hover:flex absolute inset-0 justify-center items-center bg-black bg-opacity-50 rounded-xl">
        <p className="text-white text-sm font-bold text-center">{prompt}</p>
      </div>
    </div>
  );
};

export default Card;
