FROM node   

ENV  MONGO_INITDB_ROOT_USERNAME=user \
     MONGO_INITDB_ROOT_PASSWORD=password

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . .

CMD ["node", "/src/app/index.js"]