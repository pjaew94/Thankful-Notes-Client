import { getLocalStorage } from "../../context/call-backs";
import { useContext } from "react";
import { GlobalContext } from "./../../context/Provider";
import { IGroupState } from "../../context/types";
import { motion } from "framer-motion";
import { PostListCardsVariants, PostListContainer } from "../../motion";
import Text from "../reusables/Text";
import Button from "../reusables/Button";
import { useRouter } from "next/router";

interface IGroupMemberCard {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  postCount: number | null;
}

const GroupList: React.FC = () => {
  const { groupState } = useContext(GlobalContext);

  const groupInfo: IGroupState = getLocalStorage("groupInfo", groupState);
  return (
    <motion.div
      className="w-full grid grid-cols-1 gap-4 md:grid-cols-2"
      variants={PostListContainer}
      initial="initial"
      animate="animate"
    >
      {groupInfo.members?.map((m) => {
        return (
          <GroupMemberCard
            key={m.username}
            firstName={m.first_name}
            lastName={m.last_name}
            username={m.username}
            postCount={m.current_day}
          />
        );
      })}
    </motion.div>
  );
};

const GroupMemberCard: React.FC<IGroupMemberCard> = ({
  firstName,
  lastName,
  username,
  postCount,
}) => {
  const nameInitials = firstName!.slice(0, 1) + lastName!.slice(0, 1);

  const router = useRouter();

  return (
    <motion.div
      className="flex w-full border border-gray-300 px-5 py-5 group lg:hover:shadow-md"
      variants={PostListCardsVariants}
    >
      <div className="flex justify-center items-center h-14 w-14 bg-white lg:group-hover:bg-white rounded-full mr-3">
        <Text
          type="h4"
          textEng={nameInitials}
          textKor={nameInitials}
          customStyles="font-bold text-black lg:group-hover:text-black"
        />
      </div>

      <div className="flex flex-col justify-center">
        <Text
          type="p"
          textEng={username}
          textKor={username}
          customStyles="text-gray-400 font-bold lg:group-hover:text-black"
        />
        <Text
          type="p"
          textEng={firstName! + " " + lastName!}
          textKor={firstName! + " " + lastName!}
          customStyles="text-gray-400 lg:group-hover:text-black"
        />
      </div>

      {/* <motion.button
        className={`h-full px-4 border border-gray-300 ml-auto cursor-pointer lg:hover:scale-105 lg:hover:border-black `}
        onClick={() => router.push("/profile/" + username)}
        whileTap={{ scale: 0.95 }}
      >
        <Text
          type="h4"
          textEng="Visit"
          textKor="Visit"
          customStyles="font-bold text-black"
        />
      </motion.button> */}
    </motion.div>
  );
};

export default GroupList;
