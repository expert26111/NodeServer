FROM node:8.6.0

# Create app directory
WORKDIR /usr/src/

# Install app dependencies
COPY package.json .

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]