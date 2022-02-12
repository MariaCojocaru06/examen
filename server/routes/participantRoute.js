const express = require("express");
const app = express();
const router = require("express").Router();
const { Op } = require('sequelize')
const Meeting = require("../models/Meeting");
const Participant = require("../models/Participant")

router
    //GET pentru participanti
    .get('/participants', async (req, res, next) => {
        try {
            const participanti = await Participant.findAll()
            if (participanti.length > 0) {
                res.status(202).json(participanti)
            }
            else {
                res.status(404).json({ message: "not found" })
            }

        }
        catch (error) {
            next(error)
        }
    })
    //POST adaugam un participant la o anumita intalnire
    .post('/meetings/:id/participanti', async (req, res, next) => {
        try {
            //cautam meetingul in care adaugam
            const meeting = await Meeting.findByPk(req.params.id);
            if (meeting) {
                const candidate = await Participant.create(req.body);
                meeting.addParticipant(candidate);
                await meeting.save()
                res.status(202).json({ message: "added" })

            } else {
                res.status(404).json({ message: "not found" })
            }

        } catch (error) {
            next(error)
        }
    })
    //GET pentru participantii unui meeting
    .get('/meetings/:id/participanti', async (req, res, next) => {
        try {
            //aflam job-ul
            const meeting = await Meeting.findByPk(req.params.id)
            if (meeting) {
                const Candidate = await meeting.getParticipants()
                res.status(202).json(Candidate)

            } else {
                res.status(404).json({ message: " not found" })
            }



        } catch (error) {
            next(error)
        }
    })
    //DELETE pentru un anumit participant
    .delete('/meetings/:id/participanti/:idP',async(req,res,next)=>{
        try{
            const meeting=await Meeting.findByPk(req.params.id)
            if(meeting){
               
                const candidates=await meeting.getParticipants({where:{id:req.params.idP}})
                const candidate=candidates.shift();
                if(candidate){
                    await candidate.destroy();
                    res.status(202).json({message:"deleted"})
                }else{
                    res.status(404).json({message:"not found"})
                }

            }else{
                res.status(404).json({message:"job not found"})
            }

        }catch(error){
            next(error)
        }
    })
    //PUT editarea unui anumit participant
    .put('/participants/:idP',async(req,res,next)=>{
        try{
            //cautam candidatul dupa id
            const participant=await Participant.findByPk(req.params.idP);
            if(participant){
                participant.nume=req.body.nume;
                
                await participant.save();
                res.status(202).json(participant)

            }else{
                res.status(404).json({message:"not found"})
            }

        }catch(error){
            next(error)
        }
    })

    //GET pentru un anumit participant fara a tine cont de meeting
    .get('/participants/:idP',async(req,res,next)=>{
        try{
            const candidate=await Participant.findByPk(req.params.idP);
            if(candidate){
                ;
                res.status(202).json(candidate)

            }else{
                res.status(404).json({message:"not found"})
            }

        }catch(error){
            next(error)
        }
    })
    module.exports = router