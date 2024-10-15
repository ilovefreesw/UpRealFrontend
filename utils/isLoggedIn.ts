import axios from "axios";
import { parseCookies } from "./parseCookies";

const isLoggedIn = async () => {
  if (typeof window == "object") {
    const parsedCookies = parseCookies(document.cookie);

    if (!parsedCookies["login_token"]) {
      return;
    }

    const storedState = localStorage.getItem("loginVerified");

    if (storedState && storedState == "1") {
      return true;
    }

    const response = await axios.post(
      "https://backend.upreal.us/verifyLogin",
      {
        token: parsedCookies["login_token"],
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    if (!response.data.error) {
      localStorage.setItem("loginVerified", "1");
    } else {
      localStorage.setItem("loginVerified", "0");
    }

    return !response.data.error;
  }
};

export default isLoggedIn;
