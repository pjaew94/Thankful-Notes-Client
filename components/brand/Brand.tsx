import { useContext } from "react";
import { GlobalContext } from "../../context/Provider";

const Brand: React.FC = () => {
  const { languageState } = useContext(GlobalContext);

  return (
    <div>
      {languageState.korean ? (
        <div className="font-kor font-extralight text-3xl 3xl:text-brand-3xl">감사노트</div>
      ) : (
        <div className="font-light text-2xl 3xl:text-brand-3xl">Thankful Note</div>
      )} 
    </div>
  );
};

export default Brand;
