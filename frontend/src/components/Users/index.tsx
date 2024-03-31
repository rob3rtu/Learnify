import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AccountInterface } from "../Login/types";
import { apiClient } from "../../utils/apiClient";
import { colors } from "../../theme";
import { ProfileNav } from "../Profile/ProfileNav";
import { DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { ChangeRoleModal } from "./ChangeRoleModal";

export const Users = () => {
  const toast = useToast();
  const currentUser = useSelector((state: RootState) => state.auth.account);
  const [users, setUsers] = useState<AccountInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AccountInterface[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [fakeReload, setFakeReload] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<AccountInterface | null>(
    null
  );

  const roles = ["admin", "teacher", "student", "all"];

  useEffect(() => {
    if (selectedUser !== null) onOpen();
  }, [selectedUser]);

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

  useEffect(() => {
    setFilteredUsers(
      users
        .filter((user) => {
          return filterBy === "all" ? true : user.role === filterBy;
        })
        .filter((user) => {
          return search === ""
            ? true
            : user.fullName.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search);
        })
    );
  }, [users, search, filterBy]);

  const handleOnClose = (newUsers?: AccountInterface[]) => {
    if (newUsers) {
      setUsers(newUsers);
    }

    onClose();
    setSelectedUser(null);
  };

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
        width={"100%"}
        alignItems={"center"}
        justify={"space-between"}
        p={10}
      >
        <InputGroup>
          <InputLeftElement pointerEvents={"none"}>
            <SearchIcon color={"white"} />
          </InputLeftElement>
          <Input
            width={"50%"}
            placeholder="Type user name/email"
            color={"white"}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </InputGroup>

        <Flex
          width={"100%"}
          gap={5}
          justify={"flex-end"}
          alignItems={"baseline"}
        >
          <Text fontFamily={"WorkSans-Medium"} color={"white"}>
            Filter by role:{" "}
          </Text>
          <Select
            variant={"flushed"}
            width={"15%"}
            color={"white"}
            value={filterBy}
            onChange={(e) => {
              setFilterBy(e.target.value);
            }}
          >
            {roles.map((role) => {
              return (
                <option key={role} value={role}>
                  {role}
                </option>
              );
            })}
          </Select>
        </Flex>
      </Flex>

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
              {filteredUsers.map((user, index) => {
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
                            onClick={() => {
                              setSelectedUser(user);
                            }}
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
              {filteredUsers.length === 0 && (
                <Tr>
                  <Td color={colors.blue}>404</Td>
                  <Td>User not found</Td>
                  <Td></Td>
                  <Td>ghost</Td>
                  <Td></Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>

        <ChangeRoleModal
          isOpen={isOpen}
          onClose={handleOnClose}
          selectedUser={selectedUser}
          availableRoles={roles.filter(
            (role) => role !== "all" && role !== selectedUser?.role
          )}
        />
      </Flex>
    </Flex>
  );
};
