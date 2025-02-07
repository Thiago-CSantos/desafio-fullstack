# Projeto Fullstack - Django + Next.js

Este projeto é uma aplicação fullstack composta por duas partes principais: o **back-end**, desenvolvido com **Django Rest Framework**, e o **front-end**, construído com **Next.js** e **Sass**. O front-end também integra o **Jodit Editor** para edição de texto.

## Diagrama do Banco de dados

![Diagrama do banco de dados](diagrama-blogpay.png)

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

/project-root ├── /back-end # Contém o código do Django Rest Framework └── /front-end # Contém o código do Next.js com Sass e Jodit Editor

## Tecnologias Usadas

### Back-end (Django)
- **Django**: Framework Python para desenvolvimento rápido de aplicações web.
- **Django Rest Framework**: Conjunto de ferramentas para criar APIs RESTful.
- **PostgreSQL** : Banco de dados relacional utilizado para armazenar dados.
- **Docker** : Ferramenta para criar, implantar e executar aplicações em containers. O Docker é utilizado para garantir que a aplicação Django e o banco de dados PostgreSQL sejam executados em ambientes isolados e consistentes, independentemente do sistema operacional. O back-end é containerizado em um contêiner Docker, que facilita a instalação e a configuração do ambiente de desenvolvimento e produção.

### Front-end (Next.js)
- **Next.js**: Framework React para renderização do lado do servidor e criação de SPAs.
- **Sass**: Pré-processador CSS para facilitar a escrita de estilos.
- **Jodit Editor**: Editor WYSIWYG para edição de conteúdo rico no front-end.

## Rotas

### Back-end (Django Rest Framework)

Aqui estão as principais rotas da API:

- **GET** `/publication/`: Retorna publicações
- **POST** `/publication/`: Criar uma publicação
- **POST** `/login/`: Loga com usuario
- **POST** `/logout/`: Desloga usuario
- **POST** `/users/`: Criar usuario
- **PUT** `/publication/{id}/`: Atualizar o titulo e o conteudo da publicação
- **PATCH** `/publication/{id}/update_publish/`: Atualizar o titulo e o conteudo da publicação
- **DELETE** `/publication/{id}/`: Deleta uma publicação específico.

Exemplo para o **PATCH** `/publication/{id}/update_publish/`:

Response

```json
{
"id": "ea9a4aa1-7798-4b7c-b5d3-46e0dea4565f",
"title": "title",
"content": "<p>content</p>",
"is_published": false,
"created_at": "2025-02-07T02:59:24.511536Z",
"updated_at": "2025-02-07T05:32:27.941414Z",
"id_user": "112641ac-81dc-49f1-b9e0-9fee73591821"
}
```

Exemplo para o **PUT** `/publication/{id}`:

Body

```json
{
"title": "title",
"content": "JHOLHA content"
}
```

Response

```json
{
"id": "12072d3d-5e68-4213-87e0-7d9cfd0040cc",
"title": "title",
"content": "CONTENT",
"is_published": false,
"created_at": "2025-02-07T03:14:16.659045Z",
"updated_at": "2025-02-07T04:03:49.373707Z",
"id_user": "112641ac-81dc-49f1-b9e0-9fee73591821"
}
```

Exemplo para o **POST** `/publication/`:

Body

```json
{
"title": "teste",
"content":"contexto 4",
"id_user": "112641ac-81dc-49f1-b9e0-9fee73591821"
}
```

Response 

```json
{
"id": "c87faa6f-ffdb-40bd-923c-fe2c749c71f7",
"title": "teste",
"content": "contexto 4",
"is_published": false,
"created_at": "2025-02-06T23:13:36.988768Z",
"updated_at": "2025-02-06T23:13:36.988768Z",
"id_user": "112641ac-81dc-49f1-b9e0-9fee73591821"
}
```

Exemplo para o **POST** `/users/`:

Body

```json
{
  "name": "Nome do Usuário",
  "email": "teste@gmail.com",
  "password": "123",
  "is_admin": true
}
```

Response

```json
{
"id": "bf3fc704-ddc2-4a16-bc48-92c4f8176384",
"last_login": null,
"is_superuser": false,
"name": "Nome do Usuário",
"email": "testde@gmail.com",
"is_active": true,
"is_admin": true,
"created_at": "2025-02-07T13:08:27.983314Z",
"updated_at": "2025-02-07T13:08:27.983314Z",
"groups": [],
"user_permissions": []
}
```


