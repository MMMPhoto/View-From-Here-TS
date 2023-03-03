import React, {  FC, useState, ChangeEvent, FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardActions } from "@react-md/card";
import { Form, TextField, Password, useChecked } from "@react-md/form";
import { Button } from "@react-md/button";
import { loginUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import { FormCard, FormContent } from "./styles";
import { Container } from "../../styles/styles";
// import "./login.css";
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
    <section id="background">
      <Container>
        <FormCard>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
          </CardHeader>
          <FormContent>
            <Form>
              <TextField
                id="email"
                name="email"
                label="Email"
                value={userFormData.email}
                onChange={handleInputChange}
                type="email"
              />
              <Password
                id="password"
                name="password"
                label="password"
                value={userFormData.password}
                onChange={handleInputChange}
              />
              <Button
                onClick={handleFormSubmit}
              > 
                Login
              </Button>
            </Form>
            <Card>
              <img
                src="https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_500/v1665696442/View-from-here/1ddfeb86305588512f79432b4a107ec5.jpg"
                className="img-fluid"
                alt="Sample view"
                id="loginFormImg"
              />
            </Card>
          </FormContent>
        </FormCard>
      </Container>
    </section>
  )
};

export default Login;
