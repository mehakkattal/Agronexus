import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAsyncError, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../../services/ApiService";
import { ClipLoader } from "react-spinners";
import axios from "axios";

export default function AddProgress() {
  let nav = useNavigate();
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm();
  const [load, setload] = useState(false);
  const [booking, setBooking] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [listening, setListening] = useState(false);

  const [harvestDate, setHarvestDate] = useState("");
 const [harvestYield, setHarvestYield] = useState("");

  const [stage, setStage] = useState("");
  const [recognition, setRecognition] = useState(null); // Save instance to stop later
  const id = sessionStorage.getItem("userId");

  // Watch description field
  const description = watch("description", "");


  const stages = [
  "Land Preparation",
  "Sowing",
  "Germination & Growth",
  "Flowering & Fruit Formation",
  "Maturity & Harvesting"
];

  const HARVEST_STAGE = "Maturity & Harvesting";

   useEffect(() => {
    if (stage !== HARVEST_STAGE) {
      setHarvestDate("");
      setHarvestYield("");
    }
  }, [stage]);


  // Fetch Bookings
  const fetchData = () => {
    const data = { status: true };
    ApiService.allBooking(data)
      .then(res => {
        if (res.data.success) {
          const farmerBookings = res.data.data.filter(
            b => b.landId?.farmerId?._id?.toString() === id
          );
          setBooking(farmerBookings);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(err => toast.error(err.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Form Submission
  const handleForm = (data) => {
    setload(true);
    data.bookingId = bookingId;
data.progressStage = stage;

if (stage === HARVEST_STAGE) {
  if (!harvestDate || !harvestYield) {
    toast.error("Please enter harvest date and yield");
    setload(false);
    return;
  }
data.harvestDate = harvestDate || null;
data.harvestYield = harvestYield || "";
}

    ApiService.addProgress(data)
      .then(res => {
        setload(false);
        if (res.data.success) {
          toast.success(res.data.message);
          nav("/farmer/progress/all");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        setload(false);
        toast.error(err.message);
      });
  };

  const handleError = (error) => {
    setload(false);
    console.log("err", error);
  };

  // Start Listening
  const startListening = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      toast.error("Browser does not support Speech Recognition");
      return;
    }

    const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.lang = "hi-IN";
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => setListening(true);

    rec.onresult = async (event) => {
      const spokenText = event.results[0][0].transcript;

      try {
        const res = await axios.post("https://agronexus-bi3q.onrender.com/gemini/voice-progress", { message: spokenText });
        if (res.data.success) {
          setValue("description", res.data.data, { shouldValidate: true });
          toast.success("Voice recorded successfully");
        } else {
          toast.error("AI translation failed");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setListening(false);
      }
    };

    rec.onerror = (event) => {
      console.log(event.error);
      toast.error("Voice recognition failed");
      setListening(false);
    };

    rec.onend = () => setListening(false);

    rec.start();
    setRecognition(rec);
  };

  // Stop Listening
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  return (
    <>
      {load && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(255,255,255,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <ClipLoader size={50} />
        </div>
      )}
  <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container text-center py-5">
            <h1 class="display-3 text-white mb-4 animated slideInDown">Add Progress</h1>
            <nav aria-label="breadcrumb animated slideInDown">
                <ol class="breadcrumb justify-content-center mb-0">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Farmer</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Progress</li>
                </ol>
            </nav>
        </div>
    </div>
      {/* <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-lg-5">
            <div className="bg-primary radius p-5">
              <h2 className="text-white mb-4">Progress</h2>
              <form onSubmit={handleSubmit(handleForm, handleError)}>
                <div className="row g-3">
                  <div className="row mb-3">
                    <div className="col-12">
                      <select
                        className="form-control bg-white border-0"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                      >
                        <option value="" disabled>Land</option>
                        {booking.map((el, i) => (
                          <option key={i} value={el?._id}>
                            {el?.landId?.ULPIN}-{el?.userId?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control bg-white border-0"
                        placeholder="Progress Stage"
                        style={{ height: 55 }}
                        {...register("progressStage", { required: "Progress Stage is required" })}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-12 d-flex">
                      <input
                        type="text"
                        className="form-control bg-white border-0"
                        placeholder="Description"
                        style={{ height: 55 }}
                        {...register("description", { required: "Description is required" })}
                        value={description} // ✅ Ensure input shows updated value
                        onChange={e => setValue("description", e.target.value)}
                      />
                      <button
                        type="button"
                        className={`btn ms-2 ${listening ? "btn-danger" : "btn-light"}`}
                        onClick={startListening}
                        disabled={listening}
                      >
                        {listening ? "🔴 Listening..." : "🎤 Speak"}
                      </button>
                      {listening && (
                        <button
                          type="button"
                          className="btn btn-secondary ms-2"
                          onClick={stopListening}
                        >
                          ⏹ Stop
                        </button>
                      )}
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
      <div className="container-xxl py-6">
  <div className="container">
    <div
      className="section-header text-center mx-auto mb-5 wow fadeInUp"
      data-wow-delay="0.1s"
      style={{ maxWidth: 500 }}
    >
      <h1 className="display-6 mb-3">Add Progress</h1>
    </div>

    <div className="row g-5 justify-content-center">
      <div className="col-lg-7 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
        <form onSubmit={handleSubmit(handleForm, handleError)}>
          <div className="row g-3">

            {/* LAND SELECT */}
            <div className="col-12">
              <div className="form-floating">
                <select
                  className="form-select"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                >
                  <option value="">Select Land</option>
                  {booking.map((el, i) => (
                    <option key={i} value={el?._id}>
                      {el?.landId?.ULPIN} - {el?.userId?.name}
                    </option>
                  ))}
                </select>
                <label>Select Land</label>
              </div>
            </div>

            {/* PROGRESS STAGE */}

<div className="col-12">
  <div className="form-floating">
    <select
      className="form-select"
      value={stage}
      onChange={(e) => setStage(e.target.value)}
    >
      <option value="">Select Stage</option>
      {stages.map((s, i) => (
        <option key={i} value={s}>
          {s}
        </option>
      ))}
    </select>
    <label>Crop Stage</label>
  </div>
</div>

           {/* {stage === "Maturity & Harvesting" && ( */}
           {stage === HARVEST_STAGE && (
  <>
    {/* HARVEST DATE */}
    <div className="col-12">
      <div className="form-floating">
        <input
          type="date"
          className="form-control"
          // onChange={(e) => setdate(e.target.value)}
          onChange={(e) => setHarvestDate(e.target.value)}
        />
        <label>Harvest Date</label>
      </div>
    </div>

    {/* HARVEST YIELD */}
    <div className="col-12">
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          placeholder="Harvest Yield"
          onChange={(e) => setHarvestYield(e.target.value)}
        />
        <label>Harvest Yield</label>
      </div>
    </div>
  </>
)}

            {/* DESCRIPTION + VOICE */}
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  {...register("description", {
                    required: "Description is required"
                  })}
                  value={description}
                  onChange={(e) =>
                    setValue("description", e.target.value)
                  }
                />
                <label>Description</label>
              </div>

        

              {/* Voice Buttons */}
              <div className="mt-3 d-flex gap-2">
                <button
                  type="button"
                  className={`btn ${
                    listening ? "btn-danger" : "btn-outline-primary"
                  }`}
                  onClick={startListening}
                  disabled={listening}
                >
                  {listening ? "🔴 Listening..." : "🎤 Speak"}
                </button>

                {listening && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={stopListening}
                  >
                    ⏹ Stop
                  </button>
                )}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="col-12 text-center mt-4">
              <button
                className="btn btn-primary rounded-pill py-3 px-5"
                type="submit"
              >
                ADD PROGRESS
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    </>
  );
}