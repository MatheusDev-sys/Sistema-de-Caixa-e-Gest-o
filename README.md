# 🌸 Mande Flores - Sistema de Gestão de Caixa

> Sistema completo de ponto de venda (PDV) e gestão de caixa desenvolvido especificamente para floricultura, com controle financeiro em tempo real, relatórios em PDF e interface moderna.

![Versão](https://img.shields.io/badge/versão-5.0-blue)
![Status](https://img.shields.io/badge/status-produção-success)
![Licença](https://img.shields.io/badge/licença-proprietária-red)

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Documentação](#-documentação)
- [Suporte](#-suporte)
- [Licença](#-licença)

## 🎯 Visão Geral

O **Mande Flores** é um sistema web completo de gestão de caixa desenvolvido para floriculturias e pequenos comércios. O sistema oferece controle total sobre vendas, movimentações financeiras e geração de relatórios detalhados em PDF.

### Principais Diferenciais

- ✅ **Interface Moderna**: Design responsivo com tema claro/escuro
- ✅ **Tempo Real**: Atualizações instantâneas de saldo e totais
- ✅ **PDFs Profissionais**: Relatórios detalhados com layout personalizado
- ✅ **Controle Completo**: Vendas, retiradas, adições e fechamento de caixa
- ✅ **Multi-usuário**: Sistema de permissões (Admin, Gerente, Operador)
- ✅ **Seguro**: Autenticação robusta e validação de senha mestra
- ✅ **Histórico**: Acesso a todos os caixas anteriores
- ✅ **Auditoria**: Registro completo de todas as operações

## 🚀 Funcionalidades

### Gestão de Caixa

- **Abertura de Caixa**
  - Definição de saldo inicial
  - Seleção de período (Manhã/Noite)
  - Verificação automática de feriados
  - Validação de caixa já aberto

- **Registro de Vendas**
  - Seleção rápida de produtos cadastrados
  - Múltiplas formas de pagamento (Dinheiro, PIX, Cartão, Link)
  - Campo de observações
  - Cálculo automático de totais
  - Histórico de vendas do dia

- **Saldo Atual em Tempo Real** ⭐ NOVO
  - Exibição do saldo disponível no caixa físico
  - Atualização automática após cada operação
  - Cálculo: Saldo Inicial + Vendas em Dinheiro + Adições - Retiradas

- **Adições Manuais de Saldo** ⭐ NOVO
  - Adicionar dinheiro ao caixa (troco, reforço, etc.)
  - Validação com senha mestra
  - Registro detalhado com descrição
  - Inclusão nos relatórios e PDFs

- **Retiradas**
  - Retiradas de passagem (sem senha)
  - Outras retiradas (com senha mestra)
  - Controle de sangrias
  - Registro de despesas

- **Fechamento de Caixa**
  - Geração automática de PDF
  - Resumo financeiro completo
  - Detalhamento por forma de pagamento
  - Conferência de dinheiro esperado
  - Listagem de todas as vendas
  - Seção de retiradas e adições

### Relatórios e PDFs

- **PDF de Fechamento**
  - Cabeçalho personalizado
  - Informações do caixa (data, período, horários)
  - Tabela de vendas com observações
  - Resumo financeiro colorido
  - Detalhamento por forma de pagamento
  - Conferência de dinheiro
  - Seção de retiradas
  - Seção de adições manuais ⭐ NOVO
  - Layout profissional com cores e ícones

- **Histórico de Caixas**
  - Visualização de todos os caixas anteriores
  - Filtros por data e período
  - Geração de PDF de caixas antigos
  - Mesmas funcionalidades do PDF atual

### Administração

- **Gestão de Produtos**
  - Cadastro de produtos
  - Categorias com cores
  - Preços e descrições
  - Ativação/desativação

- **Gestão de Usuários**
  - Cadastro de operadores
  - Níveis de permissão (Admin, Gerente, Operador)
  - Senha mestra para operações críticas
  - Controle de acesso

- **Feriados**
  - Cadastro de feriados
  - Alertas automáticos na abertura de caixa
  - Integração com BrasilAPI

- **Auditoria**
  - Log de todas as operações
  - Rastreamento de usuários
  - Histórico de ações

## 🛠 Tecnologias

### Frontend
- **HTML5** - Estrutura semântica
- **TailwindCSS** - Estilização moderna e responsiva
- **JavaScript (ES6+)** - Lógica da aplicação
- **Anime.js** - Animações suaves
- **jsPDF** - Geração de PDFs
- **Material Symbols** - Ícones

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL - Banco de dados
  - Authentication - Autenticação
  - Row Level Security - Segurança
  - Real-time - Atualizações em tempo real

### APIs Externas
- **BrasilAPI** - Consulta de feriados nacionais

## 📦 Requisitos

### Servidor
- Servidor web (Apache, Nginx, ou similar)
- Suporte a arquivos estáticos
- HTTPS (recomendado)

### Banco de Dados
- Conta Supabase (gratuita ou paga)
- PostgreSQL 14+

### Navegador
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Instalação

### 1. Configuração do Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Execute os scripts SQL na ordem:
   ```
   database/01_usuarios.sql
   database/02_produtos.sql
   database/03_caixas.sql
   database/04_vendas.sql
   database/05_retiradas.sql
   database/06_feriados.sql
   database/07_auditoria.sql
   database/08_funcoes.sql
   database/09_politicas.sql
   database/10_adicoes_manuais.sql
   ```

4. Anote as credenciais:
   - URL do projeto
   - Chave pública (anon key)

### 2. Configuração do Projeto

1. Clone ou baixe o repositório
2. Edite `js/config.js`:
   ```javascript
   const SUPABASE_URL = 'SUA_URL_AQUI';
   const SUPABASE_KEY = 'SUA_CHAVE_AQUI';
   ```

3. Configure a senha mestra no Supabase:
   ```sql
   UPDATE usuarios 
   SET senha_mestra = crypt('SUA_SENHA', gen_salt('bf'))
   WHERE cargo IN ('admin', 'gerente');
   ```

### 3. Deploy

**Opção 1: Servidor Local**
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js
npx http-server
```

**Opção 2: Netlify/Vercel**
- Faça upload dos arquivos
- Configure as variáveis de ambiente
- Deploy automático

**Opção 3: Servidor Próprio**
- Faça upload via FTP
- Configure o servidor web
- Aponte o domínio

## 📖 Uso

### Primeiro Acesso

1. Acesse o sistema pelo navegador
2. Faça login com as credenciais padrão
3. Altere a senha no primeiro acesso
4. Configure produtos e usuários no painel admin

### Fluxo Diário

1. **Manhã**: Abrir caixa com saldo inicial
2. **Durante o dia**: Registrar vendas
3. **Quando necessário**: Fazer retiradas ou adicionar saldo
4. **Fim do dia**: Fechar caixa e gerar PDF

### Atalhos de Teclado

- `Ctrl + N` - Nova venda
- `Ctrl + R` - Registrar retirada
- `Ctrl + F` - Fechar caixa
- `Ctrl + P` - Imprimir/Salvar PDF

## 📚 Documentação

- [Manual do Usuário](docs/MANUAL_USUARIO.md) - Guia completo para operadores
- [Documentação Técnica](docs/DOCUMENTACAO_TECNICA.md) - Arquitetura e APIs
- [Guia de Instalação](docs/GUIA_INSTALACAO.md) - Passo a passo detalhado
- [Fluxogramas](docs/FLUXOGRAMAS.md) - Diagramas de fluxo
- [FAQ](docs/FAQ.md) - Perguntas frequentes
- [Changelog](docs/CHANGELOG.md) - Histórico de versões

## 🆘 Suporte

### Problemas Comuns

**Erro de autenticação**
- Verifique as credenciais do Supabase
- Confirme que os scripts SQL foram executados
- Limpe o cache do navegador

**PDF não gera**
- Verifique se há vendas registradas
- Teste em outro navegador
- Veja o console (F12) para erros

**Saldo não atualiza**
- Faça hard refresh (Ctrl + Shift + R)
- Limpe o cache do navegador
- Verifique se o JavaScript está habilitado

### Contato

- **Email**: [seu-email@exemplo.com]
- **WhatsApp**: [seu-numero]
- **GitHub**: [seu-usuario]

## 📄 Licença

Este projeto é proprietário e todos os direitos são reservados.

**Uso Comercial**: Requer licença paga
**Modificações**: Permitidas apenas com autorização
**Distribuição**: Proibida sem autorização

Para adquirir uma licença, entre em contato.

---

## 🎨 Screenshots

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Caixa Aberto
![Caixa](docs/screenshots/caixa.png)

### PDF Gerado
![PDF](docs/screenshots/pdf.png)

### Admin
![Admin](docs/screenshots/admin.png)

---

**Desenvolvido com ❤️ para Mande Flores**

*Versão 5.0 - Última atualização: Dezembro 2025*
