import { useEffect, useState } from "react";
import { useForm, } from "react-hook-form";
 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import { ClipLoader, MoonLoader } from "react-spinners";

export default function AddLand() {
    let nav = useNavigate()
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm()
    const images = watch("images");
    const [load,setload]=useState(false)

    const handleForm = (data) => {
        setload(true)
        const formData = new FormData();

        // append text fields
        formData.append("ULPIN", data.ULPIN);
        formData.append("landName", data.landName);

        formData.append("area", data.area);
        formData.append("landAvailability", data.landAvailability);
        formData.append("price", data.price);
        formData.append("location", data.location);


        if (data.images.length > 5) {
            setload(false);
            toast.error("You can upload maximum 5 images");
            return;
        }
        // append multiple images
        for (let i = 0; i < data.images.length; i++) {
            formData.append("images", data.images[i]);
        }


        console.log("form Submitted", data);
        ApiService.addLand(formData)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                     setload(false)
                    toast.success(res.data.message)

                    nav("/farmer/land/manage")
                }
                else {
                    setload(false)
                    toast.error(res.data.message)
                }

            })
            .catch((err) => {
                setload(false)
                toast.error(
                    err?.response?.data?.message || "Something went wrong"
                );

            })

    }
    const handleError = (error) => {
        setload(false)
        console.log("err", error);

    }
    return (
        
        <>
        {
          load?
                  (<div style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(255,255,255,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999
                    }}>
                        <div style={{ transform: "translateY(-40px)" }}>
                            <ClipLoader size={50} />
                        </div>
                    </div>)
          :
        <>
            {/* <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-lg-5">
                        <div className="bg-primary radius p-5">
                            <h2 className="text-white mb-4">Land</h2>
                            <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                <div className="row g-3">

                                     <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <input
                                                    required
                                                type="text"
                                                className="form-control bg-white border-0"
                                                placeholder="Land Name"
                                                style={{ height: 55 }}
                                                {...register("landName", {
                                                    required: {
                                                        value: true,
                                                        message: "landName is req"
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    

                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12  col-sm-12">
                                            <label htmlFor=""></label>
                                            <input
                                            required
                                                maxLength={14}
                                                minLength={14}
                                                type="tel"
                                                className="form-control bg-white border-0 "
                                                placeholder="ULPIN must be 14 characters"
                                                style={{ height: 55 }}
                                                {...register("ULPIN", {
                                                    required: {
                                                        value: true,
                                                        message: "ULPIN is req"
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <input
                                                    required
                                                type="text"
                                                className="form-control bg-white border-0"
                                                placeholder="Location"
                                                style={{ height: 55 }}
                                                {...register("location", {
                                                    required: {
                                                        value: true,
                                                        message: "location is req"
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <input
                                                    required
                                                type="NUMBER"
                                                className="form-control bg-white border-0"
                                                placeholder="Area in sqft"
                                                style={{ height: 55 }}
                                                {...register("area", {
                                                    required: {
                                                        value: true,
                                                        message: "area is req"
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">

                                            <select className="form-control"
                                            required
                                               {...register("landAvailability", {
                                                    required: {
                                                        value: true,
                                                        message: "landAvailability is req"
                                                    }
                                                })}
                                            >
                                                <option value="" disabled>Select Availability</option>
                                                <option value="Available">Available</option>
                                                <option value="Not Available">Not Available</option>


                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <input
                                            required
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                className="form-control"
                                                {...register("images", {
                                                    required: "At least one image is required"
                                                })}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <input
                                                 required

                                                type="number"
                                                className="form-control bg-white border-0"
                                                placeholder="Price"
                                                style={{ height: 55 }}
                                                {...register("price", {
                                                    required: {
                                                        value: true,
                                                        message: "price is req"
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>


                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <button className="btn btn-secondary w-100 py-3" type="submit">
                                                ADD
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
              <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">Add Land</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Farmer</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Add Land</li>
                </ol>
            </nav>
        </div>
    </div>
            <div className="container-xxl py-6">
  <div className="container">
    <div
      className="section-header text-center mx-auto mb-5 wow fadeInUp"
      data-wow-delay="0.1s"
      style={{ maxWidth: 500 }}
    >
      <h1 className="display-6 mb-3">Add Land</h1>
    </div>

    <div className="row g-5 justify-content-center">
      <div
        className="col-lg-7 col-md-12 wow fadeInUp"
        data-wow-delay="0.5s"
      >
        <form onSubmit={handleSubmit(handleForm, handleError)}>
          <div className="row g-3">

            {/* LAND NAME */}
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Land Name"
                  {...register("landName", {
                    required: "Land name is required"
                  })}
                />
                <label>Land Name</label>
              </div>
            </div>

            {/* ULPIN */}
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="tel"
                  maxLength={14}
                  minLength={14}
                  className="form-control"
                  placeholder="ULPIN"
                  {...register("ULPIN", {
                    required: "ULPIN is required"
                  })}
                />
                <label>ULPIN (14 characters)</label>
              </div>
            </div>

            {/* LOCATION */}
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  {...register("location", {
                    required: "Location is required"
                  })}
                />
                <label>Location</label>
              </div>
            </div>

            {/* AREA */}
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Area"
                  {...register("area", {
                    required: "Area is required"
                  })}
                />
                <label>Area (in sqft)</label>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="col-12">
              <div className="form-floating">
                <select
                  className="form-select"
                  {...register("landAvailability", {
                    required: "Availability is required"
                  })}
                >
                  <option value="">Select Availability</option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
                <label>Select Availability</label>
              </div>
            </div>

            {/* IMAGES */}
            <div className="col-12">
              <label className="form-label">Upload Land Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="form-control"
                {...register("images", {
                  required: "At least one image is required"
                })}
              />
            </div>

            {/* PRICE */}
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  {...register("price", {
                    required: "Price is required"
                  })}
                />
                <label>Price</label>
              </div>
            </div>

            {/* BUTTON */}
            <div className="col-12 text-center">
              <button
                className="btn btn-primary rounded-pill py-3 px-5"
                type="submit"
              >
                ADD LAND
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>
</div>
            </>
}
        </>
    )
}