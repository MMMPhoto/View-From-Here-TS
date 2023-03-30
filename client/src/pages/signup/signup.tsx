import { FC, useState, ChangeEvent, FormEvent } from "react";
import { CardHeader, CardTitle } from "@react-md/card";
import { Form } from "@react-md/form";
import { createNewUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import { Background, FormCard, FormContent, Input,PasswordInput, SubmitButton } from "./styles";
import { User } from '../../types/User';

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
    <Background>
        <FormCard>
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
          </CardHeader>
          <FormContent>
            <Form>
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
                disableVisibility={true} // Quick fix for problem displaying visibility icon
                required
                value={userFormData.password}
                onChange={handleInputChange}
              />
              <SubmitButton
                onClick={handleFormSubmit}
              > 
                Sign Up
              </SubmitButton>
            </Form>
            {/* <Card>
              <img
                src="https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_500/v1665696442/View-from-here/1ddfeb86305588512f79432b4a107ec5.jpg"
                className="img-fluid"
                alt="Sample view"
                id="signupFormImg"
              />
            </Card> */}
          </FormContent>
        </FormCard>
    </Background>
  )
};

export default SignUp;
