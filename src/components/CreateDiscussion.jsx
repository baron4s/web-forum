import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CreateDiscussion({ createThread }) {
  const [title, onTitleChange] = useInput();
  const [category, onCategoryChange] = useInput();
  const [body, onBodyChange] = useInput();
  const navigate = useNavigate();

  const handlerOnSubmit = (event) => {
    event.preventDefault();
    createThread(title, body, category);
    navigate('/');
  };

  return (
    <div className="create-discussion-form">
      <h2>Create Discussion</h2>
      <form onSubmit={handlerOnSubmit}>
        <div className="title-discussion">
          <p>Title</p>
          <input
            type="text"
            value={title}
            name="titleDiscussion"
            placeholder="title discussion"
            onChange={onTitleChange}
          />
        </div>
        <div className="category-discussion">
          <p>Category</p>
          <input
            type="text"
            value={category}
            name="categoryDiscussion"
            placeholder="category"
            onChange={onCategoryChange}
          />
        </div>
        <div className="body-discussion">
          <p>Discussion</p>
          <textarea
            type="text"
            value={body}
            placeholder="Type discussion here"
            onChange={onBodyChange}
          />
        </div>
        <button type="submit" className="btn-create">
          Create
        </button>
      </form>
    </div>
  );
}

CreateDiscussion.propTypes = {
  createThread: PropTypes.func.isRequired,
};

export default CreateDiscussion;
