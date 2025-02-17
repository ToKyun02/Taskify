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
    <a href="#진행과정">🔥 Taskify 팀의 경험</a></br>
    <a href="#프로젝트구조">🔧 프로젝트 구조</a></br>
    <a href="#팀원소개">🧑 팀원소개</a>
  </nav>
</div>

<h2 id="서비스소개">📅 서비스 소개</h2>

<div align="center">
  <section>
    <h3>🍽️ 손 쉬운 대시보드 관리</h3>
    <p>📢 나만의 대시보드를 이름과 색상을 지정해서 생성할 수 있습니다.</br>
    📢 내가 생성한 대시보드를 자유롭게 넘나 들 수 있습니다.</br>
    📢 초대를 통해 대시보드의 멤버가 되면 해당 대시보드를 방문할 수 있습니다.
    </p>
    <img src="https://github.com/user-attachments/assets/38eef00b-3aec-4f7a-9cdb-c5bfc7d1dd6b" width="500px"/>
  </section>
  </br>
  <section>
    <h3>📒 자유로운 칼럼 생성과 할 일 생성</h3>
    <p>📢 해야할 일을 칼럼 별로 정리할 수 있습니다.</br>
    📢 담당자를 지정하여 누가 어떤 이슈를 작업하는지 관리할 수 있습니다.
    </p>
    <img src="https://github.com/user-attachments/assets/37d10d81-d374-48c7-b75c-abd9d76326c8" width="500px"/>
  </section>
  </br>
  <section>
    <h3>🚗 손 쉬운 할 일 카드 이동</h3>
    <p>📢 직접 할 일을 수정하지 않아도 이동이 가능합니다.</br>
    📢 마우스 드래그로 할 일을 잡아서 원하는 컬럼에 놓아보세요!
    </p>
    <img src="https://github.com/user-attachments/assets/98dbe87d-74b1-4b58-811a-db0db47f3665" width="500px"/>
  </section>
  </br>
  <section>
    <h3>⏬아래 링크를 클릭하시면 더 다양한 기능들을 만날 수 있습니다!⏬</h3>
    <a>⏩지금 Taskify 사용하러 가보기!⏪</a>
  </section>
</div>

<h2 id="진행과정">🔥 Taskify 팀의 경험</h2>

### 서버 데이터의 상태 관리
> Taskify 팀은 TanStack Query 라이브러리를 활용하여 전역적으로 서버 상태를 관리합니다. 이로 인해 Props Drilling을 방지할 수 있었고, 서버의 Promise 상태를 집약적으로 관리하여 보다 쉽게 API 흐름을 파악할 수 있도록 구현했습니다.
>> zod를 활용하여 API의 응답 스키마를 토대로 서버로부터 예상된 결과값을 가져오는지 검증하는 로직을 추가하여, 더욱 안전하게 코드를 작성했습니다.

### 폼의 상태 관리
> Taskify 팀은 Form의 상태를 집약적으로 관리하기 위해 React Hook Form 라이브러리를 사용했습니다. 해당 라이브러리를 통해 Form의 상태 추적을 용이하게 하고, 공통된 controller, uncontroller를 개발하여 다른 개발자들이 컴포넌트를 재사용하기 쉽게 구현했습니다.
>> Form의 Validation은 zod를 활용하여 Form 스키마로 작성하였고, 해당 스키마를 토대로 타입을 추출해냅니다.

### Route Handler로 인증 처리하기
> 외부 API의 응답 body로 받는 accessToken을 HttpOnly 쿠키로 적용할 수 있는 방법을 알고 계신가요?
>> Taskify 팀은 Next.js의 Route Handler를 통해 logout을 제외한 모든 API는 하나의 route handler를 직면하게 됩니다. 이 route handler가 클라이언트 대신 외부 API에 요청을 보내기 때문에 HttpOnly 쿠키를 설정할 수 있게 되는 것입니다. 이 덕분에, 외부 API의 노출을 최소화 할 수 있었고, HttpOnly 쿠키를 사용함으로써 보다 안전하게 토큰을 관리할 수 있었습니다.


### 로그인 상태에 따른 리다이렉트
> 클라이언트에서 로그인 상태에 따른 리다이렉트 구현이 왜 안좋은 지 알고 계신가요?
>> 리액트 기반 프로젝트인 경우 useEffect를 통해 로그인 상태를 판단하게 되는데, 이렇게 구현될 경우 페이지 깜빡임 현상을 해결 할 수 없습니다. 또한, 보호된 페이지임에도 불구하고 노출을 피할 수 없습니다. 그리고 이것은 리다이렉트가 아니라 라우팅이라고 불러야 하는 것이 맞습니다. Taskify 팀은 이러한 현상을 해결하기 위해 middleware를 활용하여 로그인 상태를 판단합니다.
>>> 브라우저가 쿠키를 보내면 middleware가 해당 쿠키를 읽어서 로그인 유무에 따라 페이지 접속에 따른 리다이렉트를 반환합니다. 클라이언트가 아니라 서버에서 로그인 상태를 판단하는 것입니다.

<h2 id="프로젝트구조">🔧 프로젝트 구조</h2>

### ⚙️ API 흐름 도식화

<div align="center">
  <img src="https://github.com/user-attachments/assets/a242c693-a908-41c9-9575-4070e991725f" alt="일반적인 API 흐름도" witdh="500px" height="300px"/></br>
  <img src="https://github.com/user-attachments/assets/bdd08c59-29be-49f1-8443-b450699b8207" alt="로그인 흐름도" witdh="500px" height="300px"/></br>
  <img src="https://github.com/user-attachments/assets/2d943508-aa32-4276-9446-8b63af5e0218" alt="리다이렉트 흐름도" witdh="500px" height="300px"/>

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
