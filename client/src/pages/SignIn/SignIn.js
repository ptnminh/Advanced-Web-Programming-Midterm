import React, { useState } from "react";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import { use100vh } from "react-div-100vh";
import { Link } from "react-router-dom";
import TextInput from "../../components/TextInput";
import { useAuth } from "../../hooks/useAuth";
import { EMAIL_REGEX } from "../../constants";
import { authServices } from "../../services/AuthServices";
import { errorToast } from "../../utils/toast";

const SignIn = () => {
  const initalState = {
    email: "",
    password: "",
  };
  const [userAccount, setUserAccount] = useState(initalState);
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidData = validateData(userAccount);
    if (isValidData === 1) {
      const response = await authServices.login(userAccount);
      if (response.status === true) {
        login(response.data.user, response.data.token);
      } else {
        return errorToast(response.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateData = (userAccount) => {
    let result = 1;
    if (userAccount.email === "") {
      return errorToast("Email không được để trống");
    }
    if (EMAIL_REGEX.test(userAccount.email) === false) {
      return errorToast("Email không hợp lệ");
    }
    if (userAccount.password === "") {
      return errorToast("Mật khẩu không được để trống");
    }
    return result;
  };

  const heightWindow = use100vh();
  return (
    <div className={styles.login} style={{ minHeight: heightWindow }}>
      <div className={styles.wrapper}>
        <form>
          <div className={cn("h2", styles.title)}>Sign in</div>
          <div className={styles.body}>
            <TextInput
              className={styles.field}
              name="email"
              type="email"
              placeholder="Your email"
              required
              icon="mail"
              onChange={handleChange}
              value={userAccount.email}
            />
            <TextInput
              className={styles.field}
              name="password"
              type="password"
              placeholder="Password"
              required
              icon="lock"
              onChange={handleChange}
              value={userAccount.password}
            />
            <button
              onClick={handleSubmit}
              className={cn("button", styles.button)}
            >
              Sign in
            </button>
            <div className={styles.note}>
              This website was developed in Advanced Web Programming Course.
            </div>
            <div className={styles.info}>
              Don’t have an account?{" "}
              <Link className={styles.link} to="../sign-up">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
