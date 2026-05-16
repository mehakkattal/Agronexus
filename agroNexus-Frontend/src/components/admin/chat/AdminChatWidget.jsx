import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "../../user/Chat";
import ApiService from "../../services/ApiService";

export default function AdminChatWidget() {
  const [open, setOpen] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const adminId = sessionStorage.getItem("userId"); // admin's ID

  useEffect(() => {
    if (!adminId) return;

    ApiService.getChatAdminFarmers() 
      .then(res => {
        if (res.data.success) setFarmers(res.data.data);
      })
      .catch(err => console.log(err));
  }, [adminId]);

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
      {!open && (
        <button
          style={{
            borderRadius: "50%",
            width: 60,
            height: 60,
            fontSize: 24,
            background: "#34AD54",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}

      {open && (
        <div style={{
          display: "flex",
          width: 350,
          height: 500,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          overflow: "hidden",
          color: "black",
        }}>
          {!receiverId && (
            <div style={{ width: "100%", borderRight: "1px solid #ddd", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: 10, fontWeight: "bold",color:"white", background: "#198754", display: "flex", justifyContent: "space-between" }}>
                <span>Farmers</span>
                <button style={{ border: "none", background: "transparent", cursor: "pointer" }} onClick={() => setOpen(false)}>X</button>
              </div>

              <div style={{ flex: 1, overflowY: "auto" }}>
                {farmers.length ? farmers.map(f => (
                  <div
                    key={f._id}
                    style={{ padding: 10, borderBottom: "1px solid #ddd", cursor: "pointer" }}
                    onClick={() => setReceiverId(f._id)}
                  >
                    {f.name}
                  </div>
                )) : <div style={{ padding: 10 }}>No farmers found</div>}
              </div>
            </div>
          )}

          {receiverId && (
            <div style={styles.chatPanel}>
              <div style={styles.chatHeader} >
                <button onClick={() => setReceiverId(null)} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 18 }}>←</button>
                <span>{farmers.find(f => f._id === receiverId)?.name || "Chat"}</span>
                <button onClick={() => setOpen(false)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>X</button>
              </div>

              <div style={styles.chatPanelInner}>
    <Chat receiverId={receiverId} />
  </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



const styles={
  chatPanel: {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,        // allows chat box to shrink inside flex
  position: "relative", // for header z-index stacking
},

chatHeader: {
  padding: 10,
  background: "rgb(25, 135, 84)",
  color: "black",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontWeight: "bold",
  position: "relative", // <-- add this
  zIndex: 10            // <-- higher than chat area
},

chatPanelInner: {
  flex: 1,
  overflowY: "auto",   // scrollable messages
  padding: 0,
  color: "black",
},
}