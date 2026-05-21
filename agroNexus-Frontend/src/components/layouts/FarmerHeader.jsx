import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function FarmerHeader() {

    let { pathname } = useLocation

    let isLogin = sessionStorage.getItem("isLogin")
    let name = sessionStorage.getItem("name")
    const nav = useNavigate()
    const loc=useLocation()

  const activeStyle = {
    color: "#198754",
    fontWeight: "600",
    borderBottom: "2px solid #198754",
    backgroundColor: "rgba(255, 255, 255, 0.08)"
  };


    const logout = () => {

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
              confirmButtonColor: "#34AD54",
            cancelButtonColor: "#ff9933",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.clear()
                nav("/login")
                Swal.fire({
                    title: "Logout!",
                    text: "Logout successfully.",
                      confirmButtonColor: "#34AD54",
   
                    icon: "success"
                });
            }
        });
    }





    // return (
    //     // <>

    //     //     {/* TOPBAR */}
    //     //     <div className="container-fluid px-5 d-none d-lg-block">
    //     //         <div className="row gx-5 py-3 align-items-center">
    //     //             <div className="col-lg-3">
    //     //                 <div className="d-flex align-items-center justify-content-start">
    //     //                     <i className="bi bi-phone-vibrate fs-1 text-primary me-2" />
    //     //                     <h2 className="mb-0">+91 9876543219</h2>
    //     //                 </div>
    //     //             </div>
    //     //             <div className="col-lg-6">
    //     //                 <div className="d-flex align-items-center justify-content-center">
    //     //                     <Link to="/farmer" className="navbar-brand ms-lg-5">
    //     //                         <h1 className="m-0 display-4 text-primary">
    //     //                             <span className="text-secondary">Seedly</span>
    //     //                         </h1>
    //     //                     </Link>
    //     //                 </div>
    //     //             </div>
    //     //             <div className="col-lg-3">
    //     //                 <div className="d-flex align-items-center justify-content-end">
    //     //                     <a
    //     //                         className="btn btn-primary btn-square rounded-circle me-2"
    //     //                         href="https://www.facebook.com"
    //     //                     >
    //     //                         <i className="fab fa-facebook-f" />
    //     //                     </a>
    //     //                     <a
    //     //                         className="btn btn-primary btn-square rounded-circle me-2"
    //     //                         href="https://www.linkedin.com"
    //     //                     >
    //     //                         <i className="fab fa-linkedin-in" />
    //     //                     </a>
    //     //                     <a className="btn btn-primary btn-square rounded-circle" href="https://www.instagram.com">
    //     //                         <i className="fab fa-instagram" />
    //     //                     </a>
    //     //                 </div>
    //     //             </div>
    //     //         </div>
    //     //     </div>


    //     //     {/* NavBar*/}
    //     //     <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow-sm py-3 py-lg-0 px-3 px-lg-5">
    //     //         <Link to="/farmer" className="navbar-brand d-flex d-lg-none">
    //     //             <h1 className="m-0 display-4 text-secondary">
    //     //                 <span className="text-white">Seedly</span>
    //     //             </h1>
    //     //         </Link>
    //     //         <button
    //     //             className="navbar-toggler"
    //     //             type="button"
    //     //             data-bs-toggle="collapse"
    //     //             data-bs-target="#navbarCollapse"
    //     //         >
    //     //             <span className="navbar-toggler-icon" />
    //     //         </button>
    //     //         <div className="collapse navbar-collapse" id="navbarCollapse">
    //     //             <div className="navbar-nav mx-auto py-0">
    //     //                 <Link to="/farmer"className={location.pathname === "/farmer" ? "nav-link active" : "nav-link"}>
    //     //                     HOME
    //     //                 </Link>
    //     //                 <li className="nav-item dropdown" >
    //     //                     <button className={location.pathname.startsWith("/farmer/land") ? "nav-link active nav-link dropdown-toggle btn btn-link " : "nav-link nav-link dropdown-toggle btn btn-link"} data-bs-toggle="dropdown">LAND</button>

    //     //                     <ul className="dropdown-menu">
    //     //                         <li><Link to="/farmer/land/add" className="dropdown-item">ADD LAND</Link></li>
                               
    //     //                         <li><Link to="/farmer/land/manage" className="dropdown-item">ALL LAND</Link></li>

                                
    //     //                     </ul>
    //     //                 </li>
                        
                        
    //     //                 <li className="nav-item dropdown">
    //     //                     <button className={location.pathname.startsWith("/farmer/crop") ? "nav-link active nav-link dropdown-toggle btn btn-link " : "nav-link nav-link dropdown-toggle btn btn-link"} data-bs-toggle="dropdown">CROP</button>

    //     //                     <ul className="dropdown-menu">
    //     //                         <li><Link to="/farmer/crop/add" className="dropdown-item">ADD CROPS</Link></li>
    //     //                         <li><Link to="/farmer/crop/all" className="dropdown-item">ALL CROPS</Link></li>

                                
    //     //                     </ul>
    //     //                 </li>
                        
    //     //                 <Link to="/farmer/booking/manage" className="nav-item nav-link ">
    //     //                    BOOKING
    //     //                 </Link>
    //     //                  <li className="nav-item dropdown">
    //     //                     <button className={location.pathname.startsWith("/farmer/progress") ? "nav-link active nav-link dropdown-toggle btn btn-link " : "nav-link nav-link dropdown-toggle btn btn-link"} data-bs-toggle="dropdown">progress</button>

    //     //                     <ul className="dropdown-menu">
    //     //                         <li><Link to="/farmer/progress/add" className="dropdown-item">ADD PROGRESS</Link></li>
    //     //                         <li><Link to="/farmer/progress/all" className="dropdown-item">ALL PROGRESS</Link></li>

                                
    //     //                     </ul>
    //     //                 </li>
                        
    //     //                 {/* <Link to="/product" className="nav-item nav-link">
    //     //                     Product
    //     //                 </Link> */}
    //     //                 <Link to="#" onClick={logout} className="nav-item nav-link">LOGOUT {name}</Link>
    //     //                 {/* <li className="nav-item dropdown">
    //     //                     <button
    //     //                         className="nav-link dropdown-toggle btn btn-link"
    //     //                         data-bs-toggle="dropdown"
    //     //                     >
    //     //                         Pages
    //     //                     </button>

    //     //                     <ul className="dropdown-menu">
    //     //                         <li><Link to="/product" className="dropdown-item">
    //     //                             Product
    //     //                         </Link></li>
    //     //                         <li><Link to="/blog" className="dropdown-item">Blog Grid</Link></li>
    //     //                         <li><Link to="/detail" className="dropdown-item">Blog Detail</Link></li>
    //     //                         <li><Link to="/feature" className="dropdown-item">Features</Link></li>
    //     //                         <li><Link to="/team" className="dropdown-item">The Team</Link></li>
    //     //                         <li><Link to="/testimonial" className="dropdown-item">Testimonial</Link></li>
    //     //                     </ul>
    //     //                 </li> */}


    //     //                 {/* <Link to="/contact" className="nav-item nav-link">
    //     //                     Contact
    //     //                 </Link> */}
    //     //             </div>
    //     //         </div>
    //     //     </nav>




    //     // </>

        return (
  <>
    
      {/* Topbar Start */}
      <div className="container-fluid bg-dark text-light px-0 py-2">
        <div className="row gx-0 d-none d-lg-flex">
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center me-4">
              <span className="fa fa-phone-alt me-2" />
              <span>+012 345 6789</span>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <span className="far fa-envelope me-2" />
              <span>farmer@seedly.com</span>
            </div>
          </div>

          <div className="col-lg-5 px-5 text-end">
            <small>Welcome, {name}</small>
          </div>
        </div>
      </div>

      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
        <a href="index.html" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
            <h1 class=" fa fa-seedling m-0">AgroNexus</h1>
        </a>
        <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        {/* <Link
          to="/farmer"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h1 className="fa fa-seedling text-primary m-0">AgriNova</h1>
        </Link> */}

        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">

          <div className="navbar-nav ms-auto p-4 p-lg-0">

            {/* HOME */}
            <Link
              to="/farmer"
              className="nav-item nav-link"
              style={loc.pathname === "/farmer" ? activeStyle : {}}
            >
              HOME
            </Link>

            {/* LAND */}
            <div className="nav-item dropdown">
              <button
                className={
                  loc.pathname.startsWith("/farmer/land")
                    ? "nav-link dropdown-toggle btn btn-link"
                    : "nav-link dropdown-toggle btn btn-link"
                }
                data-bs-toggle="dropdown"
              >
                LAND
              </button>

              <div className="dropdown-menu">
                <Link to="/farmer/land/add" className="dropdown-item">
                  ADD LAND
                </Link>
                <Link to="/farmer/land/manage" className="dropdown-item">
                  ALL LAND
                </Link>
              </div>
            </div>

            {/* CROP */}
            <div className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                data-bs-toggle="dropdown"
              >
                CROP
              </button>

              <div className="dropdown-menu">
                <Link to="/farmer/crop/add" className="dropdown-item">
                  ADD CROPS
                </Link>
                <Link to="/farmer/crop/all" className="dropdown-item">
                  ALL CROPS
                </Link>
              </div>
            </div>

            {/* BOOKING */}
            <Link
              to="/farmer/booking/manage"
              className="nav-item nav-link"
              style={loc.pathname === "/farmer/booking/manage" ? activeStyle : {}}
            >
              BOOKING
            </Link>

            {/* PROGRESS */}
            <div className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                data-bs-toggle="dropdown"
              >
                PROGRESS
              </button>

              <div className="dropdown-menu">
                <Link to="/farmer/progress/add" className="dropdown-item">
                  ADD PROGRESS
                </Link>
                <Link to="/farmer/progress/all" className="dropdown-item">
                  ALL PROGRESS
                </Link>
              </div>
            </div>

            {/* LOGOUT */}
            <button onClick={logout} className="nav-link btn btn-link">
              LOGOUT {name}
            </button>

          </div>
        </div>
      </nav>
      {/* Navbar End */}

  </>
);
   
}