import {
  Box,
  Flex,
  Stack,
  Input,
  Button,
  Text,
  Image,
  Field,
} from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";

import { Link, useNavigate } from "react-router-dom";

import myLogo from "../assets/myLogo.png";
import { useForm } from "react-hook-form";

import { login } from "../api/user_api";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(""); // ← 로그인 실패 메시지용
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoginError("");
      const res = await login(data);
      // 토큰 저장 예시 (LocalStorage 등)
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      navigate("/home");
    } catch (err) {
      setLoginError("아이디 또는 비밀번호가 올바르지 않습니다");
      console.error("❌ 로그인 실패 ❌ :", err);
    }
  };
  return (
    <Flex minH="100vh" align="center" justify="center" bg="black">
      <Box
        bg="white"
        p={8}
        rounded="3xl"
        boxShadow="lg"
        width={400}
        height={480}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Flex justify="center">
              <Image src={myLogo} width={"200px"} mb={8} />
            </Flex>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                {...register("email", { required: "이메일은 필수입니다" })}
                variant="flushed"
                placeholder="이메일을 입력해주세요"
              />
              <Text color="red" fontSize="xs" minHeight="16px">
                {errors.email?.message ?? ""}
              </Text>
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                {...register("password", { required: "비밀번호는 필수입니다" })}
                variant="flushed"
                placeholder="비밀번호를 입력해주세요"
              />
              <Text color="red" fontSize="xs" minHeight="16px">
                {errors.password?.message ?? ""}
              </Text>
              <Text color="red" fontSize="xs" minHeight="16px">
                {loginError ?? ""}
              </Text>
            </Field.Root>
            <Button
              mb={2}
              borderRadius={"md"}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
            >
              로그인
            </Button>
            <Stack spacing={0} align="center">
              <Text fontSize="sm" color="gray.400">
                아직 회원이 아니신가요?
              </Text>
              <Link to="/signup" fontSize="sm" color="black">
                <Text textDecoration={"underline"}>회원가입 시작하기</Text>
              </Link>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}

export default LoginPage;
