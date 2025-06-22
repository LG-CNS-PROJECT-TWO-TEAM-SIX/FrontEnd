import React, { useState } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Search from "../components/Search";
import NewsList from "../components/NewsList";

const Searchpage = () => {
  const [keyword, setKeyword] = useState("");
  const handleSearch = (searchKeyword) => setKeyword(searchKeyword);

  return (
    <Flex direction="column" minHeight="100vh">
      <Box mt={0}>
        <NavBar />
        <Search onSearch={handleSearch} />
      </Box>

      <Box flex="1" mx={12} mt={0}>
        <VStack mb={8} align="center">
          <Text fontSize="2xl" fontWeight="bold" mb={1}>
            {keyword ? (
              ``
            ) : (
              <Flex height={260} justify={"center"} align={"center"}>
                쏟아지는 뉴스 속, 나에게 필요한 정보만.
                <br />
                검색어를 입력해 지금 확인해보세요.
              </Flex>
            )}
          </Text>
        </VStack>

        {keyword && (
          <NewsList
            url={`/news/search/${encodeURIComponent(keyword)}`}
            isHome={false}
          />
        )}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Searchpage;
