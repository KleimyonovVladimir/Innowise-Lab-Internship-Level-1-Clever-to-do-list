# Clever To-do List :heavy_check_mark:

This application was created for the development and improvement of the author's skills

![clever-to-do-list](https://user-images.githubusercontent.com/79158730/217897394-079c0973-b422-4c29-9a61-e3bcfe9fc08e.png)

## Task

Here you can find the task :point_right:
[https://drive.google.com/file/d/15jVnBPXaZrjs99KOUxp4TGq6Inau6xq*/view](https://drive.google.com/file/d/18I1PxOxZn2lwm__YeOtMNoWeiXygKwwN/view)

## How to run the app

1. _Clone the repo:_
   `$ git clone https://github.com/KleimyonovVladimir/Innowise-Lab-Internship-Level-1-Clever-to-do-list.git`
   
2. _Install dependencies:_ `yarn` or `npm install`

3. _Start the dev server:_ `yarn start` or `npm start`

## Database snapshot

In our firebase dataBase we have only one collection - _todos_ 

![image](https://user-images.githubusercontent.com/79158730/217899793-ce1fa35e-3909-44fa-9867-9e591663c830.png)

How you can see, _todos_ contains as much _todo-item_(document) as we want. Every _todo-item_ consists of id and 4 fields: date, title, description and status(active or done)

For work with query in our application were used firebase methods such as `getDoc()`, `updateDoc()`, `deleteDoc()` etc.

## Application stack :memo: 

This is application includes technologies such as: **_SASS, Material UI, Firebase_**.
