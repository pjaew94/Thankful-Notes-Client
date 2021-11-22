import Link from "next/link";
import { useState } from "react";

interface ILogoLink {
  white?: boolean
}

const LogoLink: React.FC<ILogoLink> = ({white}) => {

  const pinkDot = (
    <span className="font-sans text-3xl text-hotPink font-bold">.</span>
  );
  const shortenedLogo = (
    <span className={`font-sans text-3xl font-bold ${white && "text-white"}`}>t{pinkDot}n</span>
  );

  return (
    <Link href="/">
      <a
        className="font-sans text-3xl lg:hover:scale-110"
      >
        {shortenedLogo}
      </a>
    </Link>
  );
};

export default LogoLink;
