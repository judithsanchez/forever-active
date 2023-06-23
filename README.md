# Forever Active

[🔗 Live preview](LOOM VIDEO)

Forever Active is a full stack web app created by [Irene Kulikova](https://www.linkedin.com/in/irene-kulikova-763bb7229/), built using React.js on the frontend, Node.js and Express on the backend, and SQL for the database.

Recently, I had the opportunity to contribute to the project by implementing authentication and authorization. With this new feature, users can now register and login securely. This enhancement adds an additional layer of functionality and improves the overall user experience of Forever Active.

**🔍 Keywords:** react.js, JavaScript, CSS3, HTML5, MySQL, async/await, API, Git, responsive design, bcrypt, JWT, Bootstrap, Axios.

### 🟡 Version 1

The project's features include a search across the SQL database of workouts. The search method was implemented using a junction table, combining a list of workouts and a list of search keywords. Moreover, the project enables the admin of the website to add more workouts using the input form, adding them to the database and eventually displaying them on the page.

- **🌱 Next version:** Improve design.
- **👾 Bugs:** None that I know of, but if you find one let me know!

### 📦 Dependencies

1. Run `npm install` in project directory. This will install server-related dependencies such as `express`.

2. Run `npm install jsonwebtoken bcrypt` in project directory.

3. Run `npm install axios` in project directory.

4. `cd client` and run `npm install`. This will install client dependencies (React).

5. Run `npm install react-bootstrap`.

6. Run `npm install google-fonts`.

7. Run `npm install react-router-dom`.

### 💾 Database Setup

To set up the MySQL database for the project, follow these steps:

1. Access the MySQL interface in your terminal by running the appropriate command.
2. Create a new database called "workouts" by executing the following command: `create database workouts`.
3. Create an `.env` file in the project folder and add the MySQL authentication information for the MySQL user. For example:

```
DB_HOST=localhost
DB_USER=root
DB_NAME=workouts
DB_PASS=root
SUPER_SECRET=shhhhh
```

4. Run `npm run migrate` in a new terminal window in the project folder. This command will create a table called 'adjectives' in the database.
5. The database has already been populated with the information of workouts.

## 📋 Tables in workouts:

| Tables_in_workouts |
| ------------------ |
| keywords           |
| users              |
| workout_keyword    |
| workouts           |

## 📋 Table structure for keywords:

| Field | Type         | Null | Key | Default | Extra          |
| ----- | ------------ | ---- | --- | ------- | -------------- |
| id    | int          | NO   | PRI | NULL    | auto_increment |
| text  | varchar(100) | YES  |     | NULL    |                |

## 📋 Table structure for workout_keyword:

| Field     | Type | Null | Key | Default | Extra          |
| --------- | ---- | ---- | --- | ------- | -------------- |
| id        | int  | NO   | PRI | NULL    | auto_increment |
| WorkoutID | int  | YES  | MUL | NULL    |                |
| KeywordID | int  | YES  | MUL | NULL    |                |

## 📋 Table structure for workouts:

| Field      | Type         | Null | Key | Default | Extra          |
| ---------- | ------------ | ---- | --- | ------- | -------------- |
| id         | int          | NO   | PRI | NULL    | auto_increment |
| title      | varchar(100) | YES  |     | NULL    |                |
| url        | varchar(255) | YES  |     | NULL    |                |
| embedID    | varchar(100) | YES  |     | NULL    |                |
| minutes    | int          | YES  |     | NULL    |                |
| calories   | int          | YES  |     | NULL    |                |
| iscomplete | tinyint(1)   | YES  |     | NULL    |                |

## 📋 Table structure for users:

| Field            | Type         | Null | Key | Default | Extra          |
| ---------------- | ------------ | ---- | --- | ------- | -------------- |
| id               | int          | NO   | PRI | NULL    | auto_increment |
| username         | varchar(255) | NO   | UNI | NULL    |                |
| isAdmin          | tinyint(1)   | NO   |     | NULL    |                |
| password         | varchar(255) | NO   |     | NULL    |                |
| favoriteWorkouts | text         | YES  |     | NULL    |                |

## 📋 Workout Categories:

| id  | text        |
| --- | ----------- |
| 1   | Kickboxing  |
| 2   | Yoga        |
| 3   | Booty       |
| 4   | Full Body   |
| 5   | Total Body  |
| 6   | Core        |
| 7   | Recovery    |
| 8   | Abs         |
| 9   | Legs        |
| 10  | Strength    |
| 11  | HIIT        |
| 12  | High Impact |

## 📋 Workout Categories Mapping:

| id  | WorkoutID | KeywordID |
| --- | --------- | --------- |
| 1   | 1         | 1         |
| 2   | 15        | 1         |
| 3   | 2         | 2         |
| 4   | 5         | 2         |
| 5   | 8         | 2         |
| 6   | 9         | 2         |
| 7   | 10        | 2         |
| 8   | 11        | 2         |
| 9   | 12        | 2         |
| 10  | 21        | 2         |
| 11  | 24        | 2         |
| 12  | 25        | 2         |
| 13  | 30        | 2         |
| 14  | 3         | 3         |
| 15  | 14        | 3         |
| 16  | 17        | 3         |
| 17  | 4         | 4         |
| 18  | 10        | 4         |
| 19  | 26        | 4         |
| 20  | 27        | 4         |
| 21  | 16        | 5         |
| 22  | 18        | 5         |
| 23  | 22        | 6         |
| 24  | 31        | 6         |
| 25  | 5         | 7         |
| 26  | 12        | 7         |
| 27  | 13        | 8         |
| 28  | 28        | 8         |
| 29  | 32        | 8         |
| 30  | 17        | 9         |
| 31  | 23        | 9         |
| 32  | 19        | 10        |
| 33  | 23        | 10        |
| 34  | 4         | 11        |
| 35  | 7         | 11        |
| 36  | 20        | 11        |
| 37  | 27        | 11        |
| 38  | 32        | 11        |
| 39  | 1         | 12        |
| 40  | 9         | 12        |

## 📋 Workout Details:

| id  | title                          | url                          | embedID     | minutes | calories | iscomplete |
| --- | ------------------------------ | ---------------------------- | ----------- | ------- | -------- | ---------- |
| 1   | High Impact Kickboxing Workout | https://youtu.be/qGuAQX39y6E | qGuAQX39y6E | 23      | 180      | 0          |
| 2   | Gentle Yoga Flow               | https://youtu.be/ZvQ-5ad-6Qo | ZvQ-5ad-6Qo | 20      | 100      | 0          |
| 3   | Booty Workout                  | https://youtu.be/XCTYwFKHsOA | XCTYwFKHsOA | 15      | 70       | 0          |
| 4   | HIIT Full Body Workout         | https://youtu.be/05HTb-oA5s4 | 05HTb-oA5s4 | 16      | 100      | 0          |
| 5   | Yoga Recovery Workout          | https://youtu.be/ZbuU0_Siul4 | ZbuU0_Siul4 | 15      | 60       | 0          |
| 6   | Dumbbel Workout                | https://youtu.be/p7JjICp_NrY | p7JjICp_NrY | 30      | 185      | 0          |
| 7   | HIIT Workout                   | https://youtu.be/fWzEv89SmZI | fWzEv89SmZI | 25      | 150      | 0          |
| 8   | Yoga for Beginners             | https://youtu.be/Gl1Eh61n4Ls | Gl1Eh61n4Ls | 15      | 50       | 0          |
| 9   | High Impact Yoga               | https://youtu.be/nsmq04gQyn0 | nsmq04gQyn0 | 10      | 45       | 0          |
| 10  | Full Body Yoga                 | https://youtu.be/cmRz6Q8DOrA | cmRz6Q8DOrA | 12      | 40       | 0          |
| 11  | Hip Mobility Yoga              | https://youtu.be/65KVj8EMJIc | 65KVj8EMJIc | 14      | 50       | 0          |
| 12  | Yoga for Recovery              | https://youtu.be/tcSDpenhuMo | tcSDpenhuMo | 20      | 70       | 0          |
| 13  | Abs Workout                    | https://youtu.be/yNC2ewTn6Bw | yNC2ewTn6Bw | 15      | 130      | 0          |
| 14  | Thighs and Booty Burn          | https://youtu.be/CxuAYfeA9X8 | CxuAYfeA9X8 | 15      | 130      | 0          |
| 15  | Kickboxing                     | https://youtu.be/6RfOb9_9_t4 | 6RfOb9_9_t4 | 15      | 130      | 0          |
| 16  | Total Body Workout             | https://youtu.be/JqynUEhocf8 | JqynUEhocf8 | 15      | 130      | 0          |
| 17  | Legs and Booty Workout         | https://youtu.be/dxHNhqA8Bhg | dxHNhqA8Bhg | 20      | 170      | 0          |
| 18  | Total Body Workout             | https://youtu.be/yOpKjRIMEtY | yOpKjRIMEtY | 25      | 180      | 0          |
| 19  | Strength Workout               | https://youtu.be/0mXRt9UmoZA | 0mXRt9UmoZA | 20      | 120      | 0          |
| 20  | HIIT Workout with a Buddy      | https://youtu.be/qw32DPzSEHo | qw32DPzSEHo | 20      | 120      | 0          |
| 21  | Yoga for Runners               | https://youtu.be/hYwSJk3H61M | hYwSJk3H61M | 30      | 100      | 0          |
| 22  | Cardio and Core Workout        | https://youtu.be/bhsyPi_WM64 | bhsyPi_WM64 | 25      | 150      | 0          |
| 23  | Legs Strengthening Workout     | https://youtu.be/vHWvMTIGJEQ | vHWvMTIGJEQ | 25      | 150      | 0          |
| 24  | Yoga for Feeling Calm          | https://youtu.be/AZO3UIJxaro | AZO3UIJxaro | 10      | 35       | 0          |
| 25  | Yoga for Feeling Strong        | https://youtu.be/HpbdD_hAmhI | HpbdD_hAmhI | 10      | 50       | 0          |
| 26  | Full Body Workout              | https://youtu.be/O_nWCgnBL5U | O_nWCgnBL5U | 15      | 100      | 0          |
| 27  | Full Body HIIT                 | https://youtu.be/yVrcrOMWdMY | yVrcrOMWdMY | 17      | 100      | 0          |
| 28  | Quick Abs Workout              | https://youtu.be/NKyaZKwR7Q8 | NKyaZKwR7Q8 | 10      | 50       | 0          |
| 29  | Dancing Workout                | https://youtu.be/ay6ici05_74 | ay6ici05_74 | 10      | 50       | 0          |
| 30  | Post-Natal Yoga                | https://youtu.be/az-YCJYuDhU | az-YCJYuDhU | 30      | 100      | 0          |
| 31  | Cardio and Core Burn           | https://youtu.be/7NkK1YTfcDU | 7NkK1YTfcDU | 33      | 200      | 0          |
| 32  | Quick HIIT Abs                 | https://youtu.be/sk-x1ejsctM | sk-x1ejsctM | 12      | 50       | 0          |

## 📋 (Test) Users Information:

| id  | username | isAdmin | password                                                     | favoriteWorkouts |
| --- | -------- | ------- | ------------------------------------------------------------ | ---------------- |
| 1   | eli      | 0       | $2b$10$PuWZjfFNBybZoq11xWDayehtlLDPmHVOHc3tpF7G.SZ/dGQbQc0y2 | [30,1,2]         |
| 2   | yuyi     | 1       | $2b$10$UERlZ3aNIkD4Pd4TF2Q5z.iiCZ44q76321pJECKxnPs3coTv2v1um | [6,15,8,9,5,4]   |

### 🗂️ File structure:

    📗 FOREVER ACTIVE
    ├── 📂 bin
    ├── 📂 client
    │   ├── 📂 node_modules
    │   ├── 📂 public
    │   ├── 📂 src
    │   │   ├── 📂 assets
    │   │   ├── 📂 components
    |   │   │   ├── 📂 assets
    |   │   │   ├── 💙 Admin.jsx
    |   │   │   ├── 💙 auth.jsx
    |   │   │   ├── 💙 Footer.jsx
    |   │   │   ├── 💙 Homepage.jsx
    |   │   │   ├── 💙 ListWorkouts.jsx
    |   │   │   ├── 💙 LoginPage.jsx
    |   │   │   ├── 💙 LogoutPage.jsx
    |   │   │   ├── 💙 Menu.jsx
    |   │   │   ├── 💙 MyProgress.jsx
    |   │   │   ├── 💙 Pagination.jsx
    |   │   │   ├── 💙 ProfilePage.jsx
    |   │   │   ├── 💙 SearchResult.jsx
    |   │   │   └── 💙 SignupPage.jsx
    │   │   ├── 🎨 App.css
    │   │   ├── 💙 App.jsx
    │   │   ├── 🎨 index.css
    │   │   └── 💙 main.jsx
    │   ├── 📄 index.html
    ├── 📂 guards
    │   └── 💛 userShouldBeLoggedIn.js
    ├── 📂 model
    │   ├── 💛 database.js
    │   ├── 💛 helper.js
    │   └── 💾 init_db.sql
    ├── 📂 node_modules
    ├── 📂 public
    ├── 📂 routes
    │   ├── 💛 index.js
    │   ├── 💛 keywords.js
    │   ├── 💛 search.js
    │   ├── 💛 users.js
    │   └── 💛 workputs.js
    ├── ⚙️ .env
    ├── 💛️ app.js
    ├── 🔑 LICENSE
    └── 📖 README.md
