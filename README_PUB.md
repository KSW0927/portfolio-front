# KSS LINE publishing Guide
### Version
- node version : 22.2.0
- npm version : 10.7.0


### Commit Message Convention 

|태그|설명|
|------|------|
|idx|새로운 문서 추가|
|docs|문서 생성|
|fix|에러 수정|
|feat|문서 내 수정/추가/변경/삭제 등|
  
  
## Getting Started
First, run the development server:  


```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.  
<br/>

  
## Package.json, Additional List

```
"classnames": "^2.3.2" 
```
[https://www.npmjs.com/package/classnames](https://www.npmjs.com/package/classnames)
## Directory Structure

```bash
src
├── assets
│   └── images
│
├── components
│   ├── Button
│   │    ├── Button.tsx
│   │    └── Button.module.css
│   ├── Charts
│   ├── CheckBox 
│   ├── Container
│   ├── Contents
│   ├── Editor
│   ├── Grid
│   ├── Header
│   ├── InputBox
│   ├── Lnb
│   ├── Popup
│   ├── Toggle
│   └── Wrapper
│ 
pages
├── Login.tsx
├── Main.tsx
│
styles
├── global.module.css
└── reset.css
``` 

## Directory Structure Detail
- src/assets/
  > images : 이미지 모음  
  
- src, components/
  > Button.tsx : 버튼 관련 UI 컴포넌트  
  > Button.module.css : 해당 컴포넌트 안에서만 사용하는 CSS Module

- src, pages/
  > Login.tsx : 로그인 페이지  
  > Main.tsx : 메인 대시보드 페이지

- src, styles/
  > globals.css : 페이지 내에서 사용하는 글로벌 CSS 스타일  
  > reset.css : CSS 초기화
