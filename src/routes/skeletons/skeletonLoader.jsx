import React from "react";
import styles from "./skeletonLoader.module.css"; // Create a CSS module for styling

const SkeletonLoader = ({ count }) => {
  const skeletonItems = new Array(count).fill(null);

  return (
    <div className={styles.skeletonContainer}>
      {skeletonItems.map((_, index) => (
        <div key={index} className={styles.skeletonProduct} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
