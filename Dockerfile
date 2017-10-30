FROM node:8.6.0

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src/

# Install app dependencies
COPY package.json  .
COPY package-lock.json  .

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]