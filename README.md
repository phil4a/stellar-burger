# Stellar-Burger

Stellar Burger — веб‑приложение для создания и оформления заказов на «звёздные» бургеры.

![Интерфейс Stellar Burger](public/stellar.png)

Учебный проект на Яндекс Практикум

## [Перейти на демо-сайт](https://stellar.dphil.ru/)

## Описание

Проект "Stellar Burger" - это веб-приложение для создания и оформления заказов на звездные бургеры.

## Технологии

- React
- TypeScript
- Vite
- Redux Toolkit + React Redux
- React Router
- React DnD
- WebSocket (лента заказов)
- Тесты: Vitest, Cypress
- UI: @ya.praktikum/react-developer-burger-ui-components

### Функциональность

- Создание и редактирование бургеров через DND
- Отправка заказа на сервер
- Регистрация и авторизация пользователей с помощью JWT
- Модальные окна c номерами заказа и информацией об ингредиентах
- Просмотр истории заказов пользователя и общей ленты заказов
- Unit и E2E тесты

### Запуск

```bash
npm install
npm run dev        # дев-сервер на http://localhost:3000
npm run build      # проверка типов + прод-сборка в dist/
npm run preview    # раздача собранного dist/ на http://localhost:3000
npm test           # юнит-тесты (Vitest)
npm run cypress    # e2e-тесты (нужен запущенный dev или preview)
npm run lint       # ESLint
```
