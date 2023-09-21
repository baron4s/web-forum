import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineAddCircle } from 'react-icons/md';
import DiscussionUsers from '../components/DiscussionUsers';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import {
  asyncToggleDownVoteThreadProcess,
  asyncToggleUpVoteThreadProcess,
} from '../states/threads/action';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser = null,
  } = useSelector((states) => states);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const handleOnRemoveCategory = () => {
    setSelectedCategory('');
  };

  const onUpVoteThread = (id) => {
    dispatch(asyncToggleUpVoteThreadProcess(id));
  };

  const onDownVoteThread = (id) => {
    dispatch(asyncToggleDownVoteThreadProcess(id));
  };

  const handlerFilterCategory = (category) => {
    console.log('category');
    setSelectedCategory(category);
  };

  const threadList = threads
    .filter((thread) => {
      return thread.category
        .toLowerCase()
        .includes(selectedCategory.toLocaleLowerCase());
    })
    .map((thread) => ({
      ...thread,
      user: users.find(({ id }) => id === thread.ownerId),
      authUser: authUser ? authUser.id : null,
    }));

  const categories = threads.map((thread) => ({
    id: thread.id,
    category: thread.category,
  }));

  return (
    <div className="home-page">
      <div className="content">
        <DiscussionUsers
          threads={threadList}
          categories={categories}
          onClickCategory={handlerFilterCategory}
          onClickCancelCategory={handleOnRemoveCategory}
          selectedCategory={selectedCategory}
          upVoteThread={onUpVoteThread}
          downVoteThread={onDownVoteThread}
        />
        {authUser ? (
          <Link to="/addDiscussion" className="cta-add-discussion">
            <MdOutlineAddCircle className="icon-create-thread" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
