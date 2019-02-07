const router         = require('express').Router();
const {Books}    = require('../utils/db'); 
const {check}        = require('express-validator/check');
const rejectInvalid  = require('../middlewares/reject_invalid');
const _p             = require('../utils/promise_errors');
const entryValidator = [check('url').isURL()]
const {toPlain} = require('../utils/array_helper')

router.get('/books',entryValidator,rejectInvalid,async (req,res,next)=>{
         res.json({"data"
         })
    let [error,books] = await _p(Books.findAll({
        where:{
            // email:{
            //     [Op.eq]:email
            // }
        }
    }));
    if(error && !books){
        return next(error);
    }
    else{
        res.json({
            error:false,
                data: toPlain(books)
            });
    }
})

module.exports = router;