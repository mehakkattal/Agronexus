

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import { MoonLoader } from "react-spinners";

export default function AddBooking() {

    const nav = useNavigate();
    const { seasonId, cropId, landId } = useParams();

    const userId = sessionStorage.getItem("userId");
    const isLogin = sessionStorage.getItem("isLogin");

    const [load, setLoad] = useState(false);
    const [season, setSeason] = useState([]);
    const [crop, setCrop] = useState([]);

    const { register, handleSubmit, setValue } = useForm();

    // 🔹 Convert Month to Date
    const monthInputToDate = (monthValue, type = "start") => {
        if (!monthValue) return "";

        const [year, month] = monthValue.split("-");
        const m = Number(month);

        if (type === "start") {
            return new Date(year, m - 1, 1).toISOString().split("T")[0];
        } else {
            return new Date(year, m, 0).toISOString().split("T")[0];
        }
    };

    // 🔹 Fetch All Required Data
    const fetchData = async () => {
        try {

            const seasonRes = await ApiService.allSeason({ status: true });
            if (seasonRes.data.success) {
                setSeason(seasonRes.data.data);
            }

            const cropRes = await ApiService.singleCrop({ _id: cropId });
            if (cropRes.data.success) {
                setCrop([cropRes.data.data]); // keep array for your existing UI
            }

            const landRes = await ApiService.singleLand({ _id: landId });
            if (landRes.data.success) {
                setValue("price", landRes.data.data.price);
            }

        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔥 Auto Fill Season + Crop + Dates
    useEffect(() => {

        if (!seasonId || !cropId) return;

        setValue("seasonId", seasonId);
        setValue("cropId", cropId);

        const selectedSeason = season.find(s => s._id === seasonId);

        if (selectedSeason) {
            const leaseStart = monthInputToDate(selectedSeason.startMonth, "start");
            const leaseEnd = monthInputToDate(selectedSeason.endMonth, "end");

            setValue("leaseStartDate", leaseStart);
            setValue("leaseEndDate", leaseEnd);
        }

    }, [seasonId, cropId, season, setValue]);

    // 🔥 Razorpay Payment
    const handleForm = (data) => {

        if (!isLogin) {
            nav("/login");
            return;
        }

        const bookingData = {
            userId,
            seasonId,
            cropId,
            landId,
            price: data.price,
            leaseStartDate: data.leaseStartDate,
            leaseEndDate: data.leaseEndDate,
            status: true
        };

        const options = {
            key: "rzp_test_Q8bKRaQdmgftXW", // Replace in production
            amount: data.price * 100,
            currency: "INR",
            name: "Land Booking",
            description: "Season Crop Booking",

            handler: function (response) {

                bookingData.transactionId = response.razorpay_payment_id;

                setLoad(true);

                ApiService.addBooking(bookingData)
                    .then(res => {
                        if (res.data.success) {
                            toast.success("Payment Successful & Booking Confirmed!");
                            nav("/booking/manage");
                        } else {
                            toast.error(res.data.message);
                        }
                    })
                    .catch(err => toast.error(err.message))
                    .finally(() => setLoad(false));
            },

            prefill: {
                name: sessionStorage.getItem("name") || "User",
                email: sessionStorage.getItem("email") || "user@email.com",
                contact: sessionStorage.getItem("contact") || "9999999999"
            },

            theme: { color: "#0d6efd" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // return (
    //     <>
    //         {load && (
    //             <div style={{
    //                 position: "fixed",
    //                 inset: 0,
    //                 backgroundColor: "rgba(255,255,255,0.6)",
    //                 display: "flex",
    //                 alignItems: "center",
    //                 justifyContent: "center",
    //                 zIndex: 9999
    //             }}>
    //                 <MoonLoader size={50} />
    //             </div>
    //         )}

    //         <div className="container">
    //             <div className="row justify-content-center align-items-center vh-100">
    //                 <div className="col-lg-5">
    //                     <div className="bg-primary p-5 rounded">
    //                         <h2 className="text-white mb-4">Booking</h2>

    //                         <form onSubmit={handleSubmit(handleForm)}>

    //                             {/* Season */}
    //                             <div className="mb-3">
    //                                 <label className="text-white">Season</label>
    //                                 <select className="form-control" {...register("seasonId")} disabled>
    //                                     {season.map(el => (
    //                                         <option key={el._id} value={el._id}>
    //                                             {el.seasonName}
    //                                         </option>
    //                                     ))}
    //                                 </select>
    //                             </div>

    //                             {/* Crop */}
    //                             <div className="mb-3">
    //                                 <label className="text-white">Crop</label>
    //                                 <select className="form-control" {...register("cropId")} disabled>
    //                                     {crop.map(el => (
    //                                         <option key={el._id} value={el._id}>
    //                                             {el.cropName}
    //                                         </option>
    //                                     ))}
    //                                 </select>
    //                             </div>

    //                             {/* Price */}
    //                             <div className="mb-3">
    //                                 <label className="text-white">Price</label>
    //                                 <input type="number" readOnly className="form-control" {...register("price")} />
    //                             </div>

    //                             {/* Start Date */}
    //                             <div className="mb-3">
    //                                 <label className="text-white">Start Date</label>
    //                                 <input type="date" readOnly className="form-control" {...register("leaseStartDate")} />
    //                             </div>

    //                             {/* End Date */}
    //                             <div className="mb-3">
    //                                 <label className="text-white">End Date</label>
    //                                 <input type="date" readOnly className="form-control" {...register("leaseEndDate")} />
    //                             </div>

    //                             {isLogin ? (
    //                                 <button className="btn btn-secondary w-100" type="submit">
    //                                     Pay & Confirm Booking
    //                                 </button>) :

    //                                 <Link to="/login" className="btn btn-secondary w-100" type="button">
    //                                     Please Login to Book
    //                                 </Link>

    //                             }
    //                             {/* <button className="btn btn-secondary w-100" type="submit">
    //                                 Pay & Confirm Booking
    //                             </button> */}

    //                         </form>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
            
    //     </>
    // );


return(



    <div className="container-fluid py-6 px-0">
  <div className="container-fluid">
     <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">Add Booking</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">User</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Add Booking</li>
                </ol>
            </nav>
        </div>
    </div>

    <div
      className="section-header text-center mx-auto mb-5 wow fadeInUp"
      data-wow-delay="0.1s"
      style={{ maxWidth: 500 }}
    >
      <h1 className="display-6 mb-3">Booking Details</h1>
    </div>

    <div className="row g-5 justify-content-center">
      <div className="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.5s">

        <form onSubmit={handleSubmit(handleForm)}>
          <div className="row g-3">

            <div className="col-md-12">
              <div className="form-floating">
                <select className="form-control" {...register("seasonId")} disabled>
                  {season.map(el => (
                    <option key={el._id} value={el._id}>
                      {el.seasonName}
                    </option>
                  ))}
                </select>
                <label>Season</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <select className="form-control" {...register("cropId")} disabled>
                  {crop.map(el => (
                    <option key={el._id} value={el._id}>
                      {el.cropName}
                    </option>
                  ))}
                </select>
                <label>Crop</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="number"
                  readOnly
                  className="form-control"
                  placeholder="Price"
                  {...register("price")}
                />
                <label>Price</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="date"
                  readOnly
                  className="form-control"
                  placeholder="Start Date"
                  {...register("leaseStartDate")}
                />
                <label>Start Date</label>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-floating">
                <input
                  type="date"
                  readOnly
                  className="form-control"
                  placeholder="End Date"
                  {...register("leaseEndDate")}
                />
                <label>End Date</label>
              </div>
            </div>

            <div className="col-12 text-center">
              {isLogin ? (
                <button
                  className="btn btn-primary rounded-pill py-3 px-5"
                  type="submit"
                >
                  Pay & Confirm Booking
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary rounded-pill py-3 px-5"
                >
                  Please Login to Book
                </Link>
              )}
            </div>

          </div>
        </form>

      </div>
    </div>

  </div>
</div>
);

    
}
