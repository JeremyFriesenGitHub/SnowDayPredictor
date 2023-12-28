Weather App and Snow Day Project

Description:
This is a single-page app that is designed to use the OpenWeatherMap API so that users can login and check the current weather for any respective location. Users can register with usernames and passwords, which are stored via a SQLite3 database. Users can also provide feedback about the application so that the admins can see such feedback. 

Prerequisites:
Docker needs to be installed on the local machine in order to pull and use the image that is setup. Installing the Docker Desktop app is one of the easier solutions to this. You can find install instructions to Docker here: https://docs.docker.com/desktop/install/windows-install/ 

Setup Instructions: 
1) Go to https://home.openweathermap.org/api_keys to generate an API key in order to use this application. (Note: it may take a couple of hours for a new API key to register)
2) Once you have your API key, create an environment variable (in the command prompt) to use your API key. If you don't feel comfortable creating an environment variable in your local machine, you can skip to step 8 which uses the Docker Desktop.
3) Anywhere in the command prompt, once opened, for Windows OS type: setx OPENWEATHER_API_KEY "Your_API_Key_Goes_Here"
4) For Linux/macOS, run the commands: echo 'export OPENWEATHER_API_KEY="Your_API_Key_Goes_Here"' >> ~/.bashrc
                                      source ~/.bashrc
5) To run the application, you need to pull the docker image using the command: docker pull jeremyfriesen1/current-weather-app:Latest
6) Then run the command: " docker run -e OPENWEATHER_API_KEY=${OPENWEATHER_API_KEY} -p 1234:1234 jeremyfriesen1/current-weather-app:Latest ". If you have done this, you can skip to step 11.
7) Alternitavely, you can also use the Docker Desktop to complete these steps if you don't feel comfortable using the terminal.
8) If you are using the Docker Desktop, you can pull the image from the images tab by searching "current-weather-app".
9) Once the image is pulled from Docker Hub, you can run the image.
10) For the optional settings, make sure to use your environment variable OPENWEATHER_API_KEY and provide its according value (with your key) and setup the port to 1234. 
11) In any browser, once the image is running, paste 'http://localhost:1234' or 'http://localhost:1234/index' to see the HTML webpage.
12) For a full description of the site or how to setup, watch the YouTube tutorial at this link below: 

License:
Apache License 2.0



