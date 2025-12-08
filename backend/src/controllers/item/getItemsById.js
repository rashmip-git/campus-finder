const item = require('../../models/Item');

module.exports = async (req,res,next)=> {
    try{
        const i = await item.findById(req.params.id).populate("uploadedBy","username email");
        if(!i) return res.status(404).json({message:'item not found!!'});

        res.status(200).json(i);

    }
    catch(err){
        next(err);
    }
}
