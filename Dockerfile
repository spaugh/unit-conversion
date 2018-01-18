FROM node:9-alpine

WORKDIR /usr

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY src src

ARG PRECISION=14
ENV PRECISION ${PRECISION}

EXPOSE 8080 

CMD PORT=8080 PRECISION=${PRECISION} yarn start
