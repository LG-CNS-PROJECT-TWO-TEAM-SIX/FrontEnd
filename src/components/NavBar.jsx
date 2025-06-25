import React from "react";
import { Box, Button, Spacer } from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Box mb={8} px={16} height="60px" display="flex" alignItems="center">
      {/* 홈 버튼 */}
      <Link to="/home">
        <Button
          p={2}
          variant="ghost"
          aria-label="Home"
          color="fg"
          _hover={{
            backgroundColor: "transparent",
            transform: "scale(1.05)",
            cursor: "pointer",
            color: "gray.500",
          }}
        >
          <AiOutlineHome />
        </Button>
      </Link>

      <Spacer />

      {/* 검색 버튼 */}
      <Link to="/search">
        <Button
          p={2}
          aria-label="Search"
          variant="ghost"
          color="fg"
          _hover={{
            backgroundColor: "transparent",
            transform: "scale(1.05)",
            cursor: "pointer",
            color: "gray.500",
          }}
        >
          <AiOutlineSearch />
        </Button>
      </Link>

      {/* 프로필 버튼 */}
      <Link to="/mypage">
        <Button
          p={0}
          aria-label="User"
          variant="ghost"
          _hover={{
            backgroundColor: "transparent",
            color: "gray.500",
            transform: "scale(1.05)",
            cursor: "pointer",
          }}
        >
          <CgProfile />
        </Button>
      </Link>
    </Box>
  );
}
