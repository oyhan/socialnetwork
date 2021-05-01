FROM registry.gset.ir/node:alpine
WORKDIR /app
COPY . /app
COPY package.json .
COPY package-lock.json .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm install 
RUN npm run build
EXPOSE 3000
CMD npm start