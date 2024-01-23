"use client"; //all components are by default server side so need to specify anything client facing
import { CustomButtonProps } from "@/types";

//import different images for the button
import Image from "next/image";

//Button that can be used as props to perform subsets of function
// const below destructure the props
const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
  isDisabled
}: CustomButtonProps) => {
  return (
    //states for button
    <button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="right icon"
            fill
            className="object-contain"
          ></Image>
        </div>
      )}
    </button>
  );
};

export default CustomButton;
