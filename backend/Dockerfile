FROM node:20-alpine

WORKDIR /app

# Устанавливаем OpenSSL для Prisma
RUN apk add --no-cache openssl

# Копируем package files
COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем ВСЕ зависимости (включая devDependencies для сборки)
RUN npm install

# Генерируем Prisma Client
RUN npx prisma generate

# Копируем исходный код
COPY . .

# Собираем TypeScript
RUN npm run build

# Удаляем devDependencies для уменьшения размера образа
RUN npm prune --production

# Порт
EXPOSE 3001

# Запуск
CMD ["npm", "start"]