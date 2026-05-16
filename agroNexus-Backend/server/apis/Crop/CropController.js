const { uploadImg } = require("../../utilities/helper")
const { getCropSummary } = require("../../services/geminiService");
const SeasonModel = require("../Season/SeasonModel"); // adjust path if needed
const CropModel=require("./CropModel")
// add=(req,res)=>{
//     let formData=req.body
//     let validation=""
//     if(!formData.cropName){
//         validation+="Crop name is required"
//     }
//      if(!formData.duration){
//         validation+=" Duration is required"
//     }
    
//      if(!formData.description){
//         validation+=" Description is required"
//     }
//     if(!formData.seasonId){
//         validation+="SeasonId is required"
//     }
//     if(!formData.farmerId){
//         validation+="FarmerId is required"
//     }
//     if(!formData.landId){
//         validation+="LandId is required"
//     }
//     // if(!req.file){
//     //     validation+="profile is required"
//     // }
//     if(!!validation){
//         res.json({
//             status:422,
//             success:false,
//             message:validation
//         })
//     }
//    else{
//         //duplicacy     
//         CropModel.findOne({cropName:formData.cropName,landId: formData.landId})
//         // .then(async (cropData)=>{
//         //     if(!cropData){
//         //         let cropObj= new CropModel()
//         //         cropObj.seasonId=formData.seasonId
//         //         cropObj.farmerId=formData.farmerId
//         //         cropObj.landId=formData.landId

//         //         cropObj.cropName=formData.cropName
//         //         cropObj.duration=formData.duration
//         //         cropObj.description=formData.description
//         //         let url=await uploadImg(req.file.buffer)
//         //         cropObj.image=url


               
               
//         //         cropObj.save()
//         //         .then(async (cropData)=>{
//         //             try {
//         //         const aiSummary = await getCropSummary({
//         //           cropName: cropData.cropName,
//         //           season: formData.seasonId, // or season name if you populate later
//         //           duration: cropData.duration
//         //         })

//         //         cropData.ai_summary = aiSummary
//         //         await cropData.save()

//         //       } catch (aiErr) {
//         //         console.log("AI summary failed:", aiErr.message)
//         //         // ❌ do NOT fail crop creation
//         //       }
//         //             res.json({
//         //                 status:200,
//         //                 success:true,
//         //                 message:"Crop Added!!",
//         //                 data:cropData
//         //             })
//         //         })
//         //         .catch((err)=>{
//         //             console.log(err)
//         //             res.json({
//         //                 status:500,
//         //                 success:false,
//         //                 message:"Internal server error"
                        
//         //             })
//         //         })
//         //     }
//         //     else{
//         //         res.json({
//         //             status:200,
//         //             success:false,
//         //             message:"This crop already exists on this land"
//         //         })
//         //     }
//         // })
//         .then(async (cropData) => {
//     try {
//         const seasonData = await SeasonModel.findById(formData.seasonId);

//         const aiSummary = await getCropSummary({
//             cropName: cropData.cropName,
//             season: seasonData?.seasonName,
//             duration: cropData.duration
//         });

//         console.log("AI Summary Generated:", aiSummary);

//         if (aiSummary) {
//             cropData.ai_summary = aiSummary;
//             await cropData.save();
//         }

//         // 🔥 IMPORTANT: re-fetch updated data
//         const updatedCrop = await CropModel.findById(cropData._id)
//             .populate("seasonId");

//         return res.json({
//             status: 200,
//             success: true,
//             message: "Crop Added!!",
//             data: updatedCrop
//         });

//     } catch (aiErr) {
//         console.log("AI summary failed:", aiErr.message);

//         const fallbackCrop = await CropModel.findById(cropData._id);

//         return res.json({
//             status: 200,
//             success: true,
//             message: "Crop Added but AI failed",
//             data: fallbackCrop
//         });
//     }
// })
//         .catch((err)=>{
//             console.log(err)
//             res.json({
//                 status:500,
//                 success:false,
//                 message:"Internal server error!!"
//             })
//         })
       
//     }
// }

