import { useEffect, useState } from "react"
import ApiService from "../../services/ApiService"
import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function ManageBooking() {
    const [booking, setBooking] = useState([])
    const [loading, setLoading] = useState(true) // ✅ Loader state added

    const navigate = useNavigate()
    const id = sessionStorage.getItem("userId");

    const fetchData = () => {

        const data = {
            userId: id
        };

        setLoading(true) // ✅ Start loader

        ApiService.allBooking(data)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setBooking(res.data.data)
                }
                else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false) // ✅ Stop loader
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    const softDelete = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${!status ? "Enable" : "Disable"}`
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,
                    status: !status
                }

                ApiService.softDeleteBooking(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                icon: "success"
                            });
                            fetchData()
                        }
                        else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
            }
        })
    }

    const deleteBooking = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            
            confirmButtonText: "Delete" ,
             confirmButtonColor: "#34AD54",
            cancelButtonColor: "#ff9933",
        }).then((result) => {
            if (result.isConfirmed) {

                let data = { _id: id }

                ApiService.DeleteBooking(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                icon: "success"
                            });
                            fetchData()
                        }
                        else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
            }
        })
    }

    return (
        <>
            {/* <div className="container-fluid bg-primary py-5 bg-hero mb-5">
                <div className="container py-5">
                    <div className="row justify-content-start">
                        <div className="col-lg-8 text-center text-lg-start">
                            <h1 className="display-1 text-white mb-md-4">Manage Bookings</h1>
                            <Link to="/" className="btn btn-primary py-md-3 px-md-5 me-3">
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
   
         <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">All Booking</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">User</a></li>
                    <li class="breadcrumb-item active" aria-current="page">All Booking</li>
                </ol>
            </nav>
        </div>
    </div>

            

            <div className="container">
                <div className="row">
                    <div className="col">

                        {/* ✅ Loader UI */}
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : booking.length > 0 ? (

                           <div className="row g-4">
  {booking?.map((el, index) => (
    <div className="col-lg-4 col-md-6" key={index}>
      <div className="card shadow-sm border-0 h-100 booking-card">

        <div className="card-body">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="text-muted mb-0">
              Booking #{index + 1}
            </h6>

            <span className={`badge ${el?.status ? "bg-success" : "bg-warning text-dark"}`}>
              {el?.status ? "Booked" : "Pending"}
            </span>
          </div>

          {/* Farmer */}
          <h5 className="fw-bold text-primary mb-2">
            {el?.landId?.farmerId?.name}
          </h5>

          {/* Details */}
          <p className="mb-1">
            <strong>Location:</strong> {el?.landId?.location}
          </p>

          <p className="mb-1">
            <strong>Land:</strong> {el?.landId?.farmerId?.name} - {el?.landId?.ULPIN}
          </p>

          <p className="mb-1">
            <strong>Lease:</strong>{" "}
            {new Date(el?.leaseStartDate).toLocaleDateString("en-IN")} -{" "}
            {new Date(el?.leaseEndDate).toLocaleDateString("en-IN")}
          </p>

          <p className="mb-1">
            <strong>Season:</strong> {el?.seasonId?.seasonName}
          </p>

          <p className="mb-1">
            <strong>Crop:</strong> {el?.cropId?.cropName}
          </p>

          <p className="mb-3 fw-bold text-success">
            ₹ {el?.price}
          </p>

          {/* Progress Button */}
          {el?.status && (
            <div className="text-end">
              <Link
                to={`/user/progress/${el._id}`}
                className="modern-btn"
              >
                View Progress
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  ))}
</div>

                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">No Booking available</h4>
                                <p>Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}





























// import { useEffect, useState } from "react"
// import ApiService from "../../services/ApiService"
// import Swal from "sweetalert2"
// import { Link } from "react-router-dom"
// import { toast } from "react-toastify"

// export default function ManageBooking() {

//     const [booking, setBooking] = useState([])
//     const [loading, setLoading] = useState(true)

//     const id = sessionStorage.getItem("userId")

//     const fetchData = () => {

//         const data = {
//             userId: id
//         }

//         setLoading(true)

//         ApiService.allBooking(data)
//             .then((res) => {
//                 console.log(res)

//                 if (res.data.success) {
//                     setBooking(res.data.data)
//                 }
//                 else {
//                     toast.error(res.data.message)
//                 }
//             })
//             .catch((err) => {
//                 toast.error(err.message)
//             })
//             .finally(() => {
//                 setLoading(false)
//             })
//     }

//     useEffect(() => {
//         fetchData()
//     }, [])


//     // DELETE BOOKING
//     const deleteBooking = (id) => {

//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Delete",
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//         }).then((result) => {

//             if (result.isConfirmed) {

//                 let data = {
//                     _id: id
//                 }

//                 ApiService.DeleteBooking(data)
//                     .then((res) => {

//                         if (res.data.success) {

//                             Swal.fire({
//                                 title: res.data.message,
//                                 icon: "success"
//                             })

//                             fetchData()

//                         } else {
//                             toast.error(res.data.message)
//                         }

//                     })
//                     .catch((err) => {
//                         toast.error(err.message)
//                     })
//             }
//         })
//     }


//     return (
//         <>
//             {/* PAGE HEADER */}

//             <div className="container-fluid page-header py-5 mb-5 wow fadeIn">
//                 <div className="container text-center py-5">

//                     <h1 className="display-3 text-white mb-4 animated slideInDown">
//                         All Booking
//                     </h1>

//                     <nav>
//                         <ol className="breadcrumb justify-content-center mb-0">

//                             <li className="breadcrumb-item">
//                                 <a href="#">Home</a>
//                             </li>

//                             <li className="breadcrumb-item">
//                                 <a href="#">User</a>
//                             </li>

//                             <li className="breadcrumb-item active">
//                                 All Booking
//                             </li>

//                         </ol>
//                     </nav>

//                 </div>
//             </div>



//             {/* MAIN SECTION */}

//             <div className="container">
//                 <div className="row">
//                     <div className="col">

//                         {/* LOADER */}

//                         {loading ? (

//                             <div className="text-center py-5">

//                                 <div
//                                     className="spinner-border text-success"
//                                     role="status"
//                                 >
//                                     <span className="visually-hidden">
//                                         Loading...
//                                     </span>

//                                 </div>

//                             </div>

//                         ) : booking.length > 0 ? (

//                             <div className="row g-4">

//                                 {booking?.map((el, index) => (

//                                     <div
//                                         className="col-lg-4 col-md-6"
//                                         key={index}
//                                     >

//                                         <div className="card shadow-sm border-0 h-100 booking-card">

//                                             <div className="card-body">

//                                                 {/* HEADER */}

//                                                 <div className="d-flex justify-content-between align-items-center mb-3">

//                                                     <h6 className="text-muted mb-0">
//                                                         Booking #{index + 1}
//                                                     </h6>

//                                                     <span
//                                                         className={`badge ${el?.status
//                                                                 ? "bg-success"
//                                                                 : "bg-warning text-dark"
//                                                             }`}
//                                                     >
//                                                         {el?.status
//                                                             ? "Booked"
//                                                             : "Pending"}
//                                                     </span>

//                                                 </div>


//                                                 {/* FARMER */}

//                                                 <h5 className="fw-bold text-primary mb-2">

//                                                     {el?.landId?.farmerId?.name || "Farmer"}

//                                                 </h5>


//                                                 {/* DETAILS */}

//                                                 <p className="mb-1">
//                                                     <strong>Location:</strong>{" "}
//                                                     {el?.landId?.location || "N/A"}
//                                                 </p>

//                                                 <p className="mb-1">
//                                                     <strong>Land:</strong>{" "}
//                                                     {el?.landId?.ULPIN || "N/A"}
//                                                 </p>

//                                                 <p className="mb-1">
//                                                     <strong>Lease:</strong>{" "}

//                                                     {new Date(
//                                                         el?.leaseStartDate
//                                                     ).toLocaleDateString("en-IN")}

//                                                     {" - "}

//                                                     {new Date(
//                                                         el?.leaseEndDate
//                                                     ).toLocaleDateString("en-IN")}
//                                                 </p>

//                                                 <p className="mb-1">
//                                                     <strong>Season:</strong>{" "}
//                                                     {el?.seasonId?.seasonName || "N/A"}
//                                                 </p>

//                                                 <p className="mb-1">
//                                                     <strong>Crop:</strong>{" "}
//                                                     {el?.cropId?.cropName || "N/A"}
//                                                 </p>

//                                                 <p className="mb-3 fw-bold text-success">
//                                                     ₹ {el?.price}
//                                                 </p>


//                                                 {/* BUTTONS */}

//                                                 <div className="d-flex justify-content-between align-items-center mt-3">

//                                                     {el?.status && (

//                                                         <Link
//                                                             to={`/user/progress/${el._id}`}
//                                                             className="modern-btn"
//                                                         >
//                                                             View Progress
//                                                         </Link>

//                                                     )}

//                                                     <button
//                                                         className="btn btn-danger btn-sm"
//                                                         onClick={() =>
//                                                             deleteBooking(el?._id)
//                                                         }
//                                                     >
//                                                         🗑 Delete
//                                                     </button>

//                                                 </div>

//                                             </div>

//                                         </div>

//                                     </div>

//                                 ))}

//                             </div>

//                         ) : (

//                             <div className="col-12 text-center">

//                                 <h4 className="text-muted">
//                                     No Booking available
//                                 </h4>

//                                 <p>Please check back later.</p>

//                             </div>

//                         )}

//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }























