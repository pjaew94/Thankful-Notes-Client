




const styles = {
  large: " mr-4 text-8xl 3xl:text-logo-3xl 3xl:mr-10",
  small: " mr-2 text-3xl"
}



const Logo: React.FC<{size: "large" | "small"}> = ({size}) => {
  return (
    <div
      className={`flex font-logo tracking-tighter bg-gradient-to-r from-green via-mustard to-red ${styles[size]}`}
      style={{ WebkitBackgroundClip: "text", color: "transparent" }}
    >
      153
    </div>
  );
};

export default Logo;
