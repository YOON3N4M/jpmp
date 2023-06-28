import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root{
    --mainColor: "",
    --mainShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",

}

@font-face {
  font-family: "BMJUA";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "DOSIyagiMedium";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/DOSIyagiMedium.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "양진체";
  src: url("https://cdn.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@media (min-width: 375px) {
  :root {
    font-size: 50%;
  }
}
@media (min-width: 800px) {
  :root {
    font-size: 65%;
  }
}
@media (min-width: 1200px) {
  :root {
    font-size: 100%;
  }
}
@font-face {
  font-family: "BRBA_B";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/BRBA_B.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@import url(//fonts.googleapis.com/earlyaccess/hanna.css);

@font-face {
  font-family: "omyu_pretty";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "GimpoTitle00";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/GimpoTitle00.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Dovemayo_gothic";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.1/Dovemayo_gothic.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "S-CoreDream-3Light";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
html {
  background-color: #000000;
  margin: 0;
  font-family: "S-CoreDream-3Light";
  padding-top: 3rem;
}

* {
  color: #f8f8f8;
}


`;
