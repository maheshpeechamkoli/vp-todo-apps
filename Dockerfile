# Stage 1: Build Stage
FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app/react-app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app/react-app

# Copy built files from the Build Stage
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/

# Copy package.json and vite.config.ts
COPY package.json .
COPY vite.config.ts .

# Install TypeScript
RUN npm install typescript

# Copy the .env file
COPY .env .

# Expose port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "preview"]
