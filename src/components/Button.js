import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  position: relative;
  text-align: center;
  padding: 16px 8px;
  min-width: 120px;
  outline: none;
  @media (max-width: 56rem) {
    min-width: auto;
    padding: 8px;
  }
`;

export default function Button({ children, className, onClick, rest }) {
  return (
    <ButtonWrapper className={`${className}`} onClick={onClick} {...rest}>
      {children}
    </ButtonWrapper>
  );
}
