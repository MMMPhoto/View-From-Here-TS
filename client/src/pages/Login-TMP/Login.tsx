import React, {  FC, useState, ChangeEvent, FormEvent } from "react";
import { CardHeader, CardTitle } from "@react-md/card";
import { Form } from "@react-md/form";
import { RemoveRedEyeSVGIcon } from "@react-md/material-icons";
import { loginUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import { Background, FormCard, FormContent, Input,PasswordInput, SubmitButton } from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { saveSavedPhotos, selectSavedPhotos } from "../../store/userSavedPhotosSlice";

interface LoginData {
  email: string,
  password: string,
};

const Login: FC<{setLogin: Function}> = ({setLogin}) => {
  const [userFormData, setUserFormData] = useState<LoginData>({ email: "", password: "" });
  const navigate = useNavigate();

  // Define React Redux functions
  const userSavedPhotos = useSelector(selectSavedPhotos);
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    };

    try {
      const response = await loginUser(userFormData);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      setLogin(true);
      const { token, user } = await response.json();
      console.log(user);
      dispatch(saveSavedPhotos(user.savedPics));
      login(token);
      navigate("/");
    } catch (err) {
      console.error(err);
    };

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <Background>
        <FormCard>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
          </CardHeader>
          <FormContent>
            <Form>
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
              <SubmitButton
                onClick={handleFormSubmit}
              > 
                Login
              </SubmitButton>
            </Form>
            {/* <Card>
              <img
                src="https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_500/v1665696442/View-from-here/1ddfeb86305588512f79432b4a107ec5.jpg"
                className="img-fluid"
                alt="Sample view"
                id="loginFormImg"
              />
            </Card> */}
          </FormContent>
        </FormCard>
    </Background>
  )
};

export default Login;