import React from "react";
import { BallTriangle } from "react-loader-spinner";

function Loading() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="rgb(250, 82, 56)"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
}

export default Loading;
