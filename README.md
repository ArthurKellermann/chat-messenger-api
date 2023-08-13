# Chat Messenger API

This project provides a REST API for a chat messenger application. Users can register, login, and chat with other users. It ensures users are authenticated before accessing various features, such as sending and retrieving messages.

## Installation

Install Chat Messenger with npm

```bash
git clone https://github.com/ArthurKellermann/ts-api-chat.git
cd ts-api-chat/
npm install
```
    
## Lessons Learned

Building this project was a valuable experience in creating a secure chat system. Ensuring user authentication for every action posed a challenge, but it was overcome using middleware functions and JWT tokens. Handling user data, maintaining chat logs, and understanding the complexities of real-time chat were key takeaways.


## Tech Stack

- **Typescript**
- **Node.js**
- **Express.js**
- **MongoDB**
## API Reference

#### User Authentication & Registration

```http
  POST /user/login
```

| Parameter      | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `email`        | `string` | **Required**. User's email        |
| `password`     | `string` | **Required**. User's password     |

```http
  POST /user/register
```

| Parameter      | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `name`         | `string` | **Required**. User's name         |
| `email`        | `string` | **Required**. User's email        |
| `password`     | `string` | **Required**. User's password     |
| `userImage`    | `file`   | User's profile image              |

#### Messaging

```http
  POST /message/:id
```

| Parameter      | Type     | Description                             |
| :------------- | :------- | :-------------------------------------- |
| `text`         | `string` | **Required**. Message to be sent        |
| `id`           | `string` | **Required**. Recipient user's ID       |

```http
  GET /message
```

| Parameter      | Type     | Description                             |
| :------------- | :------- | :-------------------------------------- |
| `api_key`      | `string` | **Required**. Your API key              |

```http
  GET /message/:id
```

| Parameter      | Type     | Description                             |
| :------------- | :------- | :-------------------------------------- |
| `id`           | `string` | **Required**. User ID to retrieve messages from |

#### User Information

```http
  GET /user/:id
```

| Parameter      | Type     | Description                             |
| :------------- | :------- | :-------------------------------------- |
| `id`           | `string` | **Required**. User ID to retrieve info  |

```http
  GET /user
```

| Parameter      | Type     | Description                             |
| :------------- | :------- | :-------------------------------------- |
| `api_key`      | `string` | **Required**. Your API key              |

## Features

- User authentication and registration
- Real-time messaging
- User profile and avatar image
- Message history retrieval
  
## Contributing

Contributions are always welcome!  Feel free to clone the repository!


## Feedback

If you have any feedback, please contact me at arthur.kellermann956@gmail.com

## License

[MIT](https://choosealicense.com/licenses/mit/)

