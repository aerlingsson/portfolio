## Arnar Haukur Erlingsson - flurryBot

**Disclaimer: I made this for fun, in just a few hours, to learn the fundamentals of JavaScript and the Discord API, and it has not been revised since. I will emphasize, that this code is not built in a maintainable, modular, or "good practice" way for the most part. I point out several of these issues in the following section.**

### The bot
FlurryBot allows the users in a server to play Tic-Tac-Toe with them. However, flurryBot blatantly cheats if it's about to lose a game, meaning that the player always loses. I've only included the main code file: `index.js`. While a few more files are needed in the project for it to function, `index.js` contains all the functionality and is the entrypoint for the application.

This project serves to display my intuition to approach logic tasks, not so much how I write modular and maintainable code. In a more serious project I would split the code into several files. I would take a more object-oriented approach: make a bot class, and a game/board class to encapsulate the functionality contained in `index.js`. `index.js` would then only observe messages in the server's text channel.

The code could also be split into bot modules. This would make it easier to extend the bot with more functionality, besides playing Tic-Tac-Toe. The bot would then maintain a list of modules, and would initialize the modules, either when booting up, or as each module is needed. The Tic-Tac-Toe functionality of the bot should then not be part of the bot itself, however, modularized further and be contained in a differently named class; making the bot have a higher level of abstraction.

I would also reconsider variable- and function names as most of them are not self-explanatory, and some may not even make sense for anyone else but me. The bad naming can be seen at the top of the file, where multiple values are commented for clarity. Ideally variable names should give an idea of what the variable is used for.

An omitted file, `config.json` contains the bot's token and prefix ("#", used when issuing commands to the bot from a text channel in Discord). Both the prefix and token are loaded into `index.js` at the top of the file, however, the prefix is not used. This becomes an issue, if the prefix is changed in the future. In this case it has to be changed in every functionality case implemented, instead of just changing it in the config file. 
