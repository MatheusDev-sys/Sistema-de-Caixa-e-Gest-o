# 🌸 Mande Flores - Sistema de Gestão de Caixa

Sistema completo de gestão de caixa e vendas para floricultura, desenvolvido para rodar no GitHub Pages com backend Supabase.

![Status](https://img.shields.io/badge/status-ativo-success)
![Versão](https://img.shields.io/badge/vers%C3%A3o-1.0.0-blue)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação](#documentação)

## 🎯 Sobre o Projeto

O **Mande Flores** é um sistema web moderno e responsivo para controle de caixa, vendas, fechamento diário e gestão de feriados. Desenvolvido especificamente para uso interno de floricultura, oferece:

- ✅ Interface moderna com design floral
- ✅ Controle de permissões por cargo (Admin, Gerente, Funcionário)
- ✅ Gestão automática de feriados via API BrasilAPI
- ✅ Geração de PDFs estilizados para fechamento
- ✅ Dashboard com gráficos interativos
- ✅ 100% responsivo (desktop e mobile)
- ✅ Segurança com RLS (Row Level Security)

## ⚡ Funcionalidades

### Para Funcionários
- Abertura e fechamento de caixa
- Registro de vendas com múltiplas formas de pagamento
- Registro de retiradas (passagem)
- Geração de PDF do fechamento diário
- Detecção automática de feriados e domingos

### Para Gerentes
- Todas as funcionalidades de funcionário
- Visualização de caixas anteriores
- Dashboard com métricas e gráficos
- Autorização de retiradas especiais

### Para Administradores
- Todas as funcionalidades anteriores
- Gerenciamento de produtos (CRUD completo)
- Gerenciamento de feriados (manual e automático)
- Sincronização com API BrasilAPI
- Visualização de auditoria do sistema

## 🛠️ Tecnologias

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Design system com glassmorphism
- **JavaScript ES6+** - Lógica da aplicação
- **Anime.js** - Animações suaves
- **Chart.js** - Gráficos interativos
- **jsPDF** - Geração de PDFs

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL com RLS
  - Autenticação
  - API REST automática

### APIs Externas
- **BrasilAPI** - Feriados nacionais brasileiros

## 📦 Instalação

### Pré-requisitos

1. Conta no [Supabase](https://supabase.com) (gratuita)
2. Conta no [GitHub](https://github.com) (para hospedagem)

### Passo a Passo

1. **Clone ou baixe este repositório**
   ```bash
   git clone https://github.com/seu-usuario/mande-flores.git
   cd mande-flores
   ```

2. **Configure o Supabase**
   - Siga o guia completo em [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)
   - Execute os scripts SQL fornecidos
   - Obtenha suas credenciais (URL e Anon Key)

3. **Configure as credenciais**
   - Abra o arquivo `js/config.js`
   - Substitua `SUA_URL_AQUI` pela URL do seu projeto Supabase
   - Substitua `SUA_CHAVE_AQUI` pela sua Anon Key

4. **Faça o deploy no GitHub Pages**
   - Siga o guia em [docs/DEPLOY.md](docs/DEPLOY.md)

## ⚙️ Configuração

### Configurar Supabase

Edite o arquivo `js/config.js`:

```javascript
const SUPABASE_URL = 'https://seu-projeto.supabase.co';
const SUPABASE_ANON_KEY = 'sua-chave-anonima-aqui';
```

### Criar Primeiro Usuário Admin

Após configurar o Supabase, você precisa criar o primeiro usuário admin manualmente:

1. Acesse o painel do Supabase
2. Vá em **Authentication** > **Users**
3. Clique em **Add user** > **Create new user**
4. Preencha email e senha
5. Copie o UUID do usuário criado
6. Vá em **Table Editor** > **usuarios**
7. Insira um novo registro:
   - `id`: Cole o UUID copiado
   - `email`: Mesmo email do usuário
   - `nome`: Seu nome
   - `cargo`: `admin`
   - `ativo`: `true`

Agora você pode fazer login com este usuário!

## 🚀 Uso

### Login

Acesse a URL do seu GitHub Pages e faça login com as credenciais criadas.

### Fluxo de Trabalho Diário

1. **Funcionário abre o caixa**
   - Seleciona data e período (manhã/noite)
   - Define saldo inicial
   - Sistema detecta automaticamente feriados

2. **Durante o dia**
   - Registra vendas conforme acontecem
   - Pode usar produtos cadastrados ou descrição livre
   - Registra retiradas de passagem

3. **Ao final do turno**
   - Clica em "Fechar Caixa"
   - Sistema gera PDF automaticamente
   - PDF é baixado com resumo completo

### Dashboard (Gerente/Admin)

- Acesse métricas do mês atual
- Visualize gráficos de vendas mensais
- Veja distribuição por forma de pagamento
- Identifique produtos mais vendidos

### Painel Admin

- Cadastre novos produtos
- Sincronize feriados nacionais
- Crie feriados customizados
- Visualize logs de auditoria

## 📁 Estrutura do Projeto

```
mande-flores/
├── index.html              # Página de login
├── caixa.html             # Interface do caixa
├── dashboard.html         # Dashboard com gráficos
├── admin.html             # Painel administrativo
├── css/
│   └── style.css          # Sistema de design completo
├── js/
│   ├── config.js          # Configurações do Supabase
│   ├── auth.js            # Autenticação e utilitários
│   ├── caixa.js           # Lógica do caixa
│   ├── dashboard.js       # Lógica do dashboard
│   └── admin.js           # Lógica do painel admin
├── docs/
│   ├── SUPABASE_SETUP.md  # Guia de configuração do Supabase
│   ├── DEPLOY.md          # Guia de deploy no GitHub Pages
│   ├── MANUAL_USO.md      # Manual do usuário
│   └── database/          # Scripts SQL
│       ├── 01_schema.sql
│       ├── 02_rls_policies.sql
│       └── 03_functions.sql
└── README.md              # Este arquivo
```

## 📚 Documentação

- [Configuração do Supabase](docs/SUPABASE_SETUP.md)
- [Deploy no GitHub Pages](docs/DEPLOY.md)
- [Manual do Usuário](docs/MANUAL_USO.md)

## 🎨 Design

O sistema utiliza uma paleta de cores floral suave:
- Rosa suave (#FFB6C1)
- Lavanda (#E6E6FA)
- Verde menta (#98D8C8)
- Pêssego (#FFE5D9)

Com efeitos modernos:
- Glassmorphism
- Animações suaves
- Transições elegantes
- Responsividade total

## 🔒 Segurança

- **RLS (Row Level Security)** ativo em todas as tabelas
- Políticas de acesso por cargo
- Senhas gerenciadas pelo Supabase Auth
- Auditoria de todas as ações importantes
- Validação de permissões no frontend e backend

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- Desktop (1920x1080, 1366x768)
- Tablet (768x1024)
- Mobile (375x667, 414x896)

## 🤝 Contribuindo

Este é um projeto interno, mas sugestões são bem-vindas!

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

Desenvolvido para **Mande Flores** 🌸

---

**Nota**: Lembre-se de nunca compartilhar suas credenciais do Supabase publicamente. O arquivo `js/config.js` deve ser configurado localmente e não deve conter credenciais reais no repositório público.
