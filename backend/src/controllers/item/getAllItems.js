const item = require('../../models/Item');

module.exports = async (req,res,next)=>{
    try{
        const items = await item.find().populate("uploadedBy","username email").sort({createdAt:-1});
        res.status(200).json(items);
    }
    catch(err){
        next(err);
    }
}