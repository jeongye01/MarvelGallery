import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Dekko&family=Open+Sans:wght@400;600&display=swap');
  *{
    box-sizing:border-box;
  }
  body{
  
    font-family: 'Source Sans Pro', sans-serif;
    //background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
    font-size:16px;
    background: #eee;
  /* center the content in the page (mainly horizontally) */

  /* include the same texture used for the .bubble containers, but with notably less opacity */
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(0)" opacity="0.2" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g  fill="%23250E17"><circle cx="25" cy="25" r="12.5"/><circle cx="75" cy="75" r="12.5"/><circle cx="75" cy="25" r="12.5"/><circle cx="25" cy="75" r="12.5"/></g></svg>'),
    white;
  background-size: 10px, 100%;
  }
  a{
    text-decoration:none;
    color:inherit;
  }
`;

export const darkTheme: DefaultTheme = {
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  bgColor: 'black',
  textColor: 'black',
  accentColor: '#fbc531',
  lineColor: '#dcdde1',
  panelColor: '#ffffff',
  blue: '#0097e6',
  red: '#e84118',
};
export const lightTheme: DefaultTheme = {
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  bgColor: '#FAFAFA',
  textColor: 'black',
  accentColor: '#fbc531',
  lineColor: '#D3D3D3',
  panelColor: '#ffffff',
  blue: '#0097e6',
  red: '#e84118',
};
export default GlobalStyle;
