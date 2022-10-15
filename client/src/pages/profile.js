import React, { Component, useState } from "react";
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import ImageUploading from 'react-images-uploading';
import Auth from "../utils/auth";
import Header from "../components/header";
import Footer from "../components/footer";
import ImageUpload from '../components/ImageUpload';
import { getCurrentUser, deleteSavedPic } from "../utils/api";

function Profile() {
  const [uploadFormVisible, setUploadForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [isPicked, setIsPicked] = useState(false);

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setIsPicked(true);
  };
  
  const handleUpload = () => {

  };

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
              <span className="font-weight-bold">username</span>
              <span className="text-black-50">userEmail</span>
              <span></span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Your saved photos:</h4>
              </div>
              <div id = "savedPhotos">  
                <img src ="https://i.picsum.photos/id/883/200/300.jpg?hmac=L62LMsIBfvhnxlTirzshbyv6HarwJvd-tSSBcIvbCVw"/>
                <img src ="https://i.picsum.photos/id/311/200/300.jpg?hmac=ltcRErkHQZRTlJl3xZ_6HSzWzco1GSU3zbZhA12WvJw"/>
                <img src ="https://i.picsum.photos/id/145/200/300.jpg?hmac=mIsOtHDzbaNzDdNRa6aQCd5CHCVewrkTO5B1D4aHMB8"/>
              </div>
            </div>
          </div>
            <div className="col-md-4 border-right">
              {/* Upload Button becomes upload form onClick */}
              <div className="p-3 py-5">
                {uploadFormVisible ? (
                    <ImageUpload />
                    // <ImageUploading
                    //   value={selectedImage}
                    //   onChange={handleChange}
                    //   dataURLKey="data_url"
                    // >
                      // <div className="input-group mb-3">
                      //   <div className="custom-file">
                      //     <button 
                      //       className="input-group-append btn btn-primary"
                      //       type="button"
                      //       onClick={() => handleUpload()}
                      //     >
                      //       Upload
                      //     </button>
                      //     <input
                      //       type="file"
                      //       name="file"
                      //       className="custom-file-input mt-2"
                      //       onchange={handleChange}
                      //     />
                      //   </div>
                      // </div>
                    // </ImageUploading>
                    ) : (
                    <button
                      className="btn btn-primary profile-button"
                      type="button"
                      onClick={() => setUploadForm(true)}
                    >
                      Upload Photo
                    </button>
                )}
                {selectedImage && (
                  <div>
                    <img alt="not found" width={"20vw"} src={URL.createObjectURL(selectedImage)}/>

                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 text-center">
            </div>
         
        </div>
      </div>
    </>
  );
};

export default Profile;
