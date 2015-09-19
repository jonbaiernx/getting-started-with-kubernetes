FROM node:latest

ADD src/ /src
WORKDIR /src

RUN npm install

ENV PORT=80
ENV FAKE_SSL_PORT=443

CMD ["node", "index.js"]