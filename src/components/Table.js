import styled from "styled-components";
export const StyledTable = styled.table`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin: 20px 0;
  overflow: hidden;
`;

export const StyledHead = styled.thead`
  color: #fff;
  width: 100%;
`;

export const StyledTbody = styled.tbody`
  flex: none;
  @media (max-width: 600px) {
    flex: 1;
  }
`;

export const StyledHeadRow = styled.tr`
  background: #42a5f5;
  text: #fff;
  display: flex;
  flex-direction: row;
  margin: 0;
  @media (max-width: 600px) {
    flex-direction: column;
    margin: 0.6rem;
  }
`;

export const StyledTr = styled.tr`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 0;
  @media (max-width: 600px) {
    margin-bottom: 0.5rem;
  }
`;

export const StyledTh = styled.th`
  padding: 0.6rem;
  text-align: left;
`;
