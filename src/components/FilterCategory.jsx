import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineCaretDown } from 'react-icons/ai';
import ListCategories from './ListCategories';

function FilterCategory({ categories, onClickCategory }) {
  const [toggleFilter, setToggleFilter] = useState(false);
  const menuFilter = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuFilter.current && !menuFilter.current.contains(e.target)) {
        setToggleFilter(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.addEventListener('mousedown', handler);
    };
  }, []);

  const handleCategoryClick = () => {
    setToggleFilter(() => !toggleFilter);
  };

  return (
    <div ref={menuFilter}>
      <div>
        <button
          type="button"
          className="toggle-category"
          onClick={() => setToggleFilter(!toggleFilter)}
        >
          Category
          <AiOutlineCaretDown style={{ marginLeft: '6px' }} />
        </button>
      </div>
      {toggleFilter ? (
        <ListCategories
          categories={categories}
          onClickCategory={onClickCategory}
          handleCategoryClick={handleCategoryClick}
        />
      ) : null}
    </div>
  );
}

FilterCategory.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

export default FilterCategory;
