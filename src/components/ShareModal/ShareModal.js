import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShareModal } from "../../redux/modalsHandler/actions";
import { DoneAllOutlined, FileCopyOutlined } from "@material-ui/icons";
import "./style.css";

function ShareModal() {
  const informationData = useSelector((state) => state.modalsHandler.data);
  const dispatch = useDispatch();

  const [urlCopied, setUrlCopied] = useState(false);
  const [url, setUrl] = useState("");

  function setInClipboard() {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setUrlCopied(true);
      })
      .catch((error) => {
        alert(error);
      });
  }
  useEffect(() => {
    setUrl(`${window.location.origin}/${informationData.url}`);
  }, []);

  return (
    <>
      <div
        onClick={() => {
          dispatch(setShareModal(false));
        }}
        className="back-context"
      ></div>
      <div className="share-modal">
        <div className="share-modal-title">Link to share:</div>
        <div>{url}</div>
        <div className="d-flex justify-content-center mt-4">
          {urlCopied ? (
            <DoneAllOutlined />
          ) : (
            <FileCopyOutlined className="pointer" onClick={setInClipboard} />
          )}
        </div>
      </div>
    </>
  );
}
export default ShareModal;
