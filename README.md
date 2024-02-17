# SOEN-390-W2024

# Project Name: Estate flow

# Team Members:

Andy Sun 40192040 github: irisvella
<br>
Jeremie Garzon 40062316 github: jeremiegar
<br>
Sarah Abellard 40184667 github: sarahabellard
<br>
Ziyi Wang 40167122 github: Zeebruh326
<br>
Fatoumata Binta Barry 40213443
<br>
Yousef Enein 40115494 GitHub: yousefenein
<br>
Arshpreet Singh 40172137 ghub:Ashx11
<br>
barthan thirunavukarasu 40098158 github: bt919
<br>
Abisan Uthamacumaran 40078084 github: swaggyyyy2
<br>
Samuel collette 40175048 Github: vaqint
<br>

# Description

EstateFlow is a condo management app. The code for the mobile app and its companion Web are in the code down below. Follow these steps to install packages to use the project on your computer

# Clone the repository

git clone [Your Repo URL] project-name
cd project-name

# Setup Backend

- cd backend
- npm install
- create a .env file according to .env.example
  - database connection string can be a local or hosted postgres db
  - the secret variable can be any utf-8 string
- (optional) run 'npx prisma db push' to populate your db with the tables from the prisma.schema file
- npm run dev (or npm run build && npm run start for production)
- if the above gives you a "Cannot find module './lib/compat'" error, try deleting node_modules folder and run npm install again

# Setup Web App

cd web-app
npm install
cd ..

# Setup Mobile App

cd mobile-app
npm install
cd ..

# Start running Mobile App

cd mobile-app
npx expo start

# Start running web App

cd web-app
npm run dev
