import React, { useState } from "react";
import RestaurantDataService from "../api/restaurant";
import { useSelector } from "react-redux";

const AddReview = (props) => {
  const { id } = useSelector((store) => store.user);
  const { res_id } = props;
  const { canAddReview, setRestaurant, setCanAddReview } = props.other;
  const { name } = useSelector((store) => store.user);
  const [added, setAdded] = useState(false);
  const [reverror, setError] = useState("");
  const [review, setReview] = useState("");

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: name,
      restaurant_id: res_id,
    };

    if (review.trim() === "") {
      setError("*Enter Review");
      return;
    }

    RestaurantDataService.createReview(data)
      .then((response) => {
        setRestaurant((prevState) => {
          prevState.reviews.push(response.data);
          return {
            ...prevState,
          };
        });
        setCanAddReview(false);
        setError("");
        setAdded(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {id ? (
        <button
          type='button'
          className='btn btn-primary'
          data-bs-toggle='modal'
          data-bs-target='#addModal'
          disabled={!canAddReview}>
          {canAddReview ? "Add Review" : "Review Added"}
        </button>
      ) : (
        <button disabled={true} className='btn btn-primary'>
          Login to add Review
        </button>
      )}

      <div
        className='modal fade'
        id='addModal'
        tabIndex='-1'
        aria-labelledby='addModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addModalLabel'>
                Add Review
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
                      value={review}
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
              {added ? (
                <button
                  type='button'
                  data-bs-dismiss='modal'
                  className='btn btn-success'
                  onClick={() => setAdded(false)}>
                  Review Added
                </button>
              ) : (
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={saveReview}>
                  Add Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
