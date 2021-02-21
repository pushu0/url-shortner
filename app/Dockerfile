FROM node:latest
WORKDIR /api
COPY ./package.json /api
# COPY ./api/package-lock.json /api
RUN yarn install
COPY ./ /api
EXPOSE 8080
RUN yarn build
CMD ["yarn", "start"]
