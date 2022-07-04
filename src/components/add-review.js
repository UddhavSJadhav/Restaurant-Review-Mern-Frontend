import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams } from "react-router-dom";

const AddReview = (props) => {
  let initialReviewState = "";

  let editing = false;

  if (props.editReview && props.editReview.text) {
    editing = true;
    initialReviewState = props.editReview.text;
  }

  const { id } = useParams();
  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: id,
    };

    if (editing) {
      data.review_id = props.editReview._id;
      console.log(data);
      RestaurantDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
          props.setEditReview(null);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
          props.setEditReview(null);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {props.user ? (
        <div className='submit-form'>
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link
                to={"/restaurants/" + id}
                className='btn btn-success'
                onClick={() => props.setEditReview(null)}>
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className='form-group'>
                <label htmlFor='description'>
                  {editing ? "Edit" : "Create"} Review
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='text'
                  required
                  value={review}
                  onChange={handleInputChange}
                  name='text'
                />
              </div>
              <button onClick={saveReview} className='btn btn-success'>
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
};

export default AddReview;
