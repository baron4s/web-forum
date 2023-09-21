import React from 'react';
import { useDispatch } from 'react-redux';
import CreateDiscussion from '../components/CreateDiscussion';
import { asyncCreateThreadProcess } from '../states/threads/action';

function AddDiscussionPage() {
  const dispatch = useDispatch();

  const onCreateThread = (title, body, category) => {
    dispatch(asyncCreateThreadProcess(title, body, category));
  };

  return (
    <div className="create-discussion-page">
      <CreateDiscussion createThread={onCreateThread} />
    </div>
  );
}

export default AddDiscussionPage;
