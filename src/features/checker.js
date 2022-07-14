import AuthDataService from "../api/auth";
import { setUser } from "./userSlice";

export const checkLocalToken = async (dispatch) => {
  const localProfile = JSON.parse(localStorage.getItem("profile"));

  if (localProfile?.token) {
    await AuthDataService.checktoken({ token: localProfile?.token })
      .then((res) => {
        const { id, name, email, token } = res.data;
        dispatch(setUser({ result: { _id: id, name, email }, token }));
      })
      .catch((err) => {
        localStorage.removeItem("profile");
      });
  }
};
