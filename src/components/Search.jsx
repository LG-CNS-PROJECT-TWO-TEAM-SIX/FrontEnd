import React, { useState, useEffect, useRef } from "react";
import { Box, Input } from "@chakra-ui/react";

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearchClick = () => {
    if (query.trim() === "") return;
    onSearch(query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <Box w="100%" maxW="600px" mx="auto" mt={10}>
      <Box bg="transparent" borderRadius="md" boxShadow="none" overflow="hidden" p={4}>
        <Box position="relative" width="100%">
          <Input
            ref={inputRef}
            placeholder="검색어 입력"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            fontWeight="bold"
            mb={2}
            border="1px solid"
            borderColor="gray.300"
            _focus={{ borderColor: "gray.500", boxShadow: "none" }}
            pr="40px"
            color="black"
            sx={{ caretColor: "black" }}
          />
          <Box
            position="absolute"
            right="12px"
            top="20%"
            _hover={{
              backgroundColor: "transparent",
              transform: "scale(1.05)",
              cursor: "pointer",
              color: "gray.500",
            }}
            pointerEvents="auto"
            color="gray.600"
            cursor="pointer"
            onClick={handleSearchClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
