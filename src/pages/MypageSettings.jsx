import { Box, Icon, VStack, Image, HStack, Flex, Text } from "@chakra-ui/react";

import { FaChevronLeft } from "react-icons/fa";
import { FiLogOut, FiTrash, FiChevronRight } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { Link, useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";
import { logout, deleteAccount } from "../api/user_api";

const MypageSettings = () => {
  const { userLoading, user, isLoggedIn } = useUser();
  const navigate = useNavigate();
  return (
    <Box>
      <NavBar />
      <Box
        maxW="lg"
        mx="auto"
        mt={10}
        p={6}
        border="1px solid black"
        borderRadius="2xl"
        boxShadow="md"
        height={"500px"}
      >
        <VStack>
          <HStack width={"100%"} justify={"space-between"}>
            <Link to={"/mypage"}>
              <Icon
                as={FaChevronLeft}
                boxSize={5}
                color="gray.400"
                _hover={{
                  color: "gray.600",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                }}
              ></Icon>
            </Link>
            <Box></Box>
          </HStack>

          <CgProfile size={120} />
          <Text fontSize={"lg"} fontWeight={"bold"}>
            {userLoading ? "Loading" : user?.name}
          </Text>

          <Box
            mt={4}
            width={"100%"}
            bg="white"
            borderRadius="md"
            overflow="hidden"
            boxShadow="sm"
          >
            {/* 로그아웃 항목 */}
            <Flex
              align="center"
              justify="space-between"
              px={4}
              py={4}
              _hover={{ bg: "gray.50", cursor: "pointer" }}
              onClick={async () => {
                try {
                  const res = await logout();
                  navigate("/");
                } catch (err) {
                  console.error("❌ 로그아웃 실패 ❌:", err);
                }
              }}
            >
              <Flex align="center" gap={3}>
                <Icon as={FiLogOut} boxSize={5} />
                <Text fontWeight="semibold">로그아웃</Text>
              </Flex>
              <Icon as={FiChevronRight} color="gray.500" />
            </Flex>

            {/* 회원 탈퇴 항목 */}
            <Flex
              align="center"
              justify="space-between"
              px={4}
              py={4}
              _hover={{ bg: "gray.50", cursor: "pointer" }}
              onClick={async () => {
                try {
                  const res = await deleteAccount();
                  navigate("/");
                } catch (err) {
                  console.error("❌ 회원 탈퇴 실패 ❌:", err);
                }
              }}
            >
              <Flex align="center" gap={3}>
                <Icon as={FiTrash} boxSize={5} />
                <Text fontWeight="semibold">회원 탈퇴</Text>
              </Flex>
              <Icon as={FiChevronRight} color="gray.500" />
            </Flex>
          </Box>
        </VStack>
      </Box>
      <Footer />
    </Box>
  );
};

export default MypageSettings;
