# -------------------BUILD STAGE-------------------------
FROM node:20-alpine AS builder

# Creating a working directory
WORKDIR /app

# Copy package.json & package-lock.json to working directory ./ (/app)
COPY package*.json ./ 

# Install the dependencies (along with devDependencies) ci is faster and lock the version
RUN npm ci

# Copy tsconfig.json to work dir.
COPY tsconfig.json ./
# Copy all code to workdir. src dir.
COPY src ./src 

# Build  ( ts -> js)  ./src -> ./dist
RUN npm run build


#----------------------RUNTIME STAGE--------------------------
# Fresh container and working directory   
FROM node:20-alpine

WORKDIR /app

# Crating a non-root user app for better security
RUN addgroup -S app && adduser -S app -G app

# Copy package*.json 
COPY package*.json ./

# Change Ownership
RUN chown -R app:app /app

# Switch to non-root user
USER app

# Install only dependencies ( excluding devDependencies)
RUN npm ci --omit=dev 

# Copy the main js code (got from build stage--no ts code included) from /app/dist  to ./dist
COPY --from=builder /app/dist ./dist

# Only for documentation
EXPOSE 3000

# To start (When container starts → run this command)
CMD [ "node","dist/index.js" ] 

