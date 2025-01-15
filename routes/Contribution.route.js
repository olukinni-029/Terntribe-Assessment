const express = require('express');
const {Contribution,Cause} = require('../models/index.model');
const router = express.Router();


router.post('/causes/:id/contribute',async(req,res)=>{
 try{
    const { id } = req.params;
    const { name, email, amount } = req.body;
    if (!name || !email || !amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid input" });
      }
  
      // Find the cause
      const cause = await Cause.findByPk(id);
      if (!cause) {
        return res.status(404).json({ error: "Cause not found" });
      }
      const contribution = await Contribution.create({
        cause_id: id,
        name,
        email,
        amount,
      });
    
     return res.status(201).json({
        message: "Contribution successful",
        contribution,
      });
 }catch (error){
    console.error(error);
    res.status(500).json({ error: "Internal server error",error: error.message });
 }
});

module.exports = router;