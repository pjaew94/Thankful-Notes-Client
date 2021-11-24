import { useContext } from "react";
import { group } from "../../context/reducers/group";
import Text from "../reusables/Text";
import { GlobalContext } from "./../../context/Provider";
import { dateMap } from "./TodaysDate";

const AboutUser: React.FC = () => {
  const { authState, groupState } = useContext(GlobalContext);

  const dateSliced = authState?.user?.date_joined.slice(0, 10);
  const dateYear = dateSliced?.slice(0, 4);
  const dateMonth = dateMap[Number(dateSliced?.slice(5, 7)) - 1];
  const dateDay = dateSliced?.slice(8, 10);
  console.log(dateYear, dateMonth, dateDay);
  const postCount = authState?.user?.current_day! - 1;

  return (
    <div className="w-full flex flex-col pt-6">
      <Text
        type="h7"
        textEng={"Welcome back, " + authState?.user?.first_name + "!"}
        textKor={"안녕하세요 " + authState?.user?.first_name + " 님!"}
      />
      <Text
        type="p"
        textEng="Here are what we know about you so far!"
        textKor="당신의 정보"
        customStyles="text-gray-400 mb-6"
      />
      <div className="flex mb-2 flex-wrap">
        <Text
          type="label"
          textEng={"🖐️ You've been a member since"}
          textKor="🖐️ 감사노트 가입한 날짜:"
        />
        <Text
          type="label"
          textEng={dateMonth + " " + dateDay + ", " + dateYear}
          textKor={dateMonth + " " + dateDay + ", " + dateYear}
          customStyles="ml-1 font-bold"
        />
      </div>

      <div className="flex mb-2 flex-wrap">
        <Text
          type="label"
          textEng={"📋 You've posted "}
          textKor="📋 게시올린 수:"
        />
        <Text
          type="label"
          textEng={postCount + (postCount === 1 ? " time" : " times")}
          textKor={postCount}
          customStyles="ml-1 font-bold"
        />
      </div>

      {groupState?.members?.length === 0 ? (
        <div className="flex mb-2 flex-wrap">
        <Text
          type="label"
          textEng={"❤️ You're current not associated with any group."}
          textKor="❤️ 지금은 아무 그룹이나 연결 되어 있지 않습니다."
        />
        
      </div>
      ) : (
        <div className="flex mb-2 flex-wrap">
          <Text
            type="label"
            textEng={"❤️ You're associated with the group "}
            textKor="❤️ 그룹 이름:"
          />
          <Text
            type="label"
            textEng={groupState.group_name}
            textKor={postCount}
            customStyles="ml-1 font-bold"
          />
        </div>
      )}
    </div>
  );
};

export default AboutUser;
