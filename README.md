# devops-project
Perfeito! Aqui está um esqueleto para você começar localmente:

---

### **1. Estrutura do Projeto**
Crie a seguinte estrutura de diretórios e arquivos:

```
devops-project/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── src/
│   └── index.js
├── Dockerfile
├── package.json
└── README.md
```

---

### **2. Código da API**
No arquivo `src/index.js`, adicione uma API simples:

```javascript
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello, DevOps!" });
});

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
```

---

### **3. Arquivo `package.json`**
Crie o arquivo `package.json` com as dependências necessárias:

```json
{
  "name": "devops-project",
  "version": "1.0.0",
  "description": "A simple API for DevOps practice",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

Instale as dependências com o comando:

```bash
npm install
```

---

### **4. Dockerfile**
Adicione o `Dockerfile` para criar a imagem Docker:

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

---

### **5. Pipeline no GitHub Actions**
No arquivo `.github/workflows/ci-cd.yml`, configure um pipeline básico:

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

    - name: Run tests (placeholder)
      run: echo "No tests yet!"

    - name: Build Docker image
      run: |
        docker build -t devops-project .
```

---

### **6. Rodar Localmente**
1. **Teste a API localmente**:
   ```bash
   node src/index.js
   ```
   Acesse: [http://localhost:3000](http://localhost:3000).

2. **Build e run do Docker**:
   ```bash
   docker build -t devops-project .
   docker run -p 3000:3000 devops-project
   ```
   Verifique novamente em [http://localhost:3000](http://localhost:3000).

---

### **7. Próximos Passos**
1. **Adicione testes** para garantir a qualidade.
2. Configure o deploy real (por exemplo, para AWS ECS ou Heroku).
3. Experimente com diferentes ferramentas de CI/CD, como Jenkins ou GitLab CI.

Se precisar de ajuda para expandir ou configurar algo, é só falar! 🚀