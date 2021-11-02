import * as axios from "axios";

export function changeMyProfilePicture(file, userId, userToken) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "upload_apollofy");
  formData.append("folder", "profile-pics");
  // formData.append("allowed_formats", ["jpg", "png"]);
  return axios.post(
    `https://api.cloudinary.com/v1_1/apollofy/image/upload/`,
    formData,
  );
}
