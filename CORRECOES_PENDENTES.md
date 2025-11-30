# 🔧 CORREÇÕES PENDENTES - Sistema Mande Flores

## ✅ O QUE JÁ FOI CORRIGIDO

### 1. Admin.html - Recriado ✅
- Arquivo recriado do zero
- Tabs devem funcionar agora
- Estrutura HTML limpa
- **Teste**: Vá em admin.html e clique nas tabs

### 2. Components.js - Recriado ✅
- Sidebar não duplica mais
- Botão "Configurações" adicionado
- Função `abrirConfiguracoes()` criada
- **Teste**: Navegue entre páginas e veja se sidebar duplica

### 3. Index.html - Logout Corrigido ✅
- Removida verificação automática de sessão
- Agora permite fazer logout normalmente
- **Teste**: Faça logout e veja se fica na tela de login

---

## ❌ O QUE AINDA PRECISA SER CORRIGIDO

### 4. Senha Mestra - Texto e Validação

**Problema**: 
- No modal de retirada, está escrito "Senha do Gerente"
- Deveria ser "Senha Mestra"
- Validação pode não estar funcionando

**Arquivos a modificar**:

#### A) `caixa.html` - Linha 347
```html
<!-- ANTES -->
<p class="text-gray-900 dark:text-white text-sm font-medium pb-2">Senha do Gerente</p>

<!-- DEPOIS -->
<p class="text-gray-900 dark:text-white text-sm font-medium pb-2">Senha Mestra</p>
```

#### B) Verificar `js/caixa.js`
Procure pela função que valida a senha de retirada. Deve estar assim:

```javascript
// Procure por algo como:
const { data, error } = await supabase.rpc('validar_senha_mestra', {
    senha_informada: senhaGerente
});

if (error || !data) {
    alert('Senha mestra inválida!');
    return;
}
```

**Se não estiver assim**, substitua pela validação correta acima.

**Teste**:
1. Abra um caixa
2. Tente fazer uma retirada "Outra"
3. Digite a senha mestra: `mestre123` (ou a que você configurou)
4. Deve aceitar

---

### 5. Dashboard Estático - Não Carrega Dados

**Problema**: 
- Gráficos não aparecem mesmo após registrar vendas
- Dashboard não atualiza

**Arquivo a verificar**: `js/dashboard.js`

**O que verificar**:

1. **Abra o arquivo** `js/dashboard.js`
2. **Procure pelas funções**:
   - `carregarDashboard()`
   - `carregarGraficos()`
   - `carregarMetricas()`

3. **Verifique se tem erros no console do navegador**:
   - Abra o Dashboard
   - Pressione F12
   - Vá na aba "Console"
   - Veja se tem erros em vermelho

4. **Possíveis problemas**:
   - Função não está sendo chamada
   - Query do Supabase com erro
   - Chart.js não está renderizando

**Solução temporária**:
Se não funcionar, me envie o conteúdo do `js/dashboard.js` na próxima sessão que eu corrijo.

---

### 6. Funcionário Deslogado ao Tentar Acessar Admin

**Problema**:
- Funcionário tenta acessar admin
- Sistema mostra alerta (correto)
- Mas depois desloga o funcionário (errado)
- Deveria apenas redirecionar para caixa.html

**Arquivo a modificar**: `admin.html` - Linhas 237-244

```javascript
// ANTES (linha 237-244)
document.addEventListener('DOMContentLoaded', async () => {
    await auth.verificarAutenticacao();
    const cargo = sessionStorage.getItem('userCargo');
    if (cargo !== 'admin' && cargo !== 'gerente') {
        alert('Você não tem permissão para acessar esta página.');
        window.location.href = cargo === 'funcionario' ? 'caixa.html' : 'dashboard.html';
        return;
    }
    inserirSidebar('admin');
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab') || 'produtos';
    mudarTab(tab);
});

// DEPOIS (corrigido)
document.addEventListener('DOMContentLoaded', async () => {
    const session = await auth.verificarAutenticacao();
    if (!session) return; // Já redireciona para login
    
    const cargo = sessionStorage.getItem('userCargo');
    if (cargo !== 'admin' && cargo !== 'gerente') {
        // NÃO chamar logout, apenas redirecionar
        window.location.href = cargo === 'funcionario' ? 'caixa.html' : 'dashboard.html';
        return;
    }
    
    inserirSidebar('admin');
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab') || 'produtos';
    mudarTab(tab);
});
```

**Teste**:
1. Faça login como funcionário
2. Tente acessar `admin.html` direto na URL
3. Deve redirecionar para caixa.html SEM deslogar

---

## 🎯 ORDEM DE CORREÇÃO RECOMENDADA

1. **Primeiro**: Corrigir texto "Senha Mestra" (mais fácil)
2. **Segundo**: Corrigir funcionário deslogado (médio)
3. **Terceiro**: Investigar Dashboard (mais complexo)

---

## 📝 SCRIPTS SQL - VERIFICAR SE FORAM EXECUTADOS

### Senha Mestra
Execute no SQL Editor do Supabase:

```sql
-- Verificar se a função existe
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name = 'validar_senha_mestra';

-- Se retornar vazio, execute o arquivo:
-- docs/database/04_senha_mestra.sql
```

### Verificar se senha está configurada
```sql
SELECT * FROM configuracoes WHERE chave = 'senha_mestra_retiradas';

-- Se retornar vazio, execute:
INSERT INTO configuracoes (chave, valor, descricao)
VALUES (
    'senha_mestra_retiradas',
    crypt('mestre123', gen_salt('bf')),
    'Senha mestra para autorizar retiradas do caixa'
);
```

---

## 🧪 TESTES APÓS CORREÇÕES

### Teste 1: Tabs do Admin
1. Vá para admin.html
2. Clique em: Produtos → Feriados → Usuários → Auditoria
3. ✅ Conteúdo deve mudar
4. ✅ URL deve atualizar
5. ✅ Não deve duplicar sidebar

### Teste 2: Senha Mestra
1. Abra um caixa
2. Registre uma venda
3. Clique em "Registrar Retirada"
4. Escolha "Outra Retirada"
5. Digite senha: `mestre123`
6. ✅ Deve aceitar e registrar

### Teste 3: Dashboard
1. Feche um caixa com vendas
2. Vá para Dashboard
3. ✅ Gráficos devem aparecer
4. ✅ Métricas devem mostrar valores

### Teste 4: Permissões
1. Logue como funcionário
2. Tente acessar admin.html direto
3. ✅ Deve redirecionar para caixa.html
4. ✅ NÃO deve deslogar

---

## 📞 PRÓXIMA SESSÃO

**Quando iniciar nova sessão, me diga**:
1. Quais correções você conseguiu fazer
2. Quais ainda estão com problema
3. Se precisa de ajuda com alguma específica

**Arquivos importantes**:
- `admin.html` - Tabs e permissões
- `caixa.html` - Texto senha mestra
- `js/caixa.js` - Validação senha
- `js/dashboard.js` - Gráficos
- `js/components.js` - Sidebar

---

## 🎁 BÔNUS: Modal de Configurações (Avatar)

Quando tudo estiver funcionando, podemos implementar:
- Modal para upload de avatar
- Integração com Supabase Storage
- Validação de imagem
- Preview antes de salvar

**Mas primeiro**: Corrija os bugs acima! 🚀

---

**Desenvolvido com ❤️ para Mande Flores** 🌸
**Última atualização**: 30/11/2024 02:07
