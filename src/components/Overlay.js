import React from "react";
import styled from "styled-components";

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00000050;
  z-index: 100;
  visibility: ${(p) => (p.open ? "visible" : "hidden")};
  opacity: ${(p) => (p.open ? 1 : 0)};
  transition-duration: 0.45s;
  transition-property: visibility opacity;
`;

export default function Overlay(props) {
  return <StyledOverlay {...props} />;
}
