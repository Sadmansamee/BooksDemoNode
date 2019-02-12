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

router.post('/book-create',rejectInvalid,async (req,res,next)=>{

    let {title,author,subTitle,description,preview} = req.body;

    let [cretErr,created] = await _p(Books.create({
        title,author,subTitle,description,preview
    }));
    if(cretErr && !created){
        next(cretErr);
    }
    else{
        res.json({
            message:"Book created Successfully"
        })
    }
})

router.delete('/book-delete',rejectInvalid,async (req,res,next)=>{

    let {id} = req.body;

    let [cretErr,deleted] = await _p(Books.delete({
        where:{
            id:{
                [Op.eq]:id
            }
        }    }));
    if(cretErr && !deleted){
        next(cretErr);
    }
    else{
        res.json({
            message:"Book deleted Successfully"
        })
    }
})

module.exports = router;