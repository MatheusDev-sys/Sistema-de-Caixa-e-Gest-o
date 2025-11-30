# 📝 Instruções para Adicionar a Logo

## Logo Principal

1. Copie a imagem da logo que você criou (a que está nas imagens que enviou)
2. Salve como: `assets/images/logo.png`
3. Formato recomendado: PNG com fundo transparente
4. Tamanho recomendado: 512x512px ou maior

## Favicon (Ícone da Aba do Navegador)

Vou gerar automaticamente o favicon a partir da logo.

### Opção 1: Usar um conversor online
1. Acesse: https://favicon.io/favicon-converter/
2. Faça upload da sua logo
3. Baixe o pacote gerado
4. Extraia os arquivos na pasta raiz do projeto

### Opção 2: Usar a logo diretamente
- Já configurei o HTML para usar `assets/images/logo.png` como favicon
- Funciona na maioria dos navegadores modernos

## Arquivos Configurados

Todos os HTMLs já estão configurados com:
```html
<link rel="icon" type="image/png" href="assets/images/logo.png">
```

## Onde a Logo Aparece

- ✅ Favicon (aba do navegador)
- ✅ Tela de login (logo grande centralizada)
- ✅ Sidebar (logo pequena)
- ✅ Header (logo pequena)
- ✅ PDFs gerados (cabeçalho)

---

**Nota**: Coloque a logo na pasta `assets/images/` e o sistema vai funcionar automaticamente!
