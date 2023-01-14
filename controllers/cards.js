const Card = require('../models/Card');



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
    try{
        //const front = await Card.find({});
        //const back = await Card.find({});
        //const cards = await Card.find({})
        const cards = await Card.where('userId').equals(req.session.userID);
        res.render("usersCards", {
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