const item = require('../../models/Item');

module.exports = async (req,res,next) => {
    try{
       const {name,category,location,date,contact,email,status} = req.body;
       const imageUrl = req.file ? req.file.path : "default.jpg";
       const finalStatus =
      status && ["Lost", "Found"].includes(status) ? status : "Lost";


       const i = await item.create({
        name,
        category,
        location,
        date,
        contact,
        email,
        image : imageUrl,
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