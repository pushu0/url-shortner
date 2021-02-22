FROM node:latest
WORKDIR /app
COPY ./package.json /app
RUN yarn install
COPY ./ /app
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
RUN yarn build
CMD ["yarn", "start"]
