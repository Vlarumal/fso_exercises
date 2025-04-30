FROM node:20 AS dev-stage
WORKDIR /usr/src/app
ENV VITE_BACKEND_URL=http://localhost:8080/api/
COPY . . 
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]