const Discord = require("discord.js");
module.exports = {
  name: "role",
  description: "command to give user role of Dungeon Master",
  execute(message, args) {
    console.log(args);
    let role = " ";

    if (!args[0] == /\d/) {
      role = message.guild.roles.find(r => r.name == args[0]);
    } else {
      role = message.guild.roles.get(args[0]);
    }
    console.log(role);
    let member = args[1];

    if (!message.mentions.users.size) {
      return message.channel.send(
        'Please provide a role and name in the following format: "_role rolename @username"'
      );
    } else if (message.member.roles.has(role.id)) {
      return message.channel.send(`${member} already has the ${role} role!`);
    } else {
      message.member
        .addRole(role)
        .then(member => {
          message.channel.send(`Added role ${role} to ${member.displayName}`);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
