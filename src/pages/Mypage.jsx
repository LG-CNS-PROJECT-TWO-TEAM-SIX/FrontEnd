import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  Grid,
  GridItem,
  Image,
  VStack,
  Wrap,
  WrapItem,
  Tag,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { CiSettings } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

import useUser from "../lib/useUser";
import useUserFavorites from "../lib/useUserFavorites";
import { getUserInterests } from "../api/user_api";
import { useEffect, useState } from "react";

const Mypage = () => {
  const { userLoading, user } = useUser();
  const { favoritesLoading, favorites } = useUserFavorites();
  const [interestsRes, setInterestsRes] = useState([]);

  useEffect(() => {
    const interests = async () => {
      try {
        const res = await getUserInterests();
        setInterestsRes(res);
      } catch (err) {
        console.error("❌ 유저 최애 가져오기 실패 ❌:", err);
      }
    };

    interests();
  }, []);

  return (
    <Flex direction="column" minH="100vh">
      <NavBar />

      <Box px={16} flex="1">
        {/* 상단 프로필 영역 */}
        <Flex
          bg="gray.100"
          p={10}
          borderRadius="2xl"
          justify="space-between"
          mb={5}
          mt={0}
        >
          <Flex align="center">
            <CgProfile size={180} />
            <Flex ml={8} direction={"column"} align={"start"}>
              <Text fontWeight="bold" fontSize="xl">
                {userLoading ? "Loading" : user?.name}
              </Text>
              <Text color="gray.600">
                {userLoading ? "Loading" : user?.email}
              </Text>
              <Text mt={4} mb={2} fontWeight="bold">
                관심 키워드
              </Text>
              <Wrap mb={6} justify="start">
                {interestsRes.map((k, index) => (
                  <WrapItem mr={1} key={index}>
                    <Tag.Root size="xl" borderRadius="md" variant="outline">
                      <Tag.Label>{k.name}</Tag.Label>
                    </Tag.Root>
                  </WrapItem>
                ))}
              </Wrap>
            </Flex>
          </Flex>
          <VStack justify={"space-between"} align={"end"}>
            <Link to={"/mypage/settings"}>
              <Icon
                as={CiSettings}
                boxSize={8}
                color="gray.400"
                _hover={{
                  color: "gray.600",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                }}
              />
            </Link>
            <Link to="/mypage/edit">
              <Button
                _hover={{
                  color: "gray.500",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                }}
              >
                회원정보수정
              </Button>
            </Link>
          </VStack>
        </Flex>

        {/* 하단 뉴스 카드 영역 */}
        <Box
          border={"1px solid "}
          borderColor={"gray.200"}
          p={4}
          borderRadius="xl"
        >
          <Flex justify={"space-between"}>
            <Text fontSize={20} fontWeight="bold" mb={4} ml={1}>
              좋아요한 뉴스 모아보기
            </Text>
            <Link to="/mypage/favorites">
              <Icon
                as={FaPlus}
                boxSize={6}
                color="gray.400"
                _hover={{
                  color: "gray.600",
                  transform: "scale(1.05)",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Flex>

          <Grid
            templateColumns="repeat(4, minmax(250px, 1fr))"
            rowGap={12}
            columnGap={8}
          >
            {favoritesLoading
              ? Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <GridItem
                      key={index}
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      boxShadow="md"
                    >
                      <Skeleton height="180px" mb={4} />
                      <SkeletonText noOfLines={1} spacing="4" mb={4} />
                      <SkeletonText noOfLines={3} spacing="2" />
                    </GridItem>
                  ))
              : favorites?.slice(0, 8).map((item) => (
                  <GridItem
                    key={item.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Image
                      src={item.newsThumbnail}
                      alt={item.newsTitle}
                      height="180px"
                      width="100%"
                      objectFit="cover"
                      borderRadius="md"
                      mb={4}
                    />
                    <Text fontWeight="bold" fontSize="xl" mb={2}>
                      {item.newsTitle}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {item.newsSummary}
                    </Text>
                  </GridItem>
                ))}
          </Grid>
        </Box>
      </Box>

      <Footer />
    </Flex>
  );
};

export default Mypage;
