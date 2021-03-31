import React from "react";
import { X, Search as SearchIcon } from "react-feather";
import BottomSheet from "../BottomSheet";
import Spinner from "../Spinner";
import SearchList from "./SearchList";

export default function Search({
  openSearch,
  onClose,
  searchKeyword,
  searchData,
  loading,
  handleSearch,
  setSearch,
}) {
  return (
    <BottomSheet open={openSearch} onClose={onClose}>
      <div className="p-3">
        <div className="flex border rounded-lg w-full sm:w-72 mx-auto justify-between items-center shadow">
          <div className="p-2 border-r">
            <SearchIcon />
          </div>
          <input
            type="number"
            inputMode="numeric"
            className="px-3 py-2 rounded-r-lg w-auto"
            style={{ minWidth: 100 }}
            placeholder="Enter phone number"
            name="search"
            autoComplete="off"
            value={searchKeyword}
            onChange={handleSearch}
          />
          <div className="p-2 border-l">
            <X onClick={onClose} className="justify-self-end" />
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : searchData && Object.keys(searchData).length > 0 ? (
          <SearchList list={searchData} />
        ) : (
          <div className="h-40 flex justify-center items-center">
            No records found
          </div>
        )}
      </div>
    </BottomSheet>
  );
}
