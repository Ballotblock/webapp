# webapp
Web App / Client for Ballotblock


<h3> 2/28/2018-Note: code is kinda messy, will need some refactoring to better design and logic flow </h3>


This application uses the create-react-app package to generate a skeleton application that can then be conifgured. 
For more information on it, https://reactjs.org/ is a website that contains some details. 

There are several npm commands that are useful in testing and deploying. 

1. npm run start - start the web application hosted locally 

2. npm run build - creates a "build file" that can be used for deployment.  The content you would see on the branch "DeployBranch" 
                contains the contents of this file. 

3. npm install while in the package.json directory would install all the necessary node modules. There might be issues starting the app         locally without first installing the dependencies. 

Below is a picture to document the various components used in the ui, to make it easier for anyone to jump in and work on it. 

![](ComponentStructure.png)
