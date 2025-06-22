import React, { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Box,
  Text,
  Spinner,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NewsListItem from "./NewsListItem";
import instance from "../api/axiosInstance";
import Logo from "../assets/myLogo.png";
import { getMyFavorites } from "../api/favorite_api";

const NewsDialog = ({ articles, loading, contextLabel = "뉴스", isHome }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
  const focusRef = useRef(null);

  const [favoritesMap, setFavoritesMap] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const favs = await getMyFavorites();
        const map = {};
        favs.forEach((f) => (map[f.newsLink] = f));
        setFavoritesMap(map);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    })();
  }, []);

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
          { link: articles[selectedIndex].link },
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
    if (selectedIndex !== null) focusRef.current?.focus();
  }, [selectedIndex]);

  if (loading) {
    const loadingMessage = isHome
      ? "관심사를 기반으로 최신 뉴스 선별 중입니다."
      : "검색어 기반 최신 뉴스를 가져오는 중입니다.";

    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={20}>
        <Spinner size="lg" mr={4} />
        <Text fontSize="lg">{loadingMessage}</Text>
      </Box>
    );
  }

  if (!articles?.length) return <Text>뉴스가 없습니다.</Text>;

  return (
    <>
      {articles.map((article, index) => {
        const fav = favoritesMap[article.link];
        return (
          <Dialog.Root
            key={article.link}
            open={selectedIndex === index}
            onOpenChange={(open) => open || setSelectedIndex(null)}
          >
            <Box onClick={() => setSelectedIndex(index)} cursor="pointer">
              <Dialog.Trigger asChild>
                <NewsListItem
                  link={article.link}
                  category={article.category}
                  title={article.title}
                  description={article.description}
                  thumbnail={article.thumbnail}
                  initiallyLiked={Boolean(fav)}
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
                  maxHeight: "90vh",
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
                  {contextLabel} #{index + 1} - {article.title}
                </Dialog.Title>

                <Text fontSize="sm" color="gray.500" mb={4}>
                  {article.pubDate}
                </Text>

                {(article.thumbnail || Logo) && (
                  <Image
                    src={article.thumbnail || Logo}
                    borderRadius="2xl"
                    my={8}
                    width="90%"
                    aspectRatio={16 / 9}
                    objectFit="cover"
                    mx="auto"
                  />
                )}

                {loadingSummary ? (
                  <Box
                    mx={4}
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
                  <Text mx={4} mb={6} whiteSpace="pre-wrap">
                    {summary}
                  </Text>
                )}

                <ChakraLink
                  href={article.link}
                  color="blue.500"
                  target="_blank"
                  rel="noopener noreferrer"
                  mb={4}
                  display="block"
                >
                  {article.link}
                </ChakraLink>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        );
      })}
    </>
  );
};

export default NewsDialog;
