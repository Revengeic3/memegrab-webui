import axios, { formToJSON } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CenterContainer from "../../components/CenterContainer";
import { AppContext } from "../../components/Context";
import LoginError from "../../components/LoginForm/components/LoginError";
import LoginForm from "../../components/LoginForm/LoginForm";
import Logo from "../../components/Logo/Logo";

export default function Login() {
  const navigate = useNavigate();

  const [isError, setIsError] = useState();
  const [isInvalid, setIsInvalid] = useState();

  const context = useContext(AppContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = formToJSON(e.target);
    axios
      .post("http://localhost:8080/auth/login", form, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate(context.url.home);
      })
      .catch((response) => {
        console.log(response.data);
        setIsError(true);
      });
  };

  useEffect(() => {
    if (document.cookie.startsWith("token=")) {
      axios
        .get("http://localhost:8080/auth/validate", {
          withCredentials: true,
        })
        .then((response) => {
          navigate(context.url.home);
        })
        .catch((response) => {
          setIsInvalid(true);
        });
    }
  }, []);

  return (
    <section className="bg-gray-300 dark:bg-gray-900">
      {/* {isError || isInvalid ? ( */}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Logo key="logo" size="large" title="Test" />
          <CenterContainer title={"Sign in"}>
            <LoginForm onSubmit={handleLogin} />
            {!isError ? null : <LoginError text="Invalid credentials." />}
            {!isInvalid ? null : <LoginError text="Please log in again." />}
          </CenterContainer>
        </div>
      {/* ) : null} */}
    </section>
  );
}
