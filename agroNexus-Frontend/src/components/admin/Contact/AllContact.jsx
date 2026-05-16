import { useEffect, useState } from "react"
import ApiService from "../../services/ApiService"
import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function AllContact() {

    const [contact, setContact] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = () => {

        setLoading(true)

        ApiService.allContact()
            .then((res) => {
                if (res.data.success) {
                    setContact(res.data.data)
                }
                else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    const softDelete = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You can change it later!",
            icon: "warning",
            showCancelButton: true,
           confirmButtonColor: "#34AD54",
            cancelButtonColor: "#ff9933",
            confirmButtonText: `${!status ? "Resolved" : "Pending"}`
        }).then((result) => {

            if (result.isConfirmed) {
               
                let data = {
                    _id: id,
                    status: !status
                }

                ApiService.softDeleteContact(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                icon: "Success",
                                confirmButtonColor: "#34AD54",
                            })
                            fetchData()
                        } else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
            }
        })
    }


    


    return (
        <>
            {/* Hero Section */}
            {/* <div className="container-fluid bg-primary py-5 bg-hero mb-5">
                <div className="container py-5">
                    <div className="row justify-content-start">
                        <div className="col-lg-8 text-center text-lg-start">
                            <h1 className="display-1 text-white mb-md-4">All Queries</h1>
                            <Link to="/admin" className="btn btn-primary py-md-3 px-md-5 me-3">
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}

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

            {/* Table Section */}
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="table-responsive   ">

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary"></div>
                                    <p className="mt-3">Loading queries...</p>
                                </div>
                            ) : contact.length > 0 ? (

                                <table className="table table-striped table-hover  border">
                                    <thead className="thead-dark text-dark">
                                        <tr>
                                            <th>Sno</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Subject</th>
                                            <th>Message</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {contact.map((el, index) => (
                                            <tr key={index}>
                                                <td><h5>{index + 1}</h5></td>
                                                <td><h5>{el?.name}</h5></td>
                                                <td><h5>{el?.email}</h5></td>
                                                <td><h5>{el?.subject}</h5></td>
                                                <td>
                                                    <h6 style={{
                                                       
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap"
                                                    }}>
                                                        {el?.message}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <h5>{el?.status ? "Resolved" : "Pending"}</h5>
                                                </td>
                                                <td>
                                                    <button className="btn">
                                                        <ReactSwitch
                                                            checked={el?.status}
                                                            onChange={() => softDelete(el?._id, el?.status)}
                                                        />
                                                    </button>

                                                    
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            ) : (
                                <div className="col-12 text-center">
                                    <h4 className="text-muted">No contact messages available</h4>
                                    <p>Please check back later.</p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}