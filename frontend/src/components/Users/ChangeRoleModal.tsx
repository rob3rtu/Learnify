import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AccountInterface } from "../Login/types";
import { apiClient } from "../../utils/apiClient";

interface ChangeRoleModalProps {
  isOpen: boolean;
  onClose: (val?: AccountInterface[]) => void;
  availableRoles: string[];
  selectedUser: AccountInterface | null;
}

export const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({
  isOpen,
  onClose,
  availableRoles,
  selectedUser,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState<string>(availableRoles[0]);

  useEffect(() => {
    setNewRole(availableRoles[0]);
  }, [availableRoles, selectedUser]);

  const handleUpdateRole = async () => {
    setLoading(true);
    apiClient
      .put(`user/change-role/${newRole}/${selectedUser?.id}`)
      .then((res) => {
        onClose(res.data);
        toast({
          title: "Success!",
          description: "User role updated!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error!",
          description: "Couldn't update user's role!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update role</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={"column"} alignItems={"flex-start"} gap={5}>
            <Text fontFamily={"WorkSans-SemiBold"} fontSize={20}>
              {selectedUser?.fullName}
            </Text>
            <Flex width={"100%"} alignItems={"center"} justify={"space-evenly"}>
              <Text fontFamily={"WorkSans-SemiBold"} fontSize={18}>
                {selectedUser?.role}
              </Text>
              <Text fontFamily={"WorkSans-SemiBold"} fontSize={18}>
                {`--->`}
              </Text>
              <Select
                width={"30%"}
                value={newRole}
                onChange={(e) => {
                  setNewRole(e.target.value);
                }}
              >
                {availableRoles.map((role) => {
                  return (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  );
                })}
              </Select>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleUpdateRole}
            isLoading={loading}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
