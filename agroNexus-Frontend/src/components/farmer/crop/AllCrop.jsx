import { useEffect, useState } from "react"
import ApiService from "../../services/ApiService"
import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function AllCrop() {
    const [crop, setCrop] = useState([])
    const [loading, setLoading] = useState(false)   // ✅ Loader state added
    const id = sessionStorage.getItem("userId")
    const [previewImage, setPreviewImage] = useState(null);

    const fetchData = () => {

        setLoading(true)  // ✅ Start loader

        const data = {
            farmerId: id
        }
        ApiService.allCrop(data)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setCrop(res.data.data)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false)   // ✅ Stop loader
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
                ApiService.softDeleteCrop(data)
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

    const deleteCrop = (id) => {
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
                let data = { _id: id }
                ApiService.DeleteCrop(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                confirmButtonColor: "#34AD54",

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
            {/* ✅ Loader */}
            

            {/* <div className="container-fluid bg-primary py-5 bg-hero mb-5">
                <div className="container py-5">
                    <div className="row justify-content-start">
                        <div className="col-lg-8 text-center text-lg-start">
                            <h1 className="display-1 text-white mb-md-4">All crops</h1>
                            <Link to="/farmer" className="btn btn-primary py-md-3 px-md-5 me-3">
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
             <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">All Crops</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Farmer</a></li>
                    <li class="breadcrumb-item active" aria-current="page">All Crops</li>
                </ol>
            </nav>
        </div>
    </div>

          <div className="container mb-5">
  <div className="card shadow border-0 rounded-4">
    <div className="card-body p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Crop List</h4>
        <span className="badge bg-success fs-6">
          Total: {crop.length}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success"></div>
          <p className="mt-3">Loading crops...</p>
        </div>
      ) : crop.length > 0 ? (

        <div className="table-responsive">
          <table className="table align-middle table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Crop</th>
                <th>Duration</th>
                <th>Season</th>
                <th>Land</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {crop.map((el, index) => (
                <tr key={el._id}>
                  <td>{index + 1}</td>

                  {/* ✅ Image + Name in Same Line */}
                  <td className="text-dark">
                    <div className="d-flex align-items-center gap-3">

                      {/* Circular Image */}
                      {el?.image ? (
                        <img
                          onClick={() => setPreviewImage(el.image)}
                          src={el.image}
                          alt="crop"
                          width="45"
                          height="45"
                          style={{
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: "2px solid #28a745",
                            cursor: "pointer"
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            backgroundColor: "#e9ecef",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            color: "#6c757d"
                          }}
                        >
                          N/A
                        </div>
                      )}

                      {/* Crop Name */}
                      <div>
                        <div className="fw-semibold text-dark">
                          {el?.cropName}
                        </div>
                        <small className=" text-dark">
                          {el?.description?.slice(0, 40)}...
                        </small>
                      </div>

                    </div>
                  </td>

                  <td className="text-dark">{el?.duration}</td>

                  <td className="text-dark">{el?.seasonId?.seasonName}</td>

                  <td className="text-dark">{el?.landId?.ULPIN}</td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`badge px-3 py-2 ${
                        el?.status ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {el?.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <ReactSwitch
                        checked={el?.status}
                        onChange={() =>
                          softDelete(el?._id, el?.status)
                        }
                        height={20}
                        width={45}
                      />

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteCrop(el?._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>

                      <Link
                        to={`/farmer/crop/update/${el._id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      ) : (
        <div className="text-center py-5">
          <h5 className="text-muted">No Crops Available</h5>
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

