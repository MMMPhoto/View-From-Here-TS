import {  FC } from "react";
import { CardHeader, CardTitle } from "@react-md/card";
import { Background, AboutCard, AboutContent } from "./styles";

const About: FC<{}> = ({}) => {

  return (
    <Background>
        <AboutCard>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <AboutContent>
            Hello, this is the About Page!
          </AboutContent>
        </AboutCard>
    </Background>
  )
};

export default About;
