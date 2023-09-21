import React from 'react';
import PropTypes from 'prop-types';

function ItemCategory({ category, onClickCategory, handleCategoryClick }) {
  const handleClick = () => {
    onClickCategory(category);
    handleCategoryClick();
  };

  return (
    <button
      type="button"
      className="item-category"
      onClick={() => handleClick()}
    >
      {category}
    </button>
  );
}

ItemCategory.propTypes = {
  category: PropTypes.string.isRequired,
  onClickCategory: PropTypes.func.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};

export default ItemCategory;
