import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import ApiService from "../../services/ApiService"
import { toast } from "react-toastify"
import { MoonLoader } from "react-spinners"

export default function UpdateSeason() {

    let { id } = useParams()
    const [load, setload] = useState(false)
    let nav = useNavigate()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        let data = {
            _id: id
        }
        ApiService.singleSeason(data)
            .then((res) => {
                console.log(res);

                if (res.data.success) {

                    setValue("seasonName", res.data.data.seasonName);
                    setValue("startMonth", res.data.data.startMonth);
                    setValue("endMonth", res.data.data.endMonth);


                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })

       

    }


    const handleForm = (data) => {
        setload(true)
         const formData = new FormData();
          formData.append("seasonName", data.seasonName);
        formData.append("startMonth", data.startMonth);
        // formData.append("duration", data.duration);
        formData.append("endMonth", data.endMonth);
        // formData.append("seasonId", seasonId);
        // formData.append("landId", landId);
        formData.append("_id",id)
        // append image ONLY if selected
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }
       
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        ApiService.updateSeason(formData)
            .then((res) => {
                if (res.data.success) {
                    setload(false)
                    console.log(res.data)
                    toast.success(res.data.message)
                    nav("/admin/season/all")
                }
                else {
                    toast.error(res.data.message)
                }

            })
            .catch((err) => {
                    setload(false)

                toast.error(err.message);

            })

    }
    const handleError = (error) => {
                    setload(false)

        console.log("err", error);

    }


    return (


        <>
          <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">Update Season</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Admin</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Update Season</li>
                </ol>
            </nav>
        </div>
    </div>
        
        
        {load ?
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
                            <MoonLoader size={50} />
                        </div>
                    </div>)
                    :

            // <div className="container">
            //     <div className="row d-flex justify-content-center align-items-center vh-100">
            //         <div className="col-lg-5">
            //             <div className="bg-primary p-5">
            //                 <h2 className="text-white mb-4">Season Update</h2>
            //                 <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
            //                     <div className="row g-3">

            //                         <div className="row mb-3">
            //                             <div className="col-lg-12 col-md-12 col-sm-12">
            //                                 <label htmlFor=""></label>
            //                                 <input
            //                                     type="text"
            //                                     className="form-control bg-white border-0 "
            //                                     placeholder="Season name"
            //                                     style={{ height: 55 }}
            //                                     {...register("seasonName", {
            //                                         required: {
            //                                             value: true,
            //                                             message: "seasonName is req"
            //                                         }
            //                                     })}
            //                                 />
            //                             </div>
            //                         </div>
            //                         <div className="row mb-3">
            //                                     <div className="col-lg-12 col-md-12 col-sm-12">
            //                                         <label htmlFor="" className="text-white">Start Month</label>
            //                                         <input
            //                                             type="month"
            //                                             min={new Date().toISOString().slice(0, 7)} // YYYY-MM
            //                                             className="form-control bg-white border-0"
            //                                             placeholder="Start Month"
            //                                             style={{ height: 55 }}
            //                                             {...register("startMonth", {
            //                                                 required: {
            //                                                     value: true,
            //                                                     message: "Start month is required",
            //                                                 },
            //                                             })}
            //                                         />

            //                                     </div>
            //                                 </div>
            //                                 <div className="row mb-3">
            //                                     <div className="col-lg-12 col-md-12 col-sm-12">
            //                                         <label htmlFor="" className="text-white">End Month</label>

            //                                         <input

            //                                             type="month"
            //                                             min={new Date().toISOString().slice(0, 7)}
            //                                             className="form-control bg-white border-0"
            //                                             placeholder="End Month"
            //                                             style={{ height: 55 }}
            //                                             {...register("endMonth", {
            //                                                 required: {
            //                                                     value: true,
            //                                                     message: "endMonth is req"
            //                                                 }
            //                                             })}
            //                                         />
            //                                     </div>
            //                                 </div>
            //                         <div className="row mb-3">
            //                             <div className="col-lg-12 col-md-12 col-sm-12">
            //                                 <input
            //                                     type="file"
            //                                     accept="image/*"
            //                                     className="form-control"
            //                                     {...register("image")}
            //                                 />
            //                             </div>
            //                         </div>


            //                         <div className="row mb-3">
            //                             <div className="col-12">
            //                                 <button className="btn btn-secondary w-100 py-3" type="submit">
            //                                   Update
            //                                 </button>
            //                             </div>
            //                         </div>

            //                     </div>
            //                 </form>
            //             </div>
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
      <h1 className="display-6 mb-3">Update Season</h1>
    </div>

    <div className="row g-5 justify-content-center">
      <div className="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.5s">

        <form onSubmit={handleSubmit(handleForm, handleError)}>
          <div className="row g-3">

            {/* Season Name */}
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Season Name"
                  {...register("seasonName", {
                    required: {
                      value: true,
                      message: "seasonName is req"
                    }
                  })}
                />
                <label>Season Name</label>
              </div>
            </div>

            {/* Start Month */}
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="month"
                  min={new Date().toISOString().slice(0, 7)}
                  className="form-control"
                  placeholder="Start Month"
                  {...register("startMonth", {
                    required: {
                      value: true,
                      message: "Start month is required",
                    },
                  })}
                />
                <label>Start Month</label>
              </div>
            </div>

            {/* End Month */}
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="month"
                  min={new Date().toISOString().slice(0, 7)}
                  className="form-control"
                  placeholder="End Month"
                  {...register("endMonth", {
                    required: {
                      value: true,
                      message: "endMonth is req"
                    }
                  })}
                />
                <label>End Month</label>
              </div>
            </div>

            {/* Image Upload */}
            <div className="col-md-12">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                {...register("image")}
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