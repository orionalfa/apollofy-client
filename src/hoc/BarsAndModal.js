import React from "react";
import { useSelector } from "react-redux";

import RightMenu from "../components/RightMenu";
import BottomMenu from "../components/BottomMenu";
import ModalTrackUp from "../components/ModalTrackUp";
import DialogueBox from "../components/DialogueBox";
import DialoguePlaylist from "../components/DialoguePlaylist";
import UpdateModal from "../components/UpdateTrackModal";
import DeleteModal from "../components/DeleteTrackModal";
import InformationModal from "../components/InformationModal";
import PlaylistSelector from "../components/PlaylistSelector";
import ShareModal from "../components/ShareModal";

function BarsAndModal(WrappedComponent) {
  function WrapperComponent() {
    const { active, activePlaylist } = useSelector(
      (state) => state.dialogueHandler,
    );

    const {
      uploadModal,
      updateModal,
      deleteModal,
      myPlaylistModal,
      informationModal,
      shareModal,
    } = useSelector((state) => state.modalsHandler);

    return (
      <>
        <BottomMenu />
        <RightMenu />
        {active && <DialogueBox />}
        {activePlaylist && <DialoguePlaylist />}
        {deleteModal && <DeleteModal />}
        {updateModal && <UpdateModal />}
        {uploadModal && <ModalTrackUp />}
        {informationModal && <InformationModal />}
        {myPlaylistModal && <PlaylistSelector />}
        {shareModal && <ShareModal />}
        <WrappedComponent />
      </>
    );
  }

  return WrapperComponent;
}

export default BarsAndModal;
