const { Client, Collection } = require('discord.js'); //import Client from discord.js using object destructuring 
const { config } = require('dotenv'); // import config  from dot env using object destructuring 
const fs = require('fs');

//creating the bot client
const client = new Client({
    disableEveryone: true
});

//following section is adding the commands in the commands folder an accessable collection 
client.commands = new Collection()
//return an array with the filenames that end in .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command);
}

//adding a bit of flavour to the bot each time it is activated
const dndLingo = () => {
    const langArr = ['Infernal', 'Elvish', 'Common', 'Celestial', 'UnderCommon','Orcish', 'Draconic', 'Dwarvish']
    const langInt = Math.floor(Math.random() * langArr.length)
    const language = langArr[langInt].toString('')
    return language
}

config({
    path: __dirname + "/.env"
});

//client on
client.on("ready", () => {
    console.log(`SIDSA is online`)
    
    client.user.setPresence({
        status:'online',
        game: { name: dndLingo(),
                type:'LISTENING' }
    });
    
});

client.on('message', async message => {
    //console.log(`${message.author.username} said:${message.content}`)
    const prefix = "_";

    //to prevent infinate loops
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    //_say hello my name is sidsa
    //say
    //[hello, my, name, is, sidsa]
    if (!client.commands.has(cmd)) return;

    try{client.commands.get(cmd).execute(message,args);
    } catch(error){
        console.error(error);
        message.reply('There was an error trying to exercute command');

    }
    
    //ping
    if (cmd === 'ping') {
        client.commands.get('ping').excecute(message,args);
    }
    //role rolename @username
    if(cmd==='role'){
        client.commands.get('role').exercute(message,args);
    }
});

client.login(process.env.TOKEN);