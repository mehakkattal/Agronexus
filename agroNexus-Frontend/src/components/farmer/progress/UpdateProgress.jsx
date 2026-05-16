import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import ApiService from "../../services/ApiService"
import { toast } from "react-toastify"

export default function UpdateProgress() {

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
        ApiService.singleProgress(data)
            .then((res) => {
                console.log(res);

                if (res.data.success) {

                    setValue("progressStage", res.data.data.progressStage);
                    
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
        data._id = id
        console.log("form Submitted", data);
        ApiService.updateProgress(data)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    toast.success(res.data.message)
                    nav("/farmer/progress/all")
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
{/* 
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    <div className="col-lg-5">
                        <div className="bg-primary p-5">
                            <h2 className="text-white mb-4">Progress Update</h2>
                            <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                <div className="row g-3">

                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <label htmlFor=""></label>
                                            <input
                                                type="text"
                                                className="form-control bg-white border-0 "
                                                placeholder="Progress Stage"
                                                style={{ height: 55 }}
                                                {...register("progressStage", {
                                                    required: {
                                                        value: true,
                                                        message: "progressStage is req"
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

    {/* Header */}
    <div
      className="section-header text-center mx-auto mb-5 wow fadeInUp"
      data-wow-delay="0.1s"
      style={{ maxWidth: 500 }}
    >
      <h1 className="display-6 mb-3">Progress Update</h1>
    </div>

    <div className="row g-5 justify-content-center">
      <div className="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.5s">

        <form onSubmit={handleSubmit(handleForm, handleError)}>
          <div className="row g-3">

            {/* Progress Stage */}
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Progress Stage"
                  {...register("progressStage", {
                    required: {
                      value: true,
                      message: "progressStage is req"
                    }
                  })}
                />
                <label>Progress Stage</label>
              </div>
            </div>

            {/* Description */}
            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "description is req"
                    }
                  })}
                />
                <label>Description</label>
              </div>
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
        </>
    )
}