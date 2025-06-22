import React, { useEffect, useState } from "react";
import { Box, Button, Spacer } from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";


export default function NavBar() {

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  //kafka에서 실시간 알림 데이터 받아오기
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/notifications");

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setNotifications((prev) => [message, ...prev]);
    };

    return () => {
      socket.close();
    };
  }, []);



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
      <Link to={"/search"}>
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
      <Link to={"/mypage"}>
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

      {/* 알림 버튼 */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
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
       <IoNotificationsOutline />
      </Button>


      {/* 알림 패널 */}
      {isOpen && (
        <Box
          position="absolute"
          top="60px"
          right="0"
          width="300px"
          bg="white"
          border="1px solid #ddd"
          boxShadow="0 4px 12px rgba(0,0,0,0.15)"
          borderRadius="8px"
          zIndex={1000}
          p={4}
        >
          <Box fontWeight="bold" mb={2}>알림</Box>
          {notifications.length === 0 ? (
            <Box textAlign="center" color="gray.400" py={6}>
              <IoNotificationsOutline size={48} style={{ margin: "0 auto 8px" }} />
              <Box>현재 알림이 없습니다.</Box>
            </Box>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {notifications.map((note, idx) => (
                <li key={idx} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
                  {note.content || "새로운 알림이 도착했습니다."}
                </li>
              ))}
            </ul>
          )}
        </Box>
      )}
    </Box>


  );
}
