import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ApiService from "../services/ApiService"
import { toast } from "react-toastify"


export default function FarmerRegister(){


    let nav = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleForm = (data) => {

        const formData = new FormData();
        formData.append("name", data?.name);
        formData.append("email", data?.email);
        formData.append("password", data?.password);
        formData.append("contact", data?.contact);


        console.log("form Submitted", formData);
        ApiService.register(data)
            .then((res) => {
                console.log(res)

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
                                //  setload(false)
                                sessionStorage.setItem("isLogin", true)

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

                            } else {
                                toast.error("something went wrong")
                            }
                        })
                        .catch((err) => {
                            setload(false)
                            toast.error(err.message)
                            console.log("1", err);

                        })
                }
            })
            .catch((err) => {
                toast.error(err.message);
                console.log("2", err);

            })
    }

    const handleError = (error) => {
        console.log("err", error);
    }



    return(
        <>
        
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-5">
                        <div className="bg-primary p-5">
                            <h2 className="text-white mb-4">Farmer Register</h2>
                            <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                <div className="row g-3">
                                    
                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <input
                                                
                                                type="email"
                                                className="form-control bg-white border-0 "
                                                placeholder="Your Email"
                                                style={{ height: 55 }}
                                                {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message: "email is req"
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
                                                placeholder="Password"
                                                style={{ height: 55 }}
                                                {...register("password", {
                                                    required: {
                                                        value: true,
                                                        message: "password is req"
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
                                                placeholder="Name"
                                                style={{ height: 55 }}
                                                {...register("name", {
                                                    required: {
                                                        value: true,
                                                        message: "name is req"
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <input
                                                maxLength={10}
                                                minLength={10}
                                                type="tel"
                                                className="form-control bg-white border-0"
                                                placeholder="Contact"
                                                style={{ height: 55 }}
                                                {...register("contact", {
                                                    required: {
                                                        value: true,
                                                        message: "contact is req"
                                                    }
                                                })}
                                            />
                                        </div>
                                    </div>
                                
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <button className="btn btn-secondary w-100 py-3" type="submit">
                                                Register
                                            </button>
                                        </div>
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