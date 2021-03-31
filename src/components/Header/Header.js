import React from "react";
import { LogOut, Plus, Search as SearchIcon } from "react-feather";
import styled from "styled-components";
import { useConsumerAuth } from "../../context/Index";
import Button from "../Button";
import Logo from "./Logo";

const StyledHeader = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.5rem;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #70707020;

  @media (max-width: 56rem) {
    flex-direction: column;
  }
`;

export default function Header({
  className,
  recordData,
  searchDate,
  setSearchDate,
  fetchRecordsByDate,
  openAdd,
  setOpenSearch,
}) {
  const { logout } = useConsumerAuth();
  return (
    <StyledHeader className={`bg-white ${className}`}>
      <Logo>
        <span>Phone Book ({recordData})</span>
      </Logo>
      <div className="flex justify-between w-full sm:w-auto ">
        <input
          type="date"
          className="p-2 border rounded-lg"
          value={searchDate}
          name="date"
          onChange={(e) => {
            setSearchDate(e.target.value);
            fetchRecordsByDate(e.target.value);
          }}
        />
        <div className="flex items-center sm:ml-2">
          <Button
            className="flex justify-center border rounded-lg mr-2"
            onClick={() => setOpenSearch(true)}
          >
            <SearchIcon />
            <span className="hidden sm:inline">Search</span>
          </Button>
          <Button
            className="flex justify-center border rounded-lg mr-2"
            onClick={() => openAdd()}
          >
            <Plus />
            <span className="hidden sm:inline">Add</span>
          </Button>
          <Button
            className="flex justify-center border rounded-lg"
            onClick={() => logout()}
          >
            <LogOut />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </StyledHeader>
  );
}
