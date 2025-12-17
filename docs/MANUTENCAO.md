# 🔧 Guia de Manutenção - Mande Flores

> **Última atualização:** 16/12/2024  
> **Versão atual do Supabase:** 2.45.4

---

## 📋 Índice

1. [Verificação de Atualizações](#verificação-de-atualizações)
2. [Processo de Atualização](#processo-de-atualização)
3. [Checklist de Segurança](#checklist-de-segurança)
4. [Dependências do Sistema](#dependências-do-sistema)
5. [Contatos e Links Úteis](#contatos-e-links-úteis)

---

## 🔍 Verificação de Atualizações

### Quando verificar?
- ✅ **A cada 3 meses** (verificação de rotina)
- ✅ **Quando houver alertas de segurança**
- ✅ **Antes de adicionar novas funcionalidades**

### Onde verificar atualizações do Supabase?

#### 1. GitHub Releases (Recomendado)
- **Link:** https://github.com/supabase/supabase-js/releases
- **O que ver:**
  - Versão mais recente
  - Changelog (o que mudou)
  - Breaking changes (mudanças que quebram código)
  - Security fixes (correções de segurança)

#### 2. NPM Package
- **Link:** https://www.npmjs.com/package/@supabase/supabase-js
- **O que ver:**
  - Versão atual disponível
  - Data de lançamento
  - Downloads e popularidade

#### 3. Blog Oficial do Supabase
- **Link:** https://supabase.com/blog
- **O que ver:**
  - Anúncios de features importantes
  - Guias de migração
  - Melhores práticas

---

## 🚀 Processo de Atualização

### Passo 1: Verificar a Nova Versão

1. Acesse o [GitHub Releases](https://github.com/supabase/supabase-js/releases)
2. Veja a versão mais recente (ex: `v2.50.0`)
3. **Leia o changelog completo** - procure por:
   - 🔴 **BREAKING CHANGES** (mudanças que quebram código)
   - 🟡 **Deprecated** (funcionalidades que serão removidas)
   - 🟢 **New Features** (novas funcionalidades)
   - 🔵 **Bug Fixes** (correções de bugs)
   - 🟣 **Security** (correções de segurança)

### Passo 2: Decidir se Deve Atualizar

#### ✅ ATUALIZAR IMEDIATAMENTE se:
- Há correção de **segurança crítica**
- Há correção de **bug que afeta seu sistema**
- Há **feature nova essencial** que você precisa

#### ⚠️ AVALIAR COM CUIDADO se:
- Há **breaking changes** (pode quebrar código existente)
- A versão foi lançada há **menos de 1 semana** (pode ter bugs não descobertos)

#### ❌ PODE IGNORAR se:
- São apenas melhorias internas
- Features que você não usa
- Mudanças de documentação

### Passo 3: Testar Localmente PRIMEIRO

> ⚠️ **NUNCA atualize direto em produção!**

1. **Backup completo:**
   ```bash
   # Faça backup do projeto
   git commit -am "Backup antes de atualizar Supabase"
   ```

2. **Atualizar versão nos arquivos HTML:**
   
   Procure por esta linha em todos os arquivos:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4"></script>
   ```
   
   Substitua pela nova versão (exemplo: `2.50.0`):
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.50.0"></script>
   ```

3. **Arquivos que precisam ser atualizados:**
   - [ ] `index.html`
   - [ ] `dashboard.html`
   - [ ] `admin.html`
   - [ ] `caixa.html`
   - [ ] `caixas-anteriores.html`

4. **Testar TODAS as funcionalidades:**
   - [ ] Login/Logout
   - [ ] Abertura de caixa
   - [ ] Registro de vendas
   - [ ] Fechamento de caixa
   - [ ] Geração de PDF
   - [ ] Dashboard (gráficos e estatísticas)
   - [ ] Admin (produtos, feriados, usuários)
   - [ ] Histórico de caixas anteriores

5. **Verificar console do navegador:**
   - Abra o DevTools (F12)
   - Veja se há erros no console
   - Teste em diferentes navegadores (Chrome, Firefox, Edge)

### Passo 4: Aplicar em Produção

Se tudo funcionou bem nos testes:

1. **Fazer commit das mudanças:**
   ```bash
   git add .
   git commit -m "Atualizar Supabase para v2.50.0"
   git push
   ```

2. **Atualizar o site em produção**

3. **Monitorar por 24-48 horas:**
   - Verificar se usuários reportam problemas
   - Checar logs de erro
   - Testar funcionalidades críticas

### Passo 5: Documentar a Atualização

Atualize este arquivo (`MANUTENCAO.md`):
- Data da atualização
- Versão anterior → Versão nova
- Principais mudanças
- Problemas encontrados (se houver)

---

## 🔒 Checklist de Segurança

### Antes de Atualizar:
- [ ] Backup completo do código
- [ ] Backup do banco de dados Supabase
- [ ] Testar em ambiente local
- [ ] Ler changelog completo
- [ ] Verificar breaking changes

### Depois de Atualizar:
- [ ] Testar login/autenticação
- [ ] Verificar permissões (RLS)
- [ ] Testar todas as queries do banco
- [ ] Verificar console do navegador (sem erros)
- [ ] Monitorar por 48 horas

### Alertas de Segurança:
- 🔴 **Crítico:** Atualizar IMEDIATAMENTE
- 🟡 **Importante:** Atualizar em até 7 dias
- 🟢 **Baixo:** Atualizar na próxima manutenção

---

## 📦 Dependências do Sistema

### Bibliotecas JavaScript (CDN)

| Biblioteca | Versão Atual | Última Verificação | Link |
|------------|--------------|-------------------|------|
| **Supabase JS** | 2.45.4 | 16/12/2024 | [NPM](https://www.npmjs.com/package/@supabase/supabase-js) |
| **Tailwind CSS** | Latest | 16/12/2024 | [Docs](https://tailwindcss.com) |
| **jsPDF** | 2.5.1 | 16/12/2024 | [GitHub](https://github.com/parallax/jsPDF) |
| **jsPDF AutoTable** | 3.8.0 | 16/12/2024 | [GitHub](https://github.com/simonbengtsson/jsPDF-AutoTable) |
| **Anime.js** | 3.2.1 | 16/12/2024 | [GitHub](https://github.com/juliangarnier/anime) |
| **Chart.js** | 4.4.0 | 16/12/2024 | [Docs](https://www.chartjs.org) |

### APIs Externas

| API | Uso | Status |
|-----|-----|--------|
| **Supabase** | Banco de dados e autenticação | ✅ Ativo |
| **Brasil API** | Consulta de feriados | ✅ Ativo |

---

## 🔗 Contatos e Links Úteis

### Supabase
- 📚 **Documentação:** https://supabase.com/docs
- 🐙 **GitHub:** https://github.com/supabase/supabase-js
- 💬 **Discord:** https://discord.supabase.com
- 📧 **Suporte:** https://supabase.com/support

### Recursos de Aprendizado
- 📖 **Guia de Migração:** https://supabase.com/docs/guides/getting-started/migrating-to-supabase
- 🎓 **Tutoriais:** https://supabase.com/docs/guides/getting-started/tutorials
- 📺 **YouTube:** https://www.youtube.com/@Supabase

---

## 📝 Histórico de Atualizações

### 16/12/2024
- **Ação:** Fixada versão do Supabase
- **Versão:** 2.45.4
- **Motivo:** Garantir estabilidade e evitar atualizações automáticas
- **Status:** ✅ Concluído

---

## ⏰ Próximas Verificações

- **Próxima verificação de rotina:** Março/2025
- **Próxima atualização planejada:** Quando houver security fix ou feature essencial

---

## 💡 Dicas Importantes

1. **Nunca atualize em produção sem testar**
2. **Sempre leia o changelog completo**
3. **Faça backup antes de qualquer mudança**
4. **Monitore o sistema após atualizações**
5. **Documente todas as mudanças**
6. **Em caso de dúvida, NÃO atualize - pesquise mais**

---

## 🆘 Em Caso de Problemas

Se algo der errado após uma atualização:

1. **Reverter imediatamente:**
   ```bash
   git revert HEAD
   git push
   ```

2. **Voltar para versão anterior do Supabase:**
   - Trocar `@2.50.0` de volta para `@2.45.4` nos arquivos HTML

3. **Limpar cache do navegador:**
   - Ctrl + Shift + Delete (limpar tudo)
   - Ou Ctrl + F5 (hard refresh)

4. **Verificar console de erros:**
   - F12 → Console
   - Anotar mensagens de erro

5. **Buscar ajuda:**
   - Discord do Supabase
   - GitHub Issues
   - Stack Overflow

---

**Documento criado em:** 16/12/2024  
**Última revisão:** 16/12/2024  
**Responsável:** Equipe Mande Flores
