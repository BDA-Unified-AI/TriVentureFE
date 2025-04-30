# Step 1: Use the official node image as the base image
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the Vite project
RUN npm run build

# Step 7: Use nginx as the base image to serve the build output
FROM nginx:alpine

# Step 8: Copy the built files from the previous step into the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start nginx
CMD ["nginx", "-g", "daemon off;"]
