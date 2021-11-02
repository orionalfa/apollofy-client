import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import * as $ from "jquery";
import { Row, Col } from "react-bootstrap";
import Input from "../Input";
import { updateTrack } from "../../services/api/index";
import { reloadFetchAction } from "../../redux/trackData/actions";
import { setUpdateTrackModal } from "../../redux/modalsHandler/actions";
import Select from "react-select";

function UpdateModal() {
  const form = useRef();
  const dispatch = useDispatch();
  const trackDataDialog = useSelector((state) => state.modalsHandler.data);

  const [coverUpload, setCoverUpload] = useState({
    file: "",
    isSelected: false,
    isUploading: false,
    isUploaded: false,
    error: "",
  });

  function handleChange(e) {
    setTrackData({
      ...trackData,
      _id: trackDataDialog._id,
      [e.target.name]: e.target.value,
    });
  }

  function handleCoverUploadChange(e) {
    setCoverUpload({
      ...coverUpload,
      file: e.target.files[0],
      isSelected: true,
    });
  }

  const [trackData, setTrackData] = useState({
    _id: trackDataDialog._id,
    title: trackDataDialog.title,
    author: trackDataDialog.author,
    album: trackDataDialog.album,
    releaseYear: trackDataDialog.releaseYear,
    genre: trackDataDialog.genre,
    urlCover: trackDataDialog.urlCover,
  });

  useEffect(() => {
    if (coverUpload.isSelected === true) {
      uploadFiles("developCovers");
    }
  }, [coverUpload.isSelected]);

  async function uploadFiles(folder) {
    if (folder === "developCovers") {
      setCoverUpload({ ...coverUpload, isUploading: true });
    }
    const formData = new FormData();

    if (folder === "developCovers") {
      formData.append("file", coverUpload.file);
      formData.append("upload_preset", "upload_apollofy");
      formData.append("folder", folder);
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/apollofy/image/upload/`,
          formData,
        )
        .then((response) => {
          setCoverUpload({
            ...coverUpload,
            isUploading: false,
            isUploaded: true,
          });
          const { data } = response;
          setTrackData({ ...trackData, urlCover: data.url });
        })
        .catch((error) => {
          setCoverUpload({
            ...coverUpload,
            error: error,
            file: "",
            isUploading: false,
            isUploaded: false,
          });
        });
    }
  }

  function saveChanges(e) {
    e.preventDefault();
    $(form.current).validate({
      rules: {
        title: { required: true },
        author: { required: true },
        genre: { required: true },
      },
      messages: {
        title: { required: "Title field is required" },
        author: { required: "Author field is required" },
        genre: { required: "Genre field is required" },
      },
      submitHandler: () => {
        console.log("object to updated", trackData);
        updateTrack(trackData);

        dispatch(reloadFetchAction(true));
        dispatch(setUpdateTrackModal(false));
      },
    });
  }
  function choseGenre(e) {
    setTrackData({
      ...trackData,

      genre: e.value,
    });
  }
  const customStyles = {
    option: (provided) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: "green",
      padding: 20,
    }),
  };
  const options = [
    { value: "Pop", label: "Pop" },
    { value: "Rock", label: "Rock" },
    { value: "Cumbia", label: "Cumbia" },
    { value: "Dance", label: "Dance" },
    { value: "Latino", label: "Latino" },
    { value: "Rap", label: "Rap" },
    { value: "Country", label: "Country" },
  ];
  return (
    <>
      <div
        onClick={() => {
          dispatch(setUpdateTrackModal(false));
        }}
        className="back-context"
      ></div>
      <form ref={form} onSubmit={saveChanges}>
        <Row>
          <Col xs={12} md={6} className="track-update">
            <h2 className="titleUpdate">Update track</h2>
            <Input
              type="text"
              id="title"
              label="Title *"
              value={trackData.title}
              placeholder="Type title"
              handleChange={handleChange}
            />
            <Input
              type="text"
              id="author"
              label="Author *"
              value={trackData.author}
              placeholder="Type author"
              handleChange={handleChange}
            />
            <Input
              type="text"
              id="album"
              label="Album"
              value={trackData.album}
              placeholder="Type album"
              handleChange={handleChange}
            />
            <Input
              type="releaseYear"
              id="releaseYear"
              label="Release year"
              value={trackData.releaseYear}
              placeholder="Type release year"
              handleChange={handleChange}
            />
            {/* <Input
              type="text"
              id="genre"
              label="Genre *"
              value={trackData.genre}
              placeholder="Type genre"
              handleChange={handleChange}
            /> */}
            <Select
              width="500px"
              menuColor="red"
              styles={customStyles}
              onChange={choseGenre}
              options={options}
              value={{ label: trackData.genre, value: trackData.genre }}
            />

            <div className="xl-separator" />

            <Col
              xs={12}
              md={6}
              lg={6}
              className="position-relative flex-column d-flex justify-content-center"
            >
              {coverUpload.isUploaded ? (
                <>
                  <Col className="uploaded-file">
                    <h3>Cover changed</h3>
                    <img
                      src={trackData.urlCover}
                      alt="uploaded"
                      className="existing-image"
                    />
                  </Col>
                </>
              ) : coverUpload.isUploading ? (
                <>
                  <Col className="lds-ripple">
                    <div></div>
                    <div></div>
                  </Col>
                  <h3>Changing cover</h3>
                </>
              ) : (
                <>
                  <h5>Upload cover:</h5>
                  <input
                    type="file"
                    name="cover"
                    onChange={handleCoverUploadChange}
                    className="upload-file-input"
                  />
                  <div className="upload-file-container">
                    <img
                      src={trackData.urlCover}
                      alt="uploaded"
                      className="existing-image"
                    />
                  </div>
                </>
              )}
            </Col>

            <div className="xl-separator" />

            <div className="login-register-button-centered">
              <Col className="d-flex justify-content-center">
                <button type="submit" className="button">
                  Update song
                </button>
              </Col>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
}

export default UpdateModal;
