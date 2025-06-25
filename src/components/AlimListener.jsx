import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { getMe } from "../api/user_api";

export default function AlimListener() {
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function connect() {
      try {
        let email = localStorage.getItem("email")
        if (!email){
          const user = await getMe();
          if(!user){
            return null;
          }
          email = encodeURIComponent(user.email);
        }
        // const user = await getMe();
        // if (!isMounted) return;
        // if(user){
        //    email = encodeURIComponent(user.email);
        // }else{
        //   email = localStorage.getItem("email");
        // }

        const es = new EventSource(
          `http://localhost:30081/api/alim/message?email=${email}`
        );
        console.log("esRef",esRef);
        esRef.current = es;

        es.addEventListener("INIT", e => {
          console.log("✅ INIT:", e.data);
          toast.success("😀 환영합니다! ");
        });

        es.onmessage = e => {
          try {
            const data = JSON.parse(e.data);
            console.log("🎉 onmessage:", data);
            switch (data.action) {
              case "SIGNUP":
                toast.info(`🆕 ${data.message}`);
                break;
              case "LOGIN":
                toast.success(`✅ ${data.message}`);
                break;
              case "WITHDRAWAL":
                toast.warn(`⚠️ ${data.message}`);
                break;
              default:
                toast(data.message);
            }
          } catch (err) {
            console.error("SSE 파싱 오류:", err);
            toast.error("알림 수신 중 오류가 발생했습니다.");
          }
        };

        es.onerror = err => {
          console.error("❌ SSE error", err);
          toast.error("알림 연결에 문제가 생겼습니다.");
          es.close();
        };
      } catch (err) {
        console.error("❌ 유저 정보 조회 실패:", err);
        toast.error("유저 정보 로딩 실패로 알림 기능이 비활성화되었습니다.");
      }
    }

    connect();

    return () => {
      isMounted = false;
      if (esRef.current) {
        esRef.current.close();
      }
    };
  }, []);

  return null;
}