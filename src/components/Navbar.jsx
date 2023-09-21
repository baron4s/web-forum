import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown, MdLeaderboard } from 'react-icons/md';
import { AiOutlineLogout, AiOutlineLogin, AiFillHome } from 'react-icons/ai';
import NavbarContainer from './styled/NavbarContainer';

function Navbar({ user, logOut }) {
  const authUser = user;
  const [dropDownToggleAuth, setDropDownToggleAuth] = useState(false);
  const toggleMenuAuth = useRef();

  useEffect(() => {
    const handleToggleAuth = (event) => {
      if (toggleMenuAuth.current) {
        if (!toggleMenuAuth.current.contains(event.target)) {
          setDropDownToggleAuth(false);
        }
      }
    };

    document.addEventListener('mousedown', handleToggleAuth);

    return () => {
      document.addEventListener('mousedown', handleToggleAuth);
    };
  }, []);

  return (
    <NavbarContainer className="navbar">
      <span className="navbar__title">
        <Link to="/"> SkuyForum</Link>
      </span>
      <div className="wrapper-menu">
        <nav className="nav-lists">
          <div className="nav-item">
            <Link to="/">
              <AiFillHome className="icon-home" />
              Home
            </Link>
          </div>
          <div className="nav-item">
            <Link to="/leaderbord">
              <MdLeaderboard className="icon-leaderboard" />
              Leaderboard
            </Link>
          </div>
        </nav>
        {authUser ? (
          <div
            className="profile"
            onClick={() => {
              setDropDownToggleAuth(!dropDownToggleAuth);
            }}
            role="presentation"
            ref={toggleMenuAuth}
          >
            <div className="profile-avatar">
              <img
                className="avatar-user-image"
                src={user.avatar}
                alt="avatar"
              />
            </div>
            <MdOutlineKeyboardArrowDown className="arrow-down-icon" />
            <div className={`logout ${dropDownToggleAuth ? 'show' : 'hidden'}`}>
              <button
                className="btn-userLogout"
                type="button"
                onClick={() => logOut()}
              >
                <AiOutlineLogout className="icon-logout" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="logged">
            <Link to="/login" className="cta-logged">
              <AiOutlineLogin className="icon-logged " />
              Login
            </Link>
          </div>
        )}
      </div>
    </NavbarContainer>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  logOut: PropTypes.func.isRequired,
};

export default Navbar;
