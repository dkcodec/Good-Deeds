# backend/Dockerfile

# Используем базовый образ для Node.js
FROM node

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт, который использует приложение
EXPOSE 3001

# Команда для запуска приложения
CMD ["npm", "run", "start:prod"]
