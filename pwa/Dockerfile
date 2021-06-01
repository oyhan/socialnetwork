
# FROM node:alpine

# WORKDIR /app
# COPY . /app

# COPY package.json .

# RUN npm install 

# EXPOSE 3000

# CMD npm start

FROM registry.gset.ir/node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install -g npm@7.5.1
RUN npm install 
RUN npm install react-scripts@4.0.3 -g --silent
COPY . .
RUN npm run build

# production environment
FROM registry.gset.ir/nginx:stable-alpine	
COPY --from=build /app/build /usr/share/nginx/html

#fixes the react router problem 
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]