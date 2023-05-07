interface QuizType {
  // 음식 종류
  foodType: "양식" | "중식" | "한식" | "일식";
  //음식 사진 URL
  foodPicURL: string;
  //식당 이름 기재 해도 되고 안해도 되고
  nameOfRestaurants?: string;
  // 지역
  region: string;
  // 음식 항목별 가격
  food1: string;
  food1Price: number;
  food2?: string;
  food2Price?: number;
  food3?: string;
  food3Price?: number;
  food4?: string;
  food4Price?: number;
  food5?: string;
  food5Price?: number;
  // 가격 합계
  sumOfPrice: number;
  // 기타 정보
  desc?: string;
}

export default function Quiz() {
  return <h1>퀴즈</h1>;
}
