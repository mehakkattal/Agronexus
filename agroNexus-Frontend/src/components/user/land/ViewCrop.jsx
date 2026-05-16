import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService"
import { Link, useParams } from "react-router-dom"

export default function ViewCrop() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [crop, setCrop] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Loader state added

    let { id } = useParams()

    const fetchData = () => {

        const data = {
            status: true,
            landId: id,
            isBooked: false
        };

        setLoading(true); // ✅ Start loader

        ApiService.allCrop(data)
            .then((res) => {
                // console.log(res)
                console.log("Crops Data:", res.data.data)
                if (res.data.success) {
                    setCrop(res.data.data)
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
            <div className="container-fluid py-5 bg-light">
                <div className="container">

                    <h2 className="text-center fw-bold text-success mb-5">
                        🌿 Available Crops
                    </h2>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-success" role="status" />
                        </div>
                    ) : crop.length > 0 ? (

                        <div className="row g-4">
                            {crop.map((el, index) => {
                                  console.log("AI Summary:", el.ai_summary);


                                  return(
                                <div className="col-lg-4 col-md-6" key={el._id || index}>
                                    <div className="modern-crop-card">

                                        {/* Image Section */}
                                        <div className="crop-image-wrapper">
                                            {el?.image ? (
                                                <img
                                                    src={el.image}
                                                    alt="crop"
                                                    onClick={() => setPreviewImage(el.image)}
                                                />
                                            ) : (
                                                <div className="no-image">No Image</div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="crop-content">
                                            <h5 className="fw-bold">{el.cropName}</h5>

                                            <div className="crop-badges">
                                                <span className="badge bg-success-subtle text-success fs-6">
                                                    🌱 {el?.seasonId?.seasonName}
                                                </span>
                                                <span className="badge bg-warning-subtle text-dark fs-6">
                                                    ⏳ {el?.duration}
                                                </span>
                                            </div>

                                            {/* <p className="text-muted small mt-2">
                                                {el.description}
                                            </p> */}

                                            <button className="modern-btn btn w-100 mt-3" onClick={() => {
                                                setSelectedCrop(el);
                                                setOpenModal(true);
                                            }}>
                                                View AI Insight
                                            </button>
                                            <Link to={`/booking/add/${el.seasonId?._id}/${el._id}/${id}`} className="modern-btn w-100 mt-3">
                                                Book
                                            </Link>
                                        </div>

                                    </div>
                                </div>);
})}
                        </div>

                    ) : (
                        <div className="empty-state text-center py-5">
                            <h4>No Crops Available</h4>
                            <p className="text-muted">Please check back later.</p>
                        </div>
                    )}

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
                        style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "6px" }}
                    />
                </div>
            )}


            {openModal && selectedCrop && (
                <div className="modal-backdrop">
                    <div className="modal-box">

                        <h3 className="mb-3"><i className="fa-solid fa-robot"></i> AI Crop Insight</h3>

                        <p className="text-dark"><b>Crop:</b> {selectedCrop.cropName}</p>
                        <p className="text-dark"><b>Season:</b> {selectedCrop?.seasonId?.seasonName}</p>
                        <p className="text-dark"><b>Duration:</b> {selectedCrop.duration}</p>

                        {selectedCrop.ai_summary ? (
                            <>
                                <p className="text-dark"><strong>Expected Yield:</strong> {selectedCrop.ai_summary.expected_yield}</p>
                                <p className="text-dark"><strong>Weather:</strong> {selectedCrop.ai_summary.weather_suitability}</p>
                                <p className="text-dark"><strong>Risk Level:</strong> {selectedCrop.ai_summary.risk_level}</p>
                                <p className="ai-text text-dark">
                                    {selectedCrop.ai_summary.ai_insight}
                                </p>
                            </>
                        ) : (
                            <p>AI insight not available</p>
                        )}

                        <div className="modal-actions align-items-center justify-content-end gap-2 mt-4">
                            <button className="modern-btn btn " onClick={() => setOpenModal(false)}>
                                <i className="fa-solid fa-x"></i>
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </>
    )
}


