import {  FC } from "react";
import { CardHeader, CardTitle } from "@react-md/card";
import { AboutContainer, AboutCard, AboutContent } from "./styles";

const About: FC<{}> = ({}) => {

  return (
    <AboutContainer>
        <AboutCard>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <AboutContent>
            <h5>Welcome to View From Here!</h5>
            <p>
              This site allows users to find interesting views from around the world, and to submit their own views.
            </p>
            <h5>General Usage</h5>
            <p>
              Use the Home page to search for interesting views on the map. Click or hover over a marker and see a thumbnail of the view at that location. Click on the thumbnail to see the view full size.
            </p>
            <h5>Login and Signup</h5>
            <p>
              Navigate to the Signup Page to create an account. Once your account has been created, use the Login Page to log in with your credentials.
            </p>
            <h5>Saving Favorite Views</h5>
            <p>
              Once you are logged in, you will be able to save your favorite Views. Save a View by clicking the heart at the top of the page for each view. You can then navigate to the Profile Page, where you will be shown all of your saved Views.
            </p>
            <h5>Uploading New Views</h5>
            <p>
              At the bottom of the Profile Page, you can find the form to upload your own Views. Click the button to choose a file from your device. Image files are acceptable file types. You can only upload one file at a time, and there is a maximum file size of 10 MB.
            </p>
            <p>
              After your file has uploaded, you will get confirmation of success, and the new View will be saved in your favorites.
            </p>       
          </AboutContent>
        </AboutCard>
    </AboutContainer>
  )
};

export default About;
