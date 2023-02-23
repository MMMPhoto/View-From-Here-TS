import React, { FC, useState, useEffect, SyntheticEvent, FormEvent } from "react";
import { Container, CardGroup, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loggedIn, getToken, } from "../../utils/auth";
import {
  getCurrentUser,
  deleteSavedPic,
  uploadNewPic,
  savePic,
} from "../../utils/api";
import { User } from '../../types/User';
import { Photo } from '../../types/Photo';
import "./profile.css";
// import { useSelector, useDispatch } from 'react-redux';
// import { saveSavedPhotos, selectSavedPhotos } from "../../features/userSavedPhotos/userSavedPhotosSlice";

const Profile: FC<{}> = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<User>();
  const [savedPics, setSavedPics] = useState<Photo[]>([]);
  const [newLoad, setnewLoad] = useState<boolean>(true);
  const [newDeletedPic, setNewDeletedPic] = useState<boolean>(false);

  // Image Upload State
  interface Img { preview: string, data: any }
  const [image, setImage] = useState<Img>({ preview: "", data: "" });
  const [status, setStatus] = useState<string>("");

  // Define React Redux functions
  // const userSavedPhotos = useSelector(selectSavedPhotos);
  // const dispatch = useDispatch();

  // Get Logged in User's Data
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token: string = loggedIn() ? getToken() : null;
        const response = await getCurrentUser(token);
        if (!response.ok) {
          throw new Error("something went wrong!");
        };
        const user: User = await response.json();
        setUserData(user);
        setSavedPics(user.savedPics!);
        // dispatch(saveSavedPhotos(user.savedPics!));
        setNewDeletedPic(false);
        setnewLoad(false);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [newLoad, newDeletedPic]);

  // Delete Pic from User's Saved Pics
  const handleDeletePic = async (picId: string) => {
    const token: string = loggedIn() ? getToken() : null;
    try {
      const response = await deleteSavedPic(picId, token);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const updatedUser: User = await response.json();
      setUserData(updatedUser);
      setNewDeletedPic(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Submit function for image Upload
  const handleSubmit = async (e: SyntheticEvent<HTMLInputElement>) => {
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
    const token = loggedIn() ? getToken() : null;

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

  const handleFileChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files![0];
    const img: Img = {
      preview: URL.createObjectURL(file),
      data: file,
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
            <div className="col-12 col-md-3 border-right">
              <div className="d-flex flex-column justify-content-around align-items-center text-center mt-3">
                <img
                  className="rounded-circle"
                  width="100px"
                  src="https://www.pngkey.com/png/detail/966-9665347_icon-profile-circle.png"
                  alt="Profile Icon"
                />
                <span className="font-weight-bold">{userData.userName}</span>
                <span className="text-black-50">{userData.email}</span>
                <span></span>
              </div>
            </div>
            <div className="col-12 col-md-9 border-right">
              <div className="pt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Your saved photos:</h4>
                </div>
                <Container className="p-0 m-0" id="contain">
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
                            onClick={() => handleDeletePic(pic.id)}
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
                  <form onSubmit={e => handleSubmit}>
                    <input
                      type="file"
                      name="userFile"
                      onChange={e => handleFileChange(e)}
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
