import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./card.css";

export const SkeletonCard = () => {
  return (
    <div className="card">
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={250}
        height={300}
      />
      <Skeleton animation="wave" variant="text" width={250} height={20} />
      <Skeleton animation="wave" />
      <Skeleton width="60%" animation="wave" />
    </div>
  );
};
