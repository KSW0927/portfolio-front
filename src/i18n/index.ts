import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        lng: 'ko', // 기본 언어
        fallbackLng: 'en', // 기본 언어가 없을 때 사용할 언어
        resources: {}, // 초기에는 빈 상태로 시작 가능
        interpolation: {
          escapeValue: false,
        },
        react: { useSuspense: false } // 리소스가 동적으로 추가될 때 React가 감지하도록 설정
    });

export default i18n;