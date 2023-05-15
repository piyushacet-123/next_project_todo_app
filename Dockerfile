# Use the official Node.js v14 image as the base image
FROM node:alpine as base

# Set the working directory inside the container
WORKDIR /todo_app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code to the container
COPY . .

# Set the environment variable for the URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the Next.js application
RUN npm run build

# Start the application when the container is run
CMD ["npm", "run", "start"]
