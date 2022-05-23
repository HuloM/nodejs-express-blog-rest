# specify node base image with alpine tag
FROM node:14.4.0-alpine

# set current working directory to keep files in specific path
WORKDIR '/app'

# using 2 seperate copy calls to allow for npm install to used cached version when not changing any file and only
# rerunning the command when a change is made to package.json

# copy files from current working directory to current working directory in container
COPY ./package.json ./
# install all required dependencies
RUN npm install

# after npm install is run copy everything and any changes will make it not run from cache without needing to redo npm install
COPY . .

# default command to boot up node server
CMD ["npm", "run", "start"]
