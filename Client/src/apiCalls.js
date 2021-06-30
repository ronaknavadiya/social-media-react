import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILER", payload: error });
    if (error.response.status === 404) {
      window.alert("This Email is not registered...");
    } else {
      if (error.response.status === 400) {
        window.alert("Password doesn't match...");
      }
    }
  }
};

export const registerCall = async (userCredential, dispatch, history) => {
  dispatch({ type: "REGISTER_START" });
  try {
    const res = await axios.post("/auth/register", userCredential);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    history.push("/");
  } catch (error) {
    dispatch({ type: "REGISTER_FAILER", payload: error });
    if (error.response.data.code === 11000) {
      window.alert("You already Have an account, please login...");
    }
  }
};
