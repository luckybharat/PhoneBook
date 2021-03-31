import React from "react";
import styled from "styled-components";
import Overlay from "./Overlay";

const DialogWrapper = styled.div`
  position: absolute;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${(p) => (p.open ? "visible" : "hidden")};
  opacity: ${(p) => (p.open ? 1 : 0)};
  transform: scale(${(p) => (p.open ? 1 : 0.8)});
  transition-duration: 0.3s;
`;

const DialogContent = styled.div`
  padding: 1rem;
  background: #fff;
  border-radius: 0.4rem;
  width: ${(p) => (p.width ? p.width + "px" : "400px")};
`;

const DialogHeader = styled.div`
  padding-bottom: 1rem;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: between;
  border-bottom: 1px solid #70707070;
`;

const DialogBody = styled.div`
  padding: 0 0.5rem 0.5rem;
`;

export default function Dialog({ open, onClose, children, title, headerIcon }) {
  return (
    <>
      <Overlay open={open} />
      <DialogWrapper open={open} onClose={onClose}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center">
              {headerIcon}
              <span className="ml-4">{title}</span>
            </div>
          </DialogHeader>
          <DialogBody>{children}</DialogBody>
        </DialogContent>
      </DialogWrapper>
    </>
  );
}
