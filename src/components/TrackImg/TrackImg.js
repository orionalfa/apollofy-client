import "./styles.css";

export default function TrackImg({ urlCover }) {
  return (
    <>
      <div className="track-image-component-container">
        <div
          className="track-image-component-image"
          style={{ backgroundImage: `url(${urlCover})` }}
        ></div>
        <div className="track-play-hover" />
      </div>
    </>
  );
}
