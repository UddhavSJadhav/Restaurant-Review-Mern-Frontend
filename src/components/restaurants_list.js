import React, { useEffect, useState } from "react";
import RestaurantDataService from "../api/restaurant";
import { Link } from "react-router-dom";

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisines, setSearchCuisines] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisines = e.target.value;
    setSearchCuisines(searchCuisines);
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((response) => {
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((response) => {
        setCuisines(["All Cuisines"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((response) => {
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisines === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisines, "cuisine");
    }
  };

  return (
    <div>
      <div className='row pb-1'>
        <div className='col-lg-4'>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search by name'
              aria-describedby='button-addon2'
              value={searchName}
              onChange={onChangeSearchName}
            />
            <button
              className='btn btn-outline-secondary'
              type='button'
              id='button-addon2'
              onClick={findByName}>
              Search
            </button>
          </div>
        </div>
        <div className='col-lg-4'>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search by zip'
              aria-describedby='button-addon2'
              value={searchZip}
              onChange={onChangeSearchZip}
            />
            <button
              className='btn btn-outline-secondary'
              type='button'
              id='button-addon2'
              onClick={findByZip}>
              Search
            </button>
          </div>
        </div>
        <div className='col-lg-4'>
          <div className='input-group'>
            <select
              onChange={onChangeSearchCuisine}
              className='form-select'
              id='inputGroupSelect04'>
              {cuisines.map((cuisine) => {
                return (
                  <option value={cuisine} key={cuisine}>
                    {" "}
                    {cuisine.substr(0, 20)}{" "}
                  </option>
                );
              })}
            </select>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByCuisine}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='row g-3'>
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className='col-md-4 mb-3' key={restaurant._id}>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{restaurant.name}</h5>
                  <p className='card-text'>
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className='row'>
                    <Link
                      to={"/restaurants/" + restaurant._id}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'>
                      View Reviews
                    </Link>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href={"https://www.google.com/maps/place/" + address}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'>
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
