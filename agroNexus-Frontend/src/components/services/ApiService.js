import axios from "axios"
const BASEURL="https://agronexus-bi3q.onrender.com"

class ApiServices{
    getToken(){
        let token=sessionStorage.getItem("token")
        let headers={
                Authorization:token
            }
        return headers
    }

    login(data){
        return axios.post(BASEURL+"/api/user/login", data,{headers:this.getToken()})
    }
    softDeleteUser(data){
        return axios.post(BASEURL+"/admin/user/softDelete", data, {headers:this.getToken()})
    }
    register(data){
        return axios.post(BASEURL+"/api/user/register", data)
    }
    farmerregister(data){
        return axios.post(BASEURL+"/api/user/farmerregister", data)
    }
    allUser(data){
        return axios.post(BASEURL+"/api/user/all",data )
    }
    addSeason(data){
        return axios.post(BASEURL+"/admin/season/add", data,{headers:this.getToken()})
    }
    allSeason(data){
        return axios.post(BASEURL+"/api/season/all",data )
    }
    softDeleteSeason(data){
        return axios.post(BASEURL+"/admin/season/softDelete", data, {headers:this.getToken()})
    }
    singleSeason(data){
        return axios.post(BASEURL+"/api/season/single",data)
    }
    updateSeason(data){
        return axios.post(BASEURL+"/admin/season/update",data,{headers:this.getToken()})
    }
    DeleteSeason(data){
        return axios.post(BASEURL+"/admin/season/delete",data,{headers:this.getToken()})
    }
    addLand(data){
        return axios.post(BASEURL+"/farmer/land/add", data,{headers:this.getToken()})
    }
    allLand(data){
        return axios.post(BASEURL+"/api/land/all", data,{headers:this.getToken()})
    }
    softDeleteLand(data){
        return axios.post(BASEURL+"/admin/land/softDelete", data, {headers:this.getToken()})
    }
    singleLand(data){
        return axios.post(BASEURL+"/api/land/single",data)
    }
    updateLand(data){
        return axios.post(BASEURL+"/farmer/land/update",data,{headers:this.getToken()})
    }
    DeleteLand(data){
        return axios.post(BASEURL+"/farmer/land/delete",data,{headers:this.getToken()})
    }
    addCrop(data){
        return axios.post(BASEURL+"/farmer/crop/add", data,{headers:this.getToken()})
    }
    allCrop(data){
        return axios.post(BASEURL+"/api/crop/all", data,{headers:this.getToken()})
    }
    softDeleteCrop(data){
        return axios.post(BASEURL+"/farmer/crop/softDelete", data, {headers:this.getToken()})
    }
    singleCrop(data){
        return axios.post(BASEURL+"/api/crop/single",data)
    }
    updateCrop(data){
        return axios.post(BASEURL+"/farmer/crop/update",data,{headers:this.getToken()})
    }
    DeleteCrop(data){
        return axios.post(BASEURL+"/farmer/crop/delete",data,{headers:this.getToken()})
    }
    addBooking(data){
        return axios.post(BASEURL+"/user/user/booking/add", data,{headers:this.getToken()})
    }
    allBooking(data){
        return axios.post(BASEURL+"/api/booking/all", data,{headers:this.getToken()})
    }
    softDeleteBooking(data){
        return axios.post(BASEURL+"/farmer/booking/softDelete", data, {headers:this.getToken()})
    }
    singleBooking(data){
        return axios.post(BASEURL+"/api/booking/single",data)
    }
    updateBooking(data){
        return axios.post(BASEURL+"/user/user/booking/update",data,{headers:this.getToken()})
    }
    DeleteBooking(data){
        return axios.post(BASEURL+"/farmer/booking/delete",data,{headers:this.getToken()})
    }

//    DeleteBooking(data){
//     return axios.post(
//         BASEURL+"/user/booking/delete",
//         data,
//         {headers:this.getToken()}
//     )
// }

    addProgress(data){
        return axios.post(BASEURL+"/farmer/progress/add", data,{headers:this.getToken()})
    }
    allProgress(data){
        return axios.post(BASEURL+"/api/progress/all", data,{headers:this.getToken()})
    }
    softDeleteProgress(data){
        return axios.post(BASEURL+"/farmer/progress/softDelete", data, {headers:this.getToken()})
    }
    singleProgress(data){
        return axios.post(BASEURL+"/api/progress/single",data)
    }
    updateProgress(data){
        return axios.post(BASEURL+"/farmer/progress/update",data,{headers:this.getToken()})
    }
    DeleteProgress(data){
        return axios.post(BASEURL+"/farmer/progress/delete",data,{headers:this.getToken()})
    }
    dashboard(data){
        return axios.post(BASEURL+"/api/dashboard",data)
    }

    getGeminiCropSuggestion(data) {
    return axios.post(
      BASEURL + "/gemini/suggest",
      data,
       // optional auth
    );
  }
getGeminiCropSummary(data) {
  return axios.post(
    BASEURL + "/gemini/summary",
    data
  );
}

  getChatFarmers(userId) {
    return axios.post(
      `${BASEURL}/chat/get-chat-farmers`,
      { userId },
      { headers: this.headers }
    );
  }

  // Get all users who booked a farmer's lands
  getChatUsers(farmerId) {
    return axios.post(
      `${BASEURL}/chat/get-chat-users`,
      { farmerId },
      { headers: this.headers }
    );
  }

  // Get admin for farmer chat
  getAdmin() {
    return axios.post(`${BASEURL}/chat/get-admin`, {}, { headers: this.headers });
  }

  // ================== Admin Side ==================
  // Get all farmers for admin chat
  getChatAdminFarmers() {
    return axios.post(
      `${BASEURL}/chat/get-chat-adminfarmers`,
      {},
      { headers: this.headers }
    );
  }

  // Get admin conversations
  getAdminConversations(adminId) {
    return axios.post(
      `${BASEURL}/chat/admin-conversations`,
      { adminId },
      { headers: this.headers }
    );
  }

  // ================== Messaging ==================
  // Load old messages between user and receiver
  getMessages(userId, receiverId) {
    return axios.post(
      `${BASEURL}/chat/get-messages`,
      { userId, receiverId },
      { headers: this.headers }
    );
  }

  // Get farmer conversations
  getFarmerConversations(farmerId) {
    return axios.post(
      `${BASEURL}/chat/conversations`,
      { farmerId },
      { headers: this.headers }
    );
  }

  // Send message
  sendMessage(senderId, receiverId, message) {
    return axios.post(
      `${BASEURL}/chat/send-message`, // make sure you have this route
      { senderId, receiverId, message },
      { headers: this.headers }
    );
  }


  contact(data) {
   return axios.post(BASEURL+"/api/contact/add", data)
}

allContact(data) {
   return axios.post(BASEURL+"/admin/contact/all",data,{headers:this.getToken()})
}

softDeleteContact(data) {
   return axios.post(BASEURL+"/admin/contact/changeStatus", data,{headers:this.getToken()})
}


    
}
export default new ApiServices

