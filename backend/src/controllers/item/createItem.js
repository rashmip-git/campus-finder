const item = require('../../models/Item');

module.exports = async (req,res,next) => {
    try{
       const {name,category,location,date,contact,email,image,status} = req.body;

       const finalStatus =
      status && ["Lost", "Found"].includes(status) ? status : "Lost";


       const i = await item.create({
        name,
        category,
        location,
        date,
        contact,
        email,
        image : image || "default.jpg",
        status : finalStatus,
        uploadedBy: req.user._id,
        createdAt:Date.now()
       });

    res.status(201).json({message:'item uploaded successfully!!',item:i});
    }
    catch(err){
        next(err);
    }
}