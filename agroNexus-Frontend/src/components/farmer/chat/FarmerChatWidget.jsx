import { useEffect, useState } from "react";

import axios from "axios";
import Chat from "../../user/Chat";
import ApiService from "../../services/ApiService";

export default function FarmerChatWidget() {
  const [open, setOpen] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [users, setUsers] = useState([]);
  const farmerId = sessionStorage.getItem("userId"); // farmer's ID stored in session

  // Fetch all users who booked this farmer's lands
//   useEffect(() => {
//     if (!farmerId) return;

//     axios.post("http://localhost:5000/chat/get-chat-users", { farmerId })
//       .then(res => {
//         if (res.data.success) setUsers(res.data.data);
//       })
//       .catch(err => console.log(err));
//   }, [farmerId]);
useEffect(() => {
  if (!farmerId) return;

  // Fetch all users
 ApiService.getChatUsers(farmerId)
    .then(res => {
      let allUsers = [];
      if (res.data.success) allUsers = res.data.data;

      // Fetch admin
      ApiService.getAdmin()
        .then(adminRes => {
          if (adminRes.data.success) {
            // Add admin to list
            allUsers = [...allUsers, ...adminRes.data.data];
          }
          setUsers(allUsers);
        })
        .catch(err => setUsers(allUsers)); // fallback to just users
    })
    .catch(err => console.log(err));
}, [farmerId]);


  return (
    <div style={styles.widget}>
      {!open && (
        <button style={styles.floatingButton} onClick={() => setOpen(true)}>
          💬
        </button>
      )}
      

      {open && (
        <div style={styles.chatContainer}>
          {/* Sidebar: user list */}
          {!receiverId && (
            <div style={styles.sidebar}>
              <div style={styles.sidebarHeader}>
                <span>Users</span>
                <button style={styles.closeBtn} onClick={() => setOpen(false)}>X</button>
              </div>
              <div style={styles.farmerList}>
  {users.length ? users.map(u => (
    <div
      key={u._id}
      style={{
        ...styles.farmerItem,
        fontWeight: u.userType === "1" ? "bold" : "normal",
        background: u.userType === "1" ? "#f0f0f0" : "transparent"
      }}
      onClick={() => setReceiverId(u._id)}
    >
      {u.name} {u.userType === "1" ? "(Admin)" : ""}
    </div>
  )) : <div style={{ padding: 10 }}>No users booked</div>}
</div>

            </div>
          )}

          {/* Chat panel */}
          {receiverId && (
            <div style={styles.chatPanel}>
              <div style={styles.chatHeader}>
                <button onClick={() => setReceiverId(null)} style={styles.backBtn}>←</button>
                <span>{users.find(u => u._id === receiverId)?.name || "Chat"}</span>
                <button onClick={() => setOpen(false)} style={styles.closeBtn}>X</button>
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

// reuse same styles
const styles = {
  widget: { position: "fixed", bottom: 20, right: 20, zIndex: 9999 },
  floatingButton: {
    borderRadius: "50%",
    width: 60,
    height: 60,
    fontSize: 24,
    background: "#34AD54",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },
  chatContainer: {
    display: "flex",
    width: 350,
    height: 500,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    overflow: "hidden",color: "black",
  },
  sidebar: { width: "100%", borderRight: "1px solid #ddd", display: "flex", flexDirection: "column" },
  sidebarHeader: { padding: 10, fontWeight: "bold", background: "#198754", color:"white", display: "flex", justifyContent: "space-between" },
  farmerList: { flex: 1, overflowY: "auto" },
  farmerItem: { padding: 10, borderBottom: "1px solid #ddd", cursor: "pointer" },
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
  color: "white",
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
  closeBtn: { border: "none", background: "transparent", color:"white", cursor: "pointer" },
  backBtn: { border: "none", background: "transparent", color:"white", cursor: "pointer", fontSize: 18 }
};
