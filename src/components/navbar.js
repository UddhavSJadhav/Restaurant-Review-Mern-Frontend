import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/userSlice";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { name } = useSelector((store) => store.user);

  const logout = () => {
    localStorage.removeItem("profile");
    dispatch(clearUser());
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'>
          Restaurant Search and Review
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link to={"/restaurants"} className='nav-link'>
                Restaurants
              </Link>
            </li>
            <li className='nav-item'>
              {name ? (
                <button
                  onClick={logout}
                  className='nav-link btn btn-dark'
                  style={{ cursor: "pointer" }}>
                  Logout - {name.split(" ")[0]}
                </button>
              ) : (
                <Link to={"/login"} className='nav-link'>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
