import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getUsersCoversations } from "../../actions/conversationAction";

const Conversation = ({ conversation, userId }) => {
  // const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  // const { user } = useSelector((state) => state.getUsersConversations);

  // console.log(user);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== userId);
    // dispatch(getUsersCoversations(friendId));
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/user/${friendId}`);
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, userId]);

  return (
    <li>
      <Link to="/chat">
        <img src={user && user.avatar} alt="avatar" />
        <div>
          <h4 className="chat--username">{user && user.username}</h4>
          <small>Hello</small>
        </div>
      </Link>
    </li>
  );
};

export default Conversation;
