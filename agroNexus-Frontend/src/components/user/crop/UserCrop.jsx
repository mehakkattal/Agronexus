import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService"
import { Link, useParams } from "react-router-dom"
import { MoonLoader } from "react-spinners"

export default function UserCrop() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [crop, setCrop] = useState([])
    const [previewImage, setPreviewImage] = useState(null)
    const [loading, setLoading] = useState(false)


    let { id } = useParams()

    const fetchData = () => {

        setLoading(true)   // ✅ Start loader

        const data = {
            status: true,

            seasonId: id,
            isBooked: false
        }

        ApiService.allCrop(data)
            .then((res) => {
                if (res.data.success) {
                    setCrop(res.data.data)
                } else {
                    toast.error(res.data.message)
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
    }, [id])

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
                            {crop.map((el, index) => (
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

                                            <Link
                                                to={`/user/viewland/${id}/${el._id}/${el.landId?._id}`}
                                                className="modern-btn w-100 mt-3"
                                            >
                                                View Land
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                    ) : (
                        <div className="empty-state text-center py-5">
                            <h4>No Crops Available</h4>
                            <p className="text-muted">Please check back later.</p>
                        </div>
                    )}

                </div>
            </div>


            {/* Image Preview Modal */}
            {/* {previewImage && (
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
            )} */}

            {/* Image Preview Modal */}
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
                            borderRadius: "6px"
                        }}
                    />
                </div>
            )}


            {/* {openModal && selectedCrop && (
                <div className="modal-backdrop">
                    <div className="modal-box">

                        <h3 className="mb-3"><i className="fa-solid fa-robot"></i> AI Crop Insight</h3>

                        <p className="text-dark"><b>Crop:</b> {selectedCrop.cropName}</p>
                        <p className="text-dark"><b>Season:</b> {selectedCrop?.seasonId?.seasonName}</p>
                        <p className="text-dark"><b>Duration:</b> {selectedCrop.duration}</p>

                        {selectedCrop.ai_summary ? (
                        
                            <>
                              
                                <p><strong>Expected Yield:</strong> {selectedCrop.ai_summary?.expected_yield || "N/A"}</p>

<p><strong>Weather:</strong> {selectedCrop.ai_summary?.weather_suitability || "N/A"}</p>

<p><strong>Risk Level:</strong> {selectedCrop.ai_summary?.risk_level || "Unknown"}</p>

<p className="ai-text">
  {selectedCrop.ai_summary?.ai_insight || "No detailed insight available"}
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
            )
            
            
            } */}
{openModal && selectedCrop && (
  <div className="ai-glass-overlay" onClick={() => setOpenModal(false)}>
    <div className="ai-wide-card" onClick={(e) => e.stopPropagation()}>
      
      {/* Robot Header */}
      <div className="ai-floating-header">
        <div className="ai-icon-box">
          <i className="fas fa-robot"></i>
        </div>
        <button className="ai-close-x" onClick={() => setOpenModal(false)}>×</button>
      </div>

      <div className="ai-card-body">
        <div className="text-center mb-4">
          <h4 className="fw-bold m-0">{selectedCrop.cropName}</h4>
          <small className="text-success fw-semibold">
            {selectedCrop?.seasonId?.seasonName} Season • {selectedCrop.duration}
          </small>
        </div>

        <div className="row g-3">
          {/* Left Column: Stats & Risk */}
          <div className="col-md-5">
            <div className="ai-stat-tile mb-3">
              <label>Expected Yield</label>
              <p><i className="fas fa-seedling me-2 text-success"></i>{selectedCrop.ai_summary?.expected_yield || "N/A"}</p>
            </div>

            {/* Dynamic Risk Card */}
            <div className={`ai-risk-card ${selectedCrop.ai_summary?.risk_level?.toLowerCase()}`}>
              <div className="d-flex justify-content-between align-items-center">
                <label>Risk Level</label>
                <i className="fas fa-tachometer-alt "></i>
              </div>
              <p className="risk-text">{selectedCrop.ai_summary?.risk_level || "Medium"}</p>
              <div className="risk-bar">
                <div className="risk-progress"></div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Insight Text */}
          <div className="col-md-7">
            <div className="ai-insight-box-wide">
              <div className="insight-header">
                <i className="fas fa-magic"></i>
                <span>AI ANALYSIS</span>
              </div>
              <div className="insight-scroll-area">
                {selectedCrop.ai_summary?.ai_insight || "No detailed insight available."}
              </div>
            </div>
          </div>
        </div>

        <button className="ai-btn-dismiss" onClick={() => setOpenModal(false)}>
          Dismiss Analysis
        </button>
      </div>
    </div>
  </div>
)}
        </>
    )
}
