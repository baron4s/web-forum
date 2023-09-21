import React from 'react';
import PropTypes from 'prop-types';
import { AiFillCloseCircle } from 'react-icons/ai';
import ListDiscussions, { threadsShape } from './ListDiscussions';
import FilterCategory from './FilterCategory';

function DiscussionUsers({
  threads,
  categories,
  onClickCategory,
  onClickCancelCategory,
  selectedCategory,
  upVoteThread,
  downVoteThread,
}) {
  return (
    <div className="discussion-content">
      <h1>Diskusi Tersedia</h1>
      <div className="wrapper-filterthread">
        <FilterCategory
          categories={categories}
          onClickCategory={onClickCategory}
        />
      </div>
      {selectedCategory && (
        <div className="display-categoryfiltered">
          <button type="button" onClick={() => onClickCancelCategory()}>
            <p>{selectedCategory}</p>
            <AiFillCloseCircle className="icon-remove-category-filtered" />
          </button>
        </div>
      )}
      <ListDiscussions
        threads={threads}
        upVoteThread={upVoteThread}
        downVoteThread={downVoteThread}
      />
    </div>
  );
}

DiscussionUsers.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      ...threadsShape,
    }),
  ).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onClickCategory: PropTypes.func.isRequired,
  onClickCancelCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
};

export { threadsShape };

export default DiscussionUsers;
