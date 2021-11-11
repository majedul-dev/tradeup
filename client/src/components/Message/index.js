import React, { useEffect } from "react";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { success } = useSelector((state) => state.createMessage);

  useEffect(() => {}, [success]);

  return (
    <div>
      <img src={message.sender.avatar && message.sender.avatar} alt="avatar" />
      <div>
        <h4 className="chat--username">{message && message.sender.username}</h4>
        <p>{message && message.text}</p>
        <small className="text-muted">
          {format(message && message.createdAt)}
        </small>
      </div>
    </div>
  );
};

export default Message;
