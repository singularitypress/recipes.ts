import { Container } from "@components/atomic";
import React, { FC, ReactNode, useRef } from "react";

interface IProps {
  bg: string;
  darkBg: string;
  blur?: boolean;
  overlay?: boolean;
  children: ReactNode;
}

export const VideoHero: FC<IProps> = ({
  children,
  bg,
  darkBg,
  blur = true,
  overlay = true,
}) => {
  const lightVideo = useRef<HTMLVideoElement>(null);
  const darkVideo = useRef<HTMLVideoElement>(null);

  const opacity = overlay ? "bg-opacity-20 dark:bg-opacity-30" : "";
  const overlayClasses = overlay ? "bg-isabelline dark:bg-eerie-black" : "";
  const blurClasses = blur ? "backdrop-blur-md" : "";

  return (
    <div className="w-screen h-screen bg-cover relative overflow-hidden">
      <div className="absolute z-20 w-full h-full flex justify-center px-4 xl:px-0">
        <Container className="flex flex-col justify-center px-4">
          {children}
        </Container>
      </div>
      <div
        className={`absolute flex flex-col justify-center h-full z-10 items-start w-full ${blurClasses} ${overlayClasses} ${opacity}`}
      ></div>
      <video
        ref={lightVideo}
        className="max-hd:h-screen max-hd:max-w-none min-hd:w-screen dark:hidden"
        src={bg}
        autoPlay
        loop
        muted
      />
      <video
        ref={darkVideo}
        className="max-hd:h-screen max-hd:max-w-none min-hd:w-screen hidden dark:block"
        src={darkBg}
        autoPlay
        loop
        muted
      />
    </div>
  );
};
