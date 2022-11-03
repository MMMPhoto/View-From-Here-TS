import React, { useState, useEffect } from "react";
import { Container, CardGroup, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import {
  getCurrentUser,
  deleteSavedPic,
  uploadNewPic,
  savePic,
} from "../../utils/api";
import "./profile.css";
import { useSelector, useDispatch } from 'react-redux';
import { saveSavedPhotos } from "../../features/userSavedPhotos/userSavedPhotosSlice";
import store from "../../app/store";

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [savedPics, setSavedPics] = useState([{}]);
  const [newLoad, setnewLoad] = useState(true);
  const [newDeletedPic, setNewDeletedPic] = useState(false);

  // Image Upload State
  const [image, setImage] = useState();
  const [status, setStatus] = useState("");

  // Define React Redux functions
  const userSavedPhotos = useSelector((state) => state.userSavedPhotos.savedPhotos);
  const dispatch = useDispatch();

  // Get Logged in User's Data
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
        dispatch(saveSavedPhotos(user.savedPics));
        console.log(store.getState());
        setNewDeletedPic(false);
        setnewLoad(false);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [newLoad, newDeletedPic]);

  // Delete Pic from User's Saved Pics
  const handleDeletePic = async (picId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await deleteSavedPic(picId, token);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const updatedUser = await response.json();
      setUserData(updatedUser);
      setNewDeletedPic(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Submit function for image Upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Loading...");
    let formData = new FormData();
    formData.append("userFile", image.data);
    const response = await uploadNewPic(formData);
    const uploadedImage = await response.json();

    // Check to see if response is okay
    if (!response.ok) {
      console.log(uploadedImage);
      setStatus(uploadedImage.message);
      return;
    } else {
      setStatus("Image saved and uploaded!");
    }
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await savePic(uploadedImage, token);

      if (!response.ok) {
        console.log(response);
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }
    setNewDeletedPic(true);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setStatus("File Chosen");
    setImage(img);
  };

  // if data isn't here yet, say so
  if (!userData) {
    return (
      <section className="vh-100" id="background">
        <h2>Loading your profile and saved pics...</h2>
      </section>
    );
  }

  return (
    <>
      <section id="background">
        <div className="container rounded bg-white mt-5 mb-5" id="formbg">
          <div className="row" id="formdiv">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="200px"
                  src="https://www.pngkey.com/png/detail/966-9665347_icon-profile-circle.png"
                  alt="Icon-profile - Circle@pngkey.com"
                />
                <span className="font-weight-bold">{userData.userName}</span>
                <span className="text-black-50">{userData.email}</span>
                <span></span>
              </div>
            </div>
            <div className="col-md-9 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Your saved photos:</h4>
                </div>
                <Container id="contain">
                  <h2>
                    {savedPics.length
                      ? `Viewing ${savedPics.length} saved ${
                          savedPics.length === 1 ? "pic" : "pics"
                        }:`
                      : "You have no saved photos!"}
                  </h2>
                  <CardGroup>
                    {savedPics.map((pic, index) => {
                      return (
                        <Card id="cards" key={index}>
                          {pic ? (
                            <Card.Img
                              id="cardimage"
                              src={`https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_150/v1665696442/${pic.public_id}.jpg`}
                              variant="top"
                              onClick={() => navigate(`/single-view/${pic.id}`)}
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
                <div>
                  <h1>Upload your image:</h1>
                  {status && <h4>{status}</h4>}
                  <hr></hr>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="file"
                      name="userFile"
                      onChange={handleFileChange}
                    ></input>
                    <button type="submit" id="submit">
                      Submit
                    </button>
                  </form>
                </div>
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
