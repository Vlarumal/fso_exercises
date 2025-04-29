FROM node:20.9.0-bullseye-slim@sha256:330fa0342b6ad2cbdab30ac44195660af5a1f298cc499d8cbdf7496b02ea17d8
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENV DEBUG=todo-express-backend:*
CMD ["npm", "run", "dev", "--", "--host"]