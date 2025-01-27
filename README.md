<h1>FHIR Resource Manager</h1>
  <p>This application is part of a prestudy made by Juuso Kärnä and Kasper Heikkinen at Terveystalo starting December 2024.<p>
  <p>The application is used for managing FHIR Resources in Azure Health Data Service + FHIR Service.
To use the application, it needs to be connected to an azure function that handles the HTTP communications with the FHIR Service.
To establish the connection, deploy function app from this repository:</p>
<p id="description">This application could be hosted on Azure static web app and the link need to be added to terraforms CORS.</p>
<p>After deploying, add FHIRPostResources functions function string to this applications app.jsx <azure-function-endpoint> in handleSubmit.</p>
  <h2>Features</h2>
  <ul>
    <li>Select from a list of default JSON payloads.</li>
    <li>Edit the JSON payload in a text editor.</li>
    <li>Submit the payload to a specified Azure function endpoint.</li>
    <li>View the response returned by the Azure function.</li>
  </ul>
    <h2>Note</h2>
  <p>At the moment the proof-of-concept doesn't impelment a broad error handling. To ensure that everything works fine, make sure you create all the necessary FHIR
  resources in the FHIR Service through this client, with the necessary references. These are:</p>
  <ul>
    <li>Orgnanization Resource</li>
    <li>Patient Resource with a reference to the organization</li>
    <li>Practitioner Resource</li>
    <li>And finally, the Encounter resource with references to the Patient and Practiotioner</li>
  </ul>
  <p>To listen to the encounters, open a connection with the Practitioners id in the Encounter React application.</p>

  <h2>How it Works</h2>
  <p>The application uses React for the front-end and Axios to send HTTP requests to an Azure function endpoint.</p>

<h2>Getting Started</h2>
  <h3>Install Dependencies</h3>
  <p>1. Clone this repository to your local machine:</p>
  <pre><code>git clone https://github.com/Kiisshen/FHIR_Resource_Manager.git</code></pre>

  <p>2. Navigate to the project directory and install dependencies:</p>
  <pre><code>cd FHIR_Resource_Manager</code></pre>
  <pre><code>npm install</code></pre>

  <h3>Usage</h3>
  <p>1. In the <code>App.js</code> file, update the API URLs to your own Azure service endpoints.</p>
  <p>2. Run the application:</p>
  <pre><code>npm run dev</code></pre>


  <h3>Instructions</h3>
  <p>1. Select a default payload from the dropdown menu.</p>
  <p>2. Modify the JSON payload in the textarea.</p>
  <p>3. Click the "Submit JSON" button to send the payload.</p>
  <p>4. The response from the Azure function will be displayed below.</p>
