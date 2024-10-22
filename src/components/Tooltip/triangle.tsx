import React from "react";

interface TriangleProps {
  className?: string;
  fill?: string;
  style?: React.CSSProperties;
  dataRotate?: number;
}

function Triangle({
  className,
  fill,
  style,
  dataRotate
}: TriangleProps) {
  return (
    <svg
      width="267.9231mm"
      height="151.98865mm"
      viewBox="0 0 267.92309 151.98865"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ ...style, fill }}
      data-rotate={dataRotate}
    >
      <path
        transform="translate(57.6802,-135.11527)"
        d="m 76.279714,135.11527 c -19.809396,0.015 -38.275595,12.65429 -49.102068,33.60828 l -1.291998,2.82619 -1.210993,2.64945 -17.8645938,39.0834 -4.093e-4,-5.2e-4 c 0,0 -6.97505722,15.23255 -16.8696169,36.90938 -9.919274,21.67289 -27.830164,35.55619 -47.620235,36.91196 h 98.232767 35.728778 35.729185 l -4e-4,5.1e-4 h 98.23277 c -19.77496,-1.35473 -37.67302,-15.21844 -47.59693,-36.86286 l -13.6572,-29.87932 -3.23573,-7.07915 -17.86459,-39.0834 -1.27891,-2.79777 -1.21181,-2.651 C 114.57311,147.78021 96.098849,135.12936 76.279714,135.11527 Z"
      />
    </svg>
  );
}

export default Triangle