function About(){
    return(
        <>
         {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-end">
            <div className="col-lg-3 col-md-5 wow fadeInUp" data-wow-delay="0.1s">
              <img className="img-fluid rounded" src="./assets/img/about.jpg" alt="Agriculture" />
            </div>
            <div className="col-lg-6 col-md-7 wow fadeInUp" data-wow-delay="0.3s">
              <h1 className="display-1 text-primary mb-0">AGRI</h1>
              <p className="text-primary mb-4">Smart Lease Platform</p>
              <h1 className="display-5 mb-4">Bridging the Gap Between Users and Farmers</h1>
              <p className="mb-4">
                Our platform allows farmers to add their land for lease. Once approved by our admin, 
                farmers can manage crops while users browse, book, and monitor progress 
                of their investments in real-time.
              </p>
              <a className="btn btn-primary py-3 px-4" href="">
                Learn How It Works
              </a>
            </div>
            <div className="col-lg-3 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
              <div className="row g-5">
                <div className="col-12 col-sm-6 col-lg-12">
                  <div className="border-start ps-4">
                    <i className="fa fa-leaf fa-3x text-primary mb-3" />
                    <h4 className="mb-3">Crop Management</h4>
                    <span>Farmers update growth progress from sowing to harvest.</span>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-12">
                  <div className="border-start ps-4">
                    <i className="fa fa-shield-alt fa-3x text-primary mb-3" />
                    <h4 className="mb-3">Admin Approval</h4>
                    <span>Every land listing is strictly verified for your safety.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Features Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <p className="fs-5 fw-bold text-primary">Why Use Our Platform?</p>
              <h1 className="display-5 mb-4">Smart Agriculture at Your Fingertips</h1>
              <p className="mb-4">
                We use cutting-edge technology to ensure that land leasing is transparent and 
                farming is data-driven. From AI analysis for farmers to real-time socket 
                chats for users, we've got it all covered.
              </p>
              <a className="btn btn-primary py-3 px-4" href="">
                View Dashboard
              </a>
            </div>
            <div className="col-lg-6">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="row g-4">
                    <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                      <div className="text-center rounded py-5 px-4" style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}>
                        <div className="btn-square bg-light rounded-circle mx-auto mb-4" style={{ width: 90, height: 90 }}>
                          <i className="fa fa-chart-line fa-3x text-primary" />
                        </div>
                        <h4 className="mb-0">Progress Tracking</h4>
                      </div>
                    </div>
                    <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                      <div className="text-center rounded py-5 px-4" style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}>
                        <div className="btn-square bg-light rounded-circle mx-auto mb-4" style={{ width: 90, height: 90 }}>
                          <i className="fa fa-brain fa-3x text-primary" />
                        </div>
                        <h4 className="mb-0">AI Insights</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 wow fadeIn" data-wow-delay="0.7s">
                  <div className="text-center rounded py-5 px-4" style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}>
                    <div className="btn-square bg-light rounded-circle mx-auto mb-4" style={{ width: 90, height: 90 }}>
                      <i className="fa fa-handshake fa-3x text-primary" />
                    </div>
                    <h4 className="mb-0">Secure Leasing</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features End */}
        
        </>
    )
}export default About