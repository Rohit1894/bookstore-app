# 📚 Bookstore Backend API

A **production-ready REST API** for managing **Books and Authors**, built using **Node.js, Express, PostgreSQL, and Drizzle ORM**.
The project demonstrates **real-world backend concepts** like relational data modeling, full-text search, indexing, joins, and clean API architecture.

---

## 🚀 Features

* 📖 CRUD operations for **Books**
* ✍️ CRUD operations for **Authors**
* 🔍 **Full-text search** on books (PostgreSQL `tsvector`)
* 🔗 Proper **Author–Book relationship**
* ⚡ Optimized queries using **indexes**
* 🧠 Clean separation of **routes, controllers, and DB layer**
* 🛡️ Input validation & meaningful HTTP status codes
* 🧪 Easy to test with Postman

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Drizzle ORM**
* **Drizzle Kit**
* **dotenv**
* **Postman** (for testing)

---

## 📂 Project Structure

```
bookstore-app/
├─ controllers/
│  └─ book.controller.js
├─ db/
│  └─ index.js
├─ middlewares/
│  ├─ auth.middleware.js
│  └─ logger.middleware.js
├─ routes/
│  ├─ author.routes.js
│  └─ book.routes.js
├─ src/
│  └─ db/
│     ├─ author.schema.js
│     ├─ book.schema.js
│     ├─ connection.js
│     └─ index.js
├─ .env
├─ .gitignore
├─ docker-compose.yml
├─ drizzle.config.js
├─ index.js
├─ logs.txt
├─ package-lock.json
└─ package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/bookstore
PORT=3000
```

---

## 🗄️ Database Schema

### Authors Table

| Column    | Type   | Description |
| --------- | ------ | ----------- |
| id        | UUID   | Primary Key |
| firstName | String | Required    |
| lastName  | String | Optional    |
| email     | String | Required    |

### Books Table

| Column      | Type   | Description              |
| ----------- | ------ | ------------------------ |
| id          | UUID   | Primary Key              |
| title       | String | Required                 |
| description | String | Optional                 |
| authorId    | UUID   | Foreign Key → authors.id |

---

## 🔍 Search & Indexing

* Full-text search using PostgreSQL:

```sql
to_tsvector('english', title) @@ plainto_tsquery('english', search)
```

* Optimized using **GIN index** on book titles.

---

## 📡 API Endpoints

### 📚 Books

#### Get all books

```http
GET /books
```

#### Search books

```http
GET /books?search=node
```

#### Get book by ID

```http
GET /books/:id
```

#### Create a book

```http
POST /books
Content-Type: application/json
```

```json
{
  "title": "Learn Node.js",
  "description": "Backend fundamentals",
  "authorId": "uuid-here"
}
```

#### Delete a book

```http
DELETE /books/:id
```

---

### ✍️ Authors

#### Get all authors

```http
GET /authors
```

#### Get author by ID

```http
GET /authors/:id
```

#### Create an author

```http
POST /authors
Content-Type: application/json
```

```json
{
  "firstName": "Hitesh",
  "lastName": "Choudhary",
  "email": "hitesh@example.com"
}
```

#### Get books by author

```http
GET /authors/:id/books
```

---

## 🧠 Important Implementation Details

### 🔗 Joins with Drizzle

* Books are fetched with author details using a **single SQL query**
* More efficient than ORM-based N+1 queries

### ❗ Common Bug Avoided

* Correct filtering using **primary key (`books.id`)**
* Prevented incorrect filtering using `authorId`

---

## ▶️ Running the Project

```bash
npm install
npm run drizzle:push
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## 🧪 Testing

* Import Postman collection
* Use environment variable:

```
BASE_URL=http://localhost:3000
```

---

## 📌 Future Improvements

* JWT Authentication
* Role-based access control
* Pagination & sorting
* Zod validation
* Rate limiting
* Dockerized deployment

---

## 👨‍💻 Author

**Rohit Lamba**
Backend & Full-Stack Developer
Learning by building real-world projects 🚀

---
