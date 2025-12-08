const item = require('../../models/Item');

module.exports = async(req,res,next)=>{
    try{

        const {category} = req.params;

        const i = await item.find({category}).populate("uploadedBy","username email").sort({createdAt:-1});
        res.status(200).json(i);
    }
    catch(err){
        next(err);

    }
}