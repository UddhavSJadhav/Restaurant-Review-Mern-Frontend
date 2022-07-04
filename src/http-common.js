import axios from "axios";

export default axios.create({
  baseURL: "https://restaurantreviewapi.herokuapp.com/api/v1/restaurants",
  headers: {
    "Content-type": "application/json",
  },
});
