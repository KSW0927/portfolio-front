import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18n'
import App from './App.tsx'

// 새로운 QueryClient 인스턴스를 생성
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* 로딩 중일 때 보여줄 UI 설정 */}
        <Suspense fallback={<div>Loading Translations...</div>}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Suspense>
    </React.StrictMode>
);
