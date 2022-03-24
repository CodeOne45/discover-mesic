FROM node:12 AS discover-mesic
WORKDIR /usr/src/app
COPY app/ ./my-app/
RUN cd my-app && yarn install && yarn build

FROM node:12 AS server-build
WORKDIR /root/
COPY api/ ./api/
RUN cd api && npm install

EXPOSE 3080

CMD ["node", "./api/index.js"]