import Text from "../reusables/Text";
import { ClockIcon } from "@heroicons/react/outline";

export const dateMap: {
  [key: number]: string;
} = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

interface ITodaysDate {
  notFull?: boolean
}

const TodaysDate: React.FC<ITodaysDate> = ({notFull}) => {
  const today = new Date();
  const date: number = today.getDate();
  const month: number = today.getMonth();
  const year: number = today.getFullYear();



  const dateNode = (
    <div>
      {dateMap[month]} {date}, {year}
    </div>
  );

  return (
    <div className={`flex justify-center items-center border border-black px-5 py-3 mb-8 ${notFull ? "mb-0" : "w-full"}`}>
        <Text type='h4' textEng='Today:' textKor='오늘:' />
        <ClockIcon className="text-black h-4 w-4 mr-2 ml-4" />
      <Text type="h4" textEng={dateNode} textKor={dateNode} />
    </div>
  );
};

export default TodaysDate;
