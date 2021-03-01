FROM node:14.16.0
WORKDIR /usr/app
RUN npm i @material-ui/core
RUN npm i @material-ui/icons
RUN npm i firebase