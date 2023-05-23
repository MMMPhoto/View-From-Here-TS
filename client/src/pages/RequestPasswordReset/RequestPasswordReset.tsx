import React, {  FC, useState, ChangeEvent, FormEvent, useRef } from "react";
import { CardHeader, CardTitle } from "@react-md/card";
import { Form } from "@react-md/form";
import { recoverPassword } from "../../utils/api";
import { Container, FormCard, FormContent, Input, SubmitButton } from "./styles";

interface EmailData { email: string };

const RequestPasswordReset: FC<{}> = () => {
  const [emailFormData, setEmailFormData] = useState<EmailData>({ email: "" });
  const [validationMessage, setValidationMessage] = useState<string>("");
  const emailForm = useRef<any>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailFormData({ ...emailFormData, [name]: value });
    setValidationMessage("");
  };

  const handleFormSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formValid = emailForm.current.reportValidity();
    if (formValid) {
      try {
        const response = await recoverPassword(emailFormData);
        setValidationMessage(response.statusText);
      } catch (err) {
        console.error(err);
      };
    };
  };

  return (
    <Container>
      <FormCard>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <FormContent>
          <Form ref={emailForm}>
            <Input
              id="email"
              name="email"
              label="Email"
              required
              value={emailFormData.email}
              onChange={handleInputChange}
              type="email"
            />
            <p style={{ color: "red" }}>{validationMessage}</p>
            <SubmitButton
              onClick={handleFormSubmit}
            > 
              Login
            </SubmitButton>
          </Form>
        </FormContent>
      </FormCard>
    </Container>
  )
};

export default RequestPasswordReset;
