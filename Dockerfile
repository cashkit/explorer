FROM node:lts-alpine

# Make the 'app' folder the current working directory.
WORKDIR /app

# Copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json .

# Install project dependencies
RUN npm install

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Create a build
RUN npm run build