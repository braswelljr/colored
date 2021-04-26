import { useEffect } from "react";

const ProgressSlider = ({ color, slide }) => {
  useEffect(() => {
    let slide = false;
    const slider = document.querySelector("#slider");
    const progress = document.querySelector("#progress");
    const container = document.querySelector("#container");
    let cw = container.clientWidth; //-> get width of container
    let pw = progress.clientWidth; //-> get width of progress
    let x = slide.value;

    slider.addEventListener("mousedown", event => {
      x = event.offsetY;
      slide = true;
    });

    slider.addEventListener("mousemove", event => {
      event = window.event;
      event.preventDefault();
      console.log(cw, pw);
    });

    slider.addEventListener("mouseup", event => {
      event = window.event;
      event.preventDefault();
      console.log(cw, pw);
    });
  }, []);

  return (
    <>
      <div
        id="container"
        style={{ backgroundColor: color.background }}
        className="relative w-full h-3 text-center bg-gray-300 rounded-md"
      >
        <div
          id="progress"
          style={{ backgroundColor: color.foreground, width: `${slide.value}%` }}
          className="absolute inset-y-0 left-0 rounded-md"
        ></div>
        <button
          id="slider"
          type="button"
          style={{ marginLeft: `${slide.value - 1}%`, backgroundColor: color.foreground }}
          className="absolute inset-0 focus:outline-none hover:cursor-[grab] w-2 h-6 -mt-1.5 rounded-md active:curser-[grabbing]"
        ></button>
      </div>
    </>
  );
};

export default ProgressSlider;
