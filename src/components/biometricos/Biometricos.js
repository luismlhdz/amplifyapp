import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/webcam/style.css";

const WeCamApp = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  /*const stripRef = useRef(null);*/

  const [imageData, setImageData] = useState({ src: "inicial", show: false });

  
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const changeImageData = (srcInf, showInf) =>{
    setImageData({ src: srcInf, show: showInf })
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
    }, 200);
  };

  const takePhoto = () => {
    let photo = photoRef.current;
    /*let strip = stripRef.current;*/

    const data = photo.toDataURL("image/jpeg");
    /*
    console.warn(data);
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "myWebcam");
    link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    strip.insertBefore(link, strip.firstChild);
    */
    changeImageData(data, true);
  };


  
  return (
    <div className="container">
      
      <div className="webcam-video">
        <button onClick={() => takePhoto()}>Take a photo</button>
        <video
          onCanPlay={() => paintToCanvas()}
          ref={videoRef}
          className="player"
        />
        <canvas ref={photoRef} className="photo" />
        {/* <div className="photo-booth">
          <div ref={stripRef} className="strip" />
        </div> */}
      </div>
      <div className="webcam-photo">
          {
            imageData.show && (
                <div>
                    <a href={imageData.src} download="selfie.png">
                        <img src={imageData.src} alt='thumbnail'/>
                    </a>
                </div>
            )
          }
      </div>
    </div>
  );
};

export default WeCamApp;
