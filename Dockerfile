FROM node:12 AS discover-mesic
# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./app/package*.json .

# Install dependencies in /app
RUN yarn install --no-lockfile

# Copy the rest of our Next.js folder into /app
COPY ./app .

RUN yarn build
# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line 
CMD ["yarn", "dev"]

FROM node:12 AS discover-mesic-api

WORKDIR /root/
COPY api/ ./api/
RUN cd api && npm install

EXPOSE 5000

CMD ["node", "./api/index.js"]