# frontend/Dockerfile

FROM node

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Открываем порт, на котором будет работать Next.js
EXPOSE 3000

# Запускаем приложение в режиме разработки
CMD ["npm", "run", "dev"]
