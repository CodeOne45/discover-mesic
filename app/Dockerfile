FROM node:14 AS discover-mesic
# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./package*.json ./

# Install dependencies in /app
RUN yarn install --no-lockfile

# Copy the rest of our Next.js folder into /app
COPY ./ .

RUN yarn build
# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line 
CMD ["yarn", "start"]

