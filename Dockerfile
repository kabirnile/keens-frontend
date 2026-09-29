
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN if [ ! -f .env ]; then cp .env.example .env 2>/dev/null || true; fi

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

