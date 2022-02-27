import React, { useEffect, useState } from "react";
import { Edit, Inbox, Trash2, Search as SearchIcon } from "react-feather";
import styled from "styled-components";
import { db } from "../../context/firebase";

import FormDialog from "../FormDialog/FormDialog";
import Search from "../Search/Search";
import {
  StyledTable,
  StyledThead,
  StyledTr,
  StyledTh,
  StyledThTr,
  StyledTd,
  TextWrapper,
  StyledTbody,
  TableWrapper,
} from "../DataTable/DataTable";

import Header from "../Header/Header";
import Spinner from "../Spinner";
import Content from "./Content";
import ListItem from "./ListItem";

const Frame = styled.div`
  position: relative;
  width: 100%;
  max-height: 100vh;
  overflow-y: hidden;
`;

const getDate = () => {
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  console.log(date.toLocaleDateString([], {
    day: "2-digit",
    minute: "2-digit",
    year: "numeric",
  }))
  return `${date.getFullYear()}-${month}-${day}`;
};

const getTime = () => {
  const time = new Date();
  return time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export default function HomeScreen() {
  const initialValue = {
    name: "",
    phone: "",
    remark: "",
    date: getDate(),
    time: getTime(),
  };
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [record, setRecord] = useState(initialValue);
  const [recordData, setRecordData] = useState({
    data: [],
    loading: true,
  });
  const [search, setSearch] = useState({
    keyword: "",
    result: [],
    loading: false,
  });
  const [currentEdit, setCurrentEdit] = useState("");
  const [searchDate, setSearchDate] = useState(getDate());

  const openAdd = () => {
    console.log("came");
    setOpen(true);
  };
  //console.log(record.date);

  const onEdit = (objId) => {
    console.log(objId);
    setCurrentEdit(objId);
    const { name, date, remark, phone, time } = recordData.data[objId];
    setRecord({
      name,
      date: getFormattedDate(date),
      phone,
      remark,
      time: time ? time : "",
    });
    setOpen(true);
  };

  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setRecord({ ...record, [name]: value });
  };

  const closeSearch = () => {
    setOpenSearch(false);
  };

  const getFormattedDate = (date) => {
    if (date) {
      let fd = date.split("-");
      // adds a 0 in month if month is less than 10 ex. if month is 9 it will return 09
      if (fd[1].length !== 2) fd[1] = "0" + fd[1];
      // adds a 0 in day if day is less than 10 ex. if day is 9 it will return 09
      if (fd[2].length !== 2) fd[2] = "0" + fd[2];
      // returns the new formatted date;
      return fd.join("-");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(record);
    // console.log(new Date().toLocaleString());
    if (record.phone.length !== 10) {
      alert("Invalid phone number");
      return false;
    }
    if (currentEdit !== "") {
      await db.child(`phoneRecords/${currentEdit}`).set(record, (err) => {
        if (err) console.error(err);
        setCurrentEdit("");
        closeForm();
      });
      return false;
    } else {
      console.log(getTime());
      setRecord({ ...record, time: getTime() });
      await db.child("phoneRecords").push(record, () => {
        alert("New Record created");
        resetForm();
        // closeForm();
      });
    }
  };

  const onDelete = (objId) => {
    if (window.confirm("Are you sure ?"))
      db.child(`phoneRecords/${objId}`).remove((err) => {
        if (err) console.error(err);
      });
  };

  const resetForm = () => {
    setRecord(initialValue);
    if (currentEdit !== "") setCurrentEdit("");
  };

  const closeForm = () => {
    resetForm(initialValue);
    setOpen(false);
  };

  const fetchRecords = () => {
    db.child("phoneRecords")
      .orderByPriority()
      .on("value", (snap) => {
        if (snap.val()) {
          // console.log(snap.val());
          setRecordData({ data: snap.val(), loading: false });
        }
      });
  };

  const handleSearch = (e) => {
    setSearch({ keyword: e.target.value, loading: false, data: [] });
    if (e.target.value.length > 2) searchData(e.target.value);
  };

  const searchData = (phone) => {
    db.child("phoneRecords")
      .orderByChild("phone")
      .startAt(phone)
      .endAt(phone + "\uf8ff")
      .on("value", (snap) => {
        if (snap.val()) {
          console.log("here");
          setSearch({ keyword: phone, loading: false, result: snap.val() });
        } else {
          console.log("i am");
          setSearch({
            keyword: phone,
            loading: false,
            result: [],
          });
        }
      });
  };

  const fetchRecordsByDate = (date) => {
    // staggerText(LogoRef, TextRef, Text1Ref);
    setRecordData({ data: [], loading: true });
    db.child("phoneRecords")
      .orderByChild("date")
      .equalTo(date)
      .on("value", (snap) => {
        if (snap.val()) {
          setRecordData({ data: snap.val(), loading: false });
        } else {
          setRecordData({ data: [], loading: false });
        }
      });
  };

  useEffect(() => {
    fetchRecordsByDate(searchDate);
  }, []);

  return (
    <>
      <Frame>
        <Header
          recordData={Object.keys(recordData.data).length}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          fetchRecordsByDate={fetchRecordsByDate}
          openAdd={openAdd}
          setOpenSearch={setOpenSearch}
        />
        <Content className="h-screen max-h-screen">
          {/* <div>
            {Object.keys(recordData.data).length > 0
              ? Object.keys(recordData.data)
                  .reverse()
                  .map((item, index) => {
                    return <ListItem key={index} {...recordData.data[item]} />;
                  })
              : recordData.loading
              ? "loading"
              : "no records available"}
          </div> */}
          <TableWrapper>
            {Object.keys(recordData.data).length > 0 ? (
              <StyledTable>
                <StyledThead className="bg-indigo-400">
                  <StyledThTr>
                    <StyledTh>#</StyledTh>
                    <StyledTh>
                      <span>Date </span>
                      <span>(Y-M-D)</span>
                    </StyledTh>
                    <StyledTh>Phone</StyledTh>
                    <StyledTh>Actions</StyledTh>
                  </StyledThTr>
                </StyledThead>
                <StyledTbody>
                  {Object.keys(recordData.data)
                    .reverse()
                    .map((item, index) => {
                      const crr = recordData.data[item];
                      // console.log(crr);
                      return (
                        <StyledTr
                          key={index}
                          className={`${
                            item === currentEdit
                              ? "bg-yellow-100"
                              : index === 0
                              ? " bg-gray-100"
                              : ""
                          }`}
                        >
                          <StyledTd>
                            <TextWrapper>{index + 1}</TextWrapper>
                          </StyledTd>
                          <StyledTd>
                            <TextWrapper>
                              <div className="flex flex-col">
                                <span>{crr.date}</span>
                                {crr?.time ? (
                                  <span className="text-sm text-gray-500">
                                    {crr.time}
                                  </span>
                                ) : null}
                              </div>
                            </TextWrapper>
                          </StyledTd>
                          <StyledTd>
                            <TextWrapper className="flex-col" center={false}>
                              <span className="font-bold text-gray-600">
                                {crr.phone}
                              </span>
                              {crr.remark ? (
                                <span className="text-sm text-gray-500">
                                  {crr.remark}
                                </span>
                              ) : null}
                            </TextWrapper>
                          </StyledTd>
                          <StyledTd>
                            <TextWrapper>
                              <button className="mr-4 p-2 rounded-full text-blue-400 bg-gray-50">
                                <SearchIcon
                                  onClick={() => {
                                    setOpenSearch(true);
                                    searchData(crr.phone);
                                  }}
                                />
                              </button>
                              <button
                                className="p-2 rounded-full bg-gray-50 text-yellow-400"
                                onClick={() => onEdit(item)}
                              >
                                <Edit />
                              </button>
                              <button
                                className="ml-4 p-2 rounded-full text-red-400 bg-gray-50"
                                onClick={() => onDelete(item)}
                              >
                                <Trash2 />
                              </button>
                            </TextWrapper>
                          </StyledTd>
                        </StyledTr>
                      );
                    })}
                </StyledTbody>
              </StyledTable>
            ) : recordData.loading ? (
              <div className="w-full h-full flex flex-col items-center justify-center h-screen">
                <Spinner width="48" height="48" />
                <span className="mt-2">Loading...</span>
              </div>
            ) : (
              <div className="w-full h-full flex items-center flex-col justify-center h-screen">
                <Inbox className="w-12 h-12" />
                <span>No records available</span>
                <div
                  onClick={() => {
                    setRecord({ ...record, date: searchDate });
                    openAdd();
                  }}
                  className="text-gray-700 mt-2 hover:tracking-widest transition-all duration-200 transform cursor-pointer"
                >
                  Click here to add data on {searchDate}
                </div>
              </div>
            )}
          </TableWrapper>
        </Content>
        <Search
          searchKeyword={search.keyword}
          searchData={search.result}
          loading={search.loading}
          openSearch={openSearch}
          handleSearch={handleSearch}
          onClose={() => setOpenSearch(false)}
        />
        <FormDialog
          open={open}
          currentEdit={currentEdit}
          setCurrentEdit={setCurrentEdit}
          record={record}
          handleRecordChange={handleRecordChange}
          handleSubmit={handleSubmit}
          closeForm={closeForm}
          resetForm={resetForm}
          initialValue={initialValue}
        />
      </Frame>
    </>
  );
}
