export function connectNotificationStream(email, onMessage, onError) {
  const url = `/api/alim/v1/message?email=${encodeURIComponent(email)}`;
  const eventSource = new EventSource(url, { withCredentials: true });

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  eventSource.onerror = (error) => {
    console.error("SSE 연결 오류:", error);
    if (onError) onError(error);
    eventSource.close();
  };

  return eventSource;
}
