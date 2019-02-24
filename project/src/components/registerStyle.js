import styled from "styled-components";

export const RegisterWrapper = styled.div`
  overflow: hidden;
  z-index: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background: #eee;
`;

export const RegisterBox = styled.div`
  overflow: hidden;
  width: 320px;
  height: 550px;
  background: #1e90ff;
  padding: 50px 30px;
  color: white;
  margin: 0 auto;
  margin-top: 0px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
`;

export const Input = styled.input`
  display: block;
  width: 140%;
  margin-bottom: 10px;
`;

export const Button = styled.div`
  width: 220px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #ff0000;
  border-radius: 15px;
  margin: 10px auto;
  text-align: center;
`;
