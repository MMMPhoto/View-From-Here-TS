import {  FC } from "react";
import { CardHeader, CardTitle } from "@react-md/card";
import { AboutContainer, AboutCard, AboutContent } from "./styles";

const About: FC<{}> = ({}) => {

  return (
    <AboutContainer>
        <AboutCard>
          <CardHeader>
            <CardTitle>Welcome to View From Here!</CardTitle>
          </CardHeader>
          <AboutContent>
            <p>The site that allows users to find interesting views from around the world, and to submit their own views.</p>
            <h5>General Usage</h5>
            <img style={{width: "100%"}} src={"/assets/vfh-home-screenshot.png"} alt="home-screenshot" />
            <p>Use the Home page to search for interesting views on the map.</p>
            <img style={{width: "100%"}} src={"/assets/vfh-popup-screenshot.png"} alt="popup-screenshot" />
            <p>Click or hover over a marker and see a thumbnail of the view at that location. Click on the thumbnail to see the view full size.</p>
            <h5>Login and Signup</h5>
            <img style={{width: "100%"}} src={"/assets/vfh-login-screenshot.png"} alt="login-screenshot" />
            <p>Navigate to the Signup Page to create an account. Once your account has been created, use the Login Page to log in with your credentials.</p>
            <h5>Saving Favorite Views</h5>
            <img style={{width: "100%"}} src={"/assets/vfh-save-view-screenshot.png"} alt="save-view-screenshot" />
            <p>Once you are logged in, you will be able to save your favorite Views. Save a View by clicking the heart at the top of the page for each view.</p>
            <img style={{width: "100%"}} src={"/assets/vfh-favorites-screenshot.png"} alt="favorites-screenshot" />
            <p>You can then navigate to the Profile Page, where you will be shown all of your saved Views.</p>
            <h5>Uploading New Views</h5>
            <p>At the top of the Profile Page, you can find the form to upload your own Views. Click the button to choose a file from your device. Image files are acceptable file types. You can only upload one file at a time, and there is a maximum file size of 10 MB.</p>
            <p>After your file has uploaded, you will get confirmation of success, and the new View will be saved in your favorites.</p>       
          </AboutContent>
        </AboutCard>
    </AboutContainer>
  )
};

export default About;
