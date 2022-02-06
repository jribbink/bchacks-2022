# 🚀 Welcome to your new awesome project!

This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application

///////////// devpost

##Inspiration

From the very beginning, the group wanted to take inspiration from the projects of the prior BC Hacks events. Seeing the prevalence of games in the past few years, we decided that we wanted to make an interactive browser game. We wanted to make it stand out though, and so taking inspiration from League of Legends, and the Wild West, we came up with Holey Homestead - a dead-simple, surprisingly fun, online multiplayer cowboy lasso-em-up.

##What It Does

The interface itself is simple, you control a cowboy with the "W", "A", "S", and "D" keys. The goal is to pull your fellow cowboys into the pit in the middle of the screen. To do this, you have a lasso that you throw by clicking the left mouse button. You have to be careful though: there is a slight delay when pulling back your rope, leaving you open to counter attacks.

##How We Built It

The engine we made the game in was built from scratch in typescript. 
We started off with the very basics - creating a canvas, and drawing the player and pits as simple shapes. Then we began working on the logic of movement, while setting up the barebones framework for lassoing; once that was done, we finished the lassoing methods. 

At this point, we decided to set up the socket connection between players to ensure that it would function properly, while fine-tuning the existing functions on the side. We implemented the game's visuals and audio after this was finished to our satisfaction; then, we created the framework around the game to finish.

We built this project using VS Code using various technologies such as Microsoft Live Share, webpack, and Node Package Manager. We used GitHub as our remote repository.

##Challenges

Before entering the hackathon, our group had next to no experience in making games. While we did have some experience with Node.js, it was mostly limited to a simple storefront website, and many of the core skills of game development (sprite work, sound, and image implementation) were mostly new to us.

##Accomplishments

This is one of the first times we created our own multi-user connection, using a socket server; in past projects, the work of connecting to a server was done for us. The first time we could move simultaneously was a "Eureka!" moment.

Beyond that, the logic involved in the lassoing procedures (including throwing the lasso, catching, and pulling in a cowboy, and properly drawing the rope sprite) took some finagling, and we're proud that we managed to finish it all off.

##What We've Learned

We truly pushed the boundaries for what we could accomplish in 24 hours. We learned that when working with new technologies, there's a substantial set up process, and a steep initial learning curve. But once we conquer that learning curve, we're capable of a lot.

We also learned that it's very hard to be fully present after twenty hours or more awake, but that's by-the-by.

##What's Next

We aren't sure whether we'll continue any active development on Holey Homestead; however, we do have ideas for what could be implemented in future that we didn't have time for, like having the players' lassos bounce off the cactus, or a randomly-appearing rattlesnake that kills the players who touch it. For now, we're happy with what we've managed during the hackathon!

