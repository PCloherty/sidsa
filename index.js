const { Client } = require('discord.js'); //import Client from discord.js using object destructuring 
const { config } = require('dotenv'); // import config  from dot env using object destructuring 

//Role IDs
const dm = '676465656228478990'
const elven = '675133738157342739'

//creating the bot client
const client = new Client({
    disableEveryone: true
});
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

    //ping
    if (cmd === 'ping') {
        const msg = await message.channel.send('pinging...');
        //console.log(message.guild.roles)
        msg.edit(`Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms \nApi Latency ${Math.round(client.ping)}ms`);

    }
    //---------------------------------Note ALL or Nothing issue--------------------------------------------
    //this is the point I've figured out discord will either edit the message for everyone or not at all 
    //so i need to find another way 
    if (cmd === 'elf') {
        const msg = await message.channel.send('Command reserved for now');
    }


    //changing the permissions on a user to grant them role of Dungeon Master(DM)
    //USER:_dm paraic 
    //bot:checks paraic has DM role
    //      If yes, message to state it exists
    //         else add DM role to user
    if(cmd === 'dm') {
        const role= message.guild.roles.get(dm)
        const member = message.mentions.members.first()
        if (!message.mentions.users.size) {
            return message.channel.send('Please provide a name to premote to DM')
        }else if (message.member.roles.has(dm)) {
            return message.channel.send(`${member.displayName} already has the ${role.name} role!`)
        } else {       
            message.member.addRole(role)
                .then(member => {
                    message.channel.send(`Added role ${role.name} to ${member.displayName}`)
                })
                .catch(error =>{
                console.log(error)
                });
        }        
    }
});

client.login(process.env.TOKEN);