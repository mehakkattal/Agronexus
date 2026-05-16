import { useEffect, useState } from "react"
import ApiService from "../../services/ApiService"
import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function AllBooking() {
  const [booking, setBooking] = useState([])
  const [loading, setLoading] = useState(false) // ✅ Loader added

  const fetchData = () => {

    setLoading(true) // ✅ Start loader

    ApiService.allBooking()
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          setBooking(res.data.data)
        }
        else {
          toast.error(res.data.essage)
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

  return (
    <>
      {/* ✅ Loader */}
      

      {/* <div className="container-fluid bg-primary py-5 bg-hero mb-5">
        <div className="container py-5">
          <div className="row justify-content-start">
            <div className="col-lg-8 text-center text-lg-start">
              <h1 className="display-1 text-white mb-md-4">All Bookings</h1>
              <Link to="/admin" className="btn btn-primary py-md-3 px-md-5 me-3">
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
                    <li class="breadcrumb-item"><a href="#">Admin</a></li>
                    <li class="breadcrumb-item active" aria-current="page">All Booking</li>
                </ol>
            </nav>
        </div>
    </div>


      <div className="container mb-5">
  <div className="card shadow border-0 rounded-4">
    <div className="card-body p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Booking List</h4>
        <span className="badge bg-primary fs-6">
          Total: {booking.length}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3">Loading bookings...</p>
        </div>
      ) : booking.length > 0 ? (

        <div className="table-responsive">
          <table className="table align-middle table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Land</th>
                <th>Season</th>
                <th>Crop</th>
                <th>Lease Period</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((el, index) => (
                <tr key={el._id}>
                  <td className="text-dark">{index + 1}</td>

                  <td className="fw-semibold text-dark">
                    {el?.userId?.name}
                  </td>

                  <td>
                    <div className="fw-semibold text-dark">
                      {el?.landId?.farmerId?.name}
                    </div>
                    <small className=" text-dark">
                      ULPIN: {el?.landId?.ULPIN}
                    </small>
                  </td>

                  <td className="text-dark">{el?.seasonId?.seasonName}</td>
                  <td className="text-dark">{el?.cropId?.cropName}</td>

                  {/* Lease Period Combined */}
                  <td className="text-dark">
                    <div>
                      {new Date(el?.leaseStartDate).toLocaleDateString("en-IN")}
                    </div>
                    <small className=" text-dark">
                      to {new Date(el?.leaseEndDate).toLocaleDateString("en-IN")}
                    </small>
                  </td>

                  <td className="fw-semibold text-success text-dark">
                    ₹ {el?.price}
                  </td>

                  <td>
                    <span className={`badge px-3 py-2 ${el?.status ? "bg-success" : "bg-warning text-dark"}`}>
                      {el?.status ? "Booked" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      ) : (
        <div className="text-center py-5">
          <h5 className="text-muted">No Bookings Available</h5>
        </div>
      )}

    </div>
  </div>
</div>
    </>
  )
}