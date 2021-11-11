import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import axios from "axios";
import { Button } from "../../components";
import { OfferModal, TrackOrderModal } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { allConversations } from "../../actions/conversationAction";
import { createMessage } from "../../actions/messageActions";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";

const Chat = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [offerModalShow, setOfferModalShow] = useState(false);
  const [TrackModalShow, setTrackModalShow] = useState(false);
  const handleCloseOffer = () => setOfferModalShow(false);
  const handleCloseTrack = () => setTrackModalShow(false);

  const { user } = useSelector((state) => state.auth);
  const { conversations } = useSelector((state) => state.getConversations);
  const { success } = useSelector((state) => state.createConversation);
  const { success: messageSuccess, loading } = useSelector(
    (state) => state.createMessage
  );

  useEffect(() => {
    dispatch(allConversations(user._id));
  }, [dispatch, user._id, success]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(`/api/message/${currentChat?._id}`);
        setMessages(data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat, messageSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };

    dispatch(createMessage(message));

    if (messageSuccess) {
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="chat container section">
      <div className="chat__conversations">
        <div>All Convarsations</div>
        <ul className="chat--lists">
          {conversations.map((item) => (
            <div onClick={() => setCurrentChat(item)}>
              <Conversation conversation={item} userId={user._id} />
            </div>
          ))}
        </ul>
      </div>
      <div className="chat__message">
        {currentChat ? (
          <>
            <div className="message__header">
              <div>Messages</div>
            </div>
            <div className="message__body">
              {!loading &&
                messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message key={m._id} message={m} />{" "}
                  </div>
                ))}
            </div>
            <div>
              <form className="message__footer" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <div>
                  <Button type="submit" className="button">
                    Send
                  </Button>
                </div>
              </form>
            </div>
            <OfferModal show={offerModalShow} handleClose={handleCloseOffer} />
            <TrackOrderModal
              show={TrackModalShow}
              handleClose={handleCloseTrack}
            />
          </>
        ) : (
          <span className="conversation__placeholder">Open a conversation</span>
        )}
      </div>
    </section>
  );
};

export default Chat;
