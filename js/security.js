// ============================================
// FUNÇÕES DE SEGURANÇA
// ============================================
// Proteção contra XSS e validação de dados

/**
 * Sanitiza string HTML para prevenir XSS
 * Converte caracteres especiais em entidades HTML
 */
function sanitizeHTML(str) {
    if (!str) return '';

    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Sanitiza string para uso em atributos HTML
 */
function sanitizeAttribute(str) {
    if (!str) return '';

    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Valida e sanitiza descrição de venda/produto
 */
function validarDescricao(descricao) {
    if (!descricao || typeof descricao !== 'string') {
        throw new Error('Descrição é obrigatória');
    }

    const desc = descricao.trim();

    if (desc.length < 1) {
        throw new Error('Descrição não pode estar vazia');
    }

    if (desc.length > 200) {
        throw new Error('Descrição muito longa (máximo 200 caracteres)');
    }

    return desc;
}

/**
 * Valida quantidade
 */
function validarQuantidade(quantidade) {
    const qtd = parseInt(quantidade);

    if (isNaN(qtd)) {
        throw new Error('Quantidade inválida');
    }

    if (qtd < 1) {
        throw new Error('Quantidade deve ser maior que zero');
    }

    if (qtd > 10000) {
        throw new Error('Quantidade muito alta (máximo 10.000)');
    }

    return qtd;
}

/**
 * Valida valor monetário
 */
function validarValorMonetario(valor) {
    const val = parseFloat(valor);

    if (isNaN(val)) {
        throw new Error('Valor inválido');
    }

    if (val <= 0) {
        throw new Error('Valor deve ser maior que zero');
    }

    if (val > 999999.99) {
        throw new Error('Valor muito alto (máximo R$ 999.999,99)');
    }

    return val;
}

/**
 * Valida observação (opcional)
 */
function validarObservacao(observacao) {
    if (!observacao) return null;

    const obs = observacao.trim();

    if (obs.length > 500) {
        throw new Error('Observação muito longa (máximo 500 caracteres)');
    }

    return obs || null;
}

/**
 * Valida nome de produto
 */
function validarNomeProduto(nome) {
    if (!nome || typeof nome !== 'string') {
        throw new Error('Nome do produto é obrigatório');
    }

    const n = nome.trim();

    if (n.length < 2) {
        throw new Error('Nome muito curto (mínimo 2 caracteres)');
    }

    if (n.length > 100) {
        throw new Error('Nome muito longo (máximo 100 caracteres)');
    }

    return n;
}

/**
 * Valida preço de produto
 */
function validarPreco(preco) {
    return validarValorMonetario(preco);
}

// Exportar para uso global
window.security = {
    sanitizeHTML,
    sanitizeAttribute,
    validarDescricao,
    validarQuantidade,
    validarValorMonetario,
    validarObservacao,
    validarNomeProduto,
    validarPreco
};