Exemplo para o **DELETE** `/publication/`:

Response - status 204 - No Content



Exemplo de resposta para o **GET** `/publication/`:

```json
[
  {
  "id": 1,
  "title": "Exemplo 1",
  "content": "<p>teste<span style=\"background-color: rgb(152, 0, 0);\">aa</span></p>",
  "is_published": true,
  "created_at": "2025-02-07T02:58:56.938006Z",
  "updated_at": "2025-02-07T05:38:29.086815Z"
  },
  {
  "id": 1,
  "title": "Exemplo 1",
  "content": "<p>teste<span style=\"background-color: rgb(152, 0, 0);\">aa</span></p>",
  "is_published": true,
  "created_at": "2025-02-07T02:58:56.938006Z",
  "updated_at": "2025-02-07T05:38:29.086815Z"
  }
]
```

Exemplo para o **POST** `/login/`:

body

```json
{
"email": "email@gmail.com",
"password": "123"
}
```

Response

```json
{
"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MTUxNzkxOSwiaWF0IjoxNzM4OTI1OTE5LCJqdGkiOiI1YzZiNThhYzc1MzU0MDQ1YTBiMTU4ZDQ1ODM5NzU2MSIsInVzZXJfaWQiOiIxMTI2NDFhYy04MWRjLTQ5ZjEtYjllMC05ZmVlNzM1OTE4MjEiLCJlbWFpbCI6InRoaWFnb0BnbWFpbC5jb20iLCJuYW1lIjoiVGhpYWdvIiwiaXNfYWRtaW4iOnRydWV9.kIxUeKIlP1VIXBrY9Bl9F80240OQM_m98S_BvP7ZOXQ",
"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5NTMwNzE5LCJpYXQiOjE3Mzg5MjU5MTksImp0aSI6IjA5YzVhNTIzYzZhYTRkNmM4ZWI0YWRhYTEyZTkxMGZlIiwidXNlcl9pZCI6IjExMjY0MWFjLTgxZGMtNDlmMS1iOWUwLTlmZWU3MzU5MTgyMSIsImVtYWlsIjoidGhpYWdvQGdtYWlsLmNvbSIsIm5hbWUiOiJUaGlhZ28iLCJpc19hZG1pbiI6dHJ1ZX0.7bbi2wPpXlvuDxP5uY7jxQKA9a7tCfPBCUC4q280nxg",
"user_id": "112641ac-81dc-49f1-b9e0-9fee73591821",
"email": "email@gmail.com",
"name": "Thiago"
}
```

Exemplo para o **POST** `/logout/`:

body

```json
{
"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MTUxNzkxOSwiaWF0IjoxNzM4OTI1OTE5LCJqdGkiOiI1YzZiNThhYzc1MzU0MDQ1YTBiMTU4ZDQ1ODM5NzU2MSIsInVzZXJfaWQiOiIxMTI2NDFhYy04MWRjLTQ5ZjEtYjllMC05ZmVlNzM1OTE4MjEiLCJlbWFpbCI6InRoaWFnb0BnbWFpbC5jb20iLCJuYW1lIjoiVGhpYWdvIiwiaXNfYWRtaW4iOnRydWV9.kIxUeKIlP1VIXBrY9Bl9F80240OQM_m98S_BvP7ZOXQ"
}
```

Response

```json
{
"message": "Logout realizado com sucesso!"
}
```

### Front-end (Next.js)

As principais rotas do front-end são:

*   **/login**: Página de login da aplicação.
*   **/admin/create**: Página com o editor Jodit para criação de conteúdo.
*   **/admin/dashboard**: Página do painel de controle das publicações criadas.
*   **/admin/publish**: Página para publicar.

## Como Rodar o Projeto

### 1. Configuração do Back-end

1. **Executar o projeto**:
   Navegue até a pasta `back-end/blogpay` onde fica o docker-compose e rode o docker-compose:

   ```bash
    docker-compose up -d --build
   ```

### 2. Configuração do Front-end

1. **Executar o projeto**:
   Navegue até a pasta `front-end/blog` e rode o projeto:

   ```bash
    npm run dev
   ```
