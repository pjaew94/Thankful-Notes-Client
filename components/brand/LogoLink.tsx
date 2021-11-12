import Link from "next/link";
import { useState } from "react";

const LogoLink: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const pinkDot = <span className='font-sans text-3xl text-hotPink font-bold'>.</span>
  const expandedLogo = <span className='font-sans text-3xl font-bold'>thankful{pinkDot}notes</span>
  const shortenedLogo = <span className='font-sans text-3xl font-bold'>t{pinkDot}n</span>
  
  return (
    <Link href='/'>
      <a className="font-sans text-3xl">{hovered ? expandedLogo : shortenedLogo}</a>
    </Link>
  );
};

export default LogoLink;
