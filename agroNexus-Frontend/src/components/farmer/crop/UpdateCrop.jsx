import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import ApiService from "../../services/ApiService"
import { toast } from "react-toastify"

export default function Updatecrop() {

    let { id } = useParams()
    let nav = useNavigate()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        let data = {
            _id: id
        }
        ApiService.singleCrop(data)
            .then((res) => {
                console.log(res);

                if (res.data.success) {

                    setValue("cropName", res.data.data.cropName);
                    setValue("duration", res.data.data.duration);
                    setValue("description", res.data.data.description);


                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })

       

    }


    const handleForm = (data) => {
        const formData = new FormData();

        formData.append("cropName", data.cropName);
        // formData.append("duration", data.duration);
        formData.append("description", data.description);
        // formData.append("seasonId", seasonId);
        // formData.append("landId", landId);
        formData.append("_id",id)
        // append image ONLY if selected
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        
        console.log("form Submitted", data);
        ApiService.updateCrop(formData)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    toast.success(res.data.message)
                    nav("/farmer/crop/all")
                }
                else {
                    toast.error(res.data.message)
                }

            })
            .catch((err) => {
                toast.error(err.message);

            })

    }
    const handleError = (error) => {
        console.log("err", error);

    }


    return (
        <>
 <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">Farmer Booking</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Farmer</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Farmer Booking</li>
                </ol>
            </nav>
        </div>
    </div>
    
            {/* <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-lg-5">
                        <div className="bg-primary p-5">
                            <h2 className="text-white mb-4">crop Update</h2>
                            <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                <div className="row g-3">

                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <label htmlFor=""></label>
                                            <input
                                                type="text"
                                                className="form-control bg-white border-0 "
                                                placeholder="Crop name"
                                                style={{ height: 55 }}
                                                {...register("cropName", {
                                                    required: {
                                                        value: true,
                                                        message: "cropName is req"
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <input

                                                type="text"
                                                className="form-control bg-white border-0"
                                                placeholder="Description"
                                                style={{ height: 55 }}
                                                {...register("description", {
                                                    required: {
                                                        value: true,
                                                        message: "description is req"
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="form-control"
                                                {...register("image")}
                                            />
                                        </div>
                                    </div>


                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <button className="btn btn-secondary w-100 py-3" type="submit">
                                              Update
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}




<div className="container-xxl py-6">
  <div className="container">
    <div
      className="section-header text-center mx-auto mb-5 wow fadeInUp"
      data-wow-delay="0.1s"
      style={{ maxWidth: 500 }}
    >
      <h1 className="display-6 mb-3">Update Crop</h1>
    </div>

    <div className="row g-5 justify-content-center">
      <div className="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
        <form onSubmit={handleSubmit(handleForm, handleError)}>
          <div className="row g-3">

            {/* Crop Name */}
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Crop Name"
                  {...register("cropName", {
                    required: {
                      value: true,
                      message: "Crop Name is required"
                    }
                  })}
                />
                <label>Crop Name</label>
              </div>
            </div>

            {/* Description */}
            <div className="col-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  style={{ height: "120px" }}
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description is required"
                    }
                  })}
                />
                <label>Description</label>
              </div>
            </div>

            {/* Image Upload */}
            <div className="col-12">
              <label className="form-label">Upload Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                {...register("image")}
              />
            </div>

            {/* Submit Button */}
            <div className="col-12 text-center mt-4">
              <button
                className="btn btn-primary rounded-pill py-3 px-5"
                type="submit"
              >
                Update Crop
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>
</div>



        </>
    )
}