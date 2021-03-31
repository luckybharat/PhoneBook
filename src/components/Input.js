import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  position: relative;
`;

const Label = styled.label`
  color: #999;
  font-weight: normal;
  opacity: 0.75;
  order: 1;
  /*outline: 0;*/
  padding-left: 5px;
  pointer-events: none;
  text-shadow: none;
  text-transform: capitalize;
  transform-origin: left top;
  transform: scale(1) translate3d(0, 20px, 0);
  transition: 200ms ease all;
`;

const StyledInput = styled.input`
  border-radius: 0;
  display: flex;
  font-size: 100%;
  line-height: 25px;
  text-shadow: none;

  border: 0;
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #000;
  flex: 1 1 auto;
  order: 2;

  &:focus {
    outline: 0;
    border: 1px solid #3949ab;
  }

  &:not(:focus) {
    color: transparent;
  }

  &:focus + ${Label} {
    color: #3949ab;
    opacity: 1;
    transform: scale(0.8) translate3d(0, 5px, 0);
  }
`;
export default function Input(props) {
  return (
    <Container>
      <StyledInput {...props} />
      <Label>{props.label}</Label>
    </Container>
  );
}
