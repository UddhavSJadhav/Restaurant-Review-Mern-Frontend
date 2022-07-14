import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthDataService from "../api/auth";
import { setUser } from "../features/userSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [signIn, setSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => {
    setErrors({});
    setSignIn(!signIn);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signIn) {
      await AuthDataService.signin(formData)
        .then((res) => {
          localStorage.setItem("profile", JSON.stringify(res.data));
          dispatch(setUser(res.data));
          setErrors({});
          history("/");
        })
        .catch((err) => {
          setErrors(err?.response?.data);
        });
    } else {
      await AuthDataService.signup(formData)
        .then((res) => {
          localStorage.setItem("profile", JSON.stringify(res.data));
          dispatch(setUser(res.data));
          setErrors({});
          history("/");
        })
        .catch((err) => {
          setErrors(err?.response?.data);
        });
    }
    setLoading(false);
  };

  return (
    <div className='container mt-5'>
      <div className='card mx-auto col-lg-6'>
        <div className='card-body'>
          <div className='text-center'>
            <h3>{signIn ? "Sign In" : "Sign Up"}</h3>
          </div>
          <form onSubmit={handleSumbit}>
            {!signIn && (
              <div className='row'>
                <div className='mb-3 col-md-6'>
                  <label className='form-label'>First Name</label>
                  <input
                    type='text'
                    name='firstName'
                    className='form-control'
                    onChange={handleChange}
                  />
                  <span className='text-danger fs-6'>{errors?.firstName}</span>
                </div>
                <div className='mb-3 col-md-6'>
                  <label className='form-label'>Last Name</label>
                  <input
                    type='text'
                    name='lastName'
                    className='form-control'
                    onChange={handleChange}
                  />
                  <span className='text-danger fs-6'>{errors?.lastName}</span>
                </div>
              </div>
            )}
            <div className='mb-3'>
              <label className='form-label'>Email address</label>
              <input
                type='email'
                name='email'
                className='form-control'
                onChange={handleChange}
                placeholder='name@example.com'
              />
              <span className='text-danger fs-6'>{errors?.email}</span>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                name='password'
                className='form-control'
                onChange={handleChange}
              />
              <span className='text-danger fs-6'>{errors?.password}</span>
            </div>
            {!signIn && (
              <div className='mb-3'>
                <label className='form-label'>Confirm Password</label>
                <input
                  type='password'
                  name='confirmPassword'
                  className='form-control'
                  onChange={handleChange}
                />
              </div>
            )}
            <div className='mb-3'>
              <button
                type='submit'
                className='btn btn-primary w-100'
                disabled={loading}>
                {signIn ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </form>
          <hr />
          <div className='text-center'>
            <a href='#' className='link-primary' onClick={handleToggle}>
              {signIn ? "Create new account" : "Already have an account"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
