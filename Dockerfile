FROM node:latest
WORKDIR /api
COPY ./api/package.json /api
# COPY ./api/package-lock.json /api
RUN yarn install
COPY ./api /api
EXPOSE 8080
RUN yarn tsc
CMD ["yarn", "start"]
