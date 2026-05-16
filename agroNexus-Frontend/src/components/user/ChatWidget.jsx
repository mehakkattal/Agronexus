
import { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import ApiService from "../services/ApiService";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    ApiService.getChatFarmers(userId)
      .then(res => {
        if (res.data.success) setFarmers(res.data.data);
      })
      .catch(err => console.log(err));
  }, [userId]);

  return (
    <div style={styles.widget}>
      {!open && (
        <button style={styles.floatingButton} onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {open && (
        <div style={{
          ...styles.chatContainer,
          display: receiverId ? "flex" : "block",
        }}
        >
          {/* Sidebar: farmer list */}
          {!receiverId && (
            <div style={styles.sidebar}>
              <div style={styles.sidebarHeader}>
                <span>Farmers</span>
                <button style={styles.closeBtn} onClick={() => setOpen(false)}>X</button>
              </div>
              <div style={styles.farmerList}>
                {farmers.length ? farmers.map(f => (
                  <div
                    key={f._id}
                    style={styles.farmerItem}
                    onClick={() => setReceiverId(f._id)}
                  >
                    {f.name}
                  </div>
                )) : <div style={{ padding: 10 }}>No farmers booked</div>}
              </div>
            </div>
          )}

          {/* Chat panel */}
          {receiverId && (
            <div style={styles.chatPanel}>
              <div style={styles.chatHeader}>
                <button onClick={() => setReceiverId(null)} style={styles.backBtn}>←</button>
                <span>{farmers.find(f => f._id === receiverId)?.name || "Chat"}</span>
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

const styles = {
  widget: { position: "fixed", bottom: 20, right: 20, zIndex: 9999 },
  floatingButton: {
    borderRadius: "50%",
    width: 60,
    height: 60,
    fontSize: 24,
    background: "#1a562aff",
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
    overflow: "hidden",
    color: "black",
  },
  sidebar: { width: "100%", borderRight: "1px solid #ddd", display: "flex", flexDirection: "column" },
  sidebarHeader: { padding: 10, fontWeight: "bold", color: "white", background: "#198754", display: "flex", justifyContent: "space-between" },
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
    background: "rgba(13, 77, 47, 1)",
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

  closeBtn: { border: "none", background: "transparent", color: "white", cursor: "pointer" },
  backBtn: { border: "none", background: "transparent", color: "white", cursor: "pointer", fontSize: 18 }
};

