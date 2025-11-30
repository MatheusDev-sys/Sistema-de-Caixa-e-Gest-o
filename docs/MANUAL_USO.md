# 📖 Manual do Usuário - Mande Flores

Guia completo de uso do sistema de gestão de caixa.

## 🔐 Login

1. Acesse a URL do sistema
2. Digite seu **email** e **senha**
3. Clique em **"Entrar"**

O sistema irá redirecionar você automaticamente baseado no seu cargo:
- **Funcionário** → Tela de Caixa
- **Gerente** → Dashboard
- **Admin** → Painel Administrativo

---

## 👤 Para Funcionários

### Abrir Caixa

1. Na tela inicial, você verá o formulário **"Abrir Caixa"**
2. Preencha:
   - **Data**: Selecione a data (padrão: hoje)
   - **Período**: Escolha Manhã ou Noite
   - **Saldo Inicial**: Digite o valor em dinheiro no caixa
3. Clique em **"Abrir Caixa"**

**💡 Dica**: O sistema detecta automaticamente feriados e domingos, permitindo apenas caixa da manhã.

### Registrar Venda

1. No formulário **"Registrar Venda"**:
   - **Produto**: Selecione um produto cadastrado OU
   - **Descrição**: Digite uma descrição livre (ex: "Buquê 12 rosas vermelhas")
   - **Quantidade**: Digite a quantidade
   - **Valor**: Digite o valor total
   - **Forma de Pagamento**: Selecione como o cliente pagou
   - **Observação**: (Opcional) Adicione detalhes extras
2. Clique em **"Registrar Venda"**

A venda aparecerá imediatamente na lista abaixo.

### Registrar Retirada

#### Retirada de Passagem (Livre)

1. No formulário **"Registrar Retirada"**:
   - **Tipo**: Selecione "Passagem"
   - **Descrição**: Digite o motivo (ex: "Passagem de ônibus")
   - **Valor**: Digite o valor
2. Clique em **"Registrar Retirada"**

#### Outras Retiradas (Requer Senha)

1. Selecione **"Outra Retirada"**
2. Preencha descrição e valor
3. Digite a **senha do gerente**
4. Clique em **"Registrar Retirada"**

### Fechar Caixa

1. Ao final do turno, clique em **"Fechar Caixa e Gerar PDF"**
2. Confirme a ação
3. O sistema irá:
   - Calcular todos os totais automaticamente
   - Gerar um PDF estilizado
   - Baixar o PDF automaticamente
   - Fechar o caixa

**⚠️ Atenção**: Após fechar, não é possível adicionar mais vendas neste caixa.

---

## 👔 Para Gerentes

Gerentes têm todas as funcionalidades de funcionários, mais:

### Acessar Dashboard

1. Clique em **"Dashboard"** no menu superior
2. Visualize:
   - **Total do Mês**: Vendas do mês atual
   - **Produto Mais Vendido**: Produto com mais saídas
   - **Dia Mais Lucrativo**: Melhor dia do mês
   - **Vendas da Semana**: Últimos 7 dias

### Gráficos

- **Vendas Mensais**: Gráfico de barras com vendas de cada mês do ano
- **Formas de Pagamento**: Gráfico de pizza mostrando distribuição

### Autorizar Retiradas

Quando um funcionário solicita uma retirada especial, você precisa fornecer sua senha.

---

## 👨‍💼 Para Administradores

Admins têm acesso total ao sistema.

### Painel Administrativo

Acesse clicando em **"Admin"** no menu superior.

### Gerenciar Produtos

#### Adicionar Produto

1. Na aba **"Produtos"**, clique em **"Novo Produto"**
2. Preencha:
   - **Nome**: Nome do produto
   - **Preço Sugerido**: Preço padrão (opcional)
   - **Categoria**: Categoria do produto (opcional)
   - **Ativo**: Marque se o produto está disponível
3. Clique em **"Salvar"**

#### Editar Produto

1. Clique em **"Editar"** ao lado do produto
2. Altere os dados desejados
3. Clique em **"Salvar"**

#### Excluir Produto

1. Clique em **"Excluir"** ao lado do produto
2. Confirme a exclusão

### Gerenciar Feriados

#### Sincronizar Feriados Nacionais

