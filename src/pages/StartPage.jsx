import {
  Box,
  Heading,
  HStack,
  Icon,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const StartPage = () => {
  return (
    <Box
      bg="black"
      color="white"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={{ base: 6, md: 20 }}
    >
      <Heading fontSize={{ base: "4xl", md: "6xl" }} mb={12}>
        Personalized News
      </Heading>

      <Text fontSize={{ base: "md", md: "lg" }} mb={10}>
        사용자의 관심사를 기반으로 최신 뉴스를 자동으로 선별해주는 AI 기반
        맞춤형 뉴스 플랫폼입니다.
        <br /> 정치, 경제, 기술, 스포츠 등 다양한 분야의 뉴스를 분석해, 당신에게
        꼭 필요한 정보만 선별하여 제공합니다. 더 이상 쏟아지는 뉴스 속에서
        헤매지 마세요. <br />
        당신만을 위한 스마트 뉴스 서비스, 지금 바로 경험해보세요!
      </Text>

      <HStack justifyContent="center">
        <ChakraLink
          as={RouterLink}
          to="/login"
          fontSize="lg"
          fontWeight="bold"
          display="inline-flex"
          alignItems="center"
          color="gray.500"
          _hover={{ textDecoration: "underline", color: "gray.400" }}
        >
          <Text fontSize="xl">로그인하기</Text>
          <Icon as={FaArrowRight} ml={2} />
        </ChakraLink>
      </HStack>
    </Box>
  );
};

export default StartPage;
