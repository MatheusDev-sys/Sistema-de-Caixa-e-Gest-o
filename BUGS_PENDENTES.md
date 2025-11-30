# 🚨 LISTA DE BUGS CRÍTICOS A CORRIGIR

## 1. ❌ Sidebar Duplicando Conteúdo
**Problema**: Tabs aparecem na sidebar E no conteúdo principal
**Causa**: Estrutura HTML incorreta - sidebar sendo inserida dentro do conteúdo
**Solução**: Recriar admin.html com estrutura correta

## 2. ❌ Tabs Não Funcionam
**Problema**: Clicar nas tabs não muda o conteúdo, só a URL
**Causa**: JavaScript não está atualizando o DOM corretamente
**Solução**: Corrigir função mudarTab()

## 3. ❌ Funcionário é Deslogado ao Tentar Acessar Admin
**Problema**: Deveria apenas redirecionar, não deslogar
**Causa**: Verificação de permissão está chamando logout
**Solução**: Remover logout da verificação de permissão

## 4. ❌ Senha Mestra Não Funciona
**Problema**: Diz "senha de gerente inválida"
**Causa**: Script SQL não foi executado OU função não está funcionando
**Solução**: Verificar se script foi executado + testar função

## 5. ❌ Dashboard Estático (Não Atualiza)
**Problema**: Gráficos não mostram dados mesmo após vendas
**Causa**: dashboard.js não está carregando dados ou renderizando
**Solução**: Verificar e corrigir dashboard.js

## 6. ❌ Botão de Configurações/Avatar Não Aparece
**Problema**: Não tem botão para mudar avatar
**Causa**: Não foi implementado
**Solução**: Adicionar botão de configurações na sidebar

---

## 🎯 PLANO DE CORREÇÃO

### Etapa 1: Recriar admin.html CORRETO
- Estrutura HTML limpa
- Sidebar ao lado (não dentro)
- Tabs funcionais
- Sem duplicação

### Etapa 2: Corrigir Permissões
- Não deslogar funcionário
- Apenas redirecionar

### Etapa 3: Testar Senha Mestra
- Verificar se função existe no banco
- Corrigir se necessário

### Etapa 4: Corrigir Dashboard
- Verificar carregamento de dados
- Renderizar gráficos corretamente

### Etapa 5: Adicionar Botão de Avatar
- Botão de configurações na sidebar
- Modal para upload de avatar
- Validação segura

---

**INICIANDO CORREÇÕES AGORA...**
