FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# CMD will be overridden by docker-compose or command line arguments
CMD ["npm", "run", "start"]
