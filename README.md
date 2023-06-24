# Snapchat-Face-Filter-Backend

Welcome to the backend repository of my `Snapchat-Face-Filter` project! This repository contains the backend code that complements the main `Snapchat-Face-Filter` repository.


## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js: [Download and install Node.js](https://nodejs.org)
- npm: npm is installed with Node.js


## Installation & Running the Server

1. **Clone the repository:**

    - Open your preferable Code Editor ( I would suggest using VS Code )
    - Click Terminal -> New Terminal
    - Run the Command `git clone https://github.com/ayush4460/Snapchat-Filter-Backend.git` in the Terminal
    - Git will start cloning the repository to your local machine -> Cloning into `Snapchat-Filter-Backend...`
    - Once the cloning process is complete, you will have a local copy of the repository in the specified directory.
    - Navigate to the project directory: `cd Snapchat-Filter-Backend`
    - Install the dependencies: In my case, no need to install dependencies.<br>
                                Still facing issues with the dependencies, run the following command in the terminal:<br>
                                `npm i cors express nodemon socket.io`


2. **Start the server:**

   - Start the server using the following command in the Terminal: `npm start`
   - The server will start running on `http://localhost:3000`.


3. **Open the website:**

   - Open your web browser and enter `http://localhost:3000` as the URL. You will be able to access the website and interact with it.



## API Endpoints

1) **Take picture:** Send a request to take a picture with the specific device.

   - Enter the following URL to hit the Take Picture API: `http://localhost:3000/api/take_picture/:deviceId`
   - GET /api/take_picture/:deviceId

   - The deviceId is `111` in my case, you can change it from the code and take any deviceId
   - If u change the deviceId, just make sure to update it in the URL when accessing the API


2) **Change filter:** Send a request to update the filter of the specific device.

   - Enter the following URL to hit the Change URL API: `http://localhost:3000/api/filter/:deviceId/:filterId`
   - GET /api/filter/:deviceId/:filterId

   - Currently, I have added 3 filter their filterIds are `'2','3' & '4'`
   - Update the filterId accordingly in the URL mentioned above to hit the API for that particular filter
   - The deviceId is `111` in my case, you can change it from the code and take any deviceId
   - If u change the deviceId, just make sure to update it in the URL when accessing the API

  
## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
  
Steps for Contributing:-
1) Fork the repository on GitHub.
2) Clone your forked repository to your local machine.
3) Create a new branch for your feature or bug fix.
4) Make the necessary changes and commit them.
5) Push your changes to your forked repository.
6) Submit a pull request to the original repository.


## License

This project is licensed under the [MIT LICENSE](LICENSE).


## Community Guidlines( Code of Conduct )

[Code of Conduct](CODE_OF_CONDUCT.md)


## Security Policy

Go through the [Security Policy](SECURITY) of this Project


## Deployment

The backend server is currently deployed and accessible at:

`http://localhost:3000`

You can access the website by opening this URL on your preferred web browser.

Feel free to modify the content to match your project structure and requirements.
