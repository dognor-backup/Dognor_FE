import { css } from "@emotion/react";

export const GlobalStyles = css`
  @font-face {
    font-family: "SpoqaHanSansNeo";
    src: url("../../fonts/SpoqaHanSansNeo-Medium.woff2") format("woff2"),
      url("../../fonts/SpoqaHanSansNeo-Medium.woff") format("woff");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: "BMJUA";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-result-button,
  input::-webkit-search-results-decoration {
    display: none;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #dde0e8;
    border: 2px solid #fff;
    border-radius: 6px;
  }
  ::webkit-scrollbar-track {
    background-color: #fff;
  }

  #root {
    width: 100%;
    height: 100vh;
  }
  .radioFlex {
    display: flex;
    gap: 24px;
  }
  .mgTop16 {
    margin-top: 16px;
  }
  .mgTop20 {
    margin-top: 20px;
  }
  .mgTop26 {
    margin-top: 26px;
  }
  .mgTop32 {
    margin-top: 32px;
  }
  .mgTop56 {
    margin-top: 56px;
  }
  .mgBtm56 {
    margin-bottom: 56px;
  }
  .pdLeft48 {
    padding-left: 48px;
  }
  .center {
    display: flex;
    justify-content: center;
  }
`;
