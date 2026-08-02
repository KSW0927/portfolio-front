# 샘플 문서 URL 파라미터 가이드

URL 쿼리 파라미터를 사용하여 CrossViewer에서 샘플 문서를 여는 방법을 설명합니다.

---

## 1. 기본 사용법

`filePath` 파라미터에 `./sample/` 경로 기준의 파일명을 지정하면 해당 문서가 자동으로 열립니다.

```
index.html?filePath=./sample/<파일명>
```

---

## 2. 파일 형식별 URL

지원되는 파일 형식과 각 형식에 해당하는 샘플 URL입니다.

| 형식 | URL                                       |
| ---- | ----------------------------------------- |
| PDF  | `?filePath=./sample/sample_doc_file.pdf`  |
| PPTX | `?filePath=./sample/sample_doc_file.pptx` |
| XLSX | `?filePath=./sample/sample_doc_file.xlsx` |
| DOCX | `?filePath=./sample/sample_doc_file.docx` |
| HWPX | `?filePath=./sample/sample_doc_file.hwpx` |

---

## 3. 옵션 파라미터

`filePath`와 함께 아래 파라미터를 `&`로 조합할 수 있습니다.

### 언어 변경 — `lang`

| 값    | 언어          |
| ----- | ------------- |
| `kor` | 한국어        |
| `enu` | 영어          |
| `jpn` | 일본어        |
| `chs` | 중국어 (간체) |
| `cht` | 중국어 (번체) |
| `vit` | 베트남어      |
| `ind` | 인도네시아어  |
| `fra` | 프랑스어      |

```
index.html?filePath=./sample/sample_doc_file.pdf&lang=enu
```

### 테마 변경 — `theme`

```
index.html?filePath=./sample/sample_doc_file.pdf&theme=light
index.html?filePath=./sample/sample_doc_file.pdf&theme=dark
```

### 페이지 전환 방향 — `pageTransitionDirection`

모바일에서 스와이프 방향을 지정합니다.

```
index.html?filePath=./sample/sample_doc_file.pptx&pageTransitionDirection=horizontal
```

### 기능 토글

| 파라미터           | 값               | 설명                    |
| ------------------ | ---------------- | ----------------------- |
| `searchEnabled`    | `true` / `false` | 검색 기능 표시 여부     |
| `printEnabled`     | `true` / `false` | 인쇄 버튼 표시 여부     |
| `allowFileUrlOpen` | `true` / `false` | URL 파일 열기 허용 여부 |

```
index.html?filePath=./sample/sample_doc_file.pdf&searchEnabled=false&printEnabled=false
```

> ⚠️ `downloadEnabled`는 보안상 URL 파라미터로 변경할 수 없습니다. 설정 파일에서만 제어할 수 있습니다.

### 썸네일 패널

```
# 썸네일 패널 비활성화
index.html?filePath=./sample/sample_doc_file.pdf&useThumbnailPanel=false

# 썸네일 패널 기본 닫힘
index.html?filePath=./sample/sample_doc_file.pdf&initialThumbailPanel=false
```

### 줌 증분 — `scaleIncrement`

```
# 줌 단위를 25%로 설정
index.html?filePath=./sample/sample_doc_file.pdf&scaleIncrement=25
```

---

## 4. 스트림 모드 — `fileId`

서버 스트림 엔드포인트가 설정된 환경에서는 `fileId` 파라미터로 문서를 열 수 있습니다.

```
index.html?fileId=sample_document
```

> ℹ️ `fileStreamUrl`이 설정 파일 또는 생성자 옵션에 지정되어 있어야 합니다. 샘플 스트림 서버 파일은 `public/sample/streamSample/` 경로에서 확인할 수 있습니다 (JSP, PHP, ASHX).

---

## 5. 복합 예시

```
# 영어 UI + 라이트 테마 + PDF 열기
index.html?filePath=./sample/sample_doc_file.pdf&lang=enu&theme=light

# 검색 비활성화 + 썸네일 닫힌 상태로 PPTX 열기
index.html?filePath=./sample/sample_doc_file.pptx&searchEnabled=false&initialThumbailPanel=false

# 일본어 UI + 가로 전환 + DOCX 열기
index.html?filePath=./sample/sample_doc_file.docx&lang=jpn&pageTransitionDirection=horizontal
```

---

## 6. 설정 우선순위

URL 파라미터는 모든 설정 중 가장 높은 우선순위를 가집니다.

기본값 → `config.json` → `instanceConfig.json` → 생성자 옵션 → **URL 파라미터 (최우선)**

---

## 7. 주의사항

- `filePath`와 `fileId`는 동시에 사용하지 않습니다. 두 파라미터가 함께 지정된 경우 `filePath`가 우선 적용됩니다. 단, `fileStreamUrl`이 설정된 환경에서는 `fileId`가 우선합니다.
- `allowFileUrlOpen`이 `false`로 설정된 경우 `filePath` 파라미터가 무시됩니다.
- 파일명에 한글이나 특수문자가 포함된 경우 자동으로 URL 인코딩됩니다.
