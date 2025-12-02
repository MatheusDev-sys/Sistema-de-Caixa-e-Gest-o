# ❓ FAQ - Perguntas Frequentes

> Respostas para as dúvidas mais comuns sobre o sistema Mande Flores.

## 📑 Índice

- [Geral](#geral)
- [Uso do Sistema](#uso-do-sistema)
- [Problemas Técnicos](#problemas-técnicos)
- [Financeiro](#financeiro)
- [Segurança](#segurança)
- [Administração](#administração)

---

## Geral

### O que é o Mande Flores?
É um sistema completo de gestão de caixa desenvolvido especificamente para floriculturias e pequenos comércios. Permite controlar vendas, movimentações financeiras e gerar relatórios em PDF.

### Preciso instalar algum programa?
Não! O sistema funciona 100% no navegador. Basta ter acesso à internet e um navegador atualizado (Chrome, Firefox ou Edge).

### Funciona no celular?
Sim! O sistema é responsivo e funciona em smartphones e tablets, mas recomendamos usar em computador para melhor experiência.

### Preciso de internet?
Sim, o sistema precisa de conexão com internet para funcionar, pois os dados são salvos na nuvem (Supabase).

### Os dados ficam salvos onde?
Todos os dados ficam salvos de forma segura no Supabase (banco de dados na nuvem). Você pode acessar de qualquer lugar.

---

## Uso do Sistema

### Como faço login?
1. Acesse o endereço do sistema
2. Digite seu usuário e senha
3. Clique em "Entrar"

### Esqueci minha senha, e agora?
Entre em contato com o administrador do sistema para resetar sua senha.

### Posso ter mais de um caixa aberto ao mesmo tempo?
Não! O sistema permite apenas um caixa aberto por período (manhã ou noite) por dia.

### O que é "Saldo Atual"?
É o dinheiro físico que deve estar no caixa neste momento. Ele é calculado automaticamente:
```
Saldo Atual = Saldo Inicial + Vendas em Dinheiro + Adições - Retiradas
```

### Por que vendas em PIX/Cartão não entram no Saldo Atual?
Porque essas formas de pagamento não representam dinheiro físico no caixa. Elas vão direto para a conta bancária.

### Como adiciono saldo ao caixa?
1. Clique no botão verde "Adicionar Saldo"
2. Preencha descrição e valor
3. Digite a senha mestra
4. Clique em "Adicionar"

### Quando devo fazer uma retirada?
- Quando há muito dinheiro no caixa (sangria)
- Para pagar despesas pequenas
- Para dar passagem ao entregador
- Para fazer troco

### Qual a diferença entre "Passagem" e "Outra Retirada"?
- **Passagem**: Não precisa de senha mestra, mais rápida
- **Outra Retirada**: Precisa de senha mestra, para sangrias e despesas

### Posso editar uma venda depois de registrar?
Não. Por questões de auditoria, vendas não podem ser editadas. Se errou, faça uma retirada ou adição para corrigir.

### Como fecho o caixa?
1. Conte todo o dinheiro do caixa
2. Confira se todas as vendas foram registradas
3. Clique em "Fechar Caixa"
4. Aguarde o PDF ser gerado
5. Salve o PDF em local seguro

### Posso reabrir um caixa fechado?
Não. Uma vez fechado, o caixa não pode ser reaberto. Você pode consultar no histórico e gerar o PDF novamente.

### Como vejo caixas anteriores?
1. Clique em "Caixas Anteriores" no menu
2. Navegue pela lista
3. Clique em "Gerar PDF" para baixar o relatório

---

## Problemas Técnicos

### O sistema está lento, o que faço?
1. Verifique sua conexão com internet
2. Feche outras abas do navegador
3. Limpe o cache do navegador
4. Tente em modo anônimo

### "Saldo Atual" não atualiza
**Solução**:
1. Pressione `Ctrl + Shift + R` (hard refresh)
2. Ou limpe o cache do navegador
3. Recarregue a página

### Botões não funcionam
**Possíveis causas**:
- JavaScript desabilitado
- Extensões do navegador bloqueando
- Erro no código

**Solução**:
1. Habilite JavaScript
2. Desative extensões temporariamente
3. Tente outro navegador
4. Pressione F12 e veja se há erros no console

### PDF não baixa
**Solução**:
1. Permita pop-ups do site
2. Verifique a pasta de Downloads
3. Tente outro navegador
4. Desative bloqueadores de anúncios

### "Erro ao salvar" aparece
**Causas comuns**:
- Sem internet
- Sessão expirada
- Problema no servidor

**Solução**:
1. Verifique sua internet
2. Faça login novamente
3. Tente novamente
4. Se persistir, contate suporte

### Página em branco após login
**Solução**:
1. Limpe o cache do navegador
2. Faça logout e login novamente
3. Tente modo anônimo
4. Verifique se JavaScript está habilitado

---

## Financeiro

### Como sei se o dinheiro do caixa está correto?
Compare o "Saldo Atual" mostrado no sistema com o dinheiro físico contado. Devem ser iguais (ou muito próximos).

### Tem diferença no fechamento, o que faço?
1. Revise todas as vendas do dia
2. Confira se registrou tudo
3. Conte o dinheiro novamente
4. Verifique se há retiradas não registradas
5. Verifique se há adições não registradas

### Como faço sangria?
1. Clique em "Registrar Retirada"
2. Escolha "Outra Retirada"
3. Descrição: "Sangria"
4. Digite o valor
5. Digite senha mestra
6. Confirme

### Posso usar o sistema para controlar estoque?
Não. O sistema é focado em caixa e vendas. Para estoque, você precisará de outro sistema.

### Como vejo quanto vendi no mês?
Acesse "Caixas Anteriores" e some os totais de cada dia. Em breve teremos relatórios mensais automáticos.

### O sistema calcula impostos?
Não. O sistema apenas registra vendas e movimentações. Cálculos de impostos devem ser feitos à parte.

---

## Segurança

### Meus dados estão seguros?
Sim! Utilizamos:
- ✅ Criptografia de senhas
- ✅ Conexão HTTPS
- ✅ Banco de dados seguro (Supabase)
- ✅ Row Level Security (RLS)
- ✅ Auditoria de todas as operações

### O que é senha mestra?
É uma senha especial que apenas gerentes e administradores têm. É necessária para:
- Adicionar saldo ao caixa
- Fazer retiradas (exceto passagem)
- Operações sensíveis

### Posso compartilhar minha senha?
**NÃO!** Nunca compartilhe sua senha com ninguém. Cada operador deve ter seu próprio login.

### Como altero minha senha?
Entre em contato com o administrador do sistema.

### O que acontece se eu esquecer de fazer logout?
Por segurança, sempre faça logout ao sair. Se esquecer, a sessão expira automaticamente após algumas horas.

### Alguém pode ver minhas vendas?
Apenas usuários autorizados (gerentes e admins) podem ver todas as vendas. Operadores veem apenas as vendas do caixa atual.

---

## Administração

### Como adiciono um novo usuário?
1. Acesse o painel Admin
2. Vá em "Usuários"
3. Clique em "Adicionar Usuário"
4. Preencha os dados
5. Escolha o cargo (Admin, Gerente ou Operador)
6. Salve

### Qual a diferença entre os cargos?
- **Admin**: Acesso total, pode gerenciar tudo
- **Gerente**: Pode ver relatórios e gerenciar operações
- **Operador**: Apenas registra vendas e opera o caixa

### Como adiciono um novo produto?
1. Acesse o painel Admin
2. Vá em "Produtos"
3. Clique em "Adicionar Produto"
4. Preencha nome, categoria e preço
5. Salve

### Como desativo um usuário?
1. Acesse "Usuários" no Admin
2. Encontre o usuário
3. Clique em "Desativar"
4. Confirme

### Como faço backup dos dados?
Os dados já ficam salvos na nuvem (Supabase). Para backup adicional:
1. Acesse o Supabase Dashboard
2. Vá em "Database"
3. Use a opção de export
4. Salve o arquivo SQL

### Como adiciono feriados?
1. Acesse "Feriados" no Admin
2. Clique em "Adicionar Feriado"
3. Preencha data e nome
4. Salve

### Posso personalizar o logo?
Sim! Substitua o arquivo `assets/images/logo.png` pelo seu logo.

### Como vejo o histórico de auditoria?
1. Acesse "Auditoria" no Admin
2. Filtre por data ou usuário
3. Veja todas as operações realizadas

---

## Suporte

### Onde consigo ajuda?
- **Email**: suporte@mandeflores.com
- **WhatsApp**: (XX) XXXXX-XXXX
- **Documentação**: Leia os manuais em `docs/`

### Tem vídeos tutoriais?
Em breve! Estamos preparando vídeos passo a passo.

### Posso sugerir melhorias?
Sim! Entre em contato conosco com suas sugestões.

### O sistema será atualizado?
Sim! Fazemos atualizações regulares com melhorias e correções.

### Como sei qual versão estou usando?
A versão atual é **5.0** (Dezembro 2025). Você pode ver no rodapé do sistema.

---

## Dicas e Boas Práticas

### ✅ Faça sempre
- Conte o dinheiro antes de abrir o caixa
- Registre vendas imediatamente
- Confira o saldo periodicamente
- Faça sangrias quando necessário
- Revise o PDF antes de guardar
- Faça logout ao sair

### ❌ Nunca faça
- Compartilhar sua senha
- Deixar o sistema aberto sem supervisão
- Registrar vendas de dias anteriores
- Abrir dois caixas no mesmo período
- Fechar o caixa sem conferir o dinheiro

### 💡 Dicas
- Use atalhos de teclado para agilizar
- Mantenha o navegador atualizado
- Limpe o cache regularmente
- Guarde os PDFs em local seguro
- Faça backup dos PDFs mensalmente

---

**Não encontrou sua dúvida?**

Entre em contato com o suporte!

---

**Última atualização**: Dezembro 2025
**Versão**: 5.0
