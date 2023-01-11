# orders

Orders - данное приложение представляет из себя CRM систему для организации учета предприятий и их сотрудников с целью спецподготовки и аттестации сварщиков.

**Использованные технологии:**  
:small_orange_diamond: Vue 3 + Quasar  
:small_orange_diamond: Node.JS + Express + MongoDb

---

### For development:

1. install server:

```
npm install
```

2. install client:

```
npm run client:install
```

### For production:

3. build client:

```
npm run client:build
```

### Live demo: https://site.com

Данные для входа в ознакомительную учетную запись:

```
email: test@mail.ru
password: test@mail.ru
```

Возможности ознакомительной учетной записи (клиентской):

- редактирование личных данных (в том числе своего предприятия)
- создание/удаление/редактирование сотрудников (слушателей)
- создание/удаление/редактирование заявок на повышение квалификации слушателей
- печать документов

Возможности администратора приложения:

- создание/удаление/редактирование личных данных всех пользователей
- создание/удаление/редактирование сотрудников (слушателей) для всех пользователей
- создание/удаление/редактирование заявок на повышение квалификации слушателей всех пользователей
- печать документов
- настройки приложения (системные, тематические)
