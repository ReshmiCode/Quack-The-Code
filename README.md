# Quack The Code

## Created By

- [Megan Tran](https://github.com/meganjtran)
- [Reshmi Ranjith](https://github.com/ReshmiCode)
- [Saloni Shivdasani](https://github.com/SaloniSS)
- [Vincent Vu](https://github.com/vincent-vu280)

## Links

[Website](https://quack-the-code.tech)  
[Alternate Website](https://quack-the-code.web.app/)  
[MacOS Desktop App](https://storage.googleapis.com/quack-the-code/Quack%20The%20Code.zip)   
[Windows Desktop App](https://storage.googleapis.com/quack-the-code/Quack%20The%20Code.exe)  
[Google Assistant Directory](https://assistant.google.com/services/invoke/uid/00000097827472c9?hl=en)    
[Demo Video]()    
[Devpost Submission](https://devpost.com/software/quack-the-code)

## Submission

Submitted for Same Home Different Hacks - MLH Summer League 2020

## Detailed Description

### Inspiration

Rubber duck debugging is used around the world by millions of programmers. As the name suggests, rubber duck debugging refers to debugging your code with the aid of a rubber duck. You describe and explain each step of your code, in detail, to the duck, until you notice the problem that's been causing the unexpected behavior. But what if you don’t have a rubber duck? Have you already heard about the rubber duck debugging and want to try a digital version? Would you like to try rubber duck debugging and want your duck to also have additional functionality? Introducing Quack The Code, your very own digital rubber duck coding companion!

### What it does

Quack The Code is a website and desktop productivity app which brings you all the aid of rubber duck debugging. You can explain your code, line by line, to it and it sits patiently listening for you to notice your mistake. If you can’t figure it on your own, it can ask you guided questions when you need help. The application rewards your progress by giving you breadcrumbs whenever you push work to Github, that you can feed to your ducky friend. It also provides you with inspirational quotes, facts, advice, jokes, and coding quizzes on the click of a button or your voice commands. Along with the visual app, we also provide to you smart home speaker plugins so you can get hands free help and support. The list of sample commands can be found on our [website](https://quack-the-code.web.app/).

### How we built it

- **Frontend:** The frontend was created using React for the website along with Electron for the Desktop app.

- **Backend:** The backend was built using JavaScript and Node.js and incorporated directly onto the frontend code for efficient use of resources.

- **Amazon Skills:** We used the Alexa Developer Console to create the base skill and setup the intents and utterances. From there, we used Node to create the functionality for each intent. We also used AWS S3 to store the custom quack audio file so the skill could access it.

- **Google Assistant:** We used GCP DialogFlow for the intent creation and conversation flow which is made using Firebase. We also used Google Cloud Functions with Node.js to call external APIs to provide information to the conversation agent.

- **DevOps:** We used GCP Firebase to host the website along with Google Cloud Storage to store the desktop app builds and connect it to the website for users to download. The desktop app was built and deployed using electron-builder.

### Challenges we ran into

We ran into some challenges with the overall styling of the website and app since we are mainly backend developers. We also ran into some obstacles with using audio files with React since this was our first time doing that.

### Accomplishments that we're proud of

This was our first time that we created a cross environment desktop app using Electron. We learnt a lot about operating system processes along with browser and application sessions. We also learnt more about cross platform linking. We also created all assets by ourselves including all images and sound effects.

### What we learned

We learnt a lot about developing Amazon and Google smart home activities and this was the first time we made one ourselves. We also learnt about using sprite animations and audio in React.

### What's next for Quack The Code

In the future, we plan to expand Quack The Code to different animals. We also plan to connect it to other tasks besides coding, such work/school websites like online classes. We would like to make it a more useful productivity app for computer science students that would reward things like finishing homework.
