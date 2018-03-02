<p align="center">
 <img src="https://user-images.githubusercontent.com/4047597/36716307-e6c24506-1bbf-11e8-8bfe-cc151874f332.png" width="128px">
</p>

<h1 align="center">
	❯❯❯ Chattt
</h1>

<p align="center">
Chat without leaving your terminal.
</p>

<p align="center">
<a href="https://www.npmjs.com/package/chattt"><img src="https://img.shields.io/npm/v/chattt.svg"></a>
<a href="https://www.npmjs.com/package/chattt"><img src="https://img.shields.io/npm/dm/chattt.svg"></a>
<a href="https://www.npmjs.com/package/chattt"><img src="https://img.shields.io/npm/l/chattt.svg"></a>
</p>

<p align="center">
 <img src="https://user-images.githubusercontent.com/4047597/36725003-e922a082-1bda-11e8-9b08-2537a8a05529.gif">
</p>


## Using

```sh
> npm install -g chattt

> chattt
```


## Why build this?

Well, I would say, the strongest reason why I build this is because I wanted to play with [socket.io](https://socket.io/) and a [cool terminal interface library](https://github.com/chjj/blessed).
A chat system was one of the ways to realize this and hence I went ahead with it.
It has no advantages over IRC or some other chat system that you are used to, but it might come handy for quick chatting (from terminal) with zero entry-level knowledge required (no need to memorize IRC commands for example). 🍰✨


## Basics

When `chattt` opens, you are asked the channel name that you want to join. Enter the channel name, and then enter your desired user handle.

If everything goes well, you should be joining the channel.

The working of this application is inspired by IRC so you will see messages when users join or leave a channel.


## Technologies Used

* [socket.io](https://socket.io)
* [blessed](https://github.com/chjj/blessed) - For making the CLI application.
* [Express.js](https://expressjs.com/) - For the [backend](#backend).
* [Glitch](https://glitch.com) - For hosting the backend.


## Backend

The backend of this application is hosted for free on Glitch. 
Do check it out as it is pretty cool. 😄

The source code for the same is at [aviaryan/chattt-backend](https://github.com/aviaryan/chattt-backend).


## Credits

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com.
