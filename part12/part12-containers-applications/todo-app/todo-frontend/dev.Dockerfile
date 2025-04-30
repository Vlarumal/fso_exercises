FROM node:20 AS dev-stage
WORKDIR /usr/src/app
ENV VITE_BACKEND_URL=http://localhost:3001/
COPY . . 
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]