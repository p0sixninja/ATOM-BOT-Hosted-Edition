require('net').createServer().listen() // this can be commented out, you will need this to publish to a hosted server
var Bot = require('ttapi');
var AUTH = 'xxxx';
var USERID = 'xxxx';
var ROOMID = '50df8cb6eb35c1070b43cd9b';
var USERNAME2 = "FAKEUSERNAME";
var ROOMNAME = "Mix N' Match Anything Goes,";
var SPEAKVALUE = 0;
var VALUEOFONE = 1;
var SERVERUPTIME = 0;

var bot = new Bot(AUTH, USERID, ROOMID);
bot.debug = false;


  

// Existing User Leaves the room
bot.on('deregistered', function (data) 
{ var user = data.user[0]; 
bot.speak('User: ' + user.name + 'Has Left Mix n Match, Anything Goes'); //EDIT THIS TO YOUR NEEDS
});

// New user enters the room
bot.on('registered', function (data) 
{ var user = data.user[0]; 
bot.speak('Welcome to ' + ROOMNAME + ' ' + user.name); 
});


//Server Commons Message
 setInterval(function() { 
	bot.speak('WELECOME TO MIX N MATCH <3');  // EDIT THIS TO YOUR NEEDS
 }, 5*60*1000);
 
   //Determining how many minutes the server has been active.
   setInterval(function() {
   SERVERUPTIME = SERVERUPTIME + VALUEOFONE
   }, 60*1000);
   
    //Speaking to the turntable croud how long the bot and server has been active for, and alerting the console in red lettering that the croud has been notified
   setInterval(function() {
   bot.speak('This Turntable Bot And Server Has Been Running For: ' + SERVERUPTIME + ' Minutes');
   }, 10*60*1000);
   
  


// endsong event function 
bot.on('endsong', function(data) {
  ups = data.room.metadata.upvotes;
  downs = data.room.metadata.downvotes;
  bot.speak('Up-votes: ' + ups + ', Down-votes: ' + downs);
});



       //Bot Bops The Song Up
  bot.on('update_votes', function(data) {
  ups = data.room.metadata.upvotes;
  if (ups == 2) {
    bot.bop();
  }
  });
  
  
  
bot.on('speak', function (data) {
   // Get the data
   var name = data.name;
   var text = data.text;
   
        // Respond to "/hello" command
   if (text.match(/^\/stepupbot$/)) {
      bot.addDj();
	  bot.speak('Im Stepping Up To Be DJ!');

   
}
      if (text.match(/^\/botvoteup$/)) {
      bot.bop();
	  bot.speak('Voting Song Up!');

   }

   if (text.match(/^\/stepdownbot$/)) {
      bot.remDj();
	  bot.speak('Im Stepping Down From Being DJ!');

   }
});


   