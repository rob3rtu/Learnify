import { collection, getDocs } from "firebase/firestore";
import { firestore, storage } from "../../firebase-config";
import { TeacherInterface } from "./types";
import { useDispatch } from "react-redux";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export const useLoginApi = () => {
  const dispatch = useDispatch();

  const setUserAccount = async (userInfo: {
    email: string;
    displayName: string;
    uid: string;
  }) => {
    const resp = await getDocs(collection(firestore, "teachers"));
    const data: TeacherInterface[] = [];
    resp.forEach((doc) => {
      data.push({ ...doc.data() } as TeacherInterface);
    });

    let role = "student";
    let profileImage: string | null = null;
    if (data.map((t) => t.email).find((mail) => mail === userInfo.email)) {
      role = "profesor";
    }

    listAll(ref(storage, `${userInfo.email}`)).then(async (images) => {
      const profileImageReference = images.items.filter(
        (image) => image.name.split(".")[0] === "profile-image"
      )[0];

      if (!!profileImageReference) {
        profileImage = await getDownloadURL(profileImageReference);
      }

      dispatch({
        type: "login/setAccount",
        payload: {
          email: userInfo.email,
          fullName: userInfo.displayName,
          role: role,
          profileImage: profileImage,
          uid: userInfo.uid,
        },
      });
    });
  };

  return { setUserAccount };
};
