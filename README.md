# jpmp (진품먹품)

### 배포

배포 : https://jpmp-yoon3n4m.vercel.app/

### 스택
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
 <img src="https://img.shields.io/badge/framer-0055FF?style=for-the-badge&logo=framer&logoColor=white">
<hr>

### 앱 소개

* [해당 유튜브 컨텐츠](https://youtu.be/_NZnCf4iZoE)에서 아이디어를 얻었습니다.

* 공유하고 싶은 메뉴(음식)를 사진과 간단한 정보들을 함께 공유하세요!
* 다른 사람들이 공유한 음식의 가격을 맞춰 보세요!
* 새로운 메뉴와 식당을 발견 해 보세요!


### 상세 소개
> #### 기술적
> * vercel 호스팅과 firebase 데이터베이스를 연동해 운영 되고 있습니다.
> #### 기능적
> * 메뉴는 사진, 상호명, 지역, 가성비에 대한 평가, 부가 설명(optional)등의 정보들과 함께 등록 됩니다.
> * 메뉴의 가격을 맞출땐 해당 정보들을 토대로 가격을 유추해볼 수 있습니다.<br>
>  ex) 제주도는 관광지니 다른 지역의 비슷한 메뉴보다 비쌀 것이다. 노량진은 학원가이니 대체로 물가가 저렴할 것이다.
> *  첫 시도에 정답이 아니라면 up/down으로 힌트가 한번 제공 되며 2번째의 시도 이후로는 메뉴 목록으로 이동 됩니다. (가격은 +- 10%까지 범위 정답으로 인정)
> *  풀이 도전 회수와 정답 회수 데이터를 메뉴 필드에 저장하며 이를 통해 정답률을 제공 합니다.


### 추가/수정 예정
* 의견 보내기
* 계정
* 사진을 검열, 필터링 할 수 있는 기술적/법적인 장치가 없다보니 "게시 요청 -> 관리자 승인 -> 게시"의 과정이 필요 해보임.


### 이슈
* 이미지의 렌더링이 자연스럽지 않고 어색한 느낌이 있음 해당 부분 수정 필요

