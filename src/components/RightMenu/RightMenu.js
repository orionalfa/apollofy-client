import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

import "./styles.css";

import { logOut } from "../../services/firebase";
import { setSearchQuery } from "../../redux/searchHandler/actions";

//Icons
import { HomeOutlined, CloudUpload, SearchOutlined } from "@material-ui/icons";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import ProfileCircleIcon from "../ProfileCircleIcon";
import Input from "../../components/Input";

import { isPlayBarDisplayedAction } from "../../redux/trackData/actions";
import { setUploadTrackModal } from "../../redux/modalsHandler/actions";

export default function RightMenu() {
  const dispatch = useDispatch();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { username, profileImg } = useSelector(
    (state) => state.userReducer.data,
  );
  const { query } = useSelector((state) => state.searchHandler);

  let location = useLocation();

  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  function handleChange(e) {
    dispatch(setSearchQuery(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(query);
    if (location.pathname !== "/search") {
      setIsSearchSubmitted(true);
    }
  }

  function handleLogout() {
    dispatch(isPlayBarDisplayedAction(false));
    logOut();
  }

  return isSearchSubmitted ? (
    <Redirect to="/search" />
  ) : (
    <aside className="right-menu">
      <div>
        <Link to="/profile" className="right-menu-row">
          <ProfileCircleIcon profileImg={profileImg} />
          <div className="right-menu-row-title">Welcome {username}</div>
        </Link>
      </div>

      <div
        onClick={() => {
          isUploadModalOpen
            ? dispatch(setUploadTrackModal(false)) &&
              setIsUploadModalOpen(false)
            : dispatch(setUploadTrackModal(true)) && setIsUploadModalOpen(true);
        }}
      >
        <div className="right-menu-row">
          <CloudUpload fontSize="large" />
          <div className="right-menu-row-title">Upload song</div>
        </div>
      </div>
      <div className="xl-separator" />
      <div className="right-menu-row no-hover">
        <SearchOutlined fontSize="large" />
        <div>
          <form onSubmit={handleSubmit} className="right-menu-row-title">
            <Input
              type="text"
              id="searchQuery"
              label=""
              value={query}
              placeholder="Type your search"
              handleChange={handleChange}
            />
          </form>
        </div>
      </div>
      <div>
        <Link to="/" className="right-menu-row">
          <HomeOutlined fontSize="large" />
          <div className="right-menu-row-title">Home</div>
        </Link>
      </div>
      <div onClick={handleLogout} className="right-menu-logout">
        <div className="right-menu-row">
          <LogoutOutlinedIcon fontSize="large" />
          <div className="right-menu-row-title">Logout</div>
        </div>
      </div>
    </aside>
  );
}
