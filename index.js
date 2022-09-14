
const express = require("express");
const app = express();
app.listen(3000, () => {
  console.log("Connected to UptimeRobot");
})
app.get("/", (req, res) => {
  res.send("En ligne !");
})
const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
  allowedMentions: ["users"]
});
const prefix = "ci.";
const db = require('pro.db')
//ci.préfix
Client.on("messageCreate", message => {
  if (message.author.bot) return;
  if (message.content === "ci.") {
    message.reply("```ci. est le préfix du bot.```")
  }
});

//help
//client.on("messageCreate", message => {
// if (message.author.bot) return;
//   if(message.content === prefix + "help"){
//        const embed = new Discord.MessageEmbed()
//        .setColor("#0099ff")
//       .setTitle("Liste des commandes.")
//       .setAuthor("Les développeurs de Citronnade.", "https://c8.alamy.com/compfr/2f63k44/adorable-personnage-amusant-aux-fruits-au-citron-icone-d-illustration-de-personnage-de-dessin-anime-a-la-main")
//       .setDescription("Mon préfix est ci.        MUSIC : stop,play,suite,volume,search. Utilitaire : invite,créateur,blague,pistolet,say,warn,support. 40 commandes sont en créations.")
//     .setThumbnail("https://c8.alamy.com/compfr/2f63k44/adorable-personnage-amusant-aux-fruits-au-citron-icone-d-illustration-de-personnage-de-dessin-anime-a-la-main-de-vecteur-kawaii-isole-sur-fond-blanc-concept-de-caractere-fruite-citron-2f63k44.jpg")
//     .setTimestamp()
//     .setFooter("Les développeurs de Citronnade", "https://c8.alamy.com/compfr/2f63k44/adorable-personnage-amusant-aux-fruits-au-citron-icone-d-illustration-de-personnage-de-dessin-anime-a-la-main-de-vecteur-kawaii-isole-sur-fond-blanc-concept-de-caractere-fruite-citron-2f63k44.jpg")

//   message.channel.send({embeds: [embed]});
//    }
//});



const data = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("arrêter le bot.")
const ownerID = "918824852763316264";

Client.on("ready", () => {
  Client.guilds.cache.get("1007431088316092506").commands.create(data);
});
Client.on("interactionCreate", interaction => {
  if (interaction.isCommand()) {
    if (interaction.commandName === "stop") {
      if (interaction.user.id === ownerID) {
        Client.destroy();
      }
      else {
        interaction.reply({ content: " Vous n'avez pas le droit d'exécuter cette commande." });
      }
    }
  }
});
Client.on("ready", () => {
 /*Client.user.setActivity("team Citronnade", { type: "WATCHING" })*/
  Client.user.setStatus("idle") 
});
//ci.vf/*
Client.on("messageCreate", message => {
  if (message.author.bot) return;
  if (message.content === "ci.vf") {
    message.reply("```Pour avoir la version française de Citronnade merci de rejoindre le serveur support ou de la réclamer sur le site.```")
  }
});
Client.on("messageCreate", message => {
  if (message.author.bot) return;
  if (message.content === "ci.test2") {
    message.reply("```ci.test2 rep bot en ligne et en bonne état de marche```")
  }
});
//satus ligne
Client.on("ready", async () => {
  let servers = await Client.guilds.cache.size
  let servercount = await Client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)

  const activities = [
    `10 membres blacklist`,
    ` ${servers} serveurs`,
    `  regarder ${servercount} membres`
  ]
  setInterval(() => {
    const status = activities[Math.floor(Math.random() * activities.length)]
    Client.user.setPresence({ activities: [{ name: `${status}` }] })
  }, 5000)
});
const cand = new SlashCommandBuilder()
  .setName("candidature")
  .setDescription("affiche quand aurons lieux les prochaines candidatures");
Client.on("ready", () => {
  Client.application.commands.create(cand);

  Client.guilds.cache.get("935128573184999474")

});

Client.on("interactionCreate", interaction => {
  if (interaction.isCommand()) {
    if (interaction.commandName === "candidature") {
      interaction.reply("Il n'y a pas de campagne de candidature pour l'instant.");
    }
  }
});


const help = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Affiche les commandes du bot.");
Client.on("ready", () => {
  Client.application.commands.create(help);

  Client.guilds.cache.get("935128573184999474")
});

