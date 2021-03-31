import React from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75px;
  overflow-y: auto;
  @media(max-width: 56rem){
    padding-top: 93px;
  }
`;

export default function Content({ children, className }) {
  return <ContentWrapper className={`${className}`}>{children}</ContentWrapper>;
}
