import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, CardGroup, Card, Button } from "react-bootstrap";
import Auth from "../utils/auth";
import { getOnePic, getCurrentUser, deleteSavedPic } from "../utils/api";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [savedPics, setSavedPics] = useState([{}]);
  const [file, setFile] = useState();
  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  const navigate = useNavigate();

  // Multer test
  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')

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
  }, [userData]);

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
     } catch (err) {
      console.error(err);
    }
  };

  // const handleUpload = async (e) => {
  //   try {
  //     // e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("userFile", file);
  //     const response = await getOnePic(formData);
  //     const uploadPic = await response.json();
  //     console.log(uploadPic);
  //   } catch (err) {
  //     console.error(err);
  //   };    
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('userFile', image.data)
    const response = await fetch('/api/pics', {
      method: 'POST',
      body: formData,
    });
    if (response) setStatus(response.statusText);
    const uploadedImage = await response.json();
    console.log(uploadedImage);
    navigate(`/single-view/${uploadedImage.id}`);        
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>Please login to view your profile and saved pics!</h2>;
  }

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
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
              <Container>
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
                      <Card key={index} border="dark">
                        {pic ? (
                          <Card.Img
                            src={`https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_150/v1665696442/${pic.public_id}.jpg`}
                            alt={`The cover for ${pic.title}`}
                            variant="top"
                          />
                        ) : null}
                        <Card.Body>
                          <Card.Title>{pic.title}</Card.Title>
                          <p className="small">Authors: {pic.authors}</p>
                          <Card.Text>{pic.description}</Card.Text>
                          <Button
                            className="btn-block btn-danger"
                            onClick={() => handleDeletePic(pic._id)}
                          >
                            Delete this pic!
                          </Button>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </CardGroup>
              </Container>
              <br></br>

              {/* <form action="/api/pics" method="post" encType="multipart/form-data">
                <label htmlFor="userFile">Upload photos:</label>
                <input type="file" id="userFile" name="userFile" />
                <input type="submit" />
              </form> */}
{/* 
              <form action="/api/pics" method="post" encType="multipart/form-data">
                <input type="file" id="userFile" onChange={(e)=>setFile(e.target.files)} className="form-control" name="userFile" />
                <button type="submit" onClick={handleUpload} className="mt-2 btn btn-primary">
                  Upload File
                </button>
              </form> */}

              <div>
                <h1>Upload to server</h1>
                {image.preview && <img src={image.preview} width='100' height='100' />}
                <hr></hr>
                <form onSubmit={handleSubmit}>
                  <input type='file' name='userFile' onChange={handleFileChange}></input>
                  <button type='submit'>Submit</button>
                </form>
                {status && <h4>{status}</h4>}
              </div>
            </div>
            <div className="mt-5 text-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
