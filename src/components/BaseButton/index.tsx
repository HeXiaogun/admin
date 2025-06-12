import React from "react";
import "./index.less";
import classNames from "classnames";

type Props = {
  /**
   *
   */
  children: React.ReactNode;
  type?: "add" | "edit" | "delete" | "search" | "reset";
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
};

const BaseButton = (props: Props) => {
  const { children, type = "add", onClick, style, className } = props;

  return (
    <>
      <button
        onClick={onClick}
        style={style}
        className={classNames(`baseButton ${type}`, className)}
      >
        {children}
      </button>
    </>
  );
};

export default BaseButton;
