import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Link as ChakraLink,
  Spinner,
} from "@chakra-ui/react";
import * as Dialog from "@radix-ui/react-dialog";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import instance from "../api/axiosInstance";
import Logo from "../assets/myLogo.png";
import NewsListItem from "../components/NewsListItem";
import { getMyFavorites } from "../api/favorite_api";

const MypageFavorites = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
  const focusRef = useRef(null);

  const [favoritesMap, setFavoritesMap] = useState({});
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const fetchNews = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decode = jwtDecode(accessToken);
      const userId = decode?.userId;
      const res = await instance.get(`${userId}/favorites`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingArticles(false);
    }
  };
  useEffect(() => {
    if (selectedIndex === null) {
      setSummary("");
      setSummaryError(null);
      setLoadingSummary(false);
      return;
    }
    (async () => {
      setLoadingSummary(true);

      try {
        const token = localStorage.getItem("accessToken");
        const res = await instance.post(
          "/news/summary",
          { link: articles[selectedIndex].newsLink },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSummary(res.data.summary);
      } catch {
        setSummaryError("요약 로딩에 실패했습니다.");
      } finally {
        setLoadingSummary(false);
      }
    })();
  }, [selectedIndex, articles]);
  useEffect(() => {
    const loadFavoritesAndArticles = async () => {
      try {
        setLoadingArticles(true);
        const favs = await getMyFavorites();
        const map = {};
        favs.forEach((f) => (map[f.newsLink] = f));
        setFavoritesMap(map);

        const accessToken = localStorage.getItem("accessToken");
        const decode = jwtDecode(accessToken);
        const userId = decode?.userId;
        const res = await instance.get(`${userId}/favorites`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingArticles(false);
      }
    };

    loadFavoritesAndArticles();
  }, []);

  return (
    <Flex direction="column" minHeight="100vh">
      <Box>
        <NavBar />
      </Box>
      <Box flex="1" mx={12}>
        <VStack mx={4} align="start">
          <Text fontSize="3xl" fontWeight="bold" mb={4}>
            좋아요한 뉴스 모아보기
          </Text>
          {articles.map((article, index) => {
            const fav = favoritesMap[article.newsLink];
            return (
              <Dialog.Root
                key={article.newsLink}
                open={selectedIndex === index}
                onOpenChange={(open) => open || setSelectedIndex(null)}
              >
                <Box onClick={() => setSelectedIndex(index)} cursor="pointer">
                  <Dialog.Trigger asChild>
                    <NewsListItem
                      link={article.newsLink}
                      category={article.newsCategory}
                      title={article.newsTitle}
                      description={article.newsSummary}
                      thumbnail={article.newsThumbnail}
                      initiallyLiked={true}
                      initialFavId={fav?.id}
                    />
                  </Dialog.Trigger>
                </Box>

                <Dialog.Portal>
                  <Dialog.Overlay
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      position: "fixed",
                      inset: 0,
                    }}
                  />
                  <Dialog.Content
                    style={{
                      backgroundColor: "white",
                      borderRadius: 8,
                      padding: 24,
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "95%",
                      maxWidth: "640px",
                      maxHeight: "80vh",
                      overflowY: "auto",
                    }}
                  >
                    <div
                      tabIndex={-1}
                      ref={focusRef}
                      style={{
                        outline: "none",
                        width: 0,
                        height: 0,
                        position: "absolute",
                      }}
                    />

                    <Dialog.Close asChild>
                      <Box
                        as="button"
                        position="absolute"
                        top="0"
                        right="10px"
                        fontSize="1.5rem"
                        fontWeight="bold"
                        background="none"
                        border="none"
                        cursor="pointer"
                        _hover={{ color: "red.500" }}
                        aria-label="닫기"
                        tabIndex={-1}
                      >
                        ×
                      </Box>
                    </Dialog.Close>

                    <Dialog.Title
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      #{index + 1} - {article.newsTitle}
                    </Dialog.Title>
                    
                    <Text fontSize="sm" color="gray.500" mb={4}>
                      {article.pubDate}
                    </Text>

                    {(article.newsThumbnail || Logo) && (
                      <Image
                        src={article.newsThumbnail || Logo}
                        borderRadius="md"
                        mb={8}
                        width="100%"
                        aspectRatio={16 / 9}
                        objectFit="contain"
                        mx="auto"
                      />
                    )}

                    {loadingSummary ? (
                      <Box
                        mb={4}
                        minHeight="100px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={6}
                      >
                        <Spinner size="md" />
                        <Text>뉴스 내용을 요약 중입니다.</Text>
                      </Box>
                    ) : summaryError ? (
                      <Text color="red.500" mb={4}>
                        {summaryError}
                      </Text>
                    ) : (
                      <Text mb={6} whiteSpace="pre-wrap">
                        {summary}
                      </Text>
                    )}

                    <ChakraLink
                      href={article.newsLink}
                      color="blue.500"
                      target="_blank"
                      rel="noopener noreferrer"
                      mb={4}
                      display="block"
                    >
                      {article.newsLink}
                    </ChakraLink>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            );
          })}
        </VStack>
      </Box>
      <Footer />
    </Flex>
  );
};

export default MypageFavorites;
