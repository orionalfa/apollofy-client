import { useSelector, useDispatch } from "react-redux";
import { setInformationModal } from "../../redux/modalsHandler/actions";
import "./style.css";

function InformationModal() {
  const informationData = useSelector((state) => state.modalsHandler.data);
  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() => {
          dispatch(setInformationModal(false));
        }}
        className="back-context"
      ></div>
      <div className="information-modal">
        <div className="info-modal-title">Owner Information</div>
        <div>
          Name: {informationData.firstname} {informationData.lastname}
        </div>
        <div>Username: {informationData.username}</div>
        <div>Country: {informationData.country}</div>
      </div>
    </>
  );
}
export default InformationModal;
