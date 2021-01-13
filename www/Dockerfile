# # -------------------------
# # https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/
# # 
# # The article above will show how to build the design folder in docker.
# # -------------------------

# FROM node:12.18.2 as build

# ARG REACT_APP_SERVICES_HOST=/services/m

# WORKDIR /app

# COPY ./package.json /app/package.json
# COPY ./package-lock.json /app/package-lock.json

# RUN yarn install
# COPY . .
# RUN yarn build

# FROM nginx
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/build /usr/share/nginx/html

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./public_html /usr/share/nginx/html