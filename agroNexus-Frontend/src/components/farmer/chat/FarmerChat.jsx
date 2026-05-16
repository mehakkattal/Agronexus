import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiService from "../../services/ApiService";

export default function FarmerChat() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const farmerId = sessionStorage.getItem("userId");

  useEffect(() => {
   ApiService.getFarmerConversations({
      farmerId
    }).then(res => {
      if (res.data.success) {
        setUsers(res.data.data);
      }
    });
  }, []);

  return (
    <div className="container mt-4">
      <h3>Messages</h3>

      {users.map((user, index) => (
        <div
          key={index}
          className="card p-3 mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/farmer/chat/${user._id}`)}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}
