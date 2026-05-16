import { useParams } from "react-router-dom";
import Chat from "../../user/Chat";

export default function AdminChatWrapper() {
  const { farmerId } = useParams();
  return <Chat receiverId={farmerId} />;
}