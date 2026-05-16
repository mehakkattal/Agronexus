import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import ApiService from "../services/ApiService"
import { Link } from "react-router-dom"

export default function Contact() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [load, setLoad] = useState(false)

  const handleForm = (data) => {
    setLoad(true)

    ApiService.contact(data)   // 👈 make sure this API exists
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message)
          reset()
        } else {
          toast.error(res.data.message)
        }
        setLoad(false)
      })
      .catch((err) => {
        setLoad(false)
        toast.error(
          err.response?.data?.message ||
          err.message ||
          "Something went wrong"
        )
      })
  }

  const handleError = (errors) => {
    toast.error("All fields are required")
  }

  useEffect(() => {
    document.body.style.overflow = load ? "hidden" : "auto"
  }, [load])

  return (
    <>
      {/* Hero Section */}
       <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">Contact</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    {/* <li class="breadcrumb-item"><a href="#">Farmer</a></li> */}
                    <li class="breadcrumb-item active" aria-current="page">Contact</li>
                </ol>
            </nav>
        </div>
    </div>

      {/* Loader */}
      {load && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3">Sending Message...</p>
        </div>
      )}

      {/* Contact Form */}
     <div className="container-xxl py-5" style={{ marginTop: "60px" }}>
  <div className="container">
    <div className="row g-5 justify-content-center">

      {/* Left Side Info */}
      <div className="col-lg-5 col-md-12 wow fadeInUp" data-wow-delay="0.1s">
        <div className="bg-primary text-white d-flex flex-column justify-content-center h-100 p-5">
          <h5 className="text-white">Call Us</h5>
          <p className="mb-5">
            <i className="fa fa-phone-alt me-3" />
            +91 9876543219
          </p>

          <h5 className="text-white">Email Us</h5>
          <p className="mb-5">
            <i className="fa fa-envelope me-3" />
            info@example.com
          </p>

          <h5 className="text-white">Office Address</h5>
          <p className="mb-5">
            <i className="fa fa-map-marker-alt me-3" />
            Jalandhar, Punjab
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
        <form onSubmit={handleSubmit(handleForm, handleError)}>
          <div className="row g-3">

            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                />
                <label htmlFor="name">Your Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                  {...register("email", { required: "Email is required" })}
                />
                <label htmlFor="email">Your Email</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Subject"
                  {...register("subject", { required: "Subject is required" })}
                />
                <label htmlFor="subject">Subject</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a message here"
                  id="message"
                  style={{ height: 200 }}
                  {...register("message", { required: "Message is required" })}
                />
                <label htmlFor="message">Message</label>
              </div>
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary rounded-pill py-3 px-5"
                type="submit"
              >
                Send Message
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