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
  <li>Extract the zip file: <code>unzip mongoDB-LovLearning_Project.zip</code></li>
  <li>Import the database file ("mongoDB-LovLearning_Project"): <code>#</code></li>
</ol>
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
  </tbody>
</table>
