import React from 'react';

const FormField = ({ labelName, type, name, placeholder, value, handleChange }) => {
  return (
    <div>
      <label htmlFor={name} className="font-semibold text-sm text-gray-700">{labelName}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6469ff]"
      />
    </div>
  );
};

export default FormField;
