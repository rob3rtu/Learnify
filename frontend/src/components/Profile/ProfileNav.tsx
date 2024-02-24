import { Avatar, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { colors } from "../../theme";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useRef } from "react";
import { storage } from "../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { apiClient } from "../../utils/apiClient";
import { RootState } from "../../Store";
import { AccountInterface } from "../Login/types";

interface ProfileNavProps {
  isNotOnProfile?: boolean;
  otherUser?: AccountInterface | null;
}

export const ProfileNav: React.FC<ProfileNavProps> = ({
  isNotOnProfile,
  otherUser,
}) => {
  const toast = useToast();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.auth.account);

  const handleSelectImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    const profileImageRef = ref(storage, `${user?.email}/profile-image.jpg`);

    if (file) {
      uploadBytes(profileImageRef, file).then(async () => {
        const downloadURL = await getDownloadURL(profileImageRef);

        try {
          await apiClient.put("user/update-profile-image", {
            url: downloadURL,
          });

          dispatch({
            type: "login/setAccount",
            payload: {
              ...user,
              profileImage: downloadURL,
            },
          });

          toast({
            title: "Looking good",
            description: "Image updated successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } catch (err) {
          toast({
            title: "Error!",
            description: "Could not save the image",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    }
  };

  return (
    <Flex
      // position="absolute"
      // top={0}
      zIndex={999}
      bg={colors.black}
      height="17vh"
      width="100vw"
      borderBottomColor={colors.white}
      borderBottomWidth={1}
      direction="column"
      alignItems="center"
      padding={5}
    >
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding="0 20px 15px 20px"
        width="100%"
      >
        <Text
          fontFamily="WorkSans-BoldItalic"
          color={colors.white}
          fontSize={25}
          cursor="pointer"
          onClick={() => {
            nav("/");
          }}
        >
          LEARNIFY
        </Text>
        <Stack spacing={4} align="center">
          <Avatar
            src={
              otherUser
                ? otherUser?.profileImage ?? undefined
                : user?.profileImage ?? undefined
            }
            fontFamily="WorkSans-Regular"
            cursor="pointer"
            name={
              otherUser
                ? otherUser.fullName
                : user?.fullName ?? user?.email.split("@")[0]
            }
            size="md"
            bg={colors.blue}
            onClick={() => {
              if (isNotOnProfile) nav("/profile");
              else if (!otherUser) fileInputRef.current?.click();
            }}
          ></Avatar>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleSelectImage}
          />
        </Stack>
      </Flex>
      <Flex
        position="absolute"
        alignSelf="center"
        flexDirection="column"
        alignItems="center"
      >
        <Text fontFamily="WorkSans-Bold" color="white" fontSize={30}>
          {otherUser
            ? otherUser.fullName
            : user?.fullName ?? user?.email.split("@")[0]}
        </Text>
        <Text fontFamily="WorkSans-Regular" color={colors.white} fontSize={20}>
          {otherUser ? otherUser.role : user?.role}
        </Text>
      </Flex>
    </Flex>
  );
};
