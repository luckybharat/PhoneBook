import React from "react";
import { Phone, User } from "react-feather";

export default function ListItem(props) {
  const { name, phone, remark, time } = props;
  return (
    <div className="flex align-items-center my-3">
      <div className="bg-blue-400 text-white rounded-full w-12 h-12 flex items-center justify-center">
        <Phone />
      </div>
      <div className="ml-2 flex flex-col">
        <span className="text-lg">{phone}</span>
        <span className="flex items-center text-gray-400 text-sm">
          {name ? <User className="w-4 h-4" /> : null}
          <span className="ml-2">{`${name ? name + ", " + time : name}`}</span>
        </span>
      </div>
    </div>
  );
}
