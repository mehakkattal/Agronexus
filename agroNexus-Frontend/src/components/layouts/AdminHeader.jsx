
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminHeader() {
  const location = useLocation();
  const nav = useNavigate();

  const isLogin = sessionStorage.getItem("isLogin");
  const name = sessionStorage.getItem("name");

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e7535ff",
      cancelButtonColor: "#b33d26ff",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        nav("/login");
        Swal.fire({
          title: "Logout!",
          text: "Logout successfully.",
          confirmButtonColor: "#34AD54",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      {/* Top Bar Start */}
     <div className="container-fluid bg-dark text-light px-0 py-2">
    <div className="row gx-0 d-none d-lg-flex">
      <div className="col-lg-7 px-5 text-start">
        <div className="h-100 d-inline-flex align-items-center me-4">
          <span className="fa fa-phone-alt me-2" />
          <span>+012 345 6789</span>
        </div>
        <div className="h-100 d-inline-flex align-items-center">
          <span className="far fa-envelope me-2" />
          <span>info@example.com</span>
        </div>
      </div>
      <div className="col-lg-5 px-5 text-end">
        <div className="h-100 d-inline-flex align-items-center mx-n2">
          <span>Follow Us:</span>
          <a className="btn btn-link text-light" href="">
            <i className="fab fa-facebook-f" />
          </a>
          <a className="btn btn-link text-light" href="">
            <i className="fab fa-twitter" />
          </a>
          <a className="btn btn-link text-light" href="">
            <i className="fab fa-linkedin-in" />
          </a>
          <a className="btn btn-link text-light" href="">
            <i className="fab fa-instagram" />
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* Topbar End */}
  {/* Navbar Start */}
  <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
   <Link
  to="/"
  className="navbar-brand d-flex align-items-center px-4 px-lg-5"
>
  <h1 className="fa fa-seedling text-primary m-0">AgriNova</h1>
</Link>
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
        <Link
                to="/admin"
                className={
                  location.pathname === "/admin"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                HOME
              </Link>

              
              {/* SEASON DROPDOWN */}
              <li className="nav-item dropdown">
                <button
                  className={
                    location.pathname.startsWith("/admin/season")
                      ? "nav-link active dropdown-toggle btn btn-link"
                      : "nav-link dropdown-toggle btn btn-link"
                  }
                  data-bs-toggle="dropdown"
                >
                  SEASON
                </button>

                <ul className="dropdown-menu">
                  <li>
                    <Link to="/admin/season/add" className="dropdown-item">
                      ADD SEASON
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/season/all" className="dropdown-item">
                      ALL SEASON
                    </Link>
                  </li>
                </ul>
              </li>

              <Link
                to="/admin/land/all"
                className={
                  location.pathname === "/admin/land/all"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                LAND
              </Link>

              <Link
                to="/admin/booking/all"
                className={
                  location.pathname === "/admin/booking/all"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                BOOKING
              </Link>

              <Link
                to="/admin/user/all"
                className={
                  location.pathname === "/admin/user/all"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                USER
              </Link>

              <Link
                to="/admin/farmer/all"
                className={
                  location.pathname === "/admin/farmer/all"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                FARMER
              </Link>

              <Link
                to="/admin/contact/all"
                className={
                  location.pathname === "/admin/contact/all"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                QUERIES
              </Link>

              {/* LOGOUT */}
              <button onClick={logout} className="nav-link btn btn-link">
                LOGOUT {name}
              </button>
        {/* <a href="about.html" className="nav-item nav-link">
          About
        </a>
        <a href="service.html" className="nav-item nav-link">
          Services
        </a>
        <a href="project.html" className="nav-item nav-link">
          Projects
        </a>
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Pages */}
          {/* </a> */}
          {/* <div className="dropdown-menu bg-light m-0">
            <a href="feature.html" className="dropdown-item">
              Features
            </a>
            <a href="quote.html" className="dropdown-item">
              Free Quote
            </a>
            <a href="team.html" className="dropdown-item">
              Our Team
            </a>
            <a href="testimonial.html" className="dropdown-item">
              Testimonial
            </a>
            <a href="404.html" className="dropdown-item">
              404 Page
            </a>
          </div> */}
        {/* </div>
        <a href="contact.html" className="nav-item nav-link">
          Contact
        </a> */}
      </div>
      {/* <a
        href=""
        className="btn btn-primary py-4 px-lg-4 rounded-0 d-none d-lg-block"
      >
        Get A Quote
        <i className="fa fa-arrow-right ms-3" />
      </a> */}
    </div>
  </nav>
  {/* Navbar End */}
    </>
  );
}

export default AdminHeader;