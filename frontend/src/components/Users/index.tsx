import {
  Button,
  Flex,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AccountInterface } from "../Login/types";
import { apiClient } from "../../utils/apiClient";
import { colors } from "../../theme";
import { ProfileNav } from "../Profile/ProfileNav";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

export const Users = () => {
  const toast = useToast();
  const currentUser = useSelector((state: RootState) => state.auth.account);
  const [users, setUsers] = useState<AccountInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fakeReload, setFakeReload] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("user/all")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error!",
          description: "Could not get users",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fakeReload]);

  const handleDeleteUser = async (id: string) => {
    apiClient
      .delete(`user/delete/${id}`)
      .then((res) => {
        setFakeReload(!fakeReload);
        toast({
          title: "Success!",
          description: "User deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error!",
          description: "Could not delete user",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  if (loading)
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bg={colors.black}
        height="100vh"
      >
        <Spinner size="xl" color={colors.white} />
      </Flex>
    );

  return (
    <Flex
      direction={"column"}
      alignItems="center"
      justifyContent="center"
      bg={colors.black}
      minH="100vh"
    >
      <ProfileNav isNotOnProfile />
      <Flex
        width={"100vw"}
        height={"83vh"}
        direction={"column"}
        flex={1}
        p={10}
        justify={"flex-start"}
        alignItems={"center"}
      >
        <TableContainer color={colors.white} w={"100%"}>
          <Table variant={"simple"}>
            <Thead>
              <Tr>
                <Th color={colors.blue}>No.</Th>
                <Th color={colors.blue}>Name</Th>
                <Th color={colors.blue}>Email</Th>
                <Th color={colors.blue}>Role</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => {
                return (
                  <Tr key={user.id}>
                    <Td color={colors.blue}>{index + 1}</Td>
                    <Td>{user.fullName}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      {user.id !== currentUser?.id && (
                        <Flex justify={"space-evenly"} width={"100%"}>
                          <IconButton
                            icon={<EditIcon />}
                            aria-label="edit"
                            variant={"link"}
                            size={"sm"}
                            p={2}
                            color={colors.white}
                          />
                          <IconButton
                            icon={<DeleteIcon />}
                            aria-label="delete"
                            variant={"link"}
                            size={"sm"}
                            p={2}
                            color={colors.white}
                            onClick={() => {
                              handleDeleteUser(user.id);
                            }}
                          />
                        </Flex>
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};
