const express = require("express");
const app = express();
const router = require("express").Router();
const { Op } = require('sequelize')
const Meeting = require("../models/Meeting");
const Participant = require("../models/Participant")


//Functii pentru clasa parinte
router
    //POST pentru meeting
    .post('/meetings', async (req, res, next) => {
        try {
            await Meeting.create(req.body)
            res.status(201).json({ message: " created" })

        } catch (error) {
            next(error)
        }
    })
    //GET pentru meetings
    .get('/meetings', async (req, res, next) => {
        try {
            const meetings = await Meeting.findAll();
            if (meetings.length > 0) {
                res.json(meetings)
            } else {
                res.status(400).json({ message: "no meetings" })

            }

        } catch (error) {
            next(error)
        }
    })
     //GET pentru un anumkit meeting
    .get('/meetings/:id',async(req,res,next)=>{
        try {
            const job = await Meeting.findByPk(req.params.id)
            res.status(200).json(job)

        } catch (error) {
            next(error)
        }
    })
    //PUT pentru un meeting
    .put('/meetings/:id',async(req,res,next)=>{
        try {
            const meeting = await Meeting.findByPk(req.params.id);
            if (meeting) {
                //dam acces pentru campuri mai putin pt id
                if (req.body.descriere && req.body.url&&req.body.data) {
                    meeting.descriere = req.body.descriere;
                    meeting.url = req.body.url
                    meeting.data=req.body.data
                    await meeting.save();
                    res.status(202).json(meeting)
                } else {
                    res.status(400).json({ message: "Missing attributes!" });
                }

            } else {
                res.status(404).json({ message: "not found" })
            }

        } catch (error) {
            next(error)
        }
    })

    .delete("/meetings/:id",async(req,res,next)=>{
        try {
            const meeting = await Meeting.findByPk(req.params.id)
            if (meeting) {
                await meeting.destroy();
                res.status(202).json({ message: "job deleted" })

            } else {
                res.status(404).json({ message: "not found" })
            }

        } catch (error) {
            next(error)
        }
    })
    //FILTRARE
    .get('/filter', async (req, res, next) => {
        try {
            const query = {}
            let pageSize = 2;
            const allowedFilters = ['descriere', 'data'];
            const filterKeys = Object.keys(req.query).filter(e => allowedFilters.indexOf(e) !== -1)
            if (filterKeys.length > 0) {
              query.where = {}
              for (const key of filterKeys) {
                if(key == 'data'){
                  let nextD = parseInt(req.query[key])+1
                  console.log(nextD)
                  query.where[key] = {
                    [Op.gte]: `%${req.query[key]}%`,
                    [Op.lte]: `%${nextD}%`
                  }
                } else{
                query.where[key] = {
                  [Op.like]: `%${req.query[key]}%`
                }
              }
              }
            } if (req.query.sortOrder && req.query.sortOrder === '-1') {
              sortOrder = 'DESC'
            }
        
            if (req.query.pageSize) {
              pageSize = parseInt(req.query.pageSize)
            }
            if (req.query.sort) {
              query.order =  [[Sequelize.fn('lower', Sequelize.col(req.query.sort)), req.query.how ? req.query.how : 'ASC']]
            }
            if (!isNaN(parseInt(req.query.page))) {
              query.limit = pageSize
              query.offset = pageSize * parseInt(req.query.page)
            }
            const records = await Meeting.findAndCountAll(query);
                res.status(200).json(records);
          } catch (err) {
            console.log(err.message + ' '+req)
            next(err);
          }
    })
    //IMPORT
    .post('/import',async(req,res,next)=>{
        try{
            const registry={};
            for(let u of req.body){
                const meeting=await Meeting.create(u);
                
                await meeting.save();
            }
            res.sendStatus(202)
            

        }catch(error){
            next(error)
        }
    })
    //EXPORT
    .get('/export', async (request, response, next) => {
        try {
          const result = [];
          for (let u of await Meeting.findAll()) {
            const meeting = {
              descriere:u.descriere,
              url:u.url,
              data:u.data,
              participants:[]
              
            };
            for (let c of await u.getParticipants()) {
              meeting.participants.push({
                
                nume:c.nume
                
              });
            }
            result.push(meeting);
          }
          if (result.length > 0) {
            response.json(result);
          } else {
            response.sendStatus(204);
          }
        } catch (error) {
          next(error);
        }
      })
module.exports = router