const add = async (req, res) => {
    
  try {
    const formData = req.body;

    let validation = "";
    if (!formData.cropName) validation += "Crop name is required ";
    if (!formData.duration) validation += "Duration is required ";
    if (!formData.description) validation += "Description is required ";
    if (!formData.seasonId) validation += "SeasonId is required ";
    if (!formData.farmerId) validation += "FarmerId is required ";
    if (!formData.landId) validation += "LandId is required ";

    if (validation) {
      return res.json({
        status: 422,
        success: false,
        message: validation
      });
    }

    // duplicate check
    const existing = await CropModel.findOne({
      cropName: formData.cropName,
      landId: formData.landId
    });

    if (existing) {
      return res.json({
        status: 200,
        success: false,
        message: "This crop already exists on this land"
      });
    }

    // create crop FIRST
    let cropObj = new CropModel({
      cropName: formData.cropName,
      duration: formData.duration,
      description: formData.description,
      seasonId: formData.seasonId,
      farmerId: formData.farmerId,
      landId: formData.landId,
      image: req.file ? await uploadImg(req.file.buffer) : ""
    });

    let savedCrop = await cropObj.save();

    // populate season
    const seasonData = await SeasonModel.findById(formData.seasonId);

    // call AI safely
    let aiSummary = null;
    try {
      aiSummary = await getCropSummary({
        cropName: savedCrop.cropName,
        season: seasonData?.seasonName || "Unknown",
        duration: savedCrop.duration
      });
    } catch (err) {
      console.log("AI error:", err.message);
    }

    // save AI if exists
    // if (aiSummary) {
    //   savedCrop.ai_summary = aiSummary;
    //   await savedCrop.save();
    // }

// savedCrop.ai_summary = aiSummary || {
//   expected_yield: "N/A",
//   weather_suitability: "N/A",
//   risk_level: "Unknown",
//   ai_insight: "AI not available"
// };
if (aiSummary) {
  // only update if AI successfully returns data
  savedCrop.ai_summary = aiSummary;
  await savedCrop.save();
}
// ❌ DO NOT overwrite if AI fails




    // return updated data (IMPORTANT)
    // const finalCrop = await CropModel.findById(savedCrop._id).populate("seasonId");

    // return res.json({
    //   status: 200,
    //   success: true,
    //   message: "Crop Added Successfully",
    //   data: finalCrop
    // });

    const finalCrop = await CropModel.findById(savedCrop._id)
  .populate("seasonId");
return res.json({
  status: 200,
  success: true,
  message: "Crop Added Successfully",
  data: finalCrop
});

  } catch (err) {
    console.log(err);
    return res.json({
      status: 500,
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = { add };


all=(req,res)=>{
    let formData=req.body
    CropModel.find(req.body)
    .populate({
        path:"seasonId",
        select:"seasonName keyword"
    })
    .populate({
        path:"farmerId",
        select:"name keyword"
    })
    .populate({
        path:"landId",
        select:"ULPIN keyword"
    })
    .then((cropData)=>{
        if(cropData.length>0){
           res.json({
                status:200,
                success:true,
                message:"Crops Data is as:",
                data:cropData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"There are no crops"
            })
            
        }
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            error:err.message
        })
    })
}


single=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        CropModel.findOne({_id:req.body._id})
        .populate({
            path:"seasonId",
            select:"seasonName keyword"
        })
        .then((cropData)=>{
            if(!cropData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no crop "
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Crop Data is as",
                    data:cropData
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error"
            })
        })
    }
}
update=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        CropModel.findOne({_id:req.body._id})
        .then(async(cropData)=>{
            if(!cropData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no data"
                })
            }
            else{
                
                if(!!formData.cropName){
                   cropData.cropName=formData.cropName 
                }
                if(!!formData.description){
                    cropData.description=formData.description
                }
                if (req.file) {
                    const imageUrl = await uploadImg(req.file.buffer);
                    cropData.image = imageUrl;
                }
                cropData.save()
                .then((cropData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Crop Updated",
                        data: cropData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error"
                       
                    })
                })
            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error"
                
            })
        })

    }
}

softDelete=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            sucess:false,
            message:validation
        })
    }
    else{
        CropModel.findOne({_id:req.body._id})
        .then((cropData)=>{
           if(!cropData){
            res.json({
                status:404,
                success:false,
                message:"There is no Crop found on this id"
            })
           }
           else{
            cropData.status=!cropData.status
            cropData.save()
            .then((cropData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Status updated",
                    data:cropData
                })
            })
            .catch((err)=>{
                console.log(1);
                
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server error"
                })
            })
           }

        })
        .catch((err)=>{
            console.log(err);
            
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
    }

}
Delete=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        CropModel.findOne({_id:req.body._id})
        .then((cropData)=>{
            if(!cropData){
                res.json({
                    status:404,
                    success:false,
                    message:"There is no data"
                })
            }
            else{
                CropModel.deleteOne({_id:req.body._id})
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            message: "Crop deleted!!"
                        })
                    })
                    .catch((err) => {
                        res.json({
                            status: 500,
                            success: false,
                            message: "Internal server error"
                        })
                    })
            }

        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error"
            })
        })    

    }


}







module.exports={add,all,single,update,softDelete,Delete}