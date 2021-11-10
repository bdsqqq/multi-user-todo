
# Multi User Todo

Esse é um projeto criado para a avaliação técnica de Igor Bedesqui.
## Demo
Você pode acessar uma demo do projeto em https://multi-user-todo.vercel.app

## Rode_localmente

Certifique-se de ter uma versão LTS de NodeJS instalada. 

Clone o projeto

```bash
  git clone https://github.com/bdsqqq/multi-user-todo
```

Navegue até o diretório do projeto
```bash
  cd multi-user-todo
```

Instale as dependencias
```bash
  yarn install
```

Inicie o ambiente local
```bash
  yarn dev
```


OBS:
O projeto foi desenvolvido utilizando yarn, é possivel rodar todos os comandos utilizando `npm run` mas não posso garantir que todas as dependencias serão linkadas corretamente durante a instalação já que não existe package.lock no projeto. Caso encontre algum problema rodando com npm, por favor, tente com yarn.


## Build_de_produção

Crie uma build de produção
```bash
  yarn build
```

Execute a build localmente
```bash
  yarn start
```


## Rodando_testes

Para testar a aplicação com Cypress, precisamos que um servidor local já esteja rodando. Veja [Rode localmente](#Rode_localmente) ou [Build de produção](Build_de_produção).

Abre a suite de testes em uma interface. Clique em "Run 2 integration specs" para rodar todos os testes.
```bash
  yarn cypress
```

Executa os testes no console e cria replays da navegação.
```bash
  yarn cypress:headless
```

Alternativamente você pode usar os seguintes comandos para rodar ambos o servidor da aplicação e o servidor testes em apenas um terminal. **É necessário criar uma build de produção**, veja [Build de produção](Build_de_produção).

Abre a suite de testes em uma interface. Clique em "Run 2 integration specs" para rodar todos os testes.
```bash
  yarn e2e
```

Executa os testes no console e cria replays da navegação.
```bash
  yarn e2e:headless
```

## Tech Stack

- React
- NextJS
- Typescript
- TailwindCSS
- RadixUI colors
- SWR
- Cypress
## Desenvolvimento
Durante o desenvolvimento criei um roadmap simplificado listando todas as features que necessárias e descrevendo-as. Além disso, usei conventional commits para o versionamento do projeto. Caso queira checar meu roadmap, veja os commits, eles são um reflexo quase perfeito do que havia planejado.
## O Desafio
Nós queremos entender como é o processo de desenvolvimento de software para você. Sinta-se livre para usar o que considera como boas práticas em desenvolvimento de software.

Consumir API:
1- Utilizar a API https://jsonplaceholder.typicode.com/ para criar um TODO list.

2 - A página inicial do TODO deve mostrar todos os usuários.

3 - Ao clicar no usuário o site deve levar para uma página que lista os TODO (tarefas) do usuário em questão.

4 - Deve ser possível adicionar um novo item no TODO list de um usuário específico; bem como marcar uma tarefa como concluída ou pendente.

Iremos avaliar a execução do seu código. Para isso crie um README com instruções para subir/executar a sua aplicação e comentários que avaliar pertinente sobre a execução.

 

Obs1.: por se tratar de uma fake API, nenhum dado será registrado, a API apenas irá simular uma resposta, avaliando se a requisição foi correta ou não.

Obs2.: É necessário subir seu desafio em um repositório privado no github e me envie o link. (Essa observação foi esclarecida por whatsapp e o repositório deve ser público)
