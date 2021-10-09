# Welcome to Instafake!

Instafake is a web application that allows users to post images and view/comment on the images posted by their friends. This project is inspired by [Instagram](https://instagram.com/), a website where individuals can upload their images, like and leave comments on other's images.
#### Live link: [Instafake](https://instafake2021.herokuapp.com/)
***

### Index
[Technologies](#technologies)

[Key Features](#key-features)

[Wiki Pages](#wiki-pages)

[Future Goals](#future-goals)

***

### Technologies
#### Front End
- JavaScript
- React-Redux
- CSS styling
- [Favicon.io](https://favicon.io/) for favicon
- Heroku (Hosting)

#### Back End
- Flask
- PostgreSQL (Database)
- SQLAlchemy
- AJAX
- Docker Container

***

### Key Features
- CSURF library used to prevent csrf attacks
- Flask-Login used to authorize users.
- Logged in users can view images posted by users they follow along with those image's associated comments and likes created by other users.
- Logged in users can post images that can be viewed, liked, and commented on by users that are following them. 
- Logged in users can edit their image captions, delete their images, upload an image to be used as their profile picture, as well as delete that image if they choose to do so.
- Logged in users can follow / unfollow users in order to see or hide their content.
- Redux Store State is used to manage data on the front end.
- Image hosting on AWS (Amazon Web Services)

***

### Wiki Pages
#### [API Documentation](https://github.com/arath1869/react-python-project/wiki/API-Route-Documentation)
#### [Database Schema](https://github.com/arath1869/react-python-project/wiki/Database-Schema)
#### [Feature List](https://github.com/arath1869/react-python-project/wiki/MVP-Feature-List)
#### [User Stories](https://github.com/arath1869/react-python-project/wiki/User-Stories)
***

### Future Goals
- Messaging
- Image Tags
