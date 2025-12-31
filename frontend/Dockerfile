# -------------------BUILD STAGE-------------------------
FROM node:20-alpine AS builder

# Creating a working directory
WORKDIR /app

# Copy package.json & package-lock.json to working directory ./ (/app)
COPY package*.json ./

# Install the dependencies (along with devDependencies) ci is faster and lock the version
RUN npm install

# Copy all code to workdir. src dir.
COPY . .

# Build  ( ts -> js)  ./src -> ./dist
RUN npm run build

#---------- RUNTIME STAGE -----------
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx","-g","daemon off;"]

