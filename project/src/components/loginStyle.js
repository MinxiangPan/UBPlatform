import styled from "styled-components";

export const LoginWrapper = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 100px;
`;

export const LoginBox = styled.div`
width: 320px;
height: 450px;
background: radial-gradient(
  ellipse farthest-corner at center top,
  #1e90ff 0%,
  #a9bcd0 100%
);
padding: 50px 30px;
color: white;
box-sizing: border-box;
text-align: center;
vertical-align: middle;
margin-left: auto;
margin-right: auto;
border-radius: 7px;
background-size: cover;
&a
  display: block;
color: $fadedwhite;
font-size: 12px;
text-align: center;
text-decoration: none;
&:hover
    text-decoration: underline;
`;

export const Input = styled.input`
width: 260px;
height: 30px;
line-height: 30px;
padding: 0 10px;
margin: 10px auto;
color: #777;
margin-bottom: 10px;
border-radius: 5px;
border: none;
display: flex;
flex-direction: row-reverse;
align-items: center;
border-bottom: 1px solid #58a4b0;
margin: 0 20px;

 & input
  background: transparent;
  padding: 2px 10px;
  margin: 18px 4px 0 4px;
  color: $fadedwhite;
  font-family: $main-font;
  font-size: 14px;

  
  &:required
    box-shadow: none
  
  // Animation trigger for label::before
  &:focus ~ label
    opacity: 1
  
  // label::before icons
  &[type='text']
    ~ label
      &::before
        content: "\f007"
  &[type='password']
    ~ label
      &::before
        content: "\f023"
`;

export const Button = styled.button`
  width: 220px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #ff0000;
  border-radius: 5px;
  text-align: center;
  position: relative;
  margin: 15px 0 5px 0;
  border: none;
  cursor: pointer;
  font-family: $main-font;
  padding: 0px;
  font-size: 14px;
`;
