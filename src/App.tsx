import { Suspense } from 'react'
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/routes";

import { useLoadingStore } from "@/store/loadingStore.ts";
import LoadingSpinner from "@/components/common/LoadingSpinner.tsx";
import { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";

import "@/assets/css/common-ui.css";
import "@/assets/css/components.css";
import './i18n';

//달력 피커 설정
registerLocale("ko", ko);

function App() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  return  (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
      {isLoading && <LoadingSpinner />}
    </Suspense>
  )
}

export default App;
