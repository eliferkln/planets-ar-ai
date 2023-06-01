import React from "react";
import styles from "./container.module.css";
import Model from "../model/model";

interface IProps {
  modelName: string;
}
const Container: React.FC<IProps> = ({ modelName }) => {
  return (
    <div>
      <div className={styles["cardWrapper"]}>
        <div className={styles["cardGrid"]}>
          <div className={styles["card"]}>
            <Model modelName={modelName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
