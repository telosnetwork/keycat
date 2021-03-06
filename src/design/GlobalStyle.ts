import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    font-family: var(--font-sans);
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
  }

  :root {
    --primary-color: #083ADE;
    --main-border-color: #d4d4d4;
    --main-background: #fff;
    --footer-link-color: #757575;
    --footer-link-hover-color: #403d3d;
    --monospace: menlo, monaco, consolas, hack, monospace;
    --font-serif: Buenard, georgia, serif;
    --font-heading: -apple-system, BlinkMacSystemFont, Source Code Pro, menlo, monaco, consolas, hack, monospace;
    --font-sans: -apple-system, BlinkMacSystemFont, Inter, Roboto, Segoe UI, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    @supports (font-variation-settings: normal) {
      --font-sans: -apple-system, BlinkMacSystemFont, 'Inter var', Roboto, Segoe UI, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    --card-border-radius: 4px;

    --focused-border-color: #1148fd;
    --hover-background: rgba(8, 58, 222, 0.04);
  }

  a {
    font-weight: 400;
    letter-spacing: 0.02em;
    text-decoration: none;
    color: var(--primary-color);
    
    &:hover {
      text-decoration: underline;
    }
  }

  @keyframes onAutoFillStart {
  }
  
  @keyframes onAutoFillCancel {
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-sans);
  }

  input, textarea {
    font: inherit;
  }

  *[data-focused=true] {
    border: 2px solid var(--focused-border-color) !important;
  }

  *[data-focused=false] {
    border: 2px solid transparent;
  }

  option {
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 0px 2px 1px;
  }

  code {
    font-family: var(--monospace);
  }
`

export default GlobalStyle
