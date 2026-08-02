import { Suspense } from 'react'
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/routes";

import { useLoadingStore } from "@/store/loadingStore.ts";
import LoadingSpinner from "@/components/common/LoadingSpinner.tsx";
import { TabulatorFull as Tabulator, DownloadModule, ExportModule } from "tabulator-tables";
import { registerLocale } from "react-datepicker";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ko } from "date-fns/locale/ko";

//import "@/styles/reset.css";
//import "@/styles/root.css";
import './i18n';

// 사용하려는 모듈을 반드시 등록해야 사용가능함. 개별 모듈 등록 대신 전체 패키지를 한번에 등록
Tabulator.registerModule([DownloadModule, ExportModule]);
const g = window as any;
if(typeof window !== "undefined") {
  g.XLSX = XLSX; // XLSX 모듈을 전역으로 노출하여 Tabulator에서 사용할 수 있도록 함
}
if (typeof window !== 'undefined') {
  const jsPDFModel = jsPDF as any;
  if(jsPDFModel.API && !jsPDFModel.API.autoTable) {
    jsPDFModel.API.autoTable = function(options: any) {
      autoTable(this, options); // jsPDF 인스턴스에 autoTable 플러그인 등록
      return this;
    };
  }
  g.jsPDF = jsPDF; // jsPDF 모듈을 전역으로 노출하여 Tabulator에서 사용할 수 있도록 함
  g.jspdf = { jsPDF: jsPDF, autoTable }; // autoTable 플러그인도 함께 노출
}

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
