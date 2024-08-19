#Using offical node runtime as parent image
FROM node:14

#Set the working directory 
WORKDIR /app

#copy package.json
COPY package*.json ./

#install dependencies
RUN npm install

#copy the rest of the application code to the container
COPY . .

#Expose the port of your app runs on
EXPOSE 3000

#Start the application
CMD ["npm", "start"]