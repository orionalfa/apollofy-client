import React, { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../../components/Button";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import {
  getAllMyPlaylists,
  addTrackToPlaylist,
  createNewPlaylistApi,
} from "../../services/api/index";
import { useDispatch, useSelector } from "react-redux";
import { setMyPlaylistModal } from "../../redux/modalsHandler/actions";
import { reloadPlaylistFetchAction } from "../../redux/playlistData/actions";

import "./style.css";

import Input from "../Input";
function PlaylistSelector() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userReducer);
  const trackDataDialog = useSelector((state) => state.modalsHandler.data);
  const [formToCreatePlaylist, setFormToCreatePlaylist] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    owner: data.userId,
    private: false,
  });
  //const [selectedOption, setSelectedOption] = useState("...");

  useEffect(() => {
    getAllMyPlaylists(data.userId).then((res) => {
      const { myPlaylists } = res.data;
      myPlaylists.map((item) => {
        makeNewOptions(item.title);
      });
    });
  }, []);
  async function createNewPlaylist(e) {
    e.preventDefault();
    await createNewPlaylistApi(newPlaylist);
    await addTrackToPlaylist(newPlaylist.title, trackDataDialog._id);
    dispatch(reloadPlaylistFetchAction(true));
    dispatch(setMyPlaylistModal(false));
  }
  function handleChangeTitle(e) {
    if (e.target.value === false) {
      e.target.value = true;
    }
    // } else if (e.target.value === true) {
    //   e.target.value = false;
    // }
    setNewPlaylist({
      ...newPlaylist,

      [e.target.name]: e.target.value,
    });
  }
  function handleChangeCheckBox(e) {
    // } else if (e.target.value === true) {
    //   e.target.value = false;
    // }
    setNewPlaylist({
      ...newPlaylist,
      [e.target.name]: e.target.checked,
    });
  }

  function choseOption(e) {
    addTrackToPlaylist(e.value, trackDataDialog._id);
    dispatch(setMyPlaylistModal(false));
  }

  const customStyles = {
    option: (provided) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: "green",
      padding: 20,
    }),
  };
  const options = [];

  function makeNewOptions(newPlaylist) {
    options.push({ value: newPlaylist, label: newPlaylist });
  }

  return (
    <>
      <div
        onClick={() => {
          dispatch(setMyPlaylistModal(false));
        }}
        className="back-context"
      ></div>
      <div className="selectorModal">
        <h2 className="titleSelect">Select your playlist: </h2>

        <Select
          width="500px"
          menuColor="red"
          styles={customStyles}
          onChange={choseOption}
          options={options}
        />

        <h2 className="titleSelect">or... </h2>
        {formToCreatePlaylist ? (
          <form onSubmit={createNewPlaylist}>
            <Input
              type="text"
              id="title"
              placeholder="new playlist"
              value={newPlaylist.title}
              label="new playlist"
              handleChange={handleChangeTitle}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="private"
                  checked={newPlaylist.private}
                  onChange={handleChangeCheckBox}
                />
              }
              label="Private"
            />
            <button className="submit-new-playlist-button" type="submit">
              create
            </button>
          </form>
        ) : (
          <Button
            title={"Add new one"}
            handleEdit={() => {
              setFormToCreatePlaylist(true);
            }}
          />
        )}
      </div>
    </>
  );
}

export default PlaylistSelector;
