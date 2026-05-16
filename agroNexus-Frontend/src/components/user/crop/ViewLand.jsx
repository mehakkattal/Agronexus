import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService"
import { Link, useParams } from "react-router-dom";

export default function ViewLand() {
    const [land, setLand] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Loader state added

    
    const { seasonId, cropId, landId } = useParams();
    const [crop, setCrop] = useState(null);

//     const fetchData = () => {

//         const data = {
//             _id: landId,
//             status: true,
//             landAvailability: "Available"
//         }

//         setLoading(true); // ✅ Start loader

//         ApiService.allLand(data)
//             .then((res) => {
//                 console.log(res)
//                 if (res.data.success) {
//                     setLand(res.data.data)
//                 }
//                 else {
//                     toast.error(res.data.message)
//                 }
//             })
//             .catch((err) => {
//                 toast.error(err.message)
//             })
//             .finally(() => {
//                 setLoading(false); // ✅ Stop loader
//             })
//     }

//     useEffect(() => {
//     fetchData()
// }, [])
useEffect(() => {

    setLoading(true)

    Promise.all([
        ApiService.singleLand({ _id: landId }),
        ApiService.singleCrop({ _id: cropId })
    ])
    .then(([landRes, cropRes]) => {

        if (landRes.data.success) {
            setLand([landRes.data.data])   // keep as array for your UI
        }

        if (cropRes.data.success) {
            setCrop(cropRes.data.data)
        }

    })
    .catch((err) => {
        toast.error(err.message)
    })
    .finally(() => {
        setLoading(false)
    })

}, [landId, cropId])
    

    return (
        <>
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
                                                    <p>{el?.farmerId?.name}</p>
                                                </div>

                                                <div>
                                                    <small className="text-muted">Area</small>
                                                    <p>{el?.area} sqft</p>
                                                </div>

                                                <div>
                                                    <small className="text-muted">Location</small>
                                                    <p>{el?.location}</p>
                                                </div>
                                                <div>
                                                    <small className="text-muted">ULPIN</small>
                                                    <h5>{el?.ULPIN}</h5>
                                                </div>
                                            </div>

                                            <h6 className="price-tag mt-2">
                                                ₹ {el.price}
                                            </h6>

                                            <Link   to={`/booking/add/${seasonId}/${cropId}/${landId}`} className="modern-btn w-100 mt-3">
                                                Book
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

