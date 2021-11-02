import React from "react";

import "./styles.css";

export default function ProfileCircleIcon({ profileImg }) {
  let css = {};

  if (profileImg) {
    css = { backgroundImage: `url(${profileImg})` };
  } else {
    css = {
      backgroundImage: `url("https://res.cloudinary.com/apollofy/image/upload/v1633015712/img/default-user_tphshe.svg")`,
    };
  }

  return (
    <>
      <div className="profile-picture-container">
        <div className="profile-circle-background"></div>
        <div className="profile-picture" style={css} />
      </div>
    </>
  );
}
