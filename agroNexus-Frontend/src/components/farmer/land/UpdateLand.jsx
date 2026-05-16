import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import ApiService from "../../services/ApiService"
import { toast } from "react-toastify"

export default function UpdateLand() {

    let { id } = useParams()
    let nav = useNavigate()
        const [load,setload]=useState(false)
    
    const [existingImages, setExistingImages] = useState([]);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        let data = {
            _id: id
        }
        ApiService.singleLand(data)
            .then((res) => {
                console.log(res);

                if (res.data.success) {

                    setValue("ULPIN", res.data.data.ULPIN);
                    setValue("area", res.data.data.area);
                      setValue("location", res.data.data.location);
                    setValue("price", res.data.data.price);
                    setValue("landAvailability", res.data.data.landAvailability);
                  setExistingImages(res.data.data.images || []);


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

        // append text fields
        formData.append("ULPIN", data.ULPIN);
        formData.append("area", data.area);
        formData.append("landAvailability", data.landAvailability);
        formData.append("price", data.price);
        formData.append("location", data.location);
        formData.append("landName", data.landName);


        formData.append("_id",id)

        if (data.images && data.images.length > 0) {
            Array.from(data.images).forEach((file) => {
                formData.append("images", file);
            });
        }

       
        console.log("form Submitted", formData);
        ApiService.updateLand(formData)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    toast.success(res.data.message)
                    nav("/farmer/land/manage")
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
    return(
        <>

         <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">Update Land</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Update</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Update</li>
                </ol>
            </nav>
        </div>
    </div>
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
        

        // <div className="container">
        //     <div className="row d-flex justify-content-center align-items-center vh-100">
        //         <div className="col-lg-5">
        //                 <div className="bg-primary p-5">
        //                     <h2 className="text-white mb-4">Update land</h2>
        //                     <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
        //                         <div className="row g-3">
        //                             <div className="row mb-3">
        //                                 <div className="col-lg-12 col-md-12 col-sm-12">
        //                                     <input
                                                   
        //                                         type="text"
        //                                         className="form-control bg-white border-0"
        //                                         placeholder="Land Name"
        //                                         style={{ height: 55 }}
        //                                         {...register("landName", {
        //                                             required: {
        //                                                 value: true,
        //                                                 message: "landName is req"
        //                                             }
        //                                         })}
        //                                     />
        //                                 </div>
        //                             </div>
                                    
        //                             <div className="row mb-3">
        //                                 <div className="col-lg-12 col-md-12  col-sm-12">
        //                                     <label htmlFor=""></label>
        //                                     <input
        //                                         maxLength={14}
        //                                         minLength={14}
        //                                         type="tel"
        //                                         className="form-control bg-white border-0 "
        //                                         placeholder="ULPIN"
        //                                         style={{ height: 55 }}
        //                                         {...register("ULPIN", {
        //                                             required: {
        //                                                 value: true,
        //                                                 message: "ULPIN is req"
        //                                             }
        //                                         })}
        //                                     />
        //                                 </div>
        //                             </div>
                                    
        //                             <div className="row mb-3">
        //                                 <div className="col-lg-12 col-md-12 col-sm-12">
        //                                     <input
                                           
        //                                         type="text"
        //                                         className="form-control bg-white border-0"
        //                                         placeholder="Area in sqft"
        //                                         style={{ height: 55 }}
        //                                         {...register("area", {
        //                                             required: {
        //                                                 value: true,
        //                                                 message: "area is req"
        //                                             }
        //                                         })}
        //                                     />
        //                                 </div>
        //                             </div>
        //                             <div className="row mb-3">
        //                                 <div className="col-lg-12 col-md-12 col-sm-12">
        //                                     <input
                                           
        //                                         type="text"
        //                                         className="form-control bg-white border-0"
        //                                         placeholder="Location"
        //                                         style={{ height: 55 }}
        //                                         {...register("location", {
        //                                             required: {
        //                                                 value: true,
        //                                                 message: "location is req"
        //                                             }
        //                                         })}
        //                                     />
        //                                 </div>
        //                             </div>
        //                             <div className="row mb-3">
        //                                 <div className="col-lg-12 col-md-12 col-sm-12">
        //                                     <select className="form-control"
        //                                        {...register("landAvailability", {
        //                                             required: {
        //                                                 value: true,
        //                                                 message: "landAvailability is req"
        //                                             }
        //                                         })}
        //                                     >
        //                                         <option value="" disabled>Select Availability</option>
        //                                         <option value="Available">Available</option>
        //                                         <option value="Not Available">Not Available</option>


        //                                     </select>
        //                                 </div>
        //                             </div>
        //                             <div className="row mb-3">
        //                                 <div className="col-lg-12 col-md-12 col-sm-12">
        //                                     <input
                                            
        //                                         type="number"
        //                                         className="form-control bg-white border-0"
        //                                         placeholder="Price"
        //                                         style={{ height: 55 }}
        //                                         {...register("price", {
        //                                             required: {
        //                                                 value: true,
        //                                                 message: "price is req"
        //                                             }
        //                                         })}
        //                                     />
        //                                 </div>
        //                             </div>
                                   
        //                                 <div className="row mb-3">
        //                                     <div className="col-lg-12 col-md-12 col-sm-12">
        //                                         <input
        //                                             type="file"
        //                                             multiple
        //                                             accept="image/*"
        //                                             className="form-control"
        //                                             {...register("images")}
        //                                         />
        //                                     </div>
        //                                 </div>
                                 

                                    
                                
        //                             <div className="row mb-3">
        //                                 <div className="col-12">
        //                                     <button className="btn btn-secondary w-100 py-3" type="submit">
        //                                        Update
        //                                     </button>
        //                                 </div>
        //                             </div>
                                    
        //                         </div>
        //                     </form>
        //                 </div>
        //         </div>
        //     </div>
        // </div>

<div className="container-xxl py-6">
  <div className="container">



    {/* Header */}
    <div
      className="section-header text-center mx-auto mb-5 wow fadeInUp"
      data-wow-delay="0.1s"
      style={{ maxWidth: 500 }}
    >
      <h1 className="display-6 mb-3">Update Land</h1>
    </div>

    <div className="row g-5 justify-content-center">
      <div className="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.5s">

        <form onSubmit={handleSubmit(handleForm, handleError)}>
          <div className="row g-3">

            {/* Land Name */}
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Land Name"
                  {...register("landName", {
                    required: {
                      value: true,
                      message: "landName is req"
                    }
                  })}
                />
                <label>Land Name</label>
              </div>
            </div>

            {/* ULPIN */}
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  maxLength={14}
                  minLength={14}
                  type="tel"
                  className="form-control"
                  placeholder="ULPIN"
                  {...register("ULPIN", {
                    required: {
                      value: true,
                      message: "ULPIN is req"
                    }
                  })}
                />
                <label>ULPIN</label>
              </div>
            </div>

            {/* Area */}
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Area in sqft"
                  {...register("area", {
                    required: {
                      value: true,
                      message: "area is req"
                    }
                  })}
                />
                <label>Area in sqft</label>
              </div>
            </div>

            {/* Location */}
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  {...register("location", {
                    required: {
                      value: true,
                      message: "location is req"
                    }
                  })}
                />
                <label>Location</label>
              </div>
            </div>

            {/* Availability */}
            <div className="col-md-12">
              <div className="form-floating">
                <select
                  className="form-control"
                  {...register("landAvailability", {
                    required: {
                      value: true,
                      message: "landAvailability is req"
                    }
                  })}
                >
                  <option value="">Select Availability</option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
                <label>Availability</label>
              </div>
            </div>

            {/* Price */}
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "price is req"
                    }
                  })}
                />
                <label>Price</label>
              </div>
            </div>

            {/* Images */}
            <div className="col-md-12">
              <input
                type="file"
                multiple
                accept="image/*"
                className="form-control"
                {...register("images")}
              />
            </div>

            {/* Button */}
            <div className="col-12 text-center">
              <button
                className="btn btn-primary rounded-pill py-3 px-5"
                type="submit"
              >
                Update
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>

  </div>
</div>
                                            }

        </>
    )
}