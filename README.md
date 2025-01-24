# DevOps Project

Este projeto é uma API simples criada para praticar habilidades de DevOps, incluindo containerização com Docker, testes automatizados e integração contínua com GitHub Actions.

---

## Estrutura do Projeto

```
devops-project/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── src/
│   ├── index.js
│   └── app.js
├── tests/
│   └── app.test.js
├── Dockerfile
├── package.json
├── jest.config.js
└── README.md
```

---

## 1. API Simples

A API foi construída em Node.js utilizando o framework Express. Ela responde com uma mensagem JSON no endpoint `/`.

### **Código Principal**
#### `src/app.js`
```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello, DevOps!" });
});

module.exports = app;
```

#### `src/index.js`
```javascript
const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
```

---

## 2. Dockerização

O projeto inclui um arquivo `Dockerfile` para construir uma imagem Docker da API.

### **Dockerfile**
```dockerfile
# Usar uma imagem base do Node.js
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY package*.json ./
COPY src ./src

# Instalar dependências
RUN npm install

# Expor a porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
```

### **Comandos para Docker**
- **Build da imagem:**
  ```bash
  docker build -t devops-project .
  ```

- **Rodar o container:**
  ```bash
  docker run -p 3000:3000 devops-project
  ```

---

## 3. Testes Automatizados

Os testes foram implementados utilizando Jest e Supertest. Eles verificam a funcionalidade da API e cobrem cenários básicos.

### **Instalar Dependências de Teste**
```bash
npm install --save-dev jest supertest
```

### **Configuração de Testes**
#### `tests/app.test.js`
```javascript
const request = require("supertest");
const app = require("../src/app");

describe("API Tests", () => {
  it("should return a 200 status and the correct message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello, DevOps!" });
  });

  it("should return 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown");
    expect(response.status).toBe(404);
  });
});
```

### **Configuração do Jest**
#### `jest.config.js`
```javascript
module.exports = {
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./reports/test-report.html",
        includeFailureMsg: true,
        includeConsoleLog: true
      }
    ]
  ]
};
```

### **Rodar Testes**
Execute os testes com:
```bash
npm test
```

Relatórios de teste em HTML serão gerados no diretório `reports/`.

---

## 4. Pipeline CI/CD

O pipeline no GitHub Actions realiza as seguintes etapas:
- Instalar dependências.
- Rodar os testes automatizados.
- Construir a imagem Docker.
- Fazer upload do relatório de testes.

### **Arquivo de Configuração**
#### `.github/workflows/ci-cd.yml`
```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18

    - name: Install dependencies
      run: npm install

    - name: Run tests and generate report
      run: npm test

    - name: Build Docker image
      run: |
        docker build -t devops-project .

    - name: Upload test report
      uses: actions/upload-artifact@v3
      with:
        name: test-report
        path: reports/test-report.html
```

---

## 5. Próximos Passos

1. **Melhorar os Testes:** Adicionar cenários mais complexos, como autenticação e endpoints dinâmicos.
2. **Deploy Real:** Configurar deploy para serviços como AWS, Azure ou Heroku.
3. **Integrações Avançadas:** Usar ferramentas como SonarQube para análise de qualidade do código.

---

Se tiver dúvidas ou quiser expandir o projeto, sinta-se à vontade para colaborar! 🚀
