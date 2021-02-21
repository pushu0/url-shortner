FROM node:latest
WORKDIR /app
COPY ./package.json /app
# COPY ./api/package-lock.json /api
RUN yarn install
COPY ./ /app
EXPOSE 3000
# set app serving to permissive / assigned
ENV HOST=0.0.0.0
# set app port
ENV PORT=3000
RUN yarn tsc
CMD ["yarn", "start"]
