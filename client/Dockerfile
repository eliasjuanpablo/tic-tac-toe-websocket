FROM node:10
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY package*.json /client/
RUN npm install --silent
COPY . /client/
EXPOSE 3000
CMD ["npm", "start"]
