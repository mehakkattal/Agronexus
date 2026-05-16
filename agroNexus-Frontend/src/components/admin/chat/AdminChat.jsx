import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiService from "../../services/ApiService";

export default function AdminChat() {
  const [farmers, setFarmers] = useState([]);
  const navigate = useNavigate();
  const adminId = sessionStorage.getItem("userId");

  useEffect(() => {
    ApiService.getAdminConversations({adminId})
    .then(res => {
      if (res.data.success) {
        setFarmers(res.data.data);
      }
    });
  }, []);

  return (
    <div className="container mt-4">
      <h3>Farmer Messages</h3>

      {farmers.map((farmerId, index) => (
        <div
          key={index}
          className="card p-3 mb-2"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/admin/chat/${farmerId}`)}
        >
          Chat with Farmer
        </div>
      ))}
    </div>
  );
}



