const express = require("express")
const router = express.Router()

const UserController = require("../apis/User/UserController")
const SeasonController = require("../apis/Season/SeasonController")
const LandController = require("../apis/Land/LandController")
const CropController = require("../apis/Crop/CropController")
const ProgressController = require("../apis/Progress/ProgressController")
const BookingController = require("../apis/Booking/BookingController")
// const mailController = require("../apis/mail/mailController")


// LOGIN
router.post("/login", UserController.login)


// TOKEN CHECKER
router.use(require("../middleware/UserTokenChecker"))


// BOOKING ROUTES
router.post("/booking/add", BookingController.add)

router.post("/booking/update", BookingController.update)

router.post("/booking/delete", BookingController.Delete)


// router.post("/sendMail", mailController.mail)

module.exports = router




















// const express = require("express")
// const router = express.Router()

// const UserController = require("../apis/User/UserController")
// const SeasonController = require("../apis/Season/SeasonController")
// const LandController = require("../apis/Land/LandController")
// const CropController = require("../apis/Crop/CropController")
// const ProgressController = require("../apis/Progress/ProgressController")
// const BookingController = require("../apis/Booking/BookingController")
// // const mailController = require("../apis/mail/mailController")


// // LOGIN
// router.post("/user/login", UserController.login)


// // TOKEN CHECKER
// router.use(require("../middleware/UserTokenChecker"))


// // BOOKING ROUTES
// router.post("/user/booking/add", BookingController.add)

// router.post("/user/booking/update", BookingController.update)

// router.post("/user/booking/delete", BookingController.Delete)


// // router.post("/sendMail", mailController.mail)

// module.exports = router



















// const express=require("express")
// const router=express.Router()
// const UserController=require("../apis/User/UserController")
// const SeasonController=require("../apis/Season/SeasonController")
// const LandController=require("../apis/Land/LandController")
// const CropController=require("../apis/Crop/CropController")
// const ProgressController=require("../apis/Progress/ProgressController")
// const BookingController=require("../apis/Booking/BookingController")
// // const mailController= require("../apis/mail/mailController")


// router.post("/user/login",UserController.login)


// router.use(require("../middleware/UserTokenChecker"))


// router.post("/user/booking/add",BookingController.add)
// router.post("/user/booking/update",BookingController.update)
// // router.post("/sendMail", mailController.mail)



// module.exports=router

