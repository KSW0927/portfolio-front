import CodeBlock from "../../layout/CodeBlock";

export default function FolderConvention() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">파일/폴더</h2>
            </header>

            <div className="guide-content-body">
                <div id="guide-naming-file" className="guide-wrap">
                    <article className="guide-article">
                        <h3 className="guide-h3">파일/폴더 규칙</h3>
                        <ul className="guide-list">
                            <li>이미지 폴더 구조는 Figma 기준을 따릅니다.</li>
                            <li>이미지 파일명은 디자인 단계에서 정의된 Export 명을 기준으로 사용합니다.</li>
                            <li>디자인 단계에서 정의된 Export 명이 없는 경우 이미지 메뉴의 규칙을 따릅니다.</li>
                        </ul>

                        <h4 className="guide-h4 mt-10">폴더 구조</h4>
                        <div className="mt-10">
                            <CodeBlock code={`src/
├── assets/
│   ├── css/
│   │   ├── components/
│   │   │   ├── common/ (Button, Input 등 공통 컴포넌트 스타일)
│   │   │   └── components.css (단위 UI 컴포넌트 스타일 통합 파일)
│   │   ├── common-ui.css (초기화·폰트·전역 변수 등 공통 기반 스타일)
│   │   ├── components.css (components/ 내 개별 파일을 통합 import)
│   │   └── contents.css (화면별 콘텐츠 전용 스타일)
│   ├── fonts/ (웹폰트 리소스)
│   └── img/
│       ├── general/ (서비스 화면 전용 이미지)
│       ├── ico/ (공통 아이콘 리소스)
│       └── temp/ (테스트용 더미 이미지)
└── publishing/ (퍼블리싱 산출물 및 가이드 영역)
    ├── components/ (재사용 UI 컴포넌트)
    │   └── common/ (공통 컴포넌트 모음)
    ├── guide/ (가이드 시스템 전용 영역)
    │   ├── assets/ (가이드 전용 리소스)
    │   ├── layout/ (가이드 레이아웃 컴포넌트)
    │   └── pages/ (가이드 페이지 목록)
    │       ├── components/ (UI 컴포넌트 가이드)
    │       ├── convention/ (코딩 컨벤션 가이드)
    │       └── worklist/ (작업 목록 및 진척 관리)
    └── pages/ (화면별 퍼블리싱 결과물)`} />
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}