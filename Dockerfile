FROM node:14.15.1-alpine

#ENV PORT 5000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Copying source files
#COPY . /usr/src/app

#RUN npm install

# Building app
#RUN npm run build
EXPOSE 5000

# Running the app
CMD ["npm", "run", "start"]