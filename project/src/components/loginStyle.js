import styled from "styled-components";

export const LoginWrapper = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
`;

export const LoginBox = styled.div`
  width: 320px;
  height: 300px;
  background: #1e90ff;
  padding: 50px 30px;
  color: white;
  margin: 100 auto;
  margin-top: 0px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
`;

export const Input = styled.input`
  display: block;
  width: 260px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin: 10px auto;
  color: #777;
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