Client.on("interactionCreate", interaction => {
  if (interaction.isCommand()) {
    if (interaction.commandName === "help") {
      interaction.reply("Avenir....");
    }
  }
});

Client.on("messageCreate", message => {
  if (message.content.startsWith("ci.say")) {
    const SayMessage = message.content.slice(3).trim();
    message.channel.bulkDelete(1)
    message.channel.send("" + SayMessage + "")
  }
});
Client.on("messageCreate", message => {
if(message.content === prefix + "annonce"){
    const user = message.author
    if(message.guild.id === "1007431088316092506"){
    if(message.member.permissions.has("MODERATE_MEMBERS")){
        const embed = new Discord.MessageEmbed()
        .setTitle("Créer une annonce :")
        .setColor("GREY")
        .setTimestamp()
        .setDescription("Quel titre souhaitez-vous donner à votre annonce ?")
        .setFooter({ text: "L'équipe CitroCorp"})
        message.channel.send({embeds: [embed]}).then(msg => {
            const filter = (m) => m.author.id === user.id; // Filtre qui permet de ne récupérer que les messages envoyés par l'utilisateur
            msg.channel.awaitMessages({filter, max: 1}) // max: 1 pour ne récupérer qu'un seul message
             .then(collected => { // .then(...) pour récupérer les messages collectés
                const titre = collected.first(); // Et hop, le message est dans une constante
                message.channel.bulkDelete(2)

                const embed1 = new Discord.MessageEmbed()
                .setTitle("Créer une annonce :")
                .setColor("GREY")
                .setTimestamp()
                .setDescription("Quel descripion souhaitez-vous donner à votre annonce ?")
                .setFooter({ text: "L'équipe CitroCorp"})
                message.channel.send({embeds: [embed1]}).then(msg => {
                    const filter = (m) => m.author.id === user.id; // Filtre qui permet de ne récupérer que les messages envoyés par l'utilisateur
                    msg.channel.awaitMessages({filter, max: 1}) // max: 1 pour ne récupérer qu'un seul message
                     .then(collected => { // .then(...) pour récupérer les messages collectés
                        const description = collected.first(); // Et hop, le message est dans une constante
                        message.channel.bulkDelete(2)

                        const embed2 = new Discord.MessageEmbed()
                        .setTitle("" + titre.content)
                        .setColor("BLUE")
                        .setTimestamp()
                        .setDescription("" + description.content + "\n \nAutheur : <@" +user+ ">")
                        .setFooter({ text: "L'équipe CitroCorp"})
                        message.channel.send({embeds: [embed2]})
                    })})
             })})





    }
else{
    embed = new Discord.MessageEmbed()
            .setTitle("Une erreur est survenue !")
            .setColor("RED")
            .setTimestamp()
            .setDescription("Vous n'avez pas les permissions requises pour effectuer cette commande.")
            .setFooter({ text: "L'équipe CitroCorp"})
            message.channel.send({embeds: [embed]})
}
}
else{
    embed = new Discord.MessageEmbed()
            .setTitle("Une erreur est survenue !")
            .setColor("RED")
            .setTimestamp()
            .setDescription("Cette commande n'est disponible uniquement sur le serveur de CitroCorp")
            .setFooter({ text: "L'équipe CitroCorp"})
            message.channel.send({embeds: [embed]})
}

}
});
Client.on("messageCreate", message => {
    if(message.content === "ci.bouton"){
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("bouton1")
                    .setLabel("Modération")
                    .setStyle("DANGER")
                    .setEmoji("😍")
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("bouton2")
                    .setLabel("Utile")
                    .setStyle("DANGER")
                    .setEmoji("😍")
            );
        message.channel.send({content: "Voici la liste des commandes du bot. Les commandes sont classé dans différente catégorie :", components: [row]})
    }
});

