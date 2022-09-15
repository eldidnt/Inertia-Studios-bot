module.exports =  {
    name: "ready",
    run: async (client) => {

        console.log('Bot on Succesfully.'.green);
        console.log(`Guilds: ${client.guilds.cache.size}`.green);
        console.log(`Humans: ${client.users.cache.size}`.green);
    }
}
