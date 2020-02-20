module.exports = {
  name: "remove",
  description: "command to remove users specified role",
  execute(message, args) {
    let role = message.guild.roles.find(r => r.name == args[0]);
    let member = args[1];

    if (!message.mentions.users.size) {
      return message.channel.send(
        'Please provide a role and name in the following format: "_remove rolename atusername"'
      );
    } else if (!message.member.roles.has(role.id)) {
      return message.channel.send(`${member} does not have this role!`);
    } else {
      message.member
        .removeRole(role)
        .then(member => {
          message.channel.send(
            `removed role ${role} from ${member.displayName}`
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
