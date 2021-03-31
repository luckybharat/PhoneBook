import React, { useEffect } from "react";
import styled from "styled-components";

const ListItem = styled.div`
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid #70707040;
`;

const SearchListWrapper = styled.div`
  max-height: 320px;
  min-height: 320px;
  overflow-y: auto;
  border: 1px solid #70707020;
  border-radius: 0.4rem;
  margin: 16px auto 0;
`;

const ListItemText = styled.div`
  color: #212121;
  font-size: 20px;
  margin-top: 16px;
`;

const ListItemSubText = styled.div`
  color: #607d8b;
  font-size: 14px;
`;

export default function SearchList({ list, className }) {
  useEffect(() => {
    console.log(list);
  });
  return (
    <SearchListWrapper className={`${className} w-full sm:w-72`}>
      {Object.keys(list)?.map((i) => {
        const item = list[i];
        return (
          <ListItem key={i}>
            <ListItemSubText>{item.date}</ListItemSubText>
            <ListItemText>{item.phone}</ListItemText>
            <ListItemSubText>{item.remark}</ListItemSubText>
          </ListItem>
        );
      })}
    </SearchListWrapper>
  );
}
