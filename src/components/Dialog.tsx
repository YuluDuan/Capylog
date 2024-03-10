import React from "react";

const Dialog = (props: { text: string; role: string }) => {
  const boxColor = props.role === "user" ? "user-text" : "capy-text";
  return <div className={`${boxColor} rounded-md`}>{props.text}</div>;
};

export default Dialog;
