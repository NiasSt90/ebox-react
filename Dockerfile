### STAGE 1: Build ###
FROM node:12 as build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json package-lock.json tsconfig.json /usr/src/app/
RUN npm install --silent
COPY public /usr/src/app/public
COPY src /usr/src/app/src
RUN npm run build

### STAGE 2: Production Environment ###
# build for example with:
# docker build -t $TAG \
#		--build-arg GIT_COMMIT=$(git rev-parse HEAD) \
#		--build-arg GIT_VERSION="$(git log --pretty='format:%h %s' -q -1)" .
FROM nginx:1.19-alpine
COPY nginx/default.conf.template /etc/nginx/templates/
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000
ARG GIT_COMMIT
ARG GIT_VERSION
LABEL platform=react git.commit=$GIT_COMMIT git.version=$GIT_VERSION
CMD ["nginx", "-g", "daemon off;"]
