const router         = require('express').Router();
const {Books}    = require('../utils/db'); 
const {check}        = require('express-validator/check');
const rejectInvalid  = require('../middlewares/reject_invalid');
const _p             = require('../utils/promise_errors');
const entryValidator = [check('url').isURL()]
const {toPlain} = require('../utils/array_helper')

router.get('/books',rejectInvalid,async (req,res,next)=>{

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

router.post('/books-create',rejectInvalid,async (req,res,next)=>{

    let {title,sub_title,description,preview} = req.body;

    let [cretErr,created] = await _p(Books.create({
        title,sub_title,description,preview
    }));
    if(cretErr && !created){
        next(createerr);
    }
    else{
        res.json({
            message:"Book created Successfully",
            hash
        })
    }
})

module.exports = router;