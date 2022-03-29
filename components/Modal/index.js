import React from "react";
import styles from "./styles.module.scss";

export default function Modal(props) {
  const { children, onCancel, width } = props;
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal} style={{ width }}>
        <span className={styles.close} onClick={onCancel}>
          X
        </span>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}
