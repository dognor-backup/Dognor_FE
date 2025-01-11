import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./core/routes/router.js";
import { Global, ThemeProvider } from "@emotion/react";
import { theme } from "./shared/styles/theme.js";
import { GlobalStyles } from "./shared/styles/global.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 데이터가 신선하다고 간주되는 시간
      cacheTime: 1000 * 60 * 5, // 캐시가 유지되는 시간
      retry: 2, // 요청 실패 시 재시도 횟수
    },
    mutations: {
      retry: false, // Mutation 요청 실패 시 재시도 비활성화
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
