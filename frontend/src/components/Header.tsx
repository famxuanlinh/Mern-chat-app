import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import DrawerContentCustom from "./DrawerContentCustom";

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Flex>
        <Box>
          <Button onClick={onOpen}>Search user</Button>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
              <DrawerBody>
                <DrawerContentCustom />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
        <Spacer />
        <Box>Talk A Tive</Box>
        <Spacer />
        <Box>User</Box>
      </Flex>
    </Box>
  );
};

export default Header;
