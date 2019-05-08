import styled from "styled-components";

export const RegisterWrapper = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
`;

export const RegisterBox = styled.div`
  margin-top: auto;
  width: 334px;
  height: 850px;
  background: radial-gradient(
    ellipse farthest-corner at center top,
    #1e90ff 0%,
    #a9bcd0 100%
  );
  padding: 50px 30px;
  color: white;
  box-sizing: border-box;
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
  border-radius: 7px;
`;

export const Input = styled.input`
display: block;
width: 140%;
margin-bottom: 10px;
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
  width: 270px;
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
