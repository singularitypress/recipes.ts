import React, { FC, ReactNode } from "react";

export const Container: FC<{ className?: string; children: ReactNode }> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`container my-0 mx-auto px-8 ${className}`}>{children}</div>
  );
};
