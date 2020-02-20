module.exports = {
  name: "ping",
  description: "command to ping the server",
  execute(message, args) {
    message.channel.send(`Pong!`);
  }
};

//-------------------------------old code for future reference
// if (cmd === 'ping') {
//     const msg = await message.channel.send('pinging...');
//     //console.log(message.guild.roles)
//     msg.edit(`Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms \nApi Latency ${Math.round(client.ping)}ms`);

// }
