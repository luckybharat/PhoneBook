import React from "react";
import styled from "styled-components";
import Overlay from "./Overlay";

const DrawerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  transform: translateX(${(p) => (p.open ? "0" : "-100%")});
  visibility: ${(p) => (p.open ? "visible" : "hidden")};
  transition-property: visibility transform;
  transition-duration: 0.45s;
  width: 280px;
  height: 100%;
  z-index: 101;
`;

export default function Drawer({ open, onClose, children }) {
  return (
    <>
      <Overlay open={open} onClose={onClose} />
      <DrawerWrapper open={open} onClose={onClose}>
        {children}
      </DrawerWrapper>
    </>
  );
}