Client.on("interactionCreate", interaction => {
    if(interaction.isButton()){
        if(interaction.customId === "bouton1"){
            interaction.reply("``-annonce, -purge, -warn,``")
        }
    }
});
Client.on("interactionCreate", interaction => {
    if(interaction.isButton()){
        if(interaction.customId === "bouton2"){
            interaction.reply("``-invite, -help, -vf,``")
        }
    }
});
Client.on("messageCreate", message => {
  if (message.author.bot) return;
      if(message.content === "ci.help"){
 var test = new Discord.MessageActionRow()
             .addComponents(
               new Discord.MessageSelectMenu()
               .setCustomId("select")
               .setPlaceholder("Sélectionnez une option")
               .addOptions([
                 {
                   label:"Utile",
                   description: "Commande utile aux serveurs et au bot",
                   value: "option1"
                 },
                 {
                   label:"Infos",
                   description: "Commande d'information",
                   value: "option2"
                 },
                  {
                   label:"Fun",
                   description: "Commande fun",
                   value: "option3"
                 }
                 
               ])
            );
   message.channel.send({content: "**Bienvenue sur la page help du bot !** Utilisez le sélecteur si dessous pour chercher une commandes ! **Le préfix du bot est** ``ci.``", components: [test]});
      }
});
Client.on("interactionCreate", interaction => {
  if(interaction.isSelectMenu()){
    if(interaction.customId === "select"){
      console.log(interaction.values);

      if(interaction.values == "option1"){
        interaction.reply({content: "``invite, help, annonce,``", ephemeral: true});
      }
    else if(interaction.values == "option3"){
        interaction.reply({content: "``blague, image, lol,``", ephemeral: true});
    }
       }
    else if(interaction.values == "option2"){
        interaction.reply({content: "``Commande avenir...``", ephemeral: true});
    }
    }
  });
Client.on('guildCreate', async (guild) => {
  console.log(`J'ai rejoint le serveur ${guild.name} [${guild.memberCount}]`);
})
Client.on('guildRemove', async (guild) => {
  console.log(`J'ai quitté le serveur ${guild.name} [${guild.memberCount}]`);
});
  
Client.on('guildMemberAdd', member => {
 const guild = member.guild.id
if(guild === "1007431088316092506"){
    var membercount = member.guild.memberCount
    const embed = new Discord.MessageEmbed()
    .setTitle("Bienvenue " + member.displayName)
    .setColor("BLUE")
    .setTimestamp()
    .setFooter({ text: "CitroCorp"})
    .setDescription("Bienvenue sur le serveur CitroCorp, tu es le " + membercount +" membres. Pense a lire le règlement et a l'accepté ! <#1007750315652690072>")
    Client.guilds.cache.get("1007431088316092506").channels.cache.get('1007753708915916891').send({embeds:[embed]})
}
})

