import React from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search by title discussion" />
      <FiSearch className="search-bar__icon-search" />
    </div>
  );
}

export default SearchBar;
