<h1 align="center">LoveLearning Academy</h1>
<h2 align="center">Full stack project of a free online academy with free courses.</h2>
<h2>Presentation</h2>
Hello World! Im Rafael Portillo and this is my final project for CodeSpace Academy.


<h2>Getting Started</h2>

> [!IMPORTANT]
> You have to follow the steps for the project to work correctly.

<h3>Installing the project</h3>
<code>git clone https://github.com/rafapm1999/LovLearningAcademy_Project.git</code>

<h3>Installing dependences</h3>
<code>cd LovLearning_Project</code>
<h4>Frontend</h4>
<ol>
  <li><code>cd frontend/</code></li>
  <li><code>npm install</code></li>
  <li><code>cd ..</code></li>
</ol>
<h4>Backend</h4>
<ol>
  <li><code>cd backend/</code></li>
  <li><code>npm install</code></li>
  <li><code>sudo systemctl start mongod.service</code></li>
</ol>
<h3>Prepare the database</h3>
<ol>
  <li>Set up MongoDB: Make sure you have a MongoDB instance running. <code>sudo systemctl status mongod.service</code></li>
  <li>Exit to the mongod.service: CTRL + C</li>
  <li>Go to the root of the project. (<code>cd ..</code>)</li>
  <li>Extract the zip file: <code>unzip BBDD.zip</code></li>
  <li>Import the dummy database file ("BBDD") to your MongoDB Compass:
    <br>
  <code>mongoimport --uri="mongodb://localhost:27017/LovLearningBBDD" --collection=courses --file=BBDD/courses.json</code>
    <br>
  <code>mongoimport --uri="mongodb://localhost:27017/LovLearningBBDD" --collection=logins --file=BBDD/logins.json</code>
    <br>
  <code>mongoimport --uri="mongodb://localhost:27017/LovLearningBBDD" --collection=contacts --file=BBDD/contacts.json</code>
  </li>
</ol>
<h3>Create the .env folder</h3>
<ol>
  <li>cd backend/</li>
  <li>Create the .env folder: through commands;
  <br>
  <code>echo "PORT=8000" > .env</code>
  <br>
  <code>echo "MONGO_URI=mongodb://localhost:27017/LovLearningBBDD" >> .env</code>
  <br>
  <code>echo "TOKEN=627de5fad350e14d5b472e6951cc8bb30c03054468e87b2a4ad0a35b4cc0d886" >> .env</code>
  <br>
  <code>echo "REFRESH_TOKEN=215876161ecf774215fc8fcdf42592a1a24f20062dc195e517af8026d1e6199f" >> .env</code>
  </li>
  <li>Create the .env folder: through IDE;
  <br>
    Copy this code and paste it into the previously created .env folder in the root of the backend directory.
   <br>
  <code>PORT=8000</code>
   <br>
  <code>MONGO_URI=mongodb://localhost:27017/LovLearningBBDD</code>
   <br>
  <code>TOKEN=627de5fad350e14d5b472e6951cc8bb30c03054468e87b2a4ad0a35b4cc0d886</code>
   <br>
  <code>REFRESH_TOKEN=215876161ecf774215fc8fcdf42592a1a24f20062dc195e517af8026d1e6199f</code>   
  </li>
</ol>
<h3>Let's start with the project</h3>
<h4>Running the backend</h4>
<ol>
  <li>In the Backend directory: <code>npm run dev</code></li>
</ol>

  > [!IMPORTANT]
  > You must to see this message in your shell.
> <br>
  > [nodemon] 2.0.22
> <br>
  > [nodemon] to restart at any time, enter `rs`
> <br>
  > [nodemon] watching path(s): *.*
> <br>
  > [nodemon] watching extensions: js,mjs,json
> <br>
  > [nodemon] starting `node ./app.js`
> <br>
  > Server running on port 8000
> <br>
  > Successfully connected to the database!!

