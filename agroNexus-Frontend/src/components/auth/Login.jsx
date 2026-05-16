import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ApiService from "../services/ApiService"
import { toast } from "react-toastify"
import { MoonLoader } from "react-spinners"


export default function Login() {

  let nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [load, setload] = useState(false)

  const changeEmail = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)

  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleForm = (e) => {
    setload(true)
    e.preventDefault()
    let data = {
      email: email,
      password: password,

    }
    ApiService.login(data)
      .then((res) => {
        console.log(res);


        if (res.data.success) {


          if (res.data.data.status === false) {
            toast.error("Your account is inactive. Please contact admin.");
            return;
          }
          toast.success(res.data.message)

          sessionStorage.setItem("isLogin", true)
          sessionStorage.setItem("token", res.data.token)
          sessionStorage.setItem("name", res.data.data.name)
          sessionStorage.setItem("email", res.data.data.email)
          sessionStorage.setItem("contact", res.data.data.contact)

          sessionStorage.setItem("userType", res.data.data.userType)
          sessionStorage.setItem("userId", res.data.data._id)
          if (res.data.data.userType == 1) {
            nav("/admin")
          }
          else if (res.data.data.userType == 2) {
            nav("/farmer")
          }
          else {
            nav("/")
          }
          setload(false)

        } else {
          setload(false)
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        setload(false)
        toast.error(err.message)
      })

  }

  return (
    <>

      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">

        <div className="container text-center">

          <h1 className="display-3 text-white mb-3 mt-5 animated slideInDown">Login</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><a href="#">Home</a></li>

              <li className="breadcrumb-item active" aria-current="page">Login</li>
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
                <h1 className="display-6 mb-3">Enter Your Credentials</h1>
              </div>

              <div className="row g-5 justify-content-center">
                <div className="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.5s">

                  <form onSubmit={handleForm}>
                    <div className="row g-3">

                      {/* Email */}
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            required
                            type="email"
                            className="form-control"
                            placeholder="Your Email"
                            onChange={changeEmail}
                          />
                          <label>Your Email</label>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            required
                            type="password"
                            className="form-control"
                            placeholder="Your Password"
                            onChange={changePassword}
                          />
                          <label>Your Password</label>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="col-12 text-center">
                        <button
                          className="btn btn-primary rounded-pill py-3 px-5"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      {/* Register Link */}
                      <div className="col-12 text-center">
                        <Link to="/register" className="text-primary">
                          Don't have an account? Sign Up
                        </Link>
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