import { FC, useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { CardHeader, CardTitle } from "@react-md/card";
import { Form } from "@react-md/form";
import { RemoveRedEyeSVGIcon } from "@react-md/material-icons";
import { checkPasswordCode, changePassword } from "../../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../utils/auth";
import { SignupContainer, FormCard, FormContent, Input,PasswordInput, SubmitButton } from "./styles";
import { set } from "immer/dist/internal";

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
  const [validationMessage, setValidationMessage] = useState<string>("");
  const resetForm = useRef<any>(null);
  const passwordConfirmation = useRef<any>(null);

  const navigate = useNavigate();
  const { search } = useLocation();
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetFormData({ ...resetFormData, [name]: value });
    setValidationMessage("");
  };

  const passwordsDontMatch = () => {
    return (
      resetFormData.newPassword.length &&
      resetFormData.passwordConfirmation.length &&
      resetFormData.newPassword !== resetFormData.passwordConfirmation
    );
  };

  const submitChangePassword = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (passwordsDontMatch()) {
      console.log("passwords don't match")
      passwordConfirmation.current.setCustomValidity(
        "Passwords do not match."
      );
    };

    const formValid = resetForm.current.reportValidity();
    if (formValid) {
      try {
        const data = {
          code: passwordResetCode,
          newPassword: resetFormData.newPassword
        };
        const response = await changePassword(data);
        if (response.ok) {
          setValidationMessage(response.statusText);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setValidationMessage(response.statusText);
        };
      } catch (err) {
        console.error(err);
      };
    };
  };

  useEffect(() => {
    if (search) {
      const checkCode = async (code: string) => {
        try {
          await checkPasswordCode({ code: code });
        } catch(err) {
          console.error(err);
        };
      };
      const code = search.replace("?code=", "");
      checkCode(code);
      setPasswordResetCode(code);
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
                ref={passwordConfirmation}
                visibilityIcon={<RemoveRedEyeSVGIcon />}
                required
                value={resetFormData.newPassword}
                onChange={handleInputChange}
              />
              <PasswordInput
                id="password-confirm"
                name="passwordConfirmation"
                label="Confirm Password"
                ref={passwordConfirmation}
                visibilityIcon={<RemoveRedEyeSVGIcon />}
                required
                value={resetFormData.passwordConfirmation}
                onChange={handleInputChange}
              />
              <p style={{ color: "red" }}>{validationMessage}</p>
              <SubmitButton
                onClick={submitChangePassword}
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
