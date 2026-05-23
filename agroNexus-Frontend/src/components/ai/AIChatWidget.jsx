// import { useState } from "react";
// // import "./AIChatWidget.css";

// export default function AIChatWidget({ role }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Floating Robot Button */}
//       <div className="ai-float-button" onClick={() => setOpen(!open)}>
//         🤖
//       </div>

//       {/* Chat Window */}
//       {open && (
//         <div className="ai-chat-box">
//           <div className="ai-header">
//             AI Assistant ({role})
//           </div>

//           <div className="ai-body">
//             <p>Hi 👋 How can I help you?</p>
//           </div>

//           <div className="ai-footer">
//             <input placeholder="Ask something..." />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
















import { useState } from "react";
import axios from "axios";

export default function AIChatWidget({ role }) {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to UI
    const userMessage = { sender: "user", text: message };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await axios.post(
        "https://agronexus-bi3q.onrender.com/gemini/chat",
        {
          message: message,
          role: role   // 🔥 IMPORTANT
        }
      );

      const aiMessage = {
        sender: "ai",
        text: res.data.reply
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.log("AI error:", error);
    }

    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      {/* <div className="ai-float-button" onClick={() => setOpen(!open)}>
        🤖
      </div> */}

      {/* <div className="ai-float-button" onClick={() => setOpen(!open)}>
  <div className="robot-face">
    <div className="robot-eyes">
      <span></span>
      <span></span>
    </div>
  </div>
</div> */}





      {/* <div className="ai-float-button" onClick={() => setOpen(!open)}>
  <div className="ai-robot">

    <div className="ai-antenna">
      <div className="ai-antenna-light"></div>
    </div>

    <div className="ai-head">
      <div className="ai-eye left"></div>
      <div className="ai-eye right"></div>
      <div className="ai-mouth"></div>
    </div>

    <div className="ai-body"></div>

    <div className="ai-legs">
      <span></span>
      <span></span>
    </div>

    <div className="ai-bubble">Hi 👋 I'm your Smart Farm AI</div>

  </div>
</div> */}







      {/* 
<div className="ai-float-button" onClick={() => setOpen(!open)}>
  <div className="mini-robot">

    <div className="mini-antenna">
      <div className="mini-antenna-light"></div>
    </div>

    <div className="mini-head">
      <div className="mini-eye left"></div>
      <div className="mini-eye right"></div>
    </div>

  

  </div>
</div> 

 */}



      <div className="ai-float-button" onClick={() => setOpen(!open)}>
        <div className="cute-ai-bot">

          {/* Glow */}
          <div className="bot-shadow"></div>

          {/* Leaf */}
          <div className="bot-leaf">
            <div className="leaf-left"></div>
            <div className="leaf-right"></div>
            <div className="leaf-stem"></div>
          </div>



          {/* Head */}
          <div className="bot-head">

            {/* Ears */}
            <div className="bot-ear left"></div>
            <div className="bot-ear right"></div>

            {/* Face */}
            <div className="bot-face">

              <div className="bot-eye left"></div>
              <div className="bot-eye right"></div>

              <div className="bot-mouth"></div>

              <div className="face-shine"></div>

            </div>

          </div>

          {/* Body */}
          {/* <div className="bot-body">
      <div className="bot-core"></div>
    </div> */}

        </div>
      </div>





      {open && (
        <div className="ai-chat-box">

          {/* <div className="ai-header">
            AI Assistant ({role})
          </div> */}


          <div className="ai-header">

            <span>
              AI Assistant ({role})
            </span>

            <div
              className="chat-close"
              onClick={() => setOpen(false)}
            >
              ✕
            </div>

          </div>

          <div className="ai-body">
            {messages.length === 0 && (
              <p>Hi 👋 How can I help you?</p>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? "user-msg" : "ai-msg"}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="ai-footer">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            {/* <button onClick={sendMessage}>Send</button> */}

            <button onClick={sendMessage}>
              ➤
            </button>
          </div>

        </div>
      )}







    </>
  );
}