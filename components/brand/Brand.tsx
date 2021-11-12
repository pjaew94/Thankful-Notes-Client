import { useContext } from "react";
import { GlobalContext } from "../../context/Provider";

const Brand: React.FC<{ size: "small" | "large" }> = ({ size }) => {
  const { languageState } = useContext(GlobalContext);

  // This was done to allow two different divs based on language and also based on size of the logo
  const style = {
    large: (
      <div>
        {languageState.korean ? (
          <div className="font-kor font-extralight text-3xl 3xl:text-brand-3xl">
            감사노트
          </div>
        ) : (
          <div className="font-light text-2xl 3xl:text-brand-3xl">
            Thankful Note
          </div>
        )}
      </div>
    ),
    small: <div className='font-sans text-3xl'>t.n</div>,
  };

  return (
    style[size]
  );
};

export default Brand;
