import { useSessionStorageState } from "ahooks";
import { UserInfo } from "./type";

/**
 * 获取用户信息的hooks
 * @returns 用户信息
 */
const useUserInfo = () => {
  const [user, updateUser] = useSessionStorageState<UserInfo>("userInfo", {
    defaultValue: {
      avatar: "",
      id: "",
      name: "",
      phone: "",
      role: "",
    },
    listenStorageChange: true,
  });
  return { user, updateUser };
};

export default useUserInfo;
