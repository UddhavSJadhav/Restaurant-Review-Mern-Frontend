import http from "./http-common";

class AuthDataService {
  signup(formData) {
    return http.post("/auth/signup", formData);
  }

  signin(formData) {
    return http.post("/auth/signin", formData);
  }

  checktoken(userData) {
    return http.post("/auth/checktoken", userData);
  }
}

export default new AuthDataService();
