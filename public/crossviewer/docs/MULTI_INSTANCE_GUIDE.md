# 다중 인스턴스 설정 가이드

크로스뷰어의 다중 인스턴스 생성 방식, 설정 파일 구조, 우선순위 및 운영 방법을 설명합니다.

---

## 목차

1. [인스턴스 생성 방식](#1-인스턴스-생성-방식)
2. [설정 파일 구조](#2-설정-파일-구조)
3. [설정 우선순위](#3-설정-우선순위)
4. [인스턴스별 설정 파일](#4-인스턴스별-설정-파일-수정)
5. [공통 설정 파일](#5-공통-설정-파일-수정)
6. [URL 파라미터](#6-url-파라미터를-이용한-임시-설정-변경)
7. [브라우저 콘솔 API](#7-브라우저-콘솔-api)
8. [설정 경로 직접 지정](#8-설정-경로-직접-지정)
9. [전체 설정 항목](#9-전체-설정-항목)
10. [운영 시 주의사항](#10-운영-시-주의사항)

---

## 1. 인스턴스 생성 방식

CrossViewer는 **기본 인스턴스**와 **추가 인스턴스** 두 가지 방식으로 뷰어를 생성합니다.

### 기본 인스턴스 (자동 생성)

스크립트 로드 시 `id="container"` 요소가 존재하면 뷰어가 자동으로 생성됩니다.  
별도의 `CrossViewer()` 호출은 필요하지 않으며, `config.json`의 설정이 그대로 적용됩니다.

```html
<div id="container"></div>
<script src="./crossviewer.js"></script>
```

### 추가 인스턴스 (생성자 호출)

`CrossViewer()` 함수를 사용하여 추가 인스턴스를 생성합니다.

```html
<div id="viewer2"></div>
<script>
  var second = CrossViewer('viewer2', { instanceName: 'report', lang: 'enu' });
  second.open.url('./sample/test.pdf');
</script>
```

> ⚠️ **주의:** 추가 인스턴스는 보안 정책에 따라 **인쇄(`printEnabled`)와 다운로드(`downloadEnabled`)가 항상 비활성화**됩니다.  
> 생성자 옵션이나 설정 파일에서 `true`로 지정하더라도 무시됩니다.

| 구분          | 생성 방식              | 인쇄 / 다운로드         | 설정 출처            |
| ------------- | ---------------------- | ----------------------- | -------------------- |
| 기본 인스턴스 | `#container` 자동 생성 | config.json 설정에 따름 | config.json          |
| 추가 인스턴스 | `CrossViewer()` 호출   | 강제 비활성화           | 생성자 옵션 + config |

---

## 2. 설정 파일 구조

설치 파일에 포함된 `multi-instance-test.html` 파일을 기준으로 아래와 같이 설정이 가능합니다.

```
/
├── multi-instance-test.html
├── config/
│   ├── config.json            # 공통 설정
│   └── config_mobile.json     # 모바일 공통 설정
└── sample/
    └── instanceSample/
        ├── left.json          # 왼쪽 인스턴스 설정
        ├── left_mobile.json   # 왼쪽 인스턴스 모바일 설정
        └── right.json         # 오른쪽 인스턴스 설정
```

### 권장 원칙

- 모든 인스턴스에 공통으로 적용할 값은 `config.json`에서 관리합니다.
- 인스턴스 간 차이는 `left.json`, `right.json`에서 관리합니다.
- 일회성 테스트는 URL 파라미터를 활용합니다.
- 그 이외의 파일은 직접 수정하지 않습니다.

---

## 3. 설정 우선순위

동일 항목이 여러 위치에 정의된 경우, 아래 순서에서 **나중 값이 우선** 적용됩니다.

1. 기본값 (가장 낮은 우선순위)
2. 공통 설정 파일 — `config.json` / 모바일은 `config_mobile.json`
3. 인스턴스 설정 파일 — `left.json`, `right.json`
4. 생성자 옵션
5. URL 쿼리 파라미터 (가장 높은 우선순위)

> 💡 **예:** `config.json`에서 `lang: "auto"`, `left.json`에서 `lang: "kor"`으로 설정된 경우, 왼쪽 인스턴스에는 `kor`가 적용됩니다.

---

## 4. 인스턴스별 설정 파일 수정

인스턴스별로 서로 다른 UI를 구성할 때 사용합니다. 현재 샘플은 좌/우 인스턴스 설정을 분리하여 읽습니다.

- 왼쪽: `./sample/instanceSample/left.json`
- 오른쪽: `./sample/instanceSample/right.json`

### left.json 예시 — 한국어 + 썸네일 표시

`sample/instanceSample/left.json`

```json
{
  "lang": "kor",
  "panel": {
    "useThumbnailPanel": true,
    "initialThumbailPanel": true
  },
  "searchEnabled": true
}
```

### right.json 예시 — 영어 + 썸네일 숨김 + 검색 비활성화

`sample/instanceSample/right.json`

```json
{
  "lang": "enu",
  "panel": {
    "useThumbnailPanel": false,
    "initialThumbailPanel": false
  },
  "searchEnabled": false
}
```

---

## 5. 공통 설정 파일 수정

모든 인스턴스에 공통으로 적용할 값은 `config/config.json`에서 설정합니다.  
특정 인스턴스 설정 파일에서 해당 값을 재정의하면 해당 인스턴스에만 override 됩니다.

### 기능 및 확장자 제한 예시

```json
{
  "theme": "dark",
  "searchEnabled": true,
  "printEnabled": false,
  "downloadEnabled": false,
  "allowedFileExtensions": ["pdf", "docx"],
  "allowFileUrlOpen": true,
  "lang": "auto"
}
```

### 초기 배율 설정 예시

```json
{
  "initialScaleValue": {
    "pdf": "fitWidth",
    "doc": "fitContent",
    "ppt": "fitContent",
    "xls": "fitWidth",
    "all": "fitContent"
  },
  "scaleIncrement": 5
}
```

---

## 6. URL 파라미터를 이용한 임시 설정 변경

배포 후 재빌드 없이 일부 설정을 즉시 변경하여 테스트할 수 있습니다.

| 파라미터                                       | 설명                    |
| ---------------------------------------------- | ----------------------- |
| `lang=kor`                                     | 언어 변경               |
| `searchEnabled=true\|false`                    | 검색 기능 on/off        |
| `printEnabled=true\|false`                     | 인쇄 기능 on/off        |
| `scaleIncrement=5`                             | 확대/축소 단위          |
| `pageTransitionDirection=vertical\|horizontal` | 모바일 페이지 전환 방향 |
| `filePath=...`                                 | 파일 경로 직접 지정     |
| `autoOpen=0`                                   | 문서 자동 열기 건너뜀   |

### 언어 및 검색 임시 변경

```
./multi-instance-test.html?lang=enu&searchEnabled=false
```

### 특정 파일 열기 (자동 열기 건너뜀)

```
./multi-instance-test.html?filePath=./sample/sample.pdf&autoOpen=0
```

> ⚠️ **주의:** `filePath`는 멀티 인스턴스 환경에서 좌/우 인스턴스를 개별 제어하지 않습니다.  
> 인스턴스별로 다른 문서를 열려면 아래의 콘솔 API를 사용하십시오.

---

## 7. 브라우저 콘솔 API

`window.CrossViewerAPI`를 통해 등록된 인스턴스에 직접 접근할 수 있습니다.

```js
CrossViewerAPI.get('left'); // left 인스턴스의 open API
CrossViewerAPI.get('right'); // right 인스턴스의 open API
CrossViewerAPI.instances; // 전체 인스턴스 맵 조회
```

### URL로 문서 열기

```js
await CrossViewerAPI.get('left').open.url('./sample/sample_doc_file.pdf');
await CrossViewerAPI.get('right').open.url('./sample/sample_doc_file.docx');
```

### 스트림 방식으로 열기

`fileStreamUrl`이 설정되어 있으면 `fileId` 기반 호출이 가능합니다.

```js
await CrossViewerAPI.get('left').open.stream('FILE-001');
await CrossViewerAPI.get('right').open.stream('FILE-002');
```

### 스트림 URL로 열기

```js
await CrossViewerAPI.get('left').open.streamURL('https://example.com/api/file/download?id=001');
```

---

## 8. 설정 경로 직접 지정

`CrossViewer()` 호출 시 두 번째 인자로 설정 파일 경로를 직접 지정할 수 있습니다.

### 단일 인스턴스 (index.html)

기본 인스턴스는 `#container` 요소가 있으면 자동 생성되므로 별도 호출이 필요 없습니다. 설정은 `config.json`에서 관리합니다.

```html
<body>
  <div id="container"></div>
  <script src="./crossviewer.js"></script>
  <!-- #container에 뷰어가 자동 생성됨, config.json 설정 적용 -->
</body>
```

콘솔에서 문서를 열려면 다음과 같이 호출합니다.

```js
CrossViewerAPI.get('container').open.url('./sample/sample_doc_file.pdf');
```

### 멀티 인스턴스 (multi_instance_sample.html)

> ⚠️ **주의:** 추가 인스턴스는 `CrossViewer()` 호출로 생성되므로 인쇄/다운로드가 강제 비활성화됩니다.

```html
<body>
  <div id="container-left"></div>
  <div id="container-right"></div>
  <script>
    var left = CrossViewer('container-left', {
      configUrl: './config/config.json',
      mobileConfigUrl: './config/config_mobile.json',
      instanceConfigUrl: './config/instances/left.json',
      mobileInstanceConfigUrl: './config/instances/left_mobile.json',
    });

    var right = CrossViewer('container-right', {
      configUrl: './config/config.json',
      instanceConfigUrl: './config/instances/right.json',
    });

    left.open.url('./sample/sample_doc_file.pdf');
    right.open.url('./sample/sample_doc_file.docx');
  </script>
</body>
```

### 모바일 전용 인스턴스 설정

`mobileInstanceConfigUrl`을 지정하면 PC 접속 시에는 `left.json`이, 모바일 접속 시에는 `left_mobile.json`이 적용됩니다.

`sample/instanceSample/left_mobile.json`

```json
{
  "lang": "kor",
  "searchEnabled": true,
  "printEnabled": false,
  "downloadEnabled": true,
  "pageTransitionDirection": "vertical",
  "initialScaleValue": {
    "pdf": "fitWidth",
    "doc": "fitWidth",
    "all": "fitWidth"
  }
}
```

### 설정 경로 옵션

| 옵션                      | 기본값                        | 설명                               |
| ------------------------- | ----------------------------- | ---------------------------------- |
| `configUrl`               | `./config/config.json`        | 공통 설정 파일 경로                |
| `mobileConfigUrl`         | `./config/config_mobile.json` | 모바일 공통 설정 파일 경로         |
| `viewerInfoUrl`           | `./config/viewerInfo.json`    | 뷰어 정보 파일 경로                |
| `instanceConfigUrl`       | —                             | 인스턴스별 설정 파일 경로 (PC)     |
| `mobileInstanceConfigUrl` | —                             | 인스턴스별 설정 파일 경로 (모바일) |

> 💡 `instanceConfigUrl` 및 `mobileInstanceConfigUrl`은 기본 값이 없으므로, 인스턴스별 설정이 필요한 경우에만 지정합니다.  
> 경로는 HTML 파일 기준 상대경로(`./`)로 작성하며, 인스턴스 생성 후에는 변경할 수 없습니다.

---

## 9. 전체 설정 항목

| 항목                         | 적용 위치                      | 용도                      |
| ---------------------------- | ------------------------------ | ------------------------- |
| `lang`                       | 공통 / 모바일 / 인스턴스 / URL | 언어 설정                 |
| `panel.useThumbnailPanel`    | 공통 / 인스턴스                | 썸네일 패널 사용 여부     |
| `panel.initialThumbailPanel` | 공통 / 인스턴스                | 첫 로드 시 패널 열림 여부 |
| `searchEnabled`              | 공통 / 모바일 / 인스턴스 / URL | 검색 기능 노출            |
| `printEnabled`               | 공통 / 인스턴스 / URL          | 인쇄 기능 노출            |
| `downloadEnabled`            | 공통 / 모바일 / 인스턴스       | 다운로드 기능 노출        |
| `allowedFileExtensions`      | 공통 / 모바일                  | 허용 확장자               |
| `allowFileUrlOpen`           | 공통 / 모바일                  | 외부 URL 오픈 허용 여부   |
| `fileStreamUrl`              | 공통 / 모바일                  | 파일 스트림 API 주소      |
| `initialScaleValue`          | 공통 / 인스턴스                | 문서 타입별 초기 배율     |
| `scaleIncrement`             | 공통 / 인스턴스 / URL          | 확대/축소 단위            |
| `pageTransitionDirection`    | 모바일 / URL                   | 모바일 페이지 전환 방향   |
| `theme`                      | 공통 / 인스턴스 / URL          | 테마 설정                 |

---

## 10. 운영 시 주의사항

- 설정 파일 수정 후에는 브라우저를 새로고침해야 변경 사항이 반영됩니다.
- 설정 파일은 `nocache` 파라미터가 자동으로 부여되어 로드되므로 일반적인 브라우저 캐시 문제는 발생하지 않습니다.
- `allowFileUrlOpen: false` 설정 시 외부 URL 직접 열기가 차단됩니다.
- `autoOpen=0` URL 파라미터 지정 시 문서 자동 열기를 건너뛰고 뷰어 생성까지만 수행합니다.

---