1. Na aba **"Feriados"**, clique em **"Sincronizar API"**
2. Confirme a ação
3. O sistema irá importar todos os feriados nacionais do ano atual

#### Adicionar Feriado Manual

1. Clique em **"Novo Feriado"**
2. Preencha:
   - **Data**: Data do feriado
   - **Nome**: Nome do feriado (ex: "Aniversário da Loja")
   - **Ativo**: Marque se está ativo
3. Clique em **"Salvar"**

#### Editar/Desativar Feriado

1. Clique em **"Editar"** ao lado do feriado
2. Altere o nome ou desmarque **"Ativo"** para desabilitar
3. Clique em **"Salvar"**

**💡 Dica**: Desativar um feriado não o exclui, apenas faz o sistema ignorá-lo.

### Visualizar Auditoria

1. Na aba **"Auditoria"**, veja o registro de todas as ações:
   - Data e hora
   - Usuário que executou
   - Ação realizada
   - Tabela afetada

---

## 📱 Uso em Dispositivos Móveis

O sistema é totalmente responsivo:

- **Smartphone**: Use normalmente, os elementos se adaptam
- **Tablet**: Interface otimizada para telas médias
- **Desktop**: Experiência completa

**💡 Dica**: Adicione o site à tela inicial do celular para acesso rápido:
- **Android**: Menu > Adicionar à tela inicial
- **iOS**: Compartilhar > Adicionar à Tela de Início

---

## 🎨 Entendendo as Cores

- **Rosa**: Ações principais e destaques
- **Verde**: Sucesso, confirmações
- **Vermelho**: Erros, ações destrutivas
- **Azul**: Informações
- **Amarelo**: Avisos

---

## ⚠️ Boas Práticas

### Para Funcionários

1. **Abra o caixa no início do turno**
2. **Registre vendas imediatamente** após cada venda
3. **Confira os valores** antes de registrar
4. **Feche o caixa ao final do turno**
5. **Guarde o PDF** gerado para conferência

### Para Gerentes

1. **Revise o dashboard diariamente**
2. **Confira os PDFs** dos fechamentos
3. **Autorize retiradas** apenas quando necessário
4. **Monitore produtos mais vendidos** para estoque

### Para Admins

1. **Mantenha produtos atualizados**
2. **Sincronize feriados** no início do ano
3. **Revise auditoria** periodicamente
4. **Faça backup** dos dados importantes

---

## 🆘 Problemas Comuns

### Não consigo fazer login

**Soluções**:
- Verifique se digitou email e senha corretamente
- Verifique se seu usuário está ativo
- Limpe o cache do navegador
- Entre em contato com o administrador

### Erro ao registrar venda

**Soluções**:
- Verifique se o caixa está aberto
- Verifique se preencheu todos os campos obrigatórios
- Verifique sua conexão com a internet

### PDF não baixa

**Soluções**:
- Verifique se o navegador permite downloads
- Desabilite bloqueadores de pop-up
- Tente em outro navegador

### Página não carrega

**Soluções**:
- Verifique sua conexão com a internet
- Atualize a página (F5)
- Limpe o cache do navegador
- Tente em modo anônimo

---

## 🔐 Segurança

### Senhas

- **Nunca compartilhe** sua senha
- Use senhas **fortes** (letras, números, símbolos)
- **Não anote** senhas em locais visíveis

### Logout

- Sempre faça **logout** ao sair
- Especialmente em computadores compartilhados

### Dados Sensíveis

- Não tire **prints** de telas com dados sensíveis
- Não compartilhe **PDFs** de fechamento publicamente

---

## 📞 Suporte

Em caso de dúvidas ou problemas:

1. Consulte este manual
2. Entre em contato com o administrador do sistema
3. Verifique se há atualizações disponíveis

---

## 🎉 Dicas e Truques

### Atalhos de Teclado

- **Tab**: Navegar entre campos
- **Enter**: Submeter formulário
- **Esc**: Fechar modais
- **F5**: Atualizar página

### Produtividade

- Use produtos cadastrados para agilizar vendas
- Mantenha o navegador sempre atualizado
- Use descrições claras nas vendas
- Revise totais antes de fechar o caixa

---

**Desenvolvido com 🌸 para Mande Flores**
