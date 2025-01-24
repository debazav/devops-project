Vamos configurar um **reporter** para seus testes, que ajuda a gerar relatórios claros sobre os resultados dos testes. O Jest já possui suporte integrado para gerar relatórios, e você pode usar extensões para personalizar os relatórios ou integrá-los com outras ferramentas.

Aqui está como configurar o **Jest** com um reporter básico e, depois, como gerar um relatório mais completo usando a biblioteca **jest-html-reporter**.

---

### **1. Usar o Reporter Padrão do Jest**
Se você só precisa de uma visão básica, o Jest já possui suporte para exibir relatórios no terminal.

Adicione ao arquivo `package.json` uma configuração para exibir informações de cobertura de código:

```json
"jest": {
  "collectCoverage": true,
  "coverageReporters": ["text", "lcov"]
}
```

Agora, quando você rodar `npm test`, verá informações detalhadas sobre a cobertura de código no terminal, e um arquivo chamado `coverage/lcov-report/index.html` será gerado para você abrir no navegador.

---

### **2. Configurar o jest-html-reporter**
Se você quiser gerar um relatório visual em HTML, siga estas etapas:

#### **2.1. Instalar a Biblioteca**
Execute o comando para instalar o **jest-html-reporter**:

```bash
npm install --save-dev jest-html-reporter
```

#### **2.2. Configurar o Reporter**
Crie um arquivo de configuração chamado `jest.config.js` na raiz do seu projeto:

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

---

### **3. Executar os Testes**
Rode o comando de teste como de costume:

```bash
npm test
```

- Você verá um relatório gerado no diretório `./reports/` com o nome `test-report.html`.
- Abra o arquivo HTML no navegador para visualizar o relatório.

---

### **4. Adicionar ao Pipeline do GitHub Actions**
Atualize o arquivo `.github/workflows/ci-cd.yml` para armazenar o relatório como artefato:

```yaml
    - name: Run tests and generate report
      run: npm test

    - name: Upload test report
      uses: actions/upload-artifact@v3
      with:
        name: test-report
        path: reports/test-report.html
```

No GitHub Actions, o relatório estará disponível para download como um artefato.

---

### **Próximos Passos**
1. Integre outros reporters, como JSON ou JUnit, caso precise enviar relatórios para ferramentas externas.
2. Configure o Jest para rodar com parâmetros personalizados, como `--watch` para desenvolvimento contínuo.

Se precisar de ajuda com integrações mais avançadas, como cobertura de código ou integração com ferramentas específicas, é só avisar! 🚀