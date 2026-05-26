import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService"
import { Link } from "react-router-dom";

export default function UserLand() {
    const [land, setLand] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Loader state added

    
    const fetchData = () => {

        const data = {
            status: true,
            landAvailability: "Available",
            
        }

        setLoading(true); // ✅ Start loader

        ApiService.allLand(data)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setLand(res.data.data)
                }
                else {
                    toast.error(res.data.message)
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

    return (
        <>

          <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">All Booking</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">User</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Available Lands</li>
                </ol>
            </nav>
        </div>
    </div>

            <div className="container-fluid py-5 bg-light">
                <div className="container">

                    <h2 className="text-center fw-bold text-success mb-5">
                        🌍 Available Lands
                    </h2>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-success" role="status" />
                        </div>
                    ) : land.length > 0 ? (

                        <div className="row g-4">
                            {land.map((el, index) => (
                                <div className="col-lg-4 col-md-6" key={index}>
                                    <div className="modern-land-card">

                                        {/* Main Image */}
                                        <div className="land-image-wrapper">
                                            {Array.isArray(el?.images) && el.images.length > 0 ? (
                                                <img
                                                    src={el.images[0]}
                                                    alt="land"
                                                    onClick={() => setPreviewImage(el.images[0])}
                                                />
                                            ) : (
                                                <div className="no-image">No Image</div>
                                            )}

                                            {/* Availability Badge */}
                                            <span className={`availability-badge ${el.landAvailability === "Available"
                                                    ? "available"
                                                    : "not-available"
                                                }`}>
                                                {el.landAvailability}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="land-content">

                                            <h5 className="fw-bold mb-2">Land Name:{el?.landName}</h5>

                                            <div className="land-info-grid">
                                                <div>
                                                    <small className="text-muted">Farmer</small>
                                                    <h5>{el?.farmerId?.name}</h5>
                                                </div>

                                                <div>
                                                    <small className="text-muted">Area</small>
                                                    <h5>{el?.area} sqft</h5>
                                                </div>

                                                <div>
                                                    <small className="text-muted">Location</small>
                                                    <h5>{el?.location}</h5>
                                                </div>
                                                <div>
                                                    <small className="text-muted">ULPIN</small>
                                                    <h5>{el?.ULPIN}</h5>
                                                </div>
                                            </div>

                                            <h6 className="price-tag mt-2">
                                                ₹ {el.price}
                                            </h6>

                                            <Link
                                                to={`/user/viewcrop/${el._id}`}
                                                className="modern-btn w-100 mt-3"
                                            >
                                                View Crops →
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                    ) : (
                        <div className="empty-state text-center py-5">
                            <h4>No Land Available</h4>
                            <p className="text-muted">Please check back later.</p>
                        </div>
                    )}

                </div>
            </div>


            {/* Image Modal */}
            {previewImage && (
                <div className="image-modal" onClick={() => setPreviewImage(null)}>
                    <div className="image-modal-content">
                        <button
                            className="close-btn"
                            onClick={() => setPreviewImage(null)}
                        >
                            ✕
                        </button>
                        <img src={previewImage} alt="Preview" />
                    </div>
                </div>
            )}

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
