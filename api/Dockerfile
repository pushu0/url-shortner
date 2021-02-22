FROM node:latest
WORKDIR /api
COPY ./package.json /api
RUN yarn install
COPY ./ /api
EXPOSE 8080
RUN yarn tsc
CMD ["yarn", "docker"]
