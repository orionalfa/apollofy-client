import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../components/Button";
import { deleteTrack } from "../../services/api";
import { deletePlaylistById } from "../../services/api/apiPlaylist";
import { reloadFetchAction } from "../../redux/trackData/actions";
import { setDeleteTrackModal } from "../../redux/modalsHandler/actions";

function DeleteModal() {
  const history = useHistory();
  const { data, isTrack } = useSelector((state) => state.modalsHandler.data);
  const dispatch = useDispatch();

  function deleteTrackSure() {
    deleteTrack(data._id)
      .then(() => {
        dispatch(reloadFetchAction(true));
        dispatch(setDeleteTrackModal(false));
      })
      .catch((error) => {
        alert(error);
      });
  }

  function deletePlaylistSure() {
    deletePlaylistById(data._id)
      .then(() => {
        dispatch(reloadFetchAction(true));
        dispatch(setDeleteTrackModal(false));
        history.push("/");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <div
        onClick={() => {
          dispatch(setDeleteTrackModal(false));
        }}
        className="back-context"
      ></div>
      <div className="deleteModal">
        <h2 className="delteTitle">Are you sure to delete?</h2>
        {isTrack ? (
          <Button title={"Delete Track"} handleEdit={deleteTrackSure} />
        ) : (
          <Button title={"Delete Playlist"} handleEdit={deletePlaylistSure} />
        )}
      </div>
    </>
  );
}

export default DeleteModal;
