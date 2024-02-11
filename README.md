<h1 align="center">LoveLearning Academy</h1>
<h2 align="center">Full stack project of a free online academy with free courses.</h2>
<h2>Presentation</h2>
Hello World! Im Rafael Portillo and this is my final project for CodeSpace Academy.


<h2>Getting Started</h2>

> [!IMPORTANT]
> You have to follow the steps for the project to work correctly.

<h3>Installing the project</h3>
<p>git clone https://github.com/rafapm1999/LovLearningAcademy_Project.git</p>

<h3>Installing dependences</h3>
<h4>Frontend</h4>
<ol>
  <li><code>cd frontend/</code></li>
  <li><code>npm install</code></li>
</ol>
<h4>Backend</h4>
<ol>
  <li><code>cd backend/</code></li>
  <li><code>npm install</code></li>
</ol>

<h3>Prepare the database</h3>
<ol>
  <li>Set up MongoDB: Make sure you have a MongoDB instance running.</li>
  <li>If the <code>.env</code> file does not exist in the Backend directory create a <code>.env</code> file and configure the following environment variables:
     <ul>
      <li>
        <code>
        # Content that the .env file must have in the backend directory
        PORT=8000
        MONGO_URI=mongodb://localhost:27017/training-project
        TOKEN=627de5fad350e14d5b472e6951cc8bb30c03054468e87b2a4ad0a35b4cc0d886
        REFRESH_TOKEN=215876161ecf774215fc8fcdf42592a1a24f20062dc195e517af8026d1e6199f
        </code>
      </li>
    </ul>
  </li>
  <li>
   
  </li>
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
