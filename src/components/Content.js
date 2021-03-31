import React, { Children } from "react";
import styled from "styled-components";

const StyeldContianer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateX(${(p) => (p.open ? "280px" : 0)});
  transition-property: transform;
  transition-duration: 0.45s;
`;

export default function Content({ children, className, open }) {
  return (
    <StyeldContianer open={open} className={` ${className}`}>
      {children}
    </StyeldContianer>
  );
}
