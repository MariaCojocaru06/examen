const express=require("express");
const cors=require("cors");
const port=8080;
const sequelize=require("./sequelize")

//Preluare clase BD
const Meeting=require("./models/Meeting");
const Participant=require("./models/Participant");
const { application } = require("express");

//legatura dintre clase
Meeting.hasMany(Participant);
Participant.belongsTo(Meeting);

//pornire server
const app=express()
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(cors())

//import rute
app.use("/api-meeting",require("./routes/meetingRoute"))
app.use("/api-participant",require("./routes/participantRoute"))

app.get('/', (req, res) => {
    res.send('Welcome to my API examen' );
});

app.
listen(port, () => {
    console.log('Running on port ' + port);
});
//Functie pentru sincronizarea  bazei de date
//1. in post cream baza de date ->localhost:3000/ put
app.put("/", async (request, response, next) => {
    try {
        await sequelize.sync({ force: true });
        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});
