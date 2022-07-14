import React, { useState } from "react";
import RestaurantDataService from "../api/restaurant";
import { useSelector } from "react-redux";

const Review = (props) => {
  const { index, id, setRestaurant, review, setCanAddReview } =
    props.reviewData;
  const [reviewText, setReviewText] = useState(review?.text);
  const [newReviewText, setNewReviewText] = useState(review?.text);
  const [updated, setUpdated] = useState(false);
  const [reverror, setError] = useState("");
  const { name } = useSelector((store) => store.user);

  const handleInputChange = (event) => {
    setReviewText(event.target.value);
  };

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId)
      .then((response) => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
        setCanAddReview(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateReview = () => {
    var data = {
      text: reviewText,
      name: name,
      restaurant_id: review.res_id,
      review_id: review._id,
    };

    if (reviewText.trim() === "") {
      setError("*Enter Review");
      return;
    }

    RestaurantDataService.updateReview(data)
      .then((response) => {
        setNewReviewText(reviewText);
        setUpdated(true);
        setError("");
      })
      .catch((e) => {
        setReviewText(review.text);
      });
  };

  return (
    <div className='col-lg-4 pb-1' key={index}>
      <div className='card'>
        <div className='card-body'>
          <p className='card-text'>
            {newReviewText}
            <br />
            <strong>User: </strong>
            {review.name}
            <br />
            <strong>Date: </strong>
            {review.date}
          </p>
          {id && id === review.user_id && (
            <div className='row'>
              <button
                type='button'
                className='btn btn-danger col-lg-5 mx-1 mb-1'
                data-bs-toggle='modal'
                data-bs-target='#deleteModal'>
                Delete
              </button>
              <div
                className='modal fade'
                id='deleteModal'
                tabIndex='-1'
                aria-labelledby='deleteModalLabel'
                aria-hidden='true'>
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='deleteModalLabel'>
                        Delete Review
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>Sure, you want to delete?</div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'>
                        Close
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger'
                        data-bs-dismiss='modal'
                        onClick={() => deleteReview(review._id, index)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='btn btn-primary col-lg-5 mx-1 mb-1'
                data-bs-toggle='modal'
                data-bs-target='#editModal'>
                Edit Review
              </button>
              <div
                className='modal fade'
                id='editModal'
                tabIndex='-1'
                aria-labelledby='editModalLabel'
                aria-hidden='true'>
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='editModalLabel'>
                        Edit Review
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                      <div className='submit-form'>
                        <div>
                          <div className='form-group'>
                            <input
                              type='text'
                              className='form-control'
                              id='text'
                              required
                              value={reviewText}
                              onChange={handleInputChange}
                              name='text'
                            />
                            <span className='text-danger fs-6'>{reverror}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'>
                        Close
                      </button>
                      {updated ? (
                        <button
                          type='button'
                          className='btn btn-success'
                          data-bs-dismiss='modal'
                          onClick={() => setUpdated(false)}>
                          Updated
                        </button>
                      ) : (
                        <button
                          type='button'
                          className='btn btn-primary'
                          onClick={updateReview}>
                          Update Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
