Щоб запустити цей проект на своєму комп'ютері, вам потрібно виконати наступні кроки:

1. Клонувати репозиторій:
   git clone https://github.com/Ivanzhr/testForInsiders.git

2. Перейти до папки проекту:
   cd project-folder

3. Встановити необхідні залежності:
   npm install

4. Запустити локальний сервер:
   npm start

Технології, які використовуються в цьому проекті:

- **React** для створення інтерфейсу користувача.
- **TypeScript** для типізації коду.
- **CSS** для стилізації.
- **localStorage** для збереження даних про користувачів на клієнтському боці.
- **npm** для управління залежностями.

Після цього ви зможете відкрити додаток у браузері за адресою http://localhost:3000

Проект складається з таких основних частин: 
App.tsx — головний компонент, де відбувається маршрутизація та завантаження даних у localStorage
data.ts — файл для збереження даних, які потім імпортуються у App
User.tsx — компонент, де ми бачимо список користувачів, а також маємо можливість їх додавати, видаляти та фільтрувати
EditUser.tsx — компонент для редагування користувачів та завантаження відредагованого масиву у localStorage
App.css, User.css, EditUser.css — файли для стилізації веб-додатку.

Примітки:

- Локальне зберігання даних (`localStorage`) використовується для збереження користувачів, тому після перезавантаження сторінки вони не зникають.
- Всі дані користувачів (ім'я, департамент, країна, статус) зберігаються як об'єкти в масиві.
- Фільтрація користувачів виконується за допомогою методів масиву `filter`, що дозволяє зберігати ефективність навіть при великій кількості користувачів.


