import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Icon,
  Input,
  VStack,
  Field,
  HStack,
  Button,
  Flex,
  Wrap,
  WrapItem,
  Tag,
} from "@chakra-ui/react";

import { FaChevronLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import useUser from "../lib/useUser";
import { getUserInterests, editUser } from "../api/user_api";
import { useForm } from "react-hook-form";

const MypageEdit = () => {
  const { userLoading, user, isLoggedIn } = useUser();
  const [interestsRes, setInterestsRes] = useState([]);

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const interests = async () => {
      try {
        const res = await getUserInterests();
        setInterestsRes(res);
        setKeywords(res.map((i) => i.name));
      } catch (err) {
        console.error("❌ 유저 최애 가져오기 실패 ❌:", err);
      }
    };
    interests();
  }, []);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        interests: keywords,
      };
      const res = await editUser(payload);
      navigate("/mypage");
    } catch (err) {
      console.error("❌ 회원수정 실패 ❌:", err);
    }
  };
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
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <HStack width={"100%"} justify={"space-between"}>
              <Link to="/mypage">
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
            <Field.Root>
              <Field.Label>Username</Field.Label>
              <Input
                {...register("name")}
                defaultValue={userLoading ? "" : user?.name}
                placeholder={userLoading ? "Loading" : user?.name}
              />
              <Field.ErrorText>Username is required.</Field.ErrorText>
            </Field.Root>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                disabled
                defaultValue={userLoading ? "" : user?.email}
                {...register("email")}
                placeholder={userLoading ? "Loading" : user?.email}
              />
              <Field.ErrorText>Email is required.</Field.ErrorText>
            </Field.Root>
            <Field.Root>
              <Field.Label>Keywords</Field.Label>
              <Flex width={"100%"}>
                <Input
                  placeholder="Ex) 경제, 축구, 반도체, AI"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  _focus={{ boxShadow: "none" }}
                />{" "}
                <Button onClick={handleAddKeyword}>추가</Button>
              </Flex>
            </Field.Root>
            {/* 키워드 리스트 추가 하기 */}
            <Wrap width={"100%"} justify={"flex-start"}>
              {keywords.map((k, index) => (
                <WrapItem mt={2} key={index}>
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
            <Button type="submit" mt={8} width={"100%"}>
              수정완료
            </Button>
          </VStack>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};

export default MypageEdit;
