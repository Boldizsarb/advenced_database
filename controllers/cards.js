const Card = require('../models/Card');
const bodyParser = require("body-parser");



exports.create =  async (req, res) =>{
    try{

    const cards = new Card({ front: req.body.front, back: req.body.back, userId:req.body.userId});
    await cards.save();
    //res.redirect('/?message=user saved')
    res.redirect("usersCards")

    } catch (e) {
            console.log(e.message);
            return res.status(400).send({
                message: JSON.parse(e),
            
            });
        }
}

exports.list = async(req,res)=>{
    //pagnation
    const perPage = 10;
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1;
   
    // pagnation

    try{
        
        const cards = await Card.where('userId').equals(req.session.userID).skip((perPage * page) - perPage).limit(perPage).exec();
        const count = await Card.where('userId').equals(req.session.userID).count();
        const numberOfPages = Math.ceil(count / perPage);


        res.render("usersCards", {
            cards: cards,
            numberOfPages: numberOfPages,
            currentPage: page
        });


    }catch(e){
        console.log(e.message);
        return res.status(400).send({
            message: JSON.parse(e),
        
        });
    }
}

exports.delete = async(req,res)=>{
    const id = req.params.id;
    try{
        await Card.findByIdAndRemove(id);
        res.redirect("/usersCards");


    }catch(e){
        console.log(e.message);
        return res.status(400).send({
            message: JSON.parse(e),
        
        });
    }
}

exports.edit = async(req,res)=>{
    const id = req.params.id;
    try{
            const cards = await Card.findById(id);
            res.render("editingCard", {cards: cards, id:id})


    }catch(e){
        console.log(e.message);
        return res.status(400).send({
            message: JSON.parse(e),
        
        });
    }
}

exports.update = async(req,res)=>{
    const id = req.params.id;
    try{
            const cards = await Card.updateOne({_id: id}, req.body)
            res.redirect("/usersCards")


    }catch(e){
        console.log(e.message);
        return res.status(400).send({
            message: JSON.parse(e),
        
        });
    }
}


Winter2023