<h4>Running the Frontend</h4>
<ol>
  <li>In the Frontend directory: <code>npm start</code></li>
</ol>
<h2>Comments</h2>
You can use a test user and administrator to test the project's functionalities. (Both users contain dummy data.)
<table>
  <thead>
    <tr>
      <td>EMAIL</td>
      <td>PASSWORD</td>
      <td>DESCRIPTION</td>
      <td>ROLE</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>admin@admin.com</td>
      <td>adminADMIN1$</td>
      <td>The dummy administrator. You can see all users as they are registered in the Academy, view all courses as well as update or delete them.</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>user@user.com</td>
      <td>userUSER1$</td>
      <td>The dummy user. You can get courses from the "Course Store" and view them.</td>
      <td>USER</td>
    </tr>
    </tbody>
</table>
Or register with your own data.

<h2>Endpoints</h2>
<table>
  <thead>
    <tr>
      <td>URL</td>
      <td>TYPE</td>
      <td>DESCRIPTION</td>
      <td>ROLE</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>http://localhost:8000/auth/login</td>
      <td>POST</td>
      <td>Access to your personal account</td>
      <td>PUBLIC</td>
    </tr>
    <tr>
      <td>http://localhost:8000/auth/signup</td>
      <td>POST</td>
      <td>Create your personal account</td>
      <td>PUBLIC</td>
    </tr>
    <tr>
      <td>http://localhost:8000/contact/contact-us</td>
      <td>POST</td>
      <td>Send a message for the administrators</td>
      <td>PUBLIC</td>
    </tr>
    <tr>
      <td>http://localhost:8000/auth/getuser/:id</td>
      <td>GET</td>
      <td>Get the user info</td>
      <td>USER</td>
    </tr>
     <tr>
      <td>http://localhost:8000/auth/:id</td>
      <td>PATCH</td>
      <td>Modificate info of the user.</td>
      <td>USER/ADMIN</td>
    </tr>
    <tr>
      <td>http://localhost:8000/auth/alluser</td>
      <td>GET</td>
      <td>Get the info of all users.</td>
      <td>ADMIN</td>
    </tr>
     <tr>
      <td>http://localhost:8000/auth/deleteusercourse/:userID/:courseID</td>
      <td>DELETE</td>
      <td>Delete downloaded users courses.</td>
      <td>USER</td>
    </tr>
     <tr>
      <td>http://localhost:8000/auth/refreshToken</td>
      <td>GET</td>
      <td>Refresh the token key.</td>
      <td>ANY</td>
    </tr>
     <tr>
      <td>http://localhost:8000/courses/all-courses</td>
      <td>GET</td>
      <td>Get all courses.</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>http://localhost:8000/courses/all-courses-true</td>
      <td>GET</td>
      <td>Get all courses with visibility option enable.</td>
      <td>USER</td>
    </tr>
    <tr>
      <td>http://localhost:8000/courses/:slug</td>
      <td>GET</td>
      <td>Get the course info.</td>
      <td>USER/ADMIN</td>
    </tr>
    <tr>
      <td>http://localhost:8000/courses/mycourses/:id</td>
      <td>GET</td>
      <td>Get the user courses list. </td>
      <td>USER</td>
    </tr>
    <tr>
      <td>http://localhost:8000/courses/create-course</td>
      <td>POST</td>
      <td>Create new course.</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>http://localhost:8000/courses/save-image</td>
      <td>POST</td>
      <td>Save the image </td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>http://localhost:8000/courses/edit/:id</td>
      <td>GET</td>
      <td>Get editable course data.</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>http://localhost:8000/courses/edit/:id</td>
      <td>PATCH</td>
      <td>Modificate course info.</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>http://localhost:8000/courses/delete/:id</td>
      <td>DELETE</td>
      <td>Delete course.</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>http://localhost:8000/users/verifyToken</td>
      <td>POST</td>
      <td>Verify the token key.</td>
      <td>ANY</td>
    </tr>
  </tbody>
</table>