Client.on('guildMemberRemove', member => {
 const guild = member.guild.id
if(guild === "1007431088316092506"){
    var membercount = member.guild.memberCount
    const embed = new Discord.MessageEmbed()
    .setTitle("Enrevoir " + member.displayName)
    .setColor("RED")
    .setTimestamp()
    .setFooter({ text: "CitroCorp"})
    .setDescription("Un membre vient de quitter le serveur nous sommes maintenant " + membercount +" membres")
    Client.guilds.cache.get("1007431088316092506").channels.cache.get('1007753708915916891').send({embeds:[embed]})
}
});
//ping
Client.on("messageCreate" , async message => {
  if(message.content == prefix + "ping") {
    message.reply("**Pong 🏓**").then(m=> 
    setTimeout(() => {
    m.edit(`**Mon ping est \`:\` ${Client.ws.ping} Ms**`)  
  },200))
  }
});
const { MessageActionRow , MessageButton} = require("discord.js")
Client.on("messageCreate" , message => {
  if(message.content == prefix + "invite") {
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag , message.author.displayAvatarURL({dynamic:true}))
    .setDescription(`**Click sur le bouton pour m'inviter ⤵**`)
    let row = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel("Click sur moi🙄")
      .setStyle("LINK")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${Client.user.id}&permissions=0&scope=bot`)
    )
   message.reply({embeds:[embed] , components:[row]}) 
  }
});
Client.on("messageCreate" , message => {
if (message.content.startsWith(prefix + "ban")){
    if (message.member.permissions.has("BAN_MEMBERS")){
        const autheur = message.author.displayName
       let mention = message.mentions.members.first();
   
       if (mention == undefined){
           const embed = new Discord.MessageEmbed()
               .setTitle("Une erreur est survenue !")
               .setColor("RED")
               .setTimestamp()
               .setDescription("Vous n'avez pas ou mal mentionner la personne à bannir")
               .setFooter({ text: "Citronnade"})
               message.channel.send({ embeds: [embed]});
           }
       else {
       
           if (mention.kickable){
               mention.ban();
               const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(mention.displayName +" à été banni avec succès par " + autheur)
                .setFooter({ text: "Citronnade"})
                .setTimestamp()
                message.channel.send({ embeds: [embed]});

                const embed1 = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Vous venez d'être banni du serveur CitroCorp par " + autheur)
                .setFooter({ text: "Citronnade"})
                .setTimestamp()
                mention.send({embeds: [embed1]}).catch(error => {console.log("Ce membre n'accepte pas les MP")})
           }
           else {
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Une erreur est survenue")
            .setDescription("Il est impossible de bannir ce membre.")
            .setFooter({ text: "Citronnade"})
            .setTimestamp()
            message.channel.send({ embeds: [embed]});
           }
       } 
   }
   else{
    const embed = new Discord.MessageEmbed()
    .setTitle("Une erreur est survenue !")
    .setColor("RED")
    .setTimestamp()
    .setFooter({ text: "Citronnade"})
    .setDescription("Vous n'avez pas les permissions requises pour bannir un membre")
   message.channel.send({embeds:[embed]})
}
}
});
//kick
Client.on("messageCreate" , message => {
if (message.content.startsWith(prefix + "kick")){
    if (message.member.permissions.has("KICK_MEMBERS")){
        const autheur = message.author.displayName
       let mention = message.mentions.members.first();
   
       if (mention == undefined){
           const embed = new Discord.MessageEmbed()
               .setTitle("Une erreur est survenue !")
               .setColor("RED")
               .setTimestamp()
               .setDescription("Vous n'avez pas ou mal mentionner la personne à expulsé ")
               .setFooter({ text: "Citronnade"})
               message.channel.send({ embeds: [embed]});
           }
       else {
       
           if (mention.kickable){
               mention.kick();
               const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(mention.displayName +" à été expulsé avec succès par " + autheur)
                .setFooter({ text: "Citronnade"})
                .setTimestamp()
                message.channel.send({ embeds: [embed]});

                const embed1 = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Vous venez d'être expuslé du serveur CitroCorp par " + autheur)
                .setFooter({ text: "Citronnade"})
                .setTimestamp()
                mention.send({embeds: [embed1]}).catch(error => {console.log("Ce membre n'accepte pas les MP")})
           }
           else {
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Une erreur est survenue")
            .setDescription("Il est impossible d'expulsé ce membre.")
            .setFooter({ text: "Citronnade"})
            .setTimestamp()
            message.channel.send({ embeds: [embed]});
           }
       } 
   }
   else{
    const embed = new Discord.MessageEmbed()
    .setTitle("Une erreur est survenue !")
    .setColor("RED")
    .setTimestamp()
    .setFooter({ text: "Citronnade"})
    .setDescription("Vous n'avez pas les permissions requises pour expulsé un membre un membre")
   message.channel.send({embeds:[embed]})
}
}
});
//blacklist
var blacklist = [
    {name: "bonjour#7625", id: "997907762124165210", raison:"RAID d'autre serveur"},
    {name: "Vivi le code", id: "935580013305151518", raison:"lol"},
    ];   
Client.on("messageCreate", message => { //Si un message est reçu :
    if (message.author.bot) return;
  
    const guild = message.guild.id
    const member = message.guild.author 
    const member1 = message.member.id
    const créateur = "918824852763316264"

//___________________________________________________________Blacklist______________________________________________________________________
if(blacklist.filter(e=>e.id === member1).length>0){ 
    const embed = new Discord.MessageEmbed()
            .setTitle("⚠️ Membre blacklist détecté⚠️ ")
            .setColor("RED")
            .setTimestamp()
            .setDescription("Un membre blacklist vient d'être détecté ! Heuresement le membre blacklist a été banni du serveur par mesure de sécurité !\n \n **__Nom : <@!" + member1+ "> __**\n**__ID : " + member1 + "__** ")
            .setFooter({ text: "Citronnade protect"})
  message.channel.send({embeds: [embed]}
    )
    const guild = message.guild
    guild.members.ban(member1)
  }
});







Client.login("OTg2NjU3MjYyMTc5MzIzOTI0.GXn2Sw.JFeEzNmm_YSIzr7RH8aE0h3U_Jf3veJCDCEzMQ");