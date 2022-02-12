const sequelize = require('../sequelize.js');
const { DataTypes } = require('sequelize');

const Participant =sequelize.define('participant',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    nume:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[5,100],
        },
    }
})
module.exports=Participant