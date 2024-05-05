import React, { useState,useEffect,useRef } from 'react';
import searchIcon from '../assets/images/search.png';
import xMarkIcon from '../assets/images/x-mark.png';
import loadingIcon from '../assets/images/loading.png';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(event.target.value.trim() !== '');
  };
 const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };
  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const suggestions = [
    'suggestion 1',
    'suggestion 2',
    'suggestion 3',
  ];

  return (
    <div className="relative flex flex-col items-center p-2 bg-white border-2 border-gray-300 rounded-full w-96 " ref={searchBarRef}>
    <div className="flex w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="flex-grow px-4 text-gray-700 leading-tight focus:outline-none rounded-l-full"
        placeholder="Tìm kiếm"
      />
      <div className="absolute inset-y-0 right-10 flex items-center">
          <img src={loadingIcon} alt="Loading" className="w-3 h-3 animate-spin" />
        {showSuggestions && (
          <button onClick={clearSearch}>
            <img src={xMarkIcon} alt="Clear" className="w-3 h-3" />
          </button>
        )}
      </div>
      <div className="flex items-center pl-2">
        <span className="border-l h-6 border-gray-300" />
        <button className="pl-2">
          <img src={searchIcon} alt="Search" className="w-4 h-4" />
        </button>
      </div>
    </div>
    {showSuggestions && (
        <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full z-20 mt-3.5">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center p-2 truncate hover:bg-gray-100 cursor-pointer"
            >
              <img src={searchIcon} alt="Search" className="w-3 h-3 mr-2" />
              {suggestion}
            </div>
          ))}
          <div className="p-2 text-start text-sm text-gray-700 truncate">
            View all results for "{searchTerm}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
