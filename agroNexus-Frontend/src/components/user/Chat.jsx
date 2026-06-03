import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import ApiService from "../services/ApiService";
import socket from "../services/socketService";

export default function Chat({ receiverId }) {

  const userId = sessionStorage.getItem("userId");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);



  useEffect(() => {
  socket.on("connect", () => {
    console.log("Socket Connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log("Socket Error:", err.message);
  });
}, []);


  // ✅ Register logged in user
  useEffect(() => {
    if (!userId) return;
    socket.emit("register_user", userId);
  }, [userId]);


  function getDateLabel(date) {
    const msgDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (msgDate.toDateString() === today.toDateString()) return "Today";
    if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday";

    // Otherwise return formatted date
    return msgDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }


  // ✅ Load old messages when chat opens
  useEffect(() => {
    if (!receiverId) return;
    ApiService.getMessages(userId, receiverId)
      .then(res => {
        if (res.data.success) {
          setMessages(res.data.data);
        }
      });

  }, [receiverId, userId]);

  // ✅ Listen for new messages
  useEffect(() => {
    socket.on("receive_private", (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => socket.off("receive_private");
  }, []);

  // ✅ Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("private_message", {
      to: receiverId,
      from: userId,
      message
    });

    setMessage("");
  };


  return (
    <div style={styles.wrapper}>

      {/* Header */}
      {/* <div style={styles.header}>
      <span>Chat</span>
    </div> */}

      {/* Messages Area */}
      <div style={styles.chatBox}>
        {messages.map((msg, index) => {
          const isMe = msg.senderId === userId || msg.from === userId;

          // Check if we need to show date label
          const prevMsgDate = messages[index - 1]?.createdAt;
          const showDateLabel =
            !prevMsgDate ||
            new Date(prevMsgDate).toDateString() !== new Date(msg.createdAt).toDateString();

          return (
            <div key={index}>
              {showDateLabel && (
                <div style={styles.dateLabel}>
                  {getDateLabel(msg.createdAt)}
                </div>
              )}

              <div
                style={{
                  ...styles.messageRow,
                  justifyContent: isMe ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    background: isMe ? "rgba(14, 81, 50, 1)" : "#f1f0f0",
                    color: isMe ? "#fff" : "#000",
                    borderBottomRightRadius: isMe ? 4 : 16,
                    borderBottomLeftRadius: isMe ? 16 : 4
                  }}
                >
                  <div>{msg.message}</div>
                  <div style={styles.time}>
                    {new Date(msg.createdAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>


      {/* Input */}
      <div style={styles.inputArea}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>

    </div>
  );

}

const styles = {
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",          // <-- make wrapper take full height
    background: "#fff"
  },

  chatBox: {
    flex: 1,                 // fill the available space
    padding: 20,
    overflowY: "auto",       // enable scrolling
    display: "flex",
    flexDirection: "column",
    gap: 10,
    boxSizing: "border-box"
  },

  header: {
    padding: "15px 20px",
    background: "#155a3aff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },


  messageRow: {
    display: "flex"
  },

  messageBubble: {
    padding: "10px 14px",
    borderRadius: 16,
    maxWidth: "65%",
    fontSize: 14,
    display: "flex",
    flexDirection: "column",
    gap: 4
  },

  time: {
    fontSize: 10,
    opacity: 0.7,
    alignSelf: "flex-end"
  },

  inputArea: {
    display: "flex",
    padding: 10,
    borderTop: "1px solid #ddd",
    background: "#fff"
  },

  input: {
    flex: 1,
    padding: "10px 15px",
    borderRadius: 20,
    border: "1px solid #ddd",
    outline: "none",
    fontSize: 14
  },

  button: {
    marginLeft: 10,
    padding: "8px 20px",
    borderRadius: 20,
    border: "none",
    background: "#198754",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

