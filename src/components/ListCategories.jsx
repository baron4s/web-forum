import React from 'react';
import PropTypes from 'prop-types';
import ItemCategory from './ItemCategory';

function ListCategories({ categories, onClickCategory, handleCategoryClick }) {
  console.log(onClickCategory);

  return (
    <div className="list-categories ">
      {categories.map((item) => {
        return (
          <ItemCategory
            key={item.id}
            category={item.category}
            onClickCategory={onClickCategory}
            handleCategoryClick={handleCategoryClick}
          />
        );
      })}
    </div>
  );
}

ListCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClickCategory: PropTypes.func.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};

export default ListCategories;
