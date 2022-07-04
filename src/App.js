import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants_list";
import Login from "./components/login";
import AddReview from "./components/add-review";

function App() {
  const [user, setUser] = React.useState(null);
  const [editReview, setEditReview] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <BrowserRouter>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='/'>
              Restaurant Reviews
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
                  {user ? (
                    <button
                      onClick={logout}
                      className='nav-link btn btn-dark'
                      style={{ cursor: "pointer" }}>
                      Logout
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
        <div className='container mt-3'>
          <Routes>
            <Route path='/' element={<RestaurantsList />} exact />
            <Route path='/restaurants' element={<RestaurantsList />} exact />
            <Route path='/login' element={<Login login={login} />} exact />
            <Route
              path='/restaurants/:id/addreview'
              element={
                <AddReview
                  user={user}
                  editReview={editReview}
                  setEditReview={setEditReview}
                />
              }
              exact
            />
            <Route
              path='/restaurants/:id/editreview'
              element={
                <AddReview
                  user={user}
                  editReview={editReview}
                  setEditReview={setEditReview}
                />
              }
              exact
            />
            <Route
              path='/restaurants/:id'
              element={<Restaurant user={user} setEditReview={setEditReview} />}
              exact
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
