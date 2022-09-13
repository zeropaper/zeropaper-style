import React from "react";

import Slim from "./assets/zeropaper-slim.svg";
import Fat from "./assets/zeropaper-fat.svg";

type LogoProps = {
  slim?: boolean;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
};

const Logo = ({ slim, className }: LogoProps) => {
  const Comp = slim ? Slim : Fat;
  return <Comp className={`${className} .site-logo`} />;
};

Logo.defaultProps = {
  slim: false,
  className: null,
};

export default Logo;
