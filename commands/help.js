const Discord = require("discord.js");
module.exports = {
  name: "help",
  Description: "command to give a list of available commands",
  execute(message) {
    return message.channel.send(
      'to initiate a command type underscore (_) followed by: \n    role "rolename" "@username" \n    remove "rolename" "@username"'
    );
  }
};
