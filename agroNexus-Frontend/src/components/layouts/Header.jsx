
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


  function Header() {

  const isLogin = sessionStorage.getItem("isLogin");
  const name = sessionStorage.getItem("name");

  const nav = useNavigate();
  const loc = useLocation();

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0e5735ff",
      cancelButtonColor: "rgba(163, 24, 24, 1)",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        nav("/login");
        Swal.fire({
          title: "Logout!",
          text: "Logout successfully.",
          icon: "success",
          confirmButtonColor: "#084428ff"
        });
      }
    });
  };

  


    return(
    <>

  
    <div class="container-fluid bg-dark text-light px-0 py-2">
        <div class="row gx-0 d-none d-lg-flex">
            <div class="col-lg-7 px-5 text-start">
                <div class="h-100 d-inline-flex align-items-center me-4">
                    <span class="fa fa-phone-alt me-2"></span>
                    <span>+012 653 7632</span>
                </div>
                <div class="h-100 d-inline-flex align-items-center">
                    <span class="far fa-envelope me-2"></span>
                    <span>info@agroNexus.com</span>
                </div>
            </div>
            <div class="col-lg-5 px-5 text-end">
                <div class="h-100 d-inline-flex align-items-center mx-n2">
                    <span>Follow Us:</span>
                    <a class="btn btn-link text-light" href=""><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-link text-light" href=""><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-link text-light" href=""><i class="fab fa-linkedin-in"></i></a>
                    <a class="btn btn-link text-light" href=""><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </div>
   

   
    <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
        <a href="index.html" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
            <h1 class=" fa fa-seedling m-0">AgroNexus</h1>
        </a>
        <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">

           <div className="navbar-nav ms-auto p-2 p-lg-0">

           <Link
                to="/"
                className="nav-item nav-link   rounded"
                // style={loc.pathname === "/"}
              >
                HOME
              </Link>

              <Link
                to="/about"
                className="nav-item nav-link rounded"
                // style={loc.pathname === "/about" }
              >
                ABOUT
              </Link>

              <Link
                to="/user/season"
                className="nav-item nav-link  rounded"
                // style={loc.pathname === "/user/season"}
              >
                SEASON
              </Link>

              <Link
                to="/user/land"
                className="nav-item nav-link  rounded"
                // style={loc.pathname === "/user/land"}
              >
                LAND
              </Link>

              {isLogin && (
                <Link
                  to="/booking/manage"
                  className="nav-item nav-link  rounded"
                  // style={loc.pathname === "/booking/manage"}
                >
                  ALL BOOKING
                </Link>
              )}

              <Link
                to="/contact"
                className="nav-item nav-link  rounded"
                // style={loc.pathname === "/contact" }
              >
                CONTACT
              </Link>

              {isLogin ? (
                <Link
                  to="#"
                  onClick={logout}
                  className="nav-item nav-link"
                >
                  Logout {name}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="nav-item nav-link  rounded"
                  // style={loc.pathname === "/login" }
                >
                  LOGIN
                </Link>
              )}

           
        </div>
        </div>
    </nav>
   
 
  </>)}
  export default Header















// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// function Header() {
//   const isLogin = sessionStorage.getItem("isLogin");
//   const name = sessionStorage.getItem("name");

//   const nav = useNavigate();
//   const loc = useLocation();

//   const logout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#0e5735ff",
//       cancelButtonColor: "rgba(163, 24, 24, 1)",
//       confirmButtonText: "Yes, Logout!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         sessionStorage.clear();
//         nav("/login");
//         Swal.fire({
//           title: "Logout!",
//           text: "Logout successfully.",
//           icon: "success",
//           confirmButtonColor: "#084428ff"
//         });
//       }
//     });
//   };

//   // const activeStyle = {
//   //   color: "#198754",
//   //   // fontWeight: "600",
//   //   borderBottom: "2px solid #01120aff",
//   //   backgroundColor: "rgba(25, 135, 84, 0.08)"
//   // };

//   return (
//     <>

//       {/* Topbar Start */}
//       <div className="container-fluid bg-dark text-light px-0 py-2">
//         <div className="row gx-0 d-none d-lg-flex">
//           <div className="col-lg-7 px-5 text-start">
//             <div className="h-100 d-inline-flex align-items-center me-4">
//               <span className="fa fa-phone-alt me-2" />
//               <span>+012 345 6789</span>
//             </div>
//             <div className="h-100 d-inline-flex align-items-center">
//               <span className="far fa-envelope me-2" />
//               <span>info@example.com</span>
//             </div>
//           </div>

//           <div className="col-lg-5 px-5 text-end">
//             <div className="h-100 d-inline-flex align-items-center mx-n2">
//               <span>Follow Us:</span>
//               <a className="btn btn-link text-light" href="">
//                 <i className="fab fa-facebook-f" />
//               </a>
//               <a className="btn btn-link text-light" href="">
//                 <i className="fab fa-twitter" />
//               </a>
//               <a className="btn btn-link text-light" href="">
//                 <i className="fab fa-linkedin-in" />
//               </a>
//               <a className="btn btn-link text-light" href="">
//                 <i className="fab fa-instagram" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navbar Start */}
//       <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">

//         <a
//           href="index.html"
//           className="navbar-brand d-flex align-items-center px-2 px-lg-5"
//         >
//           <h1 className="fa fa-seedling text-primary m-0">AgriNova</h1>
//         </a>

//         <button
//           type="button"
//           className="navbar-toggler me-4"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarCollapse"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>

//         <div className="collapse navbar-collapse" id="navbarCollapse">

//           {/* ✅ ALL YOUR ORIGINAL LINKS RESTORED */}
//           <div className="navbar-nav ms-auto p-2 p-lg-0">

//            <Link
//                 to="/"
//                 className="nav-item nav-link   rounded"
//                 style={loc.pathname === "/"}
//               >
//                 HOME
//               </Link>

//               <Link
//                 to="/about"
//                 className="nav-item nav-link rounded"
//                 style={loc.pathname === "/about" }
//               >
//                 ABOUT
//               </Link>

//               <Link
//                 to="/user/season"
//                 className="nav-item nav-link  rounded"
//                 style={loc.pathname === "/user/season"}
//               >
//                 SEASON
//               </Link>

//               <Link
//                 to="/user/land"
//                 className="nav-item nav-link  rounded"
//                 style={loc.pathname === "/user/land"}
//               >
//                 LAND
//               </Link>

//               {isLogin && (
//                 <Link
//                   to="/booking/manage"
//                   className="nav-item nav-link  rounded"
//                   style={loc.pathname === "/booking/manage"}
//                 >
//                   ALL BOOKING
//                 </Link>
//               )}

//               <Link
//                 to="/contact"
//                 className="nav-item nav-link  rounded"
//                 style={loc.pathname === "/contact" }
//               >
//                 CONTACT
//               </Link>

//               {isLogin ? (
//                 <Link
//                   to="#"
//                   onClick={logout}
//                   className="nav-item nav-link"
//                 >
//                   Logout {name}
//                 </Link>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="nav-item nav-link  rounded"
//                   style={loc.pathname === "/login" }
//                 >
//                   LOGIN
//                 </Link>
//               )}


//           </div>

//           <a
//             href="#"
//             className="btn btn-primary py-4 px-lg-4 rounded-0 d-none d-lg-block"
//           >
//             Get A Quote
//             <i className="fa fa-arrow-right ms-3" />
//           </a>

//         </div>
//       </nav>
//       {/* Navbar End */}

//     </>
//   );
// }

// export default Header;





