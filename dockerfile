# specify node base image with alpine tag
FROM node:14-alpine

# copy files from current working directory to current working directory in container
COPY ./ ./
# install all required dependencies
RUN npm install

# default command to boot up node server
CMD ["npm", "start"]
