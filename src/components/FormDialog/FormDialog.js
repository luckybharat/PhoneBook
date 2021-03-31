import React from "react";
import { X } from "react-feather";
import Drawer from "../Drawer";

export default function FormDialog({
  open,
  currentEdit,
  setCurrentEdit,
  record,
  handleRecordChange,
  handleSubmit,
  closeForm,
  resetForm,
  initialValue,
}) {
  return (
    <Drawer open={open}>
      <form className="flex flex-col px-2">
        <div className="text-lg my-2 w-full flex items-center justify-between p-2">
          <span>Add New Record</span>
          <X
            onClick={(e) => {
              e.preventDefault();
              console.log("came");
              closeForm();
              if (currentEdit !== "") setCurrentEdit("");
            }}
          />
        </div>
        <input
          type="number"
          inputMode="numeric"
          name="phone"
          value={record.phone}
          placeholder="10 digit mobile number"
          className="border rounded my-2 focus:border-blue-300 p-3"
          onChange={handleRecordChange}
          required={true}
          minLength={10}
          maxLength={10}
        />
        <input
          type="text"
          name="name"
          value={record.name}
          onChange={handleRecordChange}
          placeholder="Name"
          className="border rounded my-2 focus:border-blue-300 p-3"
          autoComplete="off"
        />
        <input
          type="date"
          value={record.date}
          onChange={handleRecordChange}
          min={initialValue.date}
          placeholder={record.date}
          className="border bg-white rounded my-2 focus:border-blue-300 p-3 w-full"
          name="date"
        />
        <input
          type="text"
          value={record.remark}
          onChange={handleRecordChange}
          placeholder="Remark"
          name="remark"
          className="border rounded my-2 focus:border-blue-300 p-3"
        />

        <div className="text-center mt-2">
          <button
            className="px-4 py-2 border border-blue-300 rounded-lg hidden md:inline-block"
            onClick={(e) => {
              e.preventDefault();
              resetForm();
              console.log("came");
              // closeForm();
              // if (currentEdit !== "") setCurrentEdit("");
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 border border-blue-500 ml-3 text-white rounded-lg"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </Drawer>
  );
}
