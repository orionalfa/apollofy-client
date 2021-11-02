import React from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTrack } from "../../redux/stringTest/action";

function ReducerTest() {
  const dispatch = useDispatch();
  const stringTest = useSelector((state) => state.stringTest);
  const inputRef = useRef();

  const handleSetTrack = () => {
    const currentValue = inputRef.current.value;
    dispatch(setTrack(currentValue));
    inputRef.current.value = "";
  };
  return (
    <div className="App">
      <h1 className="AppTitle">{stringTest}</h1>
      <p className="AppIntro">
        <input type="text" className="" ref={inputRef} />

        <button className="" onClick={handleSetTrack}>
          Change Track
        </button>
      </p>
    </div>
  );
}

export default ReducerTest;
