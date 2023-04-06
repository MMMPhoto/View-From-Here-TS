import { FC, useState, useEffect, FormEvent, Fragment } from "react";
import { CardSubtitle, CardTitle } from "@react-md/card";
import { Avatar } from "@react-md/avatar";
import { MediaContainer } from "@react-md/media";
import { CloseSVGIcon } from "@react-md/material-icons";
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
import { 
  ProfileContainer,
  ProfileCard, 
  UserInfo, 
  ProfileContent, 
  PicGrid, 
  PicCard, 
  Upload, 
  UploadForm, 
  SubmitButton, 
  DeleteButton 
} from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { saveSavedPhotos, selectSavedPhotos } from "../../store/userSavedPhotosSlice";

const Profile: FC<{}> = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<User>();
  const [savedPics, setSavedPics] = useState<Photo[]>([]);
  const [newLoad, setnewLoad] = useState<boolean>(true);
  const [newDeletedPic, setNewDeletedPic] = useState<boolean>(false);

  // Image Upload State
  interface Img { preview: string, name: string, data: any }
  const [image, setImage] = useState<Img>({ preview: "", name: "", data: "" });
  const [status, setStatus] = useState<string>("");

  // Define React Redux functions
  const userSavedPhotos = useSelector(selectSavedPhotos);
  const dispatch = useDispatch();

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
        dispatch(saveSavedPhotos(user.savedPics!));
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
  const handleSubmit = async () => {
    console.log("uploading...")
    // e.preventDefault();
    setStatus("Loading...");
    let formData = new FormData();
    formData.append("userFile", image.data);
    const response = await uploadNewPic(formData);
    const uploadedImage = await response.json();

    // Check to see if response is okay
    if (!response.ok) {
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
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      console.error(err); 
    }
    setNewDeletedPic(true);
  };

  const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.files![0].name
    const file = target.files![0];
    const img: Img = {
      preview: URL.createObjectURL(file),
      name: name,
      data: file,
    };
    setStatus("File Chosen");
    setImage(img);
  };

  return (
    <ProfileContainer>
      { userData
        ? <ProfileCard>
            <UserInfo>
              <Avatar>{userData.userName.charAt(0)}</Avatar>
              <CardTitle>{userData.userName}</CardTitle>
              <CardSubtitle>{userData.email}</CardSubtitle>
            </UserInfo>
            <ProfileContent>
              <Upload>
                <CardTitle>Upload your own image:</CardTitle>
                {status ? <CardSubtitle>{status}: {image.name}</CardSubtitle> : null }
                <UploadForm>
                  <SubmitButton>
                    <label>
                      <input
                        id="userFile" 
                        type="file"
                        name="userFile"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      Choose {(status === "File Chosen") ? "Another" : null} File
                    </label>
                  </SubmitButton>
                  {(status === "File Chosen") 
                    ? <SubmitButton 
                        type="submit"
                        name="submit"
                        onClick={e => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                      >
                        Submit
                      </SubmitButton>
                    : null
                  }
                </UploadForm>
              </Upload>
              <CardTitle>
                {savedPics.length
                  ? `Viewing ${savedPics.length} saved ${
                      savedPics.length === 1 ? "pic" : "pics"
                    }:`
                  : "You have no saved photos!"}
              </CardTitle>
              <PicGrid>
                {savedPics.map((pic, index) => (
                  <PicCard 
                    key={index} 
                    style={{ order: savedPics.length - index}} // Reverse order so most recent saved pics are first
                  >
                    <MediaContainer
                      width={1}
                      height={1}
                    >
                      <img
                        src={`https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_150/v1665696442/${pic.public_id}.jpg`}
                        style={{ objectFit: "cover" }} // Force image to maintain aspect ratio
                        onClick={() => navigate(`/single-view/${pic.id}`)}
                      />
                      <DeleteButton
                        buttonType="icon"
                        onClick={() => handleDeletePic(pic.id)}
                      >
                        <CloseSVGIcon />
                      </DeleteButton>
                    </MediaContainer>
                  </PicCard>                      
                ))}
              </PicGrid>
            </ProfileContent>
          </ProfileCard>
        : <ProfileCard>
            <CardTitle>Loading your profile and saved pics...</CardTitle>
          </ProfileCard>
      }
    </ProfileContainer>
  );
};

export default Profile;
