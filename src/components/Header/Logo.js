import React from "react";
import { BookOpen } from "react-feather";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
`;

export default function Logo({ children }) {
  return (
    <LogoWrapper>
      <BookOpen className="w-8 h-8" />
      <span className="ml-4 text-lg font-bold">{children}</span>
    </LogoWrapper>
  );
}
