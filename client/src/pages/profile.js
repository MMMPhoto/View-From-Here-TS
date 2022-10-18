import React, { useState, useEffect } from "react";
import { Container, CardGroup, Card, Button } from "react-bootstrap";
import Auth from "../utils/auth";
import { getCurrentUser, deleteSavedPic } from "../utils/api";
import { removePicId } from '../utils/localStorage';
import './profile.css'

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [savedPics, setSavedPics] = useState([{}]);
  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getCurrentUser(token);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const user = await response.json();
        setUserData(user);
        setSavedPics(user.savedPics);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the pics mongo _id value as param and deletes the pic from the user's profile
  const handleDeletePic = async (picId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // console.log(token);
      const response = await deleteSavedPic(picId, token);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return (
      <section className="vh-100" id = 'background'>
        <h2>Loading your profile and saved pics...</h2>
      </section>
    )
  }

  return (
    <>
    <section className="vh-100" id = 'background'>
      <br></br><br></br><br></br><br></br><br></br><br></br>
      <div className="container rounded bg-white mt-5 mb-5" id = "formbg" >
        <div className="row" id = "formdiv">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="200px"
                src="https://www.pngkey.com/png/detail/966-9665347_icon-profile-circle.png" alt="Icon-profile - Circle@pngkey.com"
              />
              <span className="font-weight-bold">{userData.userName}</span>
              <span className="text-black-50">{userData.email}</span>
              <span></span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Your saved photos:</h4>
              </div>
              <Container id = "contain">
                <h2>
                  {savedPics.length
                    ? `Viewing ${savedPics.length} saved ${
                        savedPics.length === 1 ? "pic" : "pics"
                      }:`
                    : "You have no saved photos!"}
                </h2>
                <CardGroup >
                  {savedPics.map((pic, index) => {
                    return (
                      <Card id = "cards" key={index} border="dark">
                        {pic ? (
                          <Card.Img id = "cardimage"
                            src={`https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_150/v1665696442/${pic.public_id}.jpg`}
                            alt={`The cover for ${pic.title}`}
                            variant="top"
                          />
                        ) : null}
                          <Button
                            className="btn-block btn-danger"
                            onClick={() => handleDeletePic(pic._id)}
                          >
                            Delete
                          </Button>  
                      </Card>
                    );
                  })}
                </CardGroup>
              </Container>
              <br></br>
              <form action="/action_page.php">
                <label htmlFor="myfile">Upload photos:</label>
                <input type="file" id="myfile" name="myfile" multiple />
                <input type="submit" />
              </form>
            </div>
            <div className="mt-5 text-center"></div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default Profile;
