import React from "react";

export default function Ripple(props) {
  return (
    <svg
      style={{
        margin: "auto",
        display: "block",
        shapeRendering: "auto"
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="3.73549"
        fill="none"
        stroke="#85a2b6"
        strokeWidth="2"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="-0.5s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="-0.5s"
        ></animate>
      </circle>
      <circle
        cx="50"
        cy="50"
        r="27.0962"
        fill="none"
        stroke="#bbcedd"
        strokeWidth="2"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="1s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
        ></animate>
      </circle>
    </svg>
  );
}
