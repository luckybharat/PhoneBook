import styled from "styled-components";

export const TableWrapper = styled.div`
  background: #fff;
`;
export const StyledTable = styled.table`
  position: relative;
  border-collapse: colllapse;
  width: 100%;
  table-layout: auto;
`;

export const StyledThead = styled.thead`
  
`;

export const StyledTbody = styled.tbody``;

export const StyledTh = styled.th`
  position: sticky;
  top: 0;
  padding: 0.8rem 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  border-bottom-width: 1px;
  color: rgba(37, 99, 235, 1);
  background: rgba(191, 219, 254, 1);
  border-color: rgba(191, 219, 254, 1);
  @media (max-width: 56rem) {
    padding: .2rem .5rem;
    letter-spacing: 0;
  }
`;

export const StyledThTr = styled.tr`
  text-align: left;
`;

export const StyledTr = styled.tr``;

export const StyledTd = styled.td`
  border-bottom-width: 1px;
  border-color: rgba(229, 231, 235, 1);
`;

export const TextWrapper = styled.span`
  color: rgba(55, 65, 81, 1);
  padding: 1.5rem 0.75rem;
  display: flex;
  align-items: ${(p) => (p.center ? "center" : "flex-start")};
`;
