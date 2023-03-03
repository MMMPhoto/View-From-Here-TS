import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardActions } from "@react-md/card";
import { Form, TextField, Password, useChecked } from "@react-md/form";
import { Button } from "@react-md/button";
import { createNewUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import { FormCard, FormContent } from "./styles";
import { Container } from "../../styles/styles";
import { User } from '../../types/User';
// import "./signup.css";

interface SignupData {
    userName: string,
    email: string,
    password: string,
};

const SignUp: FC<{}> = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState<SignupData>({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
    }

    try {
      const response = await createNewUser(userFormData);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const { token, user } = await response.json();
      console.log(user);
      login(token);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      userName: "",
      email: "",
      password: "",
    });
  };

  return (
    <section id="background">
      <Container>
        <FormCard>
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
          </CardHeader>
          <FormContent>
            <Form>
              <TextField
                id="username"
                name="userName"
                label="User Name"
                value={userFormData.userName}
                onChange={handleInputChange}
                type="text"
              />
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
                Sign Up
              </Button>
            </Form>
            <Card>
              <img
                src="https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_500/v1665696442/View-from-here/1ddfeb86305588512f79432b4a107ec5.jpg"
                className="img-fluid"
                alt="Sample view"
                id="signupFormImg"
              />
            </Card>
          </FormContent>
        </FormCard>
      </Container>
    </section>
  )
};

export default SignUp;
