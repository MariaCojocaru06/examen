const sequelize = require('../sequelize.js');
const { DataTypes } = require('sequelize');

const Meeting=sequelize.define('meeting',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    descriere:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[3,100],
        },
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
    },
    data:{
        type: DataTypes.DATE,
        allowNull: false,
    }
})
module.exports=Meeting