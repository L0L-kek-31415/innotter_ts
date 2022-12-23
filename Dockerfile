FROM node:14.16.0-alpine3.13 as build-stage
WORKDIR /app/front

COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.17-alpine
COPY --from=build-stage /app/front/build/ /usr/share/nginx/html
COPY ./nginx-setup.conf /etc/nginx/conf.d/default.conf
