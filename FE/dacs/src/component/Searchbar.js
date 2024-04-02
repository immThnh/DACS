import React, { useState } from 'react';
import searchIcon from '../assets/images/search.png';
import xMarkIcon from '../assets/images/x-mark.png';
import loadingIcon from '../assets/images/loading.png';
const SearchBar = () => {
  return (
    <div className="relative flex items-center p-2 bg-white border-2 border-gray-300 rounded-full">
      <input
        type="text"
        className="flex-grow px-4 text-gray-700 leading-tight focus:outline-none rounded-l-full"
        placeholder="Tìm kiếm"
      />
      <div className="absolute inset-y-0 right-10 flex items-center">
          <img src={loadingIcon} alt="Loading" className="w-3 h-3 animate-spin" />
          <button>
            <img src={xMarkIcon} alt="Clear" className="w-3 h-3" />
          </button>
      </div>
      <div className="flex items-center pl-2">
        <span className="border-l h-6 border-gray-300" />
        <button  className="pl-2">
          <img src={searchIcon} alt="Search" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
