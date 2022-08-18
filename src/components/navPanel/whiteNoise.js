import React, { useEffect, useState, useRef } from "react";

/**
 * @name WhiteNoise
 * @description WhiteNoise generate a canvas html element with white noise animated effect.
 * @param {float} pixelRatio - Allows to scale the pixel size, relative to canvas size. Example. Ratio 0.3 do a calculation of 0.3 of size of canvas, and then scale 10x. Default pixelRatio is 0.5. Lower pixelRatio 👉 bigger pixel size, less pixels number, less cpu process. Not related to screen pixelRatio.
 * @param {integer} darkness - The darkness color of noise. [0-254] Default 0.
 * @param {integer}whiteness - The whiteness color of noise. [1-255] Default 255.
 * @returns {JSX.Element}
 * @example
 * return (
 *  <WhiteNoise />
 * )
 */

const WhiteNoise = ({ pixelRatio = 0.5, darkness = 0, whiteness = 255 }) => {
  const canvasRef = useRef();
  const dataImageRef = useRef();
  const requestRef = useRef();

  const render = () => {
    for (let i = 0; i < dataImageRef.current.data.length; i++) {
      dataImageRef.current.data[i++] =
        dataImageRef.current.data[i++] =
        dataImageRef.current.data[i++] =
          darkness + Math.random() * (whiteness - darkness);
    }
    const ctx = canvasRef.current.getContext("2d");
    ctx.putImageData(dataImageRef.current, 0, 0);
    requestRef.current = requestAnimationFrame(render);
  };

  const updateCanvasRealSize = () => {
    setCanvasSize(getCanvasRealSize);
  };

  const getCanvasRealSize = () => {
    if (!canvasRef.current) return [512, 512];
    if (canvasRef.current.clientWidth === 0) return [512, 512];
    return [canvasRef.current.clientWidth, canvasRef.current.clientHeight];
  };
  const [canvasSize, setCanvasSize] = useState(getCanvasRealSize());

  useEffect(() => {
    if (canvasRef.current) {
      const [width, height] = getCanvasRealSize();

      canvasRef.current.width = width * pixelRatio;
      canvasRef.current.height = height * pixelRatio;
      const ctx = canvasRef.current.getContext("2d");
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      dataImageRef.current = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      requestAnimationFrame(function draw() {
        requestAnimationFrame(draw);
      });
    }
  }, [canvasRef, canvasSize]);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined")
      window.addEventListener("resize", updateCanvasRealSize);
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("resize", updateCanvasRealSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default WhiteNoise;
