// import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
// import Layout from './components/layouts/Layout'
// import Home from './components/pages/Home'
// import About from './components/pages/About';





// function App(){
//   return(
//     <>
// <BrowserRouter>
// <Routes>
//          <Route path="/" element={<Layout></Layout>}>
//             <Route index element={<Home></Home>} />
//             <Route path="about" element={<About></About>} />
//             </Route>
// </Routes>

// </BrowserRouter>
//     </>
//   )
// }export default App;






// import Header from './components/layouts/Header'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'




import About from './components/pages/About'
// import Service from './components/pages/Service'
// import Team from './components/pages/Team'
// import Blog from './components/pages/Blog'
// import Product from './components/pages/Product'
// import Detail from './components/pages/Detail'
import Feature from './components/pages/Feature'
import Testimonial from './components/pages/Testimonal'
import Layout from './components/layouts/Layout'
import Contact from './components/pages/Contact'
import Home from './components/pages/Home'
import Login from './components/auth/Login'
import { Bounce, ToastContainer } from 'react-toastify'
import Register from './components/auth/Register'
import FarmerRegister from './components/auth/FarmerRegister'


import AddLand from './components/farmer/land/AddLand'

import UpdateLand from './components/farmer/land/UpdateLand'
import AddCrop from './components/farmer/crop/AddCrop'
import AllCrop from './components/farmer/crop/AllCrop'
import Updatecrop from './components/farmer/crop/UpdateCrop'

import UpdateBooking from './components/user/booking/UpdateBooking'
import AddProgress from './components/farmer/progress/AddProgress'
import AllProgress from './components/farmer/progress/AllProgress'
import UpdateProgress from './components/farmer/progress/UpdateProgress'
import AdminLayout from './components/layouts/AdminLayout'
import FarmerLayout from './components/layouts/FarmerLayout'
import AllLand from './components/admin/land/AllLand'
// import ManageBooking from './components/User/ManageBooking'
// import AddBooking from './components/User/AddBooking'
import ManageLand from './components/farmer/land/ManageLand'
import UserLand from './components/user/land/UserLand'
import UserCrop from './components/user/crop/UserCrop'
import UserSeason from './components/user/season/UserSeason'
import AdminDashboard from './components/auth/AdminDashboard'
import FarmerDashboard from './components/farmer/FarmerDashboard'
import FarmerBooking from './components/farmer/booking/FarmerBooking'
import AddBooking from './components/user/booking/AddBooking'
import ManageBooking from './components/user/booking/ManageBooking'
import UserProgress from './components/user/progress/UserProgress'
import ViewLand from './components/user/crop/ViewLand'
import ViewCrop from './components/user/land/ViewCrop'
import Chat from './components/user/Chat'
import FarmerChat from './components/farmer/chat/FarmerChat'
import FarmerChatWrapper from './components/farmer/chat/FarmerChatWrapper'
import AddSeason from './components/admin/season/AddSeason'
import AllSeason from './components/admin/season/AllSeason'
import UpdateSeason from './components/admin/season/UpdateSeason'
import AllBooking from './components/admin/booking/AllBooking'
import ManageUsers from './components/admin/user/ManageUsers'
import ManageFarmers from './components/admin/user/ManageFarmers'
import AdminChatWrapper from './components/admin/chat/AdminChatWrapper'

import AdminChat from './components/admin/chat/AdminChat'
import AllContact from './components/admin/Contact/AllContact'


function ChatWrapper() {
  const { receiverId } = useParams()
  return <Chat receiverId={receiverId} />
}


function App() {
 

  return (
    <>
   

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            {/* <Route path="service" element={<Service />} /> */}
            {/* <Route path="team" element={<Team />} /> */}
            {/* <Route path="detail" element={<Detail />} /> */}
            <Route path="feature" element={<Feature />} />
            <Route path="testimonials" element={<Testimonial />} />

            {/* <Route path="blog" element={<Blog />} /> */}
            {/* <Route path="product" element={<Product />} /> */}
            <Route path="contact" element={<Contact />} />
           <Route path="/login" element={<Login/>}/>
           <Route path="/register" element={<Register/>}/>
           <Route path="/farmerregister" element={<FarmerRegister/>}/>
           
           
           <Route path="/booking/manage" element={<ManageBooking/>}/>
           
           <Route path="/booking/add/:seasonId/:cropId/:landId" element={<AddBooking />} />
           <Route path="/booking/update/:id" element={<UpdateBooking/>}/>
           <Route path="/user/land" element={<UserLand/>}/>
           <Route path="/user/crop/:id" element={<UserCrop/>}/>
         <Route path="/user/viewland/:seasonId/:cropId/:landId" element={<ViewLand />} />
           <Route path="/user/viewcrop/:id" element={<ViewCrop/>}/>


           <Route path="/user/season" element={<UserSeason/>}/>
           <Route path="/user/progress/:id" element={<UserProgress/>}/>




          <Route path="/chat/:receiverId" element={<ChatWrapper />} />

            
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<AdminDashboard />} />
            <Route path="land/all" element={<AllLand/>}/>
            <Route path="season/add" element={<AddSeason/>}/>
           <Route path="season/all" element={<AllSeason/>}/>
           <Route path="season/update/:id" element={<UpdateSeason/>}/>
           <Route path="booking/all" element={<AllBooking/>}/>
           <Route path="user/all" element={<ManageUsers/>}/>
           <Route path="farmer/all" element={<ManageFarmers/>}/>
           <Route path="contact/all" element={<AllContact/>}/>



           <Route path="chat" element={<AdminChat/>} />
<Route path="chat/:farmerId" element={<AdminChatWrapper />} />



           
          </Route>

          <Route path="/farmer" element={<FarmerLayout />}>
           <Route index element={<FarmerDashboard/>} /> 
           <Route path="land/manage" element={<ManageLand/>}/>

           <Route path="booking/manage" element={<FarmerBooking/>}/>

          <Route path="land/add" element={<AddLand/>}/>
           <Route path="land/update/:id" element={<UpdateLand/>}/>
           <Route path="crop/add" element={<AddCrop/>}/>
           <Route path="crop/all" element={<AllCrop/>}/>
           <Route path="crop/update/:id" element={<Updatecrop/>}/>
            <Route path="progress/add" element={<AddProgress/>}/>
           <Route path="progress/all" element={<AllProgress/>}/>
           <Route path="progress/update/:id" element={<UpdateProgress/>}/>
           

           <Route path="chat" element={<FarmerChat />} />
  <Route path="chat/:userId" element={<FarmerChatWrapper />} />

            
          </Route>


          
        </Routes>
      </BrowserRouter>


<ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}


    />



    </>
  )
}

export default App