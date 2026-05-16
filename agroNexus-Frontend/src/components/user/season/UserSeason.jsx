import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService"
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export default function UserSeason() {

    const [season, setSeason] = useState([])
    const [crops, setCrops] = useState([])
    const [previewImage, setPreviewImage] = useState(null)

    const [loadingSeason, setLoadingSeason] = useState(false)
    const [loadingCrop, setLoadingCrop] = useState(false)

    const fetchData = () => {

        setLoadingSeason(true)

        const data = {
            status: true
        }

        ApiService.allSeason(data)
            .then((res) => {
                if (res.data.success) {
                    setSeason(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoadingSeason(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSeasonClick = (_id) => {

        setLoadingCrop(true)

        const data = {
            seasonId: _id
        }

        ApiService.allCrop(data)
            .then((res) => {
                if (res.data.success) {
                    setCrops(res.data.data)
                }
            })
            .catch((err) => toast.error(err.message))
            .finally(() => {
                setLoadingCrop(false)
            })
    }

    return (
        <>
            <div className="container-fluid py-5 bg-light">
  <div className="container">

    {/* ================= SEASON SECTION ================= */}
    <h2 className="text-center fw-bold mb-5 text-success">🌾 Available Seasons</h2>

    {loadingSeason ? (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </div>
    ) : season.length > 0 ? (

      <div className="row g-4">
        {season.map((el, index) => (
          <div className="col-lg-4 col-md-6" key={el._id || index}>
            <div className="season-card">

              <div className="image-wrapper">
                {el?.image ? (
                  <img
                    src={el.image}
                    alt="season"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(el.image);
                    }}
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>

              <div className="card-content">
                <h5 className="fw-bold text-dark">{el?.seasonName}</h5>
                <p className="text-muted mb-1">
                  🌱 Start: {el?.startMonth}
                </p>
                <p className="text-muted">
                  🌾 End: {el?.endMonth}
                </p>

                <Link
                  to={`/user/crop/${el._id}`}
                  className="modern-btn w-100 mt-3"
                  onClick={() => handleSeasonClick(el._id)}
                >
                  View Crops
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>

    ) : (
      <div className="text-center py-5">
        <h4 className="text-secondary">No Season Available</h4>
        <p className="text-muted">Please check back later.</p>
      </div>
    )}


    {/* ================= CROP SECTION ================= */}
    {loadingCrop ? (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <MoonLoader size={40} color="#198754" />
      </div>
    ) : crops.length > 0 && (
      <>
        <h2 className="text-center fw-bold mt-5 mb-4 text-success">
          🌿 Crops
        </h2>

        <div className="row g-4">
          {crops.map((el, index) => (
            <div className="col-lg-4 col-md-6" key={el._id || index}>
              <div className="crop-card">
                <h5 className="fw-bold">{el?.cropName}</h5>
                <p className="mb-1 text-muted">
                  ⏳ Duration: {el?.duration}
                </p>
                <p className="text-muted small">
                  {el?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    )}

  </div>
</div>


{/* ================= IMAGE PREVIEW MODAL ================= */}
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
        </>
    )
}


