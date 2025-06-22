import { useState } from "react";
import { Box, Flex, Text, Icon, Image } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Logo from "../assets/myLogo.png";
import { addFavorite, removeFavorite } from "../api/favorite_api";

const NewsListItem = ({
  link,
  category,
  title,
  description,
  thumbnail,
  initiallyLiked = false,
  initialFavId = null,
}) => {
  const [liked, setLiked] = useState(initiallyLiked);
  const [favoriteId, setFavoriteId] = useState(initialFavId);
  const [loading, setLoading] = useState(false);

  const handleHeartClick = async (e) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);

    try {
      const payload = {
        newsLink: link,
        newsCategory: category,
        newsTitle: title,
        newsSummary: description,
        newsThumbnail: thumbnail,
      };

      if (!liked) {
        const fav = await addFavorite(payload);
        setFavoriteId(fav.id);
        setLiked(true);
      } else {
        await removeFavorite(favoriteId);
        setLiked(false);
        setFavoriteId(null);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      width="100%"
      height={250}
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mb={6}
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      cursor="pointer"
    >
      <Flex mx={2} height="100%" justify="space-between" align="center">
        <Flex>
          <Box
            width="260px"
            borderRadius="md"
            overflow="hidden"
            ml={2}
            mr={8}
            mt={1}
            mb={1}
            aspectRatio={4 / 3}
          >
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="뉴스 썸네일"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            ) : (
              <Image
                src={Logo}
                alt="대체 썸네일"
                width="100%"
                height="100%"
                objectFit="contain"
                background="white"
                p={4}
              />
            )}
          </Box>
          <Box pr={8}>
            <Flex direction="column" alignItems="start">
              <Text fontWeight="bold" fontSize="2xl" mb={4}>
                {title}
              </Text>
              <Text
                fontSize="md"
                color="gray.600"
                mb={2}
                textAlign="left"
                noOfLines={7}
                maxW="950px"
                maxH="700px"
              >
                {description}
              </Text>
            </Flex>
          </Box>
        </Flex>

        <Icon
          as={liked ? FaHeart : FaRegHeart}
          boxSize={8}
          color={liked ? "red.500" : "gray.400"}
          cursor={loading ? "not-allowed" : "pointer"}
          onClick={handleHeartClick}
        />
      </Flex>
    </Box>
  );
};

export default NewsListItem;
