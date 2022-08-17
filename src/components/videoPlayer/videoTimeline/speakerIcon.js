import * as React from "react";

const speakerIcon = ({ color = "#fff", vol = 0 }) => (
  <svg
    viewBox={`0 0 16 16`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 0H8v1H7v1H6v1H5v1H4v1H0v6h4v1h1v1h1v1h1v1h1v1h1V0ZM7 3h1v1H7V3ZM6 5V4h1v1H6Zm0 0v1H5V5h1Z"
      fill={color}
    />
    {(!vol || vol === 0) && (
      <path
        d="M10 5h1v1h-1V5ZM12 7h-1V6h1v1ZM14 7h-2v2h-1v1h-1v1h1v-1h1V9h2v1h1v1h1v-1h-1V9h-1V7ZM15 6v1h-1V6h1ZM15 6V5h1v1h-1Z"
        fill={color}
      />
    )}
    {vol >= 1 && (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 6H11V7H10V6ZM11 9V7H12V9H11ZM11 9V10H10V9H11Z"
        fill={color}
      />
    )}
    {vol >= 2 && (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4H12V5H11V4ZM13 6V5H12V6H13ZM13 10V6H14V10H13ZM12 11V10H13V11H12ZM12 11V12H11V11H12Z"
        fill={color}
      />
    )}
    {vol === 3 && (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 3h1v2h1v6h-1v2h-1v1h1v-1h1v-2h1V5h-1V3h-1V2h-1v1Z"
        fill={color}
      />
    )}
  </svg>
);

export default speakerIcon;
