import axios from "axios"
import { set, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ApiService from "../services/ApiService"
import { toast } from "react-toastify"
import { MoonLoader } from "react-spinners"
import { useEffect, useState } from "react"

export default function Register() {

  let nav = useNavigate()
  const [load, setload] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const handleForm = (data) => {
    setload(true)

    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("password", data?.password);
    formData.append("contact", data?.contact);
    formData.append("userType", data?.userType)

    console.log("form Submitted", formData);
    ApiService.register(data)
      .then((res) => {
        console.log(res)
        if (res.data.success === false) {
          setload(false)
          toast.error("User already exists")
          return
        }
        if (res.data.success) {
          toast.success(res.data.message)
          let logindata = {
            email: data.email,
            password: data.password
          }
          console.log(logindata);
          ApiService.login(logindata)
            .then((result) => {
              console.log(result);
              if (result.data.success) {
                toast.success(result.data.message)
                sessionStorage.setItem("isLogin", true)
                sessionStorage.setItem("contact", res.data.data.contact)
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("name", result.data.data.name)
                sessionStorage.setItem("email", result.data.data.email)
                sessionStorage.setItem("userType", result.data.data.userType)
                sessionStorage.setItem("userId", result.data.data._id)
                if (result.data.data.userType == 1) {
                  nav("/admin")
                }
                else if (result.data.data.userType == 2) {
                  nav("/farmer")
                }
                else {
                  nav("/")
                }
                setload(false)
              } else {
                toast.error("something went wrong")
              }
            })
            .catch((err) => {
              setload(false)
              toast.error(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong"
              );
              console.log("1", err);
            })
        }
      })
      .catch((err) => {
        setload(false)
        toast.error(
          err.response?.data?.message ||
          err.message
        );
      })
  }
  const handleError = (errors) => {
    setload(false);
    console.log("Form Errors:", errors);
    const firstError = Object.values(errors)[0];
    toast.error(firstError?.message || "Form has errors");
  };
  useEffect(() => {
    if (load) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [load]);

  return (
    <>
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">

        <div className="container text-center">

          <h1 className="display-3 text-white mb-3 mt-5 animated slideInDown">Register</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><a href="#">Home</a></li>

              <li className="breadcrumb-item active" aria-current="page">Register</li>
            </ol>
          </nav>
        </div>
      </div>
      {
        load ?
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading ...</p>
          </div>
          :


          <div className="container-xxl py-6">
            <div className="container">

              <div
                className="section-header text-center mx-auto mb-5 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ maxWidth: 500 }}
              >
                <h1 className="display-6 mb-3">Create Your Account</h1>
              </div>

              <div className="row g-5 justify-content-center">
                <div className="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.5s">

                  <form onSubmit={handleSubmit(handleForm, handleError)}>
                    <div className="row g-3">

                      {/* Name */}
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            {...register("name")}
                          />
                          <label>Your Name</label>
                        </div>
                        {errors.name && (
                          <small className="text-danger">
                            {errors.name.message}
                          </small>
                        )}
                      </div>

                      {/* Email */}
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                            {...register("email")}
                          />
                          <label>Your Email</label>
                        </div>
                        {errors.email && (
                          <small className="text-danger">
                            {errors.email.message}
                          </small>
                        )}
                      </div>

                      {/* Password */}
                      {/* <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            {...register("password")}
                          />
                          <label>Password</label>
                        </div>
                        {errors.password && (
                          <small className="text-danger">
                            {errors.password.message}
                          </small>
                        )}
                      </div> */}


                      <div className="col-md-12">
  <div className="form-floating">
    <input
      type="password"
      className="form-control"
      placeholder="Password"
      {...register("password", {
        required: "Password is required",
        pattern: {
          value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message:
            "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character",
        },
      })}
    />
    <label>Password</label>
  </div>
  {errors.password && (
    <small className="text-danger">
      {errors.password.message}
    </small>
  )}
</div>

                      {/* Contact */}
                      {/* <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Contact"
                            {...register("contact")}
                          />
                          <label>Contact</label>
                        </div>
                        {errors.contact && (
                          <small className="text-danger">
                            {errors.contact.message}
                          </small>
                        )}
                      </div> */}

                      <div className="col-md-12">
  <div className="form-floating">
    <input
      type="tel"
      className="form-control"
      placeholder="Contact"
      {...register("contact", {
        required: "Contact number is required",
        pattern: {
          value: /^[0-9]{10}$/,
          message: "Contact number must be exactly 10 digits",
        },
      })}
    />
    <label>Contact</label>
  </div>
  {errors.contact && (
    <small className="text-danger">
      {errors.contact.message}
    </small>
  )}
</div>

                      {/* User Type */}
                      <div className="col-md-12">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            {...register("userType")}
                          >
                            <option value="">Select user type</option>
                            <option value="3">User</option>
                            <option value="2">Farmer</option>
                          </select>
                          <label>User Type</label>
                        </div>
                        {errors.userType && (
                          <small className="text-danger">
                            {errors.userType.message}
                          </small>
                        )}
                      </div>

                      {/* Button */}
                      <div className="col-12 text-center">
                        <button
                          className="btn btn-primary rounded-pill py-3 px-5"
                          type="submit"
                        >
                          Register
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
