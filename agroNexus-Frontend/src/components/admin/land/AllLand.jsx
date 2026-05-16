import { useEffect, useState } from "react"
import ApiService from "../../services/ApiService"
import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function AllLand() {
    const [land, setLand] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);   // ✅ Loader state added


    const fetchData = () => {

        setLoading(true);   // ✅ Start loader

        ApiService.allLand()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setLand(res.data.data)
                }
                else {
                    // toast.error(res.data.essage)
                }
            })
            .catch((err) => {
                // toast.error(err.message)
            })
            .finally(() => {
                setLoading(false);  // ✅ Stop loader
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    const softDelete = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#34AD54",
            cancelButtonColor: "#ff9933",
            confirmButtonText: `${!status ? "Accepted" : "Pending"}`
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,
                    status: !status
                }
                let token = sessionStorage.getItem("token")
                let headers = {
                    Authorization: token
                }
                ApiService.softDeleteLand(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                icon: "success",
                                 confirmButtonColor: "#34AD54",
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


    const deleteLand = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#34AD54",
            cancelButtonColor: "#ff9933",
            confirmButtonText: `${!id ? "Enable" : "Delete"}`
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,
                }
                let token = sessionStorage.getItem("token")
                let headers = {
                    Authorization: token
                }
                ApiService.DeleteLand(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                icon: "Success",
                                confirmButtonColor: "#34AD54",
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
            <>
                {/* <div className="container-fluid bg-primary py-5 bg-hero mb-5">
                    <div className="container py-5">
                        <div className="row justify-content-start">
                            <div className="col-lg-8 text-center text-lg-start">
                                <h1 className="display-1 text-white mb-md-4">All lands</h1>
                                <Link to="/admin" className="btn btn-primary py-md-3 px-md-5 me-3">
                                    Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div> */}


    <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">All Lands</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Admin</a></li>
                    <li class="breadcrumb-item active" aria-current="page">All Lands</li>
                </ol>
            </nav>
        </div>
    </div>


                <div className="container mb-5">
                    <div className="card shadow border-0 rounded-4">
                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold mb-0">Land List</h4>
                                <span className="badge bg-primary fs-6">
                                    Total: {land.length}
                                </span>
                            </div>

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary"></div>
                                    <p className="mt-3">Loading lands...</p>
                                </div>
                            ) : land.length > 0 ? (

                                <div className="table-responsive">
                                    <table className="table align-middle table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Land Details</th>
                                                <th>ULPIN</th>
                                                <th>Location</th>
                                                <th>Area</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {land.map((el, index) => (
                                                <tr key={el._id}>
                                                    <td>{index + 1}</td>

                                                    {/* Land Name + Images Side by Side */}
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3 flex-wrap">

                                                            {/* First Image (Round) */}
                                                            {Array.isArray(el?.images) && el.images.length > 0 ? (
                                                                <img
                                                                    src={el.images[0]}
                                                                    alt="land"
                                                                    width="60"
                                                                    height="60"
                                                                    onClick={() => setPreviewImage(el.images[0])}
                                                                    style={{
                                                                        objectFit: "cover",
                                                                        borderRadius: "50%",
                                                                        border: "2px solid #34AD54",
                                                                        cursor: "pointer"
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                                                    style={{ width: 60, height: 60 }}
                                                                >
                                                                    N/A
                                                                </div>
                                                            )}

                                                            <div>
                                                                <div className="fw-semibold text-dark">
                                                                    {el?.farmerId?.name}
                                                                </div>
                                                                <small className=" text-dark">
                                                                    {el?.landAvailability}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="text-dark">{el?.ULPIN}</td>
                                                    <td className="text-dark">{el?.location}</td>
                                                    <td className="text-dark">{el?.area} sqft</td>
                                                    <td className="fw-semibold text-success text-dark">
                                                        ₹ {el?.price}
                                                    </td>

                                                    {/* Status Badge */}
                                                    <td>
                                                        <span className={`badge px-3 py-2 ${el?.status ? "bg-success" : "bg-warning text-dark"}`}>
                                                            {el?.status ? "Accepted" : "Pending"}
                                                        </span>
                                                    </td>

                                                    {/* Actions */}
                                                    <td>
                                                        <div className="d-flex justify-content-center align-items-center gap-2">

                                                            <ReactSwitch
                                                                checked={el?.status}
                                                                onChange={() => softDelete(el?._id, el?.status)}
                                                                height={20}
                                                                width={45}
                                                                
                                                            />

                                                            

                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            ) : (
                                <div className="text-center py-5">
                                    <h5 className="text-muted">No Land Available</h5>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </>

            {previewImage && (
                <div
                    onClick={() => setPreviewImage(null)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}
                >
                    <img
                        src={previewImage}
                        alt="Preview"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "6px",
                            boxShadow: "0 0 10px #000"
                        }}
                    />
                </div>
            )}
        </>
    )
}
