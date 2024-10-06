const express = require('express');
const router = express.Router();
const pDetail = require('../Models/projDetailsSchema')
router.post('/projDetails', async (req, res) => {
    const {projectName, reason, category, type, priority, division, department, location, startDate, endDate,status } = req.body;
    // console.log("projDetails", req.body);
    // console.log('Received data:', { reason });
    try {
    //   const proDetail = new pDetail({ projectName, reason, category, type, priority, division, department, location, startDate, endDate });
    //   await proDetail.save();
    const proDetail = new pDetail(req.body);
    await proDetail.save();
    res.status(200).send({ proDetail });
    //   res.status(200).send({ proDetail });
    } catch (error) {
      console.error("Error:", error);
      res.status(400).send({ message: error.message });
    }
  });
router.get('/getprojDetails', async(req,res) => {
    const {projectName, reason, category, type, priority, division, department, location, startDate, endDate,Status} = req.body;
    console.log("getprojDetails", req.body);
   try {
    const resp_details = await pDetail.find();
    // console.log("resp_details",resp_details);
    res.json(resp_details)
    // res.status(200).send(resp_details);
    console.log("resp_details",resp_details);
   } catch (error) {
    res.status(500).send({message:'Error while fetching projects'})
}
});

router.put('/updateprojDetails/:id', async(req,res) => {
    const {id} = req.params;
    // const {reason,category,type,priority,division,department,location,startDate,endDate} = req.body;
    const { Status } = req.body;
    // console.log("req.body",req.body);
   try {
    const resp_details = await pDetail.findByIdAndUpdate(id,{ Status },{ new: true });;
    // console.log("resp_details",resp_details);
    if(!resp_details){
        return res.status(404).send({message: "Project Details Not Found"});
    }
    // res.send({resp_details});
    res.json(resp_details);
   } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).send({message:'Failed to update project status'})
}
})
module.exports = router;