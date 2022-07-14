import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants_list";
import AddReview from "./components/add-review";
import SignUp from "./components/signup";
import Navbar from "./components/navbar";
import { checkLocalToken } from "./features/checker";
import { useDispatch } from "react-redux";

function App() {
  const [editReview, setEditReview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    checkLocalToken(dispatch);
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className='container mt-3'>
          <Routes>
            <Route path='/' element={<RestaurantsList />} exact />
            <Route path='/restaurants' element={<RestaurantsList />} exact />
            <Route path='/login' element={<SignUp />} exact />
            <Route
              path='/restaurants/:res_id/addreview'
              element={
                <AddReview
                  editReview={editReview}
                  setEditReview={setEditReview}
                />
              }
              exact
            />
            <Route
              path='/restaurants/:res_id/editreview'
              element={
                <AddReview
                  editReview={editReview}
                  setEditReview={setEditReview}
                />
              }
              exact
            />
            <Route
              path='/restaurants/:res_id'
              element={<Restaurant setEditReview={setEditReview} />}
              exact
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
