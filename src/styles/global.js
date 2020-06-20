import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Varela Round', sans-serif;
    background: #f5f5f5;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    align-items: center;
    // display: flex;
    // min-height: 120vh;
    justify-content: center;
    text-rendering: optimizeLegibility;
    font-family: 'Varela Round', sans-serif;
  }
  
  .ant-layout {
    background: #f5f5f5;
  }
  
  .ant-layout-header {
    background: inherit;
  }
  
  h1 {
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Varela Round', sans-serif;

  }
  h2 {
    font-family: 'Varela Round', sans-serif;
  }
  img {
    border-radius: 5px;
    height: auto;
    width: 10rem;
  }
  div {
    text-align: center;
    // justify-content: center;
    //font-family: 'Varela Round', sans-serif;
    // direction: rtl;
  }
  small {s
    display: block;
  }
  a {
    text-decoration: none;
  }
  button {
    border-radius: 15px;
    font-family: 'Varela Round', sans-serif;

  }
  .ant-btn {
    border-radius: 15px;
    font-family: 'Varela Round', sans-serif;
    background-color: #E25A53;
    border: none;
    color: white;
  }
  
  .ant-btn:hover {
    background: #A52A2A;
    color: white;
  }
  
  .ant-btn:focus {
    background: #E25A53;
    color: white;
  }
  
  .ant-col{
    margin: 10px;
  }
  .ant-select-show-search.ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
    border-radius: 15px;
  }
  
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 15px;
  }
  
  .ant-picker{
    border-radius: 15px;
  }
  .ant-tabs-tab {
    margin: 0 12px 0 12px;
  }
  
  .ant-form-item .ant-form-item-label {
    text-align: center;
  }
  
  .ant-input {
    border-radius: 15px;
  }
  
  .ant-input-number {
    border-radius: 15px;
  }
  
  .ant-input-number-handler-wrap {
    background: none;
  }
  
  img{
    width: 60%;
    margin-bottom: 10px;
  }
  
  .ant-modal-footer {
    display: inline-flex;
  }
  
  .ant-select-multiple .ant-select-selection-item {
    border: 1px solid #BFBFBF;
  }
  
  .delete-button {
    background-color: transparent;
  }
  
  .delete-button:hover{
    background-color: transparent;
  }
  
  .check-button {
    background-color: #52c41a;
    width: fit-content;
  }
  
  .check-button:hover{
    background-color: #4d9c27;
  }
  
  .icon-delete{
    font-size: 19px;
    transition: font-size 0.5s;
  }
  
  .icon-delete:hover {
    font-size: 24px;
  }
  
  .icon-check{
    font-size: 19px;
    margin: 2px;
  }
  
  .ant-carousel .slick-dots li button {
    background: black;
    opacity: 0.4;
  }

  .ant-carousel .slick-dots li.slick-active button {
    opacity: 1;
    background: black;
  }
  
  .ant-tabs-tab.ant-tabs-tab-active {
    border-radius: 0px;
    background-color: #f5f5f5;
    color: black;
    padding: 6px;
    margin: 0px;
  }
  
  .ant-divider {
    border-color: #C2D7D0;
    border-style: solid;
  }
  `
