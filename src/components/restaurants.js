import React, { useState, useEffect } from "react";
import RestaurantDataService from "../api/restaurant";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Review from "./review";
import AddReview from "./add-review";

const Restaurant = (props) => {
  const { id } = useSelector((store) => store.user);
  const { res_id } = useParams();
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);
  const [canAddReview, setCanAddReview] = useState(true);

  useEffect(() => {
    getRestaurant(res_id);
  }, [res_id]);

  useEffect(() => {
    checkUserHasReview();
  }, [checkUserHasReview]);

  function checkUserHasReview() {
    if (restaurant.reviews.length > 0) {
      const userHasReview = restaurant.reviews.filter((review) => {
        return review.user_id === id;
      });
      if (userHasReview.length > 0) setCanAddReview(false);
    }
  }

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {restaurant ? (
        <div key={restaurant.id}>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>
            {restaurant.cuisine}
            <br />
            <strong>Address: </strong>
            {restaurant.address.building} {restaurant.address.street},{" "}
            {restaurant.address.zipcode}
          </p>
          <AddReview
            res_id={res_id}
            other={{ canAddReview, setRestaurant, setCanAddReview }}
          />
          <h4> Reviews </h4>
          <div className='row'>
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <Review
                    reviewData={{
                      review,
                      index,
                      id,
                      setRestaurant,
                      setCanAddReview,
                    }}
                    key={index}
                  />
                );
              })
            ) : (
              <div className='col-sm-4'>
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
