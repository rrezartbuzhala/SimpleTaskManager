
FROM node:20-alpine AS build
WORKDIR /app/simple-task-manager-app
COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build
FROM nginx:alpine AS production

COPY --from=build /app/simple-task-manager-app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
