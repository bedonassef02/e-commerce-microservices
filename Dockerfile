FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install the Nest CLI for development
RUN npm install -g @nestjs/cli

# Expose the application port
EXPOSE 3000

# Start the application with hot-reload
CMD ["npm", "run", "start:dev"]
