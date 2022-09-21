import React, { FC, ReactNode } from "react";

export const Container: FC<{ className?: string; children: ReactNode }> = ({
  children,
  className = "",
}) => {
  return <div className={`container ${className}`}>{children}</div>;
};
