import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Stack,
  Tag,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import myLogo from "../assets/myLogo.png";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

import { signup } from "../api/user_api";

const SignupKeywordPage = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleAddKeyword = async () => {
    if (keyword.trim() !== "" && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      setKeyword("");
    }
  };

  const handleRemoveKeyword = async (removeKeyword) => {
    setKeywords(keywords.filter((k) => k !== removeKeyword));
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="black">
      <Box
        bg="white"
        p={8}
        rounded="3xl"
        boxShadow="lg"
        width={400}
        height={520}
      >
        <Stack spacing={4}>
          <Flex justify="center">
            <Image src={myLogo} width={"200px"} mb={8} />
          </Flex>
          <HStack borderBottom="1px solid lightgray" pb={2} mb={4}>
            <Input
              variant={"flushed"}
              placeholder="Ex) 경제, 축구, 반도체, AI"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              border="none"
              _focus={{ boxShadow: "none" }}
            />
            <Button
              variant={"ghost"}
              color="fg"
              onClick={handleAddKeyword}
              aria-label="Add keyword"
              _hover={{
                backgroundColor: "transparent",
                transform: "scale(1.05)",
                cursor: "pointer",
                color: "gray.500",
              }}
            >
              <IoIosAddCircleOutline />
            </Button>
          </HStack>
          <Wrap mb={6} justify="start">
            {keywords.map((k, index) => (
              <WrapItem key={index}>
                <Tag.Root
                  size="md"
                  borderRadius="full"
                  variant="subtle"
                  colorScheme="gray"
                >
                  <Tag.Label>{k}</Tag.Label>
                  <Tag.EndElement>
                    <Tag.CloseTrigger
                      type="button"
                      onClick={() => handleRemoveKeyword(k)}
                    />
                  </Tag.EndElement>
                </Tag.Root>
              </WrapItem>
            ))}
          </Wrap>

          <Button
            mt={4}
            borderRadius={"md"}
            type="submit"
            variant="solid"
            colorScheme="teal"
            width="full"
            onClick={async () => {
              try {
                const res = signup({
                  email: state.email,
                  password: state.password,
                  name: state.name,
                  interests: keywords,
                });
                navigate("/login");
              } catch (err) {
                console.error("❌ 키워드 추가 실패 ❌:", err);
              }
            }}
          >
            가입완료
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SignupKeywordPage;
