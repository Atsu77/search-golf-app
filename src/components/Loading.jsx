import React from "react";

export const Loading = ({ loading }) => {
  return loading ? (
    <div className="loading">
      <div className="loading-image">
        <img
          src="https://media.giphy.com/media/y1ZBcOGOOtlpC/giphy.gif"
          alt="golf-gif"
        />
      </div>
    </div>
  ) : (
    <></>
  );
};
