# Echo - Rede Social

Projeto desenvolvido para a disciplina de Desenvolvimento de Software para Web.

O Echo é uma rede social inspirada no Twitter (X), permitindo autenticação de usuários, publicação de posts e interação através de curtidas.

---

# 👥 Integrantes

- Maria Clara Pereira Lima
- Joaby Henrique

---

# 📚 Tecnologias Utilizadas

## Front-end

- React
- Vite
- React Router DOM
- Axios
- CSS

## Back-end

- Node.js
- Express
- JWT
- Bcrypt

## Banco de Dados

- SQLite3

---

# 📁 Estrutura do Projeto

```
Echo/
│
├── backend/
│   ├── src/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── prompts/
│
└── README.md
```

---

# 🚀 Como executar o projeto

## 1 - Clonar o repositório

```bash
git clone https://github.com/mariaclaraprlima57/G2---DesenvolvimentoWeb.git
```

Entre na pasta

```bash
cd G2---DesenvolvimentoWeb
```

---

# Executando o Back-end

Entre na pasta

```bash
cd backend
```

Instale as dependências

```bash
npm install
```

Execute

```bash
npm run dev
```

Servidor disponível em

```
http://localhost:3000
```

---

# Executando o Front-end

Abra outro terminal.

Entre na pasta

```bash
cd frontend
```

Instale as dependências

```bash
npm install
```

Execute

```bash
npm run dev
```

Aplicação disponível em

```
http://localhost:5173
```

---

# 🗄 Banco de Dados

O projeto utiliza SQLite3.

O banco de dados é criado automaticamente na primeira execução.

Arquivo:

```
backend/src/database/echo.db
```

---

# 🔐 Funcionalidades

## Usuário não autenticado

- Visualizar publicações

## Usuário autenticado

- Cadastro
- Login
- Logout
- Criar publicações
- Curtir publicações
- Remover curtidas

---

# 🛡 Segurança

- Senhas criptografadas utilizando Bcrypt.
- Autenticação utilizando JWT.
- Rotas protegidas por Middleware.

---

# 📂 Estrutura do Back-end

```
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── server.js
└── package.json
```

## Organização das pastas

### config

Responsável pela configuração do banco de dados.

### controllers

Recebem as requisições HTTP e chamam os serviços.

### middleware

Contém o middleware responsável pela autenticação JWT.

### models

Realizam operações diretamente no banco de dados.

### routes

Definem as rotas da API.

### services

Implementam as regras de negócio.

### utils

Funções auxiliares, como validações.

---

# 🎨 Diferenciais

- Interface inspirada no Twitter (X)
- Tema Claro/Escuro
- Contador de caracteres
- Layout responsivo
- Navegação intuitiva

---

# 🤖 Uso de Inteligência Artificial

Durante o desenvolvimento foram utilizados modelos de IA para:

- geração de componentes React;
- organização da estrutura do projeto;
- criação de estilos CSS;
- auxílio na implementação da autenticação JWT;
- correção de erros;
- documentação.

Todos os principais prompts utilizados encontram-se na pasta:

```
prompts/
```

---
