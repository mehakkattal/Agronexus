import { useParams } from "react-router-dom";
import Chat from "../../user/Chat";


export default function FarmerChatWrapper() {
  const { userId } = useParams();
  return <Chat receiverId={userId} />;
}
