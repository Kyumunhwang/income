# Product Requirements Document (PRD)
## 프로젝트명: Precision Ledger (개인 금전출납부)

---

## 1. 프로젝트 개요
*   **서비스명**: Precision Ledger (개인 금전출납부)
*   **서비스 목적**: Google Sheets를 경량 데이터베이스(DB)로 사용하여 개인의 수입과 지출을 직관적으로 기록하고 통계를 모니터링할 수 있는 모던하고 정밀한 자산 관리 웹 애플리케이션 개발.
*   **기본 통화**: 모든 통화 표기는 달러($)가 아닌 **대한민국 원화(₩, KRW)**를 기준으로 개발합니다.

---

## 2. 핵심 기능 정의 (Core Features)

### 2.1. Google Sheets API 연동 (데이터베이스 대체)
*   Google Sheets를 백엔드 데이터베이스로 활용하여 실시간 읽기/쓰기 구현.
*   안전한 서버 사이드 API 호출을 통해 클라이언트 브라우저에 구글 API 인증 정보가 노출되지 않도록 설계.

### 2.2. 수입/지출 내역 CRUD
*   **Create**: 날짜, 내역(Description), 금액(Amount), 카테고리(Category) 정보를 입력하여 수입/지출 내역 등록.
*   **Read**: 등록된 수입/지출 내역을 그리드 또는 테이블 형태로 조회.
*   **Update**: 등록된 내역 수정.
*   **Delete**: 내역 삭제.

### 2.3. 월별 통계 대시보드
*   현재 잔액(Total Balance), 당월 총 수입(Total Income), 당월 총 지출(Total Expense) 시각화.
*   수입 및 지출 카테고리별 차트/통계 제공.
*   데이터 유무에 따른 동적 UI 조건부 렌더링.

---

## 3. 기술 스택 & 인프라 (Tech Stack)
*   **Framework**: Next.js (App Router 권장)
*   **Styling**: Tailwind CSS
*   **Database**: Google Sheets API (v4)
*   **Deployment**: Vercel

---

## 4. 디자인 시스템 & Tailwind 설정
Stitch 디자인 시스템([design_system.md](file:///C:/Users/hwang/Desktop/Antigravity_cli/20260530income_expense/design_system.md))에 정의된 프리미엄 스타일 가이드를 기준으로 테마를 연동합니다.

### 4.1. 주요 컬러 토큰 테마 등록 (`tailwind.config.js`)
*   **Primary (Navy)**: `#0f172a` (기본 브랜드 Navy 및 대화형 요소 강조)
*   **Secondary (Soft Blue)**: `#3b82f6` (상호작용, 포커스 상태)
*   **Success (Income)**: Success Green 계열 (수입 및 긍정 지표)
*   **Error (Expense)**: `#ba1a1a` (지출 및 위험/경고 지표)
*   **Background**: `#fcf8fa` (메인 캔버스 배경)
*   **Surface**: `#ffffff` (카드, 모달 등 레이어 컨테이너)
*   **Outline/Border**: `#76777d` 및 `#c6c6cd`

### 4.2. 타이포그래피 및 라운드 값 적용
*   Headline: `Hanken Grotesk`
*   Body & Data: `Inter` (숫자 표기 시 가독성이 높은 tabular-nums 속성 또는 `data-mono` 스타일 적용)
*   Corner Radius: 버튼/입력창 `8px (0.5rem)`, 카드 `16px (1rem)`

---

## 5. Google Sheets DB 설계 및 연동 규격

### 5.1. 구글 시트 구성
데이터베이스 역할을 할 구글 스프레드시트에 아래와 같이 2개의 탭(시트)을 생성하고 첫 줄에 헤더(Header)를 작성합니다.

*   **'Income' 시트**
    *   헤더 구성: `Date` | `Description` | `Amount` | `Category`
*   **'Expense' 시트**
    *   헤더 구성: `Date` | `Description` | `Amount` | `Category`

### 5.2. API 권한 및 환경 변수 설정 (`.env.local`)
1.  Google Cloud Console에서 **Google Sheets API** 및 **Google Drive API** 활성화.
2.  서비스 계정(Service Account)을 생성하고 **JSON 키 파일** 다운로드.
3.  구글 스프레드시트를 생성한 후, 생성된 서비스 계정 이메일에 **편집자(Editor)** 권한으로 시트 공유.
4.  로컬 프로젝트 루트에 `.env.local`을 생성하여 키 값을 안전하게 매핑:
    ```env
    GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@...gserviceaccount.com
    GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
    GOOGLE_SHEET_ID=your-google-sheet-id-from-url
    ```

---

## 6. 컴포넌트 구조 & 개발 가이드

### 6.1. Stitch 기반 UI 컴포넌트 변환
*   Stitch 퍼블리싱 소스 코드([dashboard.html](file:///C:/Users/hwang/Desktop/Antigravity_cli/20260530income_expense/dashboard.html) 등)를 분석하여 React 컴포넌트로 구조화.
*   `SideNavBar` (사이드 네비게이션) 및 `TopAppBar` (상단 헤더바) 공통 레이아웃 컴포넌트 구현.

### 6.2. 상태 관리 및 조건부 렌더링
*   **데이터가 비어 있는 상태 (Empty State)**:
    *   Stitch ID: `97c764da328041e68f8bc700096e97c1` (지출 내역 없을 때) 및 `b602ef7d06a54dd983c3b5662d507e64` (수입 내역 없을 때)의 템플릿 적용.
*   **데이터가 존재하는 상태 (Active State)**:
    *   조회된 데이터 리스트가 존재할 경우, 테이블 형태 및 그래프 대시보드 활성화.

---

## 7. 배포 시나리오 (Deployment)
*   **Vercel 배포**:
    1.  GitHub 원격 리포지토리에 소스코드 업로드 및 연동.
    2.  Vercel 프로젝트 생성 단계에서 `Environment Variables` 항목에 `.env`에 설정된 구글 API 인증 정보(`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`)를 정확히 기입.
    3.  Main 브랜치 푸시 시 자동 빌드 및 배포 트리거 수행.
