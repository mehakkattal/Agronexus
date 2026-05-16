import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../services/ApiService"
import { Link } from "react-router-dom";

export default function FarmerDashboard(){
    const [details, setDetails]=useState([])
   const id = sessionStorage.getItem("userId");
  //  const ADMIN_ID = "696dcb4958890a32a8a2ba03"
    const fetchData=()=>{
      const data = {
            userId: id,
            farmerId:id
        };
      
        

        ApiService.dashboard(data)
         .then((res)=>{
                    console.log(res)
                    if(res.data.success){
                        setDetails(res.data)
        
                    }
                    else{
                        toast.error(res.data.message)
                    }
                })
                .catch((err)=>{
                    toast.error(err.message)
                })
    }
    useEffect(()=>{
        fetchData()
    },[])
    return(
    <>
             <div className="container-fluid py-5">
    <div className="container">
      <div className="row g-5">
        {/* <div className="col-lg-4 col-md-6">
          <div className="mb-3">
            <h6 className="text-primary text-uppercase">Land</h6>
            <h1 className="display-5">{details.totalLand}</h1>
          </div>
          
        </div> */}
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i className="fa fa-carrot display-1 text-primary mb-3" />
            <h4>Crops</h4>
            <p className="mb-0">
             { details.totalfarmCrop}
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i className="fas fa-hand-holding-usd display-1 text-primary mb-3"></i>
            <h4>Bookings</h4>
            <p className="mb-0">
            { details.totalFarmerBookings}            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
<i className="fas fa-tractor display-1 text-primary mb-3"></i>

            <h4>FarmingProgress</h4>
            <p className="mb-0">
            { details.totalprogress}
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
           <i className="fas fa-calendar display-1 text-primary mb-3"></i>
            <h4>Seasons</h4>
            <p className="mb-0">
                 { details.totalSeason}
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i className="fa fa-seedling display-1 text-primary mb-3" />
            <h4>Lands</h4>
            <p className="mb-0">
              {details.totalfarmLand}            </p>
          </div>
        </div>
       
      </div>
    </div>
  </div>




    </>
    
)
}


