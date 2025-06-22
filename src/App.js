import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import { Provider } from "./components/ui/provider";
import Mypage from "./pages/Mypage";
import MypageEdit from "./pages/MypageEdit";
import MypageSettings from "./pages/MypageSettings";
import Home from "./pages/Home";
import Searchpage from "./pages/Searchpage";
import StartPage from "./pages/StartPage";
import SignupKeywordPage from "./pages/SignupKeywordPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MypageFavorites from "./pages/MypageFavorites";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup/keywords" element={<SignupKeywordPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="home" element={<Home />} />
              <Route path="search" element={<Searchpage />} />
              <Route path="mypage" element={<Mypage />} />
              <Route path="mypage/edit" element={<MypageEdit />} />
              <Route path="mypage/favorites" element={<MypageFavorites />} />
              <Route path="mypage/settings" element={<MypageSettings />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
