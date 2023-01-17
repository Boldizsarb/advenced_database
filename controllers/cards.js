const Card = require('../models/Card');
const bodyParser = require("body-parser");



exports.create =  async (req, res) =>{
    try{

    const cards = new Card({ front: req.body.front, back: req.body.back, category:req.body.category, userId:req.body.userId});
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

exports.list1 = async(req,res)=>{
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

exports.list2 = async(req,res)=>{ // once we have the cetegories 
                                       
    const userId = req.session.userID
    const category = req.params.category;
    console.log(category);
try{
    //const cards = await Card.where('userId').equals(userId)//.where('category').equals(category)
    //const cards = await Card.find({userId: userId}).distinct("category")
    const cards = await Card.find({userId: userId, category: category})
    res.render("category", {
        cards: cards
    });

}catch(e){
        console.log(e.message);
        return res.status(400).send({
            message: JSON.parse(e),
        
        });
    }
}

exports.list3 = async(req,res)=>{    // index

    const cards = await Card.where('userId').equals(req.session.userID)
    try{

        res.render("index", {
            cards: cards
            
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

