# 🧠 Apoia-me Server

Este é o backend do projeto Apoia-me, construído com Node.js, TypeScript, PostgreSQL, Clean Architecture e SOLID. Ele gerencia autenticação, criação de contas e geração automática de URLs públicas para perfis de usuário.

## 📁 Estrutura de Pastas

```plaintext
  src/
    ├── data/                   # Casos de uso e lógica de dados
    ├── domain/                 # Entidades e interfaces de domínio
    ├── infra/                  # Implementações externas (DB, libs, etc.)
    ├── main/                   # Configurações da aplicação (rotas, server, composição das classes)
    ├── presentation/           # Controllers e protocolos de entrada
    └── validation/             # Lógica de validações
```

## ⚙️ Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- TypeORM
- Jest (testes)
- Bcrypt (hash de senhas)
- JWT (autenticação)
- Crypto (geração de IDs únicos)
- Validator (validação de e-mails)
- Husky
- Lint Staged
- Eslint
- Module-Alias

## 📌 Funcionalidades

✅ Cadastro de usuários

✅ Geração automática e única de **slug** com base no nome

✅ Login com autenticação via JWT

✅ Arquitetura limpa e escalável

✅ Validações reutilizáveis

✅ Cobertura de testes com Jest

## 📐 Princípios de Arquitetura Aplicados

Este projeto segue os princípios do Clean Architecture e do SOLID. Entre eles, destaca-se:

✅ Single Responsibility Principle (SRP): Cada classe tem uma única responsabilidade bem definida.

✅ Open/Closed Principle (OCP): As classes estão abertas para extensão, mas fechadas para modificação.

✅ Interface Segregation Principle (ISP): Interfaces pequenas e específicas para evitar dependências desnecessárias.

✅ Dependency Inversion Principle (DIP):
As classes de alto nível não dependem de implementações concretas, e sim de abstrações (interfaces).
Isso é evidenciado por:

- Injeção de dependências nos use cases, como DbAddAccount, AccountUrl, DbAuthentication.

- Implementações reais, como AccountPostgresRepository, são passadas por composição no main.

- Facilitando testes unitários com stubs e mocks, isolando totalmente os casos de uso das dependências externas (DB, crypto, JWT, etc).

## 🚀 Como Executar o Projeto

1. Clone o repositório:

```bash
  git clone https://github.com/Rafasantt/apoia-me-server.git
  cd apoia-me-server
```

2. Instale as dependências:

```bash
  npm install
```

3. Crie e configure as variáveis de ambiente de acordo ao .env.example.

4. Rode as migrations do banco:

```bash
  npm run migration:generate
  npm run migration:run
```

5. Inicie o servidor:

```bash
  npm run dev
```

## 📫 Rotas Disponíveis

| Método | Rota        | Descrição               |
| ------ | ----------- | ----------------------- |
| POST   | /api/signup | Criação de nova conta   |
| POST   | /api/login  | Autenticação do usuário |

1. Body /api/signup:

```json
{
  "name": "",
  "email": "",
  "password": "",
  "passwordConfirmation": "",
  "role": "admin"
}
```

2. Body /api/login:

```json
{
  "email": "",
  "password": ""
}
```

## 🚧 Em Desenvolvimento

- [ ] Integração com sistema de pagamentos
- [ ] Split de pagamento
- [ ] Dashboard com estatísticas da conta

## 👨‍💻 Autor

Feito por Rafael Conceição
