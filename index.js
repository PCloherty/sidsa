const { Client } = require('discord.js'); //import Client from discord.js using object destructuring 
const { config } = require('dotenv'); // import config  from dot env using object destructuring 

//creating the bot client
const client = new Client({
    disableEveryone: true
});



config({
    path: __dirname + "/.env"
});


client.on("ready", () => {
    console.log(`SIDSA is online`)
    
});

client.on('message', async message => {
    //console.log(`${message.author.username} said:${message.content}`)
    const prefix = "_";

    //races
    const elfRole = message.guild.roles.get("675133738157342739")
    //const roleID = "675133738157342739";

    //to prevent infinate loops
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    //_say hello my name is sidsa
    //say
    //[hello, my, name, is, sidsa]

    //ping
    if (cmd === 'ping') {
        const msg = await message.channel.send('pinging...');

        msg.edit(`Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms \nApi Latency ${Math.round(client.ping)}ms`);

    }
    //-------------------------------------------------Note--------------------------------------------
    //this is the point I've figured out discord will either edit the message for everyone or not at all 
    //so i need to find another way
    if (cmd === 'elf') {
        const msg = await message.channel.send('mumble mumble');

        if (member.roles.has(elfRole)) {
            msg.edit('testing')
            console.log('I am here')
        } else {
            msg.edit(msg + '\nYou dont understand what they are saying')
        }


        //(message.guild.roles === elfRole) translates
        //(message.member.roles.has(elfRole)) does not

    }
});

client.login(process.env.TOKEN);