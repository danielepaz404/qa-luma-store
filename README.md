[![Cypress Tests](https://github.com/danielepaz404/qa-luma-store/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/danielepaz404/qa-luma-store/actions/workflows/main.yml)

>  This is a challenge by [Coodesh](https://coodesh.com/)

# Q.A Challenge Luma Store

Aplicação dos conceitos de black-box testing, testando a página https://magento.softwaretestingboard.com com dados gerados através do https://randomuser.me.

## Instruções

Para instalar as dependências do projeto:
```javascript
npm install
```

Para rodar os testes e gerar o relatório:
```javascript
npm run test
```

## Tecnologias:

- JavaScript
- Cypress
- cypress-mochawesome-reporter

## Tarefas + comentários

**Obrigatório 1** - Para realizar o teste precisamos escolher a ferramenta de teste. Explicar o por quê da escolha, as vantagens e desvantagens dos que não foram escolhidos.
> Por que Cypress?
> - Conhecimento dos principais comandos; experiência com retry-ability e encadeamento
> - Setup simples (``` npx cypress open ```) incluindo estrutura de pastas inicial e runner
> - Painel integrado p/ visualizar cada etapa do teste e estado da DOM
> 
> Outras ferramentas:
> - Selenium:
>   - Pros: compatível com diversas linguagens e browsers
>   - Cons: exige maior customização e um ambiente de testes robusto
> - Playwright:
>   - Pros: usa browser engines ao inves de navegadores específicos facilitando testes de compatibilidade
>   - Cons: curva de aprendizado

**Obrigatório 2** - Você deverá atender aos seguintes casos de uso:

- [x] Se a página está carregando corretamente a home page;
- [x] Buscar por `shirt` no menu superior e revisar se a página de resultados carregou corretamente. Veja o diferencial 1 para incrementar este caso de uso;
- [x] Adicionar um produto no carrinho
> Esse fluxo em específico exigiu mais validações:  
>   1. Como são vários elementos envolvidos, é preciso esperar que cada um funcione corretamente. No caso dos swatches (opções de tamanho/cor), por exemplo, era preciso que estivessem visíveis, que tivessem sido selecionados e que a imagem correspondente tenha carregado.
>   3. **Loader/Formkey**: inicialmente, os resultados dos testes eram inconsistentes. A manipulação do Loader e da FormKey geravam diversos erros, como o de '.clone()' e Invalid FormKey. Resolvi isso usando modificando as interações de click/assertion e garantindo que elas estivessem em cadeia (cy.*), permitindo o retry automático do Cypress.
- [x] Realizar checkout
> Ao testar a função de checkout, o aspecto mais desafiador foi lidar com o campo de País e Estado. Notei que, dependendo do país selecionado, o campo "estado" poderia ser um select ou um input. Então implementei uma validação para decidir como preencher esse dado.

### Diferenciais
Além do que foi solicitado, existem itens adicionais para incrementar o projeto final. Você também pode adicionar algum recurso não citado anteriormente.

- [x] **Diferencial 1** - Buscar por `shirt` no menu superior e clicar no último resultado sugerido. Se possível, escute o retorno da requisição para saber o momento de clicar na interface;
> O último resultado sugerido varia. Para garantir o mínimo de previsibilidade, decidi esperar que a palavra de busca tenha sido completamente digitada e interceptei a requisição que continha ela
- [x] **Diferencial 2** - Criar uma conta na tela de Login/Cadastro. Observe que existe um captcha no formulário, então é necessário decidir como abordar este campo;
- **Diferencial 3** - Adicionar um produto **aleatório** do catalogo de moda masculina no carrinho;
- **Diferencial 4** - Adicionar comentário em um produto **aleatório** do catálogo de moda masculina no carrinho;
- [x] **Diferencial 5** - Gerar um relatório automático do teste.
