import React, {  FC, useState, ChangeEvent, FormEvent, useRef } from "react";
import { CardHeader, CardTitle } from "@react-md/card";
import { Form } from "@react-md/form";
import { RemoveRedEyeSVGIcon } from "@react-md/material-icons";
import { loginUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import { LoginContainer, FormCard, FormContent, Input, PasswordInput, UnstyledLink, SubmitButton } from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { saveSavedPhotos, selectSavedPhotos } from "../../store/userSavedPhotosSlice";

interface LoginData {
  email: string,
  password: string,
};

const Login: FC<{setUser: Function}> = ({setUser}) => {
  const [userFormData, setUserFormData] = useState<LoginData>({ email: "", password: "" });
  const [validationError, setValidationError] = useState<string>("");
  const loginForm = useRef<any>(null);
  const navigate = useNavigate();

  // Define React Redux functions
  const userSavedPhotos = useSelector(selectSavedPhotos);
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
    setValidationError("");
  };

  const handleFormSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formValid = loginForm.current.reportValidity();
    if (formValid) {
      try {
        const response = await loginUser(userFormData);
        if (response.ok) {
          const { token, user } = await response.json();
          setUser(user);
          if (user.savedPics) dispatch(saveSavedPhotos(user.savedPics));
          login(token);
          navigate("/");
        } else {
          setValidationError(response.statusText);
        }
      } catch (err) {
        console.error(err);
      };
    };
  };

  return (
    <LoginContainer>
      <FormCard>
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
        </CardHeader>
        <FormContent>
          <Form ref={loginForm}>
            <Input
              id="email"
              name="email"
              label="Email"
              required
              value={userFormData.email}
              onChange={handleInputChange}
              type="email"
            />
            <PasswordInput
              id="password"
              name="password"
              label="password"
              visibilityIcon={<RemoveRedEyeSVGIcon />}
              required
              value={userFormData.password}
              onChange={handleInputChange}
            />
            <UnstyledLink to="/request-reset">Forgot Password?</UnstyledLink>
            <p style={{ color: "red" }}>{validationError}</p>
            <SubmitButton
              onClick={handleFormSubmit}
            > 
              Login
            </SubmitButton>
          </Form>
        </FormContent>
      </FormCard>
    </LoginContainer>
  )
};

export default Login;
