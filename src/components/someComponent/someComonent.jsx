import React, { useRef } from "react";

export const SomeComponent = () => {
  const vidRef = useRef(null);
  const handleLoadedmetadata = async (e) => {
    console.log(e.target.duration);
    let video = e.target;
    video.volume = 0;
    let div = document.getElementById("canvasDiv");
    let canvas;
    for (let i = 0; i <= video.duration; i = i + video.duration / 5) {
      canvas = document.createElement("canvas");
      canvas.width = "350";
      canvas.height = "250";
      div.append(canvas);
      let ctx = canvas.getContext("2d");
      video.currentTime = i;
      await video.play();
      ctx.drawImage(video, 0, 0);
    }
  };
  return (
    <div>
      <video
        ref={vidRef}
        //src="https://d2xzmw6cctk25h.cloudfront.net/record/113845/attachment/65ae3d0987c9d31d1d8286e1bf526b37.mp4"
        src="http://techslides.com/demos/sample-videos/small.mp4"
        controls={true}
        width="350"
        height="250"
        onLoadedMetadata={handleLoadedmetadata}
      ></video>
      <div id="canvasDiv"></div>
    </div>
  );
};
