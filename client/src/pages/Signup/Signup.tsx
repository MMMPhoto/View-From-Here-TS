import { FC, useState, ChangeEvent, FormEvent, useRef } from "react";
import { CardHeader, CardTitle } from "@react-md/card";
import { Form } from "@react-md/form";
import { RemoveRedEyeSVGIcon } from "@react-md/material-icons";
import { createNewUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import { SignupContainer, FormCard, FormContent, Input,PasswordInput, SubmitButton } from "./styles";

interface SignupData {
    userName: string,
    email: string,
    password: string,
};

const SignUp: FC<{setUser: Function}> = ({setUser}) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState<SignupData>({
    userName: "",
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState<string>("");
  const signupForm = useRef<any>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
    setValidationError("");
  };

  const handleFormSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formValid = signupForm.current.reportValidity();
    if (formValid) {
      try {
        const response = await createNewUser(userFormData);
        if (response.ok) {
          const { token, user } = await response.json();
          setUser(user);
          login(token);
          navigate("/");
        } else {
          setValidationError(response.statusText);
        };
      } catch (err) {
        console.error(err);
      };
    };
  };

  return (
    <SignupContainer>
        <FormCard>
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
          </CardHeader>
          <FormContent>
            <Form ref={signupForm}>
              <Input
                id="username"
                name="userName"
                label="User Name"
                required
                value={userFormData.userName}
                onChange={handleInputChange}
                type="text"
              />
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
              <p style={{ color: "red" }}>{validationError}</p>
              <SubmitButton
                onClick={handleFormSubmit}
              > 
                Sign Up
              </SubmitButton>
            </Form>
          </FormContent>
        </FormCard>
    </SignupContainer>
  )
};

export default SignUp;
