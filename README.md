# Weather App and Snow Day Project

## Description
This single-page application uses the OpenWeatherMap API, enabling users to log in and check the current weather for any location. The application features user registration with usernames and passwords, securely stored in a SQLite3 database. Additionally, it includes a feedback system for users to share their thoughts about the application, providing valuable insights for administrators.

## Prerequisites
To run this application, Docker must be installed on your local machine. Installing Docker Desktop is recommended for ease of use. Installation instructions can be found at [Docker Desktop Installation](https://docs.docker.com/desktop/install/windows-install/).

## Setup Instructions
1. **API Key Generation**:
   - Visit [OpenWeatherMap API Keys](https://home.openweathermap.org/api_keys) to generate your personal API key (under My API keys). Note: Activation of a new API key may take a few hours.

2. **Pull Docker Image** (go to step 4 if you don't want to use the terminal to pull the image):
   - Run the following command:
     ```bash
     docker pull jeremyfriesen1/current-weather-app:Latest
     ```

3. **Run the Application**:
   - Execute:
     ```bash
     docker run -d -e OPENWEATHER_API_KEY="your_api_key" -p 1234:1234 jeremyfriesen1/current-weather-app:Latest
     ```
   - You should see your container id appear after this, if successful. The container is now running on your local machine. Proceed to Step 5. 

4. **Using Docker Desktop** (Alternative to Terminal):
   - If you prefer not to use the terminal, Docker Desktop provides a user-friendly interface.
   - Pull the image by searching "current-weather-app" in the search bar of the Docker Desktop.
   - Run the image, setting the `OPENWEATHER_API_KEY` in the Optional Settings as an environment variable, and configure the port to `1234`.

5. **Access the Application**:
   - Open a web browser and navigate to [http://localhost:1234](http://localhost:1234) or [http://localhost:1234/index](http://localhost:1234/index).

6. **Stop, Start and Remove the Container**:
   - Make sure to close your container once you are done with the application.
   - Run the following command to stop running the container:
     ```bash
     docker stop "container_id_or_name"
     ```
   - If you want to start the container again (once you have pulled the image sucessfully), you can use:
     ```bash
     docker start "container_id_or_name"
     ```
   - If you want to find your container ID, you can use the following:
     ```bash
     docker ps -a
     ```
   - If you want to remove your container, you can use the following (you need at least one container to run the application):
     ```bash
     docker rm "container_id_or_name"
     ```
     
7. **Remove the image** (optional):
   - If you want to remove the pulled image, you can use the following command:
     ```bash
     docker rmi "image_id"
     ```
   - If you want to get the IDs of your images, you can use the command:
     ```bash
     docker images
     ```
   - Note: If you have deleted the image and you want to run the application, you will need to pull the image again and then run the container.
   

8. **Tutorial**:
   - For a comprehensive walkthrough, you can watch a YouTube tutorial [here](https://youtu.be/6tFc3_HMQyU).

## License
This project is licensed under the Apache License 2.0.

