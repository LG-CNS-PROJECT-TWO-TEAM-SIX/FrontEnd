import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";
import NewsDialog from "../components/NewsDialog";
import instance from "../api/axiosInstance";

const NewsList = ({ url, isHome }) => {
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const [start, setStart] = useState(1); // 현재 페이지
  const fetchNews = async (start) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      let res;
      if (isHome) {
        res = await instance.get(`${url}/${start}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setArticles(res.data.newsList);
      } else {
        res = await instance.get(`${url}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setArticles(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleLoadMore = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤 (원하면 'auto'로 바꿔도 됨)
    });
    const nextPageStart = start + 10;
    setStart(nextPageStart);
    setLoadingArticles(true);
    fetchNews(nextPageStart);
  };

  useEffect(() => {
    // url이 바뀌면 뉴스 다시 fetch
    setLoadingArticles(true); // 새 요청 시작 시 로딩 상태로 초기화
    fetchNews(start);
  }, [url]);

  return (
    <Box px={4} width="100%">
      <NewsDialog
        articles={articles}
        loading={loadingArticles}
        isHome={isHome}
      />
      {!url.includes("/news/search/") && !loadingArticles && (
        <Button onClick={handleLoadMore} size={"xl"} variant={"outline"}>
          다음
        </Button>
      )}
    </Box>
  );
};

export default NewsList;
