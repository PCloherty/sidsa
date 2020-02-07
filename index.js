const {Client} = require('discord.js'); //import Client from discord.js using object destructuring 
const {config} = require('dotenv'); // import config  from dot env using object destructuring 

//creating the bot client
const client = new Client({
    disableEveryone: true
});


client.on("ready", () => {
    console.log("Im online")
    client .user.setActivity('Mumbling in Draconic')
});

//
client.login(process.env.TOKKEN);