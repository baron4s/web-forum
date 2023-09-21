import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/Home';
import DetailPage from './pages/DetailPage';
import AddDiscussionPage from './pages/AddDiscussionPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import { asyncPreloadProcess } from './states/preLoad.js/action';
import { asyncUnsetAuthUserProcess } from './states/auth/action';
import PageLeaderboard from './pages/PageLeaderboard';
import Loading from './components/Loading';

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );
  const [showNavbar, setShowNavbar] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(asyncPreloadProcess());

    if (location.pathname === '/login' || location.pathname === '/register') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [dispatch, location]);

  const logOut = () => {
    dispatch(asyncUnsetAuthUserProcess());
  };

  return (
    <>
      <Loading />
      <header>
        {showNavbar && <Navbar user={authUser} logOut={logOut} />}
      </header>
      <main>
        {isPreload ? null : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/addDiscussion" element={<AddDiscussionPage />} />
            <Route path="/leaderbord" element={<PageLeaderboard />} />
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
