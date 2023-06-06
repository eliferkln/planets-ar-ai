import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import styles from "./tensorflow.module.css";
const URL = "/models";

interface IProps {
  setModelName: (name: string) => void;
  modelName: string;
}

const Tensorflow: React.FC<IProps> = ({ setModelName, modelName }) => {
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [modelType, setModelType] = useState<any>([]);

  const [maxPredictions, setMaxPredictions] = useState<number>(0);

  async function init() {
    const modelURL = URL + "/model.json";
    const metadataURL = URL + "/metadata.json";
    const tmModel = await tmImage.load(modelURL, metadataURL);
    setModel(tmModel);
    setMaxPredictions(tmModel.getTotalClasses());
  }

  async function predict(webcamRef: any, labelContainer: any) {
    if (model && webcamRef && webcamRef.current && labelContainer) {
      const prediction = await model.predict(webcamRef.current.video);
      setModelType(prediction);

      const numPredictions = Math.min(
        maxPredictions,
        labelContainer.childNodes.length
      );

      for (let i = 0; i < numPredictions; i++) {
        const predictionText =
          prediction[i]?.className +
          ": " +
          prediction[i]?.probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = predictionText;
      }
    }
  }

  useEffect(() => {
    if (modelType[0]?.probability.toFixed(2) >= 0.9) {
      setModelName(modelType[0]?.className);
    } else if (modelType[1]?.probability.toFixed(2) >= 0.5) {
      setModelName(modelType[1]?.className);
    } else if (modelType[2]?.probability.toFixed(2) >= 0.9) {
      setModelName(modelType[2]?.className);
    } else if (modelType[3]?.probability.toFixed(2) >= 0.9) {
      setModelName(modelType[3]?.className);
    } else if (modelType[4]?.probability.toFixed(2) >= 0.9) {
      setModelName(modelType[4]?.className);
    }

    init();
  }, [modelType, modelName, setModelName]);

  const webcamRef = React.useRef<Webcam>(null);

  const loop = async () => {
    await predict(webcamRef, document.getElementById("label-container"));
    window.requestAnimationFrame(loop);
  };
  return (
    <div>
      <div className={styles["tensorflow"]}>
        <h2>Detected planets and information</h2>
        <button type="button" onClick={loop}>
          Start
        </button>
        <div className={styles["cam"]}>
          <Webcam
            audio={false}
            ref={webcamRef}
            style={{ height: "380px", width: "550px" }}
            screenshotFormat="image/jpeg"
          />
        </div>
        <div id="label-container" className={styles["class"]}>
          {Array.from(Array(maxPredictions).keys()).map((index) => (
            <div key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tensorflow;
