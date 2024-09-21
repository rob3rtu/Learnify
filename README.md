
![logo](https://github.com/rob3rtu/Learnify/blob/main/frontend/public/logo.ico?raw=true) 

# Learnify - Bachelor's Final Project

Learnify is a web application that helps both teachers and students when it comes to managing materials such as courses, seminars, laboratories or other external resources made available by future graduates.

When it comes to the technologies used, Learnify is built around Typescript. For the frontend, I used React in combination with Chakra UI, which is hosted on vercel.com. The backend was made in Express with a PostgreSQL database, these being hosted on render.com.



## 👨🏻‍💻 Roles and Permissions
The roles are listed in ascending order regarding persimissions, meaning that a role has all the persimissions of the roles above.


- **Student**: this is the base role, which can see all the classes available. He can upload "student materials" and can interact with others posts via like and comments.

- **Professor**: this is the medium role, which can see only it's classes and can upload official materials, like the course notes, seminars and laboratories. Also this role can delete any post, including student's materials.

- **Admin**: this is the ultimate role, who can manage the classes in the app, and also the users: an admin can delete your account or can change your role.


## 🔐 Login

![login screen](https://github.com/rob3rtu/Learnify/blob/main/readme_images/login.png?raw=true)


The authentication in this app is made with the Magic Link method: you enter the email, which is checked to see if it is a school account, and the a mail with an auth link will be sent; once you click the link, you will be logged in into the app.

## 🏠 Home Screen

![home screen](https://github.com/rob3rtu/Learnify/blob/main/readme_images/homepage.png?raw=true)

Once you log in into the app, this is the homescreen that will welcome you. There you have a nav bar with all the filters you need in order to find the classes you are looking for: specialization, year and semester. The below there are listed all the classes according with the filters. For the design of this screen I inspired from MS Teams because I find it clean and easy to read.


## 📚 Class Screen

![class screen](https://github.com/rob3rtu/Learnify/blob/main/readme_images/course.png?raw=true)

This may be the most important screen of the app. Here are listed all the materials posted by students and teachers, and you cand filter them by that criteria using the tabs in the navigation bar at the top. Besides that, you can sort them by the number of likes in order to see the most appreciated posts, or you can filter the posts you've liked.


## 💬 Chat Screen

![chat screen](https://github.com/rob3rtu/Learnify/blob/main/readme_images/chat.png?raw=true)

Every class has a dedicated live chat, made with sockets, to help students to interact with their theachers and other colleagues.


## 👨🏻‍🎓 Profile Screen

![profile screen](https://github.com/rob3rtu/Learnify/blob/main/readme_images/profile.png?raw=true)

On your profile screen you can manage your posts and your profile picture, and if you are an admin, this is the place where you can also manage all the account in the app.
