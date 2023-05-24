import { FC, useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { CardHeader, CardTitle } from "@react-md/card";
import { Form } from "@react-md/form";
import { RemoveRedEyeSVGIcon } from "@react-md/material-icons";
import { createNewUser } from "../../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../utils/auth";
import { SignupContainer, FormCard, FormContent, Input,PasswordInput, SubmitButton } from "./styles";

interface PasswordResetData {
    newPassword: string,
    passwordConfirmation: string
};

const PasswordReset: FC<{}> = () => {
  // set initial form state
  const [passwordResetCode, setPasswordResetCode] = useState<string>("");
  const [resetFormData, setResetFormData] = useState<PasswordResetData>({
    newPassword: "",
    passwordConfirmation: ""
  });
  const [validationError, setValidationError] = useState<string>("");
  const resetForm = useRef<any>(null);
  const navigate = useNavigate();
  const { search } = useLocation();
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetFormData({ ...resetFormData, [name]: value });
    setValidationError("");
  };

  const handleFormSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formValid = resetForm.current.reportValidity();
    if (formValid) {
      try {
        const response = await createNewUser(resetFormData); //TODO: Create new function in utils for route
        if (response.ok) {
          const { token, user } = await response.json();
          // setUser(user);
          // login(token);
          navigate("/");
        } else {
          setValidationError(response.statusText);
        };
      } catch (err) {
        console.error(err);
      };
    };
  };

  useEffect(() => {
    if (search) {
      setPasswordResetCode(search.replace("?code=", ""));
      console.log("code exists!")
    } else {
      navigate("/");
    };
  }, []);

  return (
    <SignupContainer>
        <FormCard>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <FormContent>
            <Form ref={resetForm}>
              <PasswordInput
                id="new-password"
                name="newPassword"
                label="New Password"
                visibilityIcon={<RemoveRedEyeSVGIcon />}
                required
                value={resetFormData.newPassword}
                onChange={handleInputChange}
              />
              <PasswordInput
                id="password-confirm"
                name="passwordConfirm"
                label="Confirm Password"
                visibilityIcon={<RemoveRedEyeSVGIcon />}
                required
                value={resetFormData.passwordConfirmation}
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

export default PasswordReset;
