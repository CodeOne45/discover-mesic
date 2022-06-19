FROM node:12 AS discover-mesic-api

WORKDIR /root/
COPY ./ ./api/
RUN cd api && npm install

EXPOSE 5000

CMD ["node", "./api/index.js"]