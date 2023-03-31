import { FC, useState, useEffect, FormEvent, MouseEvent, Fragment } from "react";
import { Card, CardHeader, CardSubtitle, CardTitle } from "@react-md/card";
import { useFileUpload, FileInput, Form } from "@react-md/form";
import { Avatar } from "@react-md/avatar";
import { MediaContainer } from "@react-md/media";
import { FileUploadSVGIcon } from "@react-md/material-icons";
import { useNavigate } from "react-router-dom";
import { extensions } from "../../utils/photoExtensions";
import { loggedIn, getToken, } from "../../utils/auth";
import {
  getCurrentUser,
  deleteSavedPic,
  uploadNewPic,
  savePic,
} from "../../utils/api";
import { User } from '../../types/User';
import { Photo } from '../../types/Photo';
import { Background, ProfileCard, UserInfo, ProfileContent, PicGrid, PicCard, Upload, SubmitButton } from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { saveSavedPhotos, selectSavedPhotos } from "../../store/userSavedPhotosSlice";

// TODO: More user-friendly file input
// const maxFiles = 1;
// const TEN_MB = 10 * 1024 * 1024;

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

  const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    console.log(target.files![0]);
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

  // TODO: More user-friendly file input
  // const { stats, errors, onChange, clearErrors, reset, remove, accept } =
  //   useFileUpload({
  //     maxFiles,
  //     maxFileSize: TEN_MB,
  //     extensions,
  //   });

  // if data isn't here yet, say so
  if (!userData) {
    return (
      <section className="vh-100" id="background">
        <h2>Loading your profile and saved pics...</h2>
      </section>
    );
  }

  return (
      <Background>
        <ProfileCard>
            <UserInfo>
                <Avatar>{userData.userName.charAt(0)}</Avatar>
                <CardTitle>{userData.userName}</CardTitle>
                <CardSubtitle>{userData.email}</CardSubtitle>
            </UserInfo>
            <ProfileContent>
                <CardTitle>
                  {savedPics.length
                    ? `Viewing ${savedPics.length} saved ${
                        savedPics.length === 1 ? "pic" : "pics"
                      }:`
                    : "You have no saved photos!"}
                </CardTitle>
                <PicGrid>
                  {savedPics.map((pic, index) => (
                    <PicCard key={index}>
                      <MediaContainer
                        width={1}
                        height={1}
                      >
                        <img
                          src={`https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_150/v1665696442/${pic.public_id}.jpg`}
                          onClick={() => navigate(`/single-view/${pic.id}`)}
                        />
                      </MediaContainer>
                      {/* <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeletePic(pic.id)}
                      >
                        Delete
                      </Button> */}
                    </PicCard>                      
                  ))}
                </PicGrid>
              <Upload>
                <CardTitle>Upload your own image:</CardTitle>
                {status ? <CardSubtitle>{status}: {image.name}</CardSubtitle> : null }
                <Form>
                  <SubmitButton>
                  <label
                    // style={{
                    //   backgroundColor: "#d1d4ed",
                    //   padding: "8px",
                    //   borderRadius: "10px"
                    // }}
                  >
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
                  {/* TODO: More user-friendly file input
                  <FileInput
                    id="file-upload"
                    name="userFile"
                    icon={<FileUploadSVGIcon />}
                    accept={accept}
                    onChange={onChange}
                    multiple={false}
                    // onChange={e => handleFileChange(e)}
                  /> */}
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
                </Form>
              </Upload>
            </ProfileContent>
        </ProfileCard>
      </Background>
  );
};

export default Profile;