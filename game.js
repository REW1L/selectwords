define(['Phaser', 'scenes/level', 'scenes/gameover', 'scenes/main_menu'],
       function(Phaser, Level, GameOver, MainMenu) {

  var text = 'This is a book. This is not a book. Is this a book? What is it? That is a pencil. That is not a pencil. Is that a pencil? What is that? These are books. These are not books. Are these books? What are these? Those are pencils. Those are not pencils. Are those pencils? What are those? What is your address? What’s your name? What color is this? What size is that? What day is today? Milk is good to eat. Milk is good for you to eat. This yard is full of children. What is this in the picture? One is strong. The other is weak. That’s a good idea. That’s very kind of you. What he said is something. All you have to do is add the letters. This is my girl going into the door. To do as you suggest would be out of the question. That is exactly what we want to learn. I am a girl. I am not a girl. Are you a girl? Who are you? How old are you? How are you? Where are you? My father is in his office. Who’s that man over there? I’m eight. It is seven. It must be seven. It’s very cold. It is difficult. It is wonderful. It’s ten o’clock. It is time for you to get up. I’m interested in this book. I’m very fond to you as a friend. I’m thirsty. I’m busy just now. I’m afraid. I’m sure. I’m sorry. I’m glad you like it. (I’m glad to hear your good news.) I’m ready for breakfast. I’m good at tennis. What time is it? It’s two minutes past six. It’s half past seven.It’s a quarter past five.It’s two minutes to six.It’s two sharp.It’s : . How many are they? How many flowers are they? How much rice are they? What is your father? Are you sure? What are you afraid of? It’s in the sky. (near my home/on the sea/on the left of TV/on the right/behind her/in front of TV/ by desk/beside her/under the tree/on the table/in the room) The car is near the tree. Your hat looks very nice. I have a pencil and two books. I have not a red pencil. Do you have any pencils? What do you have? How many sisters do you have? Do you have anything to eat? He has some letters for your father? My sister has a cup. I have a lot of thing to eat. I have toothache. I have no time to see you. We have a car waiting outside. I’ll have some soup. There is book on the table. There is not any book on the table. Is there any book on the table? What is there on the table? There are two pencils in my box. There are not any pencils in my box. Are there any pencils in your box? What are there in your box There are seven days in a week. How much rice is there? Here is a few letters for you to learn. There’s a telephone call for you. Is there a Miss Lee staying here? There won’t be many teachers going to the party. Will there be a birthday party in the home? Would you say slowly, please? What do you call 铅笔 in English? How do you say 铅笔 in English? How do you like it? What are you doing? Where are you going to? Could you tell me what time it is? How long did it take? What do you see? Do you mind if I smoke? I don’t think he will win his game. I pick you up in front of the hotel. It takes place in a school. Perhaps you’ve heard of him. The sooner I get to bed the better. I want to eat. I want you to tell me this. You have to share it with other tenants. You don’t have to carry much cash. You‘d better wear a light jacket. We should be able to resolve our difference. All this is due to our change in teaching methods Most scientists tend to agree with me. It’s likely to rain. Today we are going to hear report. I need to look at your car. Would you like to go out and get something to eat? She hopes to get a job. You make me happy. It makes me forget all my problems. He is trying to imitate speaker’s pronunciation. This should help you to remember it. You ask some body to tell you time I prefer to go school. She starts working. Why don’t we go dancing? Have you finished cleaning hall? He continued talking. You find people expressing many different opinions. Why do you keep asking such obvious question? I must have my TV set checked. Don’t open the door! Let’s go! Let me take you out for dinner. How beautiful she is! What a beautiful girl she is. Stand up! Get off the bus! Get on the bus! Get in the taxi! Get out of the car. Turn off the light. Go downstairs! Look at the blackboard! Look at me! Hurry up! Hold on! Wait a minute. Don’t be nervous! Don’t worry about it! Yes or no? Not at all. Never do that! Good heavens! Good gracious! Thank you very much. Thank you for helping me. Excuse me. Good morning! See you tomorrow. Tell me in your own words. Listen to the recording. Help yourself. Hand me the hammer. Give me a break! That’s too bad! Is that it? Mind your own business! I beg you pardon. Have a nice weekend. I can open the door. I can’t open the door. Can I open the door? What can I open? Could I open the door? Can’t you open the door? Why can you open the door? Could you tell me the way to the station? Could you tell me what time it is? Could you spell it? What can’t a deaf man do? Can you help me? What can I do for you? We can’t get there on time. They can be divided into three groups. I can do what you said. May I come in? May I sit down? May I offer a suggestion? May I use your pencil? May I take this chair? May I have some water? You must know the sound of each letter in the English alphabet. We may have good reason to be proud of ourselves. He is younger than I. He has more brothers than I. I have fewer brothers than you. He drinks more water than I. I drink less water than him. He is as well as you. Your car is as fast as mine. It was the most exciting match I’ve ever seen. Which is deeper a lake or an ocean? Which is faster a train or a bus? He is not so tall as I. I prefer to go rather than to stay. It is very useful to listen to the lesson once again. It’s time to watch TV. It would be quite impossible to enumerate all the things. It is necessary that he should be sent there at once. If you went there you would find him. If you had gone there you would have found him. I won’t believe it unless I see it with my own eyes. I wish I were a bird. I wish I had met my uncle yesterday. I wish I could go and visit my aunt tomorrow. I’m sorry to interrupt you. I gave the students a chance to say a few words too. I’ve got a taxi waiting outside. I hope you won’t find it all too difficult to understand and to remember. I wish I could talk to you about art. Who wrote the famous book entitled Treasure Island? You would somehow manage to make yourself understood what other people said to you. To do as you suggest would be out of the question. I think we’ve just enough time to learn a few more irregular verbs. We shall devote today’s lesson to the study of ONE English verb to get. Keeping one’s promise is something we should all do. I take ten minutes to get there. I won’t say anything until you tell him. I won’t phone my friend till Bob arrived.';
  var gameConfig = {
    type: Phaser.CANVAS,
    parent: 'playground',
    fps: {
      target: 30,
      min: 30,
      forceSetTimeOut: true,
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 500,
      height: 900,
      maxWidth: Infinity,
      maxHeight: Infinity,
      autoRound: true,
    },
  };
  var Game = class extends Phaser.Game {
    constructor () {
      super(gameConfig);
      this.currentLevel = 1;
      console.log(window.innerWidth);
      console.log('NEW ONE');
      this.gameOverScene = new GameOver(`gameover`);
      this.level = new Level(`level`, text);
      this.mainMenuScene = new MainMenu(`mainmenu`, this.level);
      this.scene.add(`mainmenu`, this.mainMenuScene, true);
      this.scene.add(`gameover`, this.gameOverScene, false);
      this.scene.add(`level`, this.level, false);
    }

    gameOver (score, currentLevel) {
      console.log(`score: ${score}`);
      console.log(`level: ${this.currentLevel}`);
      console.log(currentLevel.key);
      this.gameOverScene.level = currentLevel;
      currentLevel.scene.stop();
      this.scene.start('gameover');
    }

    newLevel(level, currentLevel=null) {
      if(currentLevel != null) {
        currentLevel.scene.stop();
      }
      level.scene.start();
    }

    mainMenu(currentLevel) {
      this.gameOverScene.scene.stop();
      currentLevel.scene.stop();
      this.mainMenuScene.level = currentLevel;
      this.mainMenuScene.scene.start();
    }
  };
  return Game;
});

