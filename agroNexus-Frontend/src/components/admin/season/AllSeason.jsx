import { useEffect, useState } from "react"
import ApiService from "../../services/ApiService"
import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function AllSeason() {
    const [season, setSeason] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false); // ✅ Loader state added


    const fetchData = () => {

        setLoading(true); // ✅ Start loader

        ApiService.allSeason()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setSeason(res.data.data)
                }
                else {
                    toast.error(res.data.essage)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false); // ✅ Stop loader
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
            confirmButtonText: `${!status ? "Enable" : "Disable"}`
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
                ApiService.softDeleteSeason(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                confirmButtonColor: "#34AD54",
                                icon: "Success"
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

    const deleteSeason = (id) => {
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
                ApiService.DeleteSeason(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                confirmButtonColor: "#34AD54",
                                icon: "Success"
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
                            <h1 className="display-1 text-white mb-md-4">All Seasons</h1>
                            <Link to="/admin" className="btn btn-primary py-md-3 px-md-5 me-3">
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
   <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">All Seasons</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Admin</a></li>
                    <li class="breadcrumb-item active" aria-current="page">All Seasons</li>
                </ol>
            </nav>
        </div>
    </div>

            {/* <div className="container">
                <div className="row ">
                    <div className="col">

                       
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3">Loading seasons...</p>
                            </div>
                        ) : season.length > 0 ? (

                            <div className="table-responsive ">
                                <table className="table table-hover border table-striped">
                                    <thead className="thead-dark text-dark">
                                        <tr>
                                            <th scope="col">Sno</th>
                                            
                                            <th scope="col">Name</th>
                                            <th scope="col">Start</th>
                                            <th scope="col">End</th>
                                            
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {season?.map((el, index) => (
                                            <tr key={index}>
                                                <td><h5>{index + 1}</h5></td>
                                                <td  className="align-middle"> 
                                                    {el?.image ? (
                                                        <img
                                                            onClick={() => setPreviewImage(el.image)}
                                                            src={el.image}
                                                            alt="land"
                                                            width="60"
                                                            height="60"
                                                            style={{
                                                                objectFit: "cover",
                                                                borderRadius: "50%",
                                                                border: "1px solid #ddd"
                                                            }}
                                                        />
                                                    ) : (
                                                        <span>No Image</span>
                                                    )}
                                               
                                               {el?.seasonName}</td>
                                                <td  className="align-middle">{el?.startMonth}</td>
                                                <td  className="align-middle">{el?.endMonth}</td>
                                                
                                                <td  className="align-middle">
                                                    {el?.status ? "Active" : "In-active"}
                                                </td>
                                                <td  className="align-middle">
                                                    <button className="btn btn-sm ">
                                                        <ReactSwitch
                                                            checked={el?.status}
                                                            onChange={() => { softDelete(el?._id, el?.status) }} />
                                                    </button>
                                                    <Link to={`/admin/season/update/${el._id}`} className="btn btn-sm btn-success mx-2">
                                                        <i className="fa fa-edit"></i>
                                                    </Link>
                                                    
                                                    <button className="btn btn-success btn-sm" onClick={() => { deleteSeason(el?._id) }}>
                                                        <i className="fa fa-trash " aria-hidden="true"></i>
                                                    </button>
                                                    
                                                    
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">No Season available</h4>
                                <p>Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div> */}


            <div className="container mb-5">
    <div className="card shadow border-0 rounded-4">
        <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Season List</h4>
                <span className="badge bg-primary fs-6">
                    Total: {season.length}
                </span>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-3">Loading seasons...</p>
                </div>
            ) : season.length > 0 ? (

                <div className="table-responsive">
                    <table className="table align-middle table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Season</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {season.map((el, index) => (
                                <tr key={el._id}>
                                    <td className="text-dark">{index + 1}</td>

                                    {/* Image + Name */}
                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            {el?.image ? (
                                                <img
                                                    src={el.image}
                                                    alt="season"
                                                    width="55"
                                                    height="55"
                                                    onClick={() => setPreviewImage(el.image)}
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
                                                    style={{ width: 55, height: 55 }}
                                                >
                                                    N/A
                                                </div>
                                            )}
                                            <span className="fw-semibold text-dark">
                                                {el?.seasonName}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="text-dark">{el?.startMonth}</td>
                                    <td className="text-dark">{el?.endMonth}</td>

                                    {/* Status Badge */}
                                    <td>
                                        <span className={`badge px-3 py-2 ${el?.status ? "bg-success" : "bg-danger"}`}>
                                            {el?.status ? "Active" : "Inactive"}
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

                                            <Link
                                                to={`/admin/season/update/${el._id}`}
                                                className="btn btn-sm btn-outline-success rounded-pill"
                                            >
                                                <i className="fa fa-edit"></i>
                                            </Link>

                                            <button
                                                className="btn btn-sm btn-outline-danger rounded-pill"
                                                onClick={() => deleteSeason(el?._id)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            ) : (
                <div className="text-center py-5">
                    <h5 className="text-muted">No Seasons Available</h5>
                </div>
            )}

        </div>
    </div>
</div>

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
