import React from "react";
import styled from "styled-components";
import Overlay from "./Overlay";

const DrawerWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background: #fff;
  transform: translateY(${(p) => (p.open ? 0 : "100%")});
  visibility: ${(p) => (p.open ? "visible" : "hidden")};
  transition-property: visibility transform;
  transition-duration: 0.45s;
  width: 100%;
  z-index: 101;
  min-height: 240px;
`;

export default function BottomSheet({ open, onClose, children }) {
  return (
    <>
      <Overlay open={open} onClose={onClose} />
      <DrawerWrapper open={open}>{children}</DrawerWrapper>
    </>
  );
}
