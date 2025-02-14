<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=F1EFFD&height=200&section=header&text=Taskify&fontSize=80&fontColor=5534DA&animation=fadeIn"/>
</div>

## 🖐️ 프로젝트 소개
<div align="center">
  <img src="https://github.com/user-attachments/assets/73032ea5-93db-4a41-8f7a-9cdc7d6a0022" width="400px" height="300px"/>
</div>

<div align="center">
  <p>
    <strong>Taskify</strong>는 일정 관리 기능을 지원하는 웹 애플리케이션입니다.</br>초대 기능을 활용하여 다른 사용자와 일정 관리를 공유할 수 있습니다.</br>다른 사람들과 일정을 공유하여 성공적으로 <strong>Task</strong>를 해결할 수 있습니다.
  </p>
  <nav>
    <a href="#서비스소개">📅 서비스 소개</a></br>
    <a href="#프로젝트구조">🔧 프로젝트 구조</a></br>
    <a href="#진행과정">🔥진행과정에서 겪은 일</a></br>
    <a href="#팀원소개">🧑 팀원소개</a>
  </nav>
</div>

<h2 id="서비스소개">📅 서비스 소개</h2>

<h2 id="프로젝트구조">🔧 프로젝트 구조</h2>

### ⚙️ API 흐름 도식화

<div align="center">
  <img src="https://github.com/user-attachments/assets/a242c693-a908-41c9-9575-4070e991725f" alt="일반적인 API 흐름도" witdh="500px" height="300px"/></br>
  <img src="https://github.com/user-attachments/assets/bdd08c59-29be-49f1-8443-b450699b8207" alt="로그인 흐름도" witdh="500px" height="300px"/></br>
  <img src="https://github.com/user-attachments/assets/fac06ef8-22fb-4812-8eae-09246269b700" alt="리다이렉트 흐름도" witdh="500px" height="300px"/>

</div>


### 🗂️ 디렉토리 구조

```bash
📂src
 ┣ 📜middleware.ts
 ┣ 📂apis
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜queries.ts
 ┃ ┃ ┗ 📜types.ts
 ┃ ┣ 📂cards
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜queries.ts
 ┃ ┃ ┗ 📜types.ts
 ┃ ┗ ...
 ┣ 📂app
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📂(after-login)
 ┃ ┃ ┣ 📂mydashboard
 ┃ ┃ ┗ ...
 ┃ ┗ 📂(before-login)
 ┃   ┣ 📂(auth)
 ┃   ┃ ┗ 📂login
 ┃   ┗ ...
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┣ 📂ui
 ┃ ┗ ... 
 ┣ 📂constants
 ┣ 📂fonts
 ┣ 📂hooks
 ┣ 📂stores
 ┣ 📂types
 ┃ ┗ 📜common.ts
 ┗ 📂utils

```

### 💎 주요 기술 스택

|기술 이름|선정 이유|
|---|---|
|![Static Badge](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) |컴포넌트 기반 설계 방식인 리액트 라이브러리를 활용하여 SSR과 CSR를 혼합해서 사용하기 위해 선정한 프레임워크입니다.|
|![Static Badge](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)|Props 타입 지정으로 인한 런타임 오류 감소, vscode 자동 완성 기능 등 타입 안정성을 통한 코드 품질 개선을 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/React--Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)|UI 상태와 서버 상태를 분리하고, api 데이터에 대한 Promise를 집약적으로 관리하기 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/State%20Management-Zustand-FF9900?logo=zustand)|전역 UI 상태를 관리하기 위해 선정했습니다. 현재 프로젝트에서는 모달의 상태를 zustand로 관리합니다.|
|![Static Badge](https://img.shields.io/static/v1?style=for-the-badge&message=Axios&color=5A29E4&logo=Axios&logoColor=FFFFFF&label=)|axios instance의 interceptor 기능을 통한 중복 코드 최소화 등을 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)|폼의 상태를 집약적으로 관리하기 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/-Zod-3E67B1?style=flat&logo=zod&logoColor=white)|폼의 유효성 정의 및 타입 추출이 용이하고, API request 타입정의 및 safeParse()메소드를 통한 API 응답 데이터 타입 검증을 하기 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/es_toolkit-0080FF?style=flat-square&logo=es_toolkit&logoColor=blue&style=for-the-badge)|유틸리티 기능을 선언형으로 작성함으로써 코드 가독성을 향상시키기 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)|유틸리티 클래스 사용으로 클래스 네이밍 고민 감소, 디자인 시스템이 미흡 시 유연한 대응이 가능하기에 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)|Next.js와의 완벽한 통합 및 소규모 웹 애플리케이션에서 무료 플랜을 제공해주기 때문에 선정했습니다.|

<h2 id="진행과정">🔥진행과정에서 겪은 일</h2>

<h2 id="팀원소개">🧑 팀원 소개</h2>

<markdown-accessiblity-table>
 <table align="center">
  <tbody>
   <tr height="150px">
    <td align="center" width="150px">
     <a href="https://github.com/ToKyun02">
     <img src="https://avatars.githubusercontent.com/Tokyun02" style="max-width: 100%;"></a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/cksrlcks">
     <img src="https://avatars.githubusercontent.com/cksrlcks" style="max-width: 100%;"></a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/SeokChan-Lee">
     <img src="https://avatars.githubusercontent.com/SeokChan-Lee" style="max-width: 100%;"></a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/rak517">
     <img src="https://avatars.githubusercontent.com/rak517" style="max-width: 100%;"></a>
    </td>
   </tr>
   <tr height="50px">
    <td align="center" width="150px">
     <a href="https://github.com/Tokyun02">김도균</a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/cksrlcks">김찬기</a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/SeokChan-Lee">이석찬</a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/rak517">최성락</a>
    </td>
   </tr>
  </tbody>
 </table>
</markdown-accessiblity-table>



<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=F1EFFD&height=200&section=footer&fontSize=80" />
</div>
