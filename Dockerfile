# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["sh", "-c", "node dist/sync.js && node dist/index.js"]
