// ============================================
// MÓDULO DE GESTÃO DE CAIXA
// ============================================

let caixaAtual = null;
let vendas = [];
let retiradas = [];
let adicoes = [];

// Inicializar página
document.addEventListener('DOMContentLoaded', async () => {
    // Verificar autenticação
    await auth.verificarAutenticacao();

    // Carregar dados do usuário
    const usuario = await auth.obterUsuarioAtual();
    if (usuario) {
        document.getElementById('usuarioNome').textContent = usuario.nome;
        document.getElementById('usuarioNomeTexto').textContent = usuario.nome;

        // Saudação personalizada
        const saudacao = utils.obterSaudacao();
        const diaSemana = utils.obterDiaSemana();
        document.getElementById('saudacao').textContent = `${saudacao}, ${diaSemana}!`;

        // Mostrar botão Dashboard para admin e gerente
        if (usuario.cargo === 'admin' || usuario.cargo === 'gerente') {
            const btnDashboard = document.getElementById('btnDashboard');
            if (btnDashboard) btnDashboard.classList.remove('hidden');
        }
    }

    // Definir data atual (Local)
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    document.getElementById('dataAbertura').value = `${ano}-${mes}-${dia}`;

    // Verificar feriado
    await verificarFeriado(`${ano}-${mes}-${dia}`);

    // Carregar produtos
    await carregarProdutos();

    // Verificar se já existe caixa aberto
    await verificarCaixaAberto();

    // Event listeners
    configurarEventListeners();

    // Animação de entrada
    anime({
        targets: '.card, .caixa-info-card',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuad'
    });
});

// Configurar event listeners
function configurarEventListeners() {
    // Mudança de data
    document.getElementById('dataAbertura').addEventListener('change', async (e) => {
        await verificarFeriado(e.target.value);
    });

    // Mudança de tipo de retirada
    document.getElementById('tipoRetirada')?.addEventListener('change', (e) => {
        const senhaGroup = document.getElementById('senhaMestraGroup');
        if (!senhaGroup) return; // Proteção contra null

        if (e.target.value === 'outra') {
            senhaGroup.style.display = 'block';
            const senhaInput = document.getElementById('senhaMestra');
            if (senhaInput) senhaInput.required = true;
        } else {
            senhaGroup.style.display = 'none';
            const senhaInput = document.getElementById('senhaMestra');
            if (senhaInput) senhaInput.required = false;
        }
    });

    // Mudança de produto
    document.getElementById('produtoSelect').addEventListener('change', (e) => {
        if (e.target.value) {
            const option = e.target.options[e.target.selectedIndex];
            document.getElementById('descricaoVenda').value = option.text;
            const preco = option.dataset.preco;
            if (preco) {
                document.getElementById('valorVenda').value = preco;
            }
        }
    });

    // Formulários
    document.getElementById('abrirCaixaForm').addEventListener('submit', abrirCaixa);
    document.getElementById('vendaForm').addEventListener('submit', registrarVenda);
    document.getElementById('retiradaForm').addEventListener('submit', registrarRetirada);
    document.getElementById('fecharCaixaBtn').addEventListener('click', fecharCaixa);

    // Formulário de adição (se existir)
    const adicaoForm = document.getElementById('adicaoForm');
    if (adicaoForm) {
        adicaoForm.addEventListener('submit', registrarAdicao);
    }
}

// Verificar feriado via BrasilAPI
async function verificarFeriado(data) {
    try {
        const ano = new Date(data).getFullYear();
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
        const feriados = await response.json();

        // Verificar também feriados customizados no banco
        const { data: feriadosCustom } = await supabase
            .from('feriados')
            .select('*')
            .eq('data', data)
            .eq('ativo', true);

        const dataFormatada = data; // data já está no formato YYYY-MM-DD
        const feriadoAPI = feriados.find(f => f.date === dataFormatada);
        const feriadoCustom = feriadosCustom && feriadosCustom.length > 0 ? feriadosCustom[0] : null;

        const feriado = feriadoCustom || feriadoAPI;
        const feriadoInfo = document.getElementById('feriadoInfo');
        const periodoSelect = document.getElementById('periodoAbertura');

        if (feriado) {
            const nomeFeriado = feriado.nome || feriado.name;
            feriadoInfo.textContent = `🎉 Bom feriado - ${nomeFeriado}!`;
            feriadoInfo.style.display = 'block';

            // Desabilitar período noite em feriados
            periodoSelect.value = 'manha';
            periodoSelect.querySelector('option[value="noite"]').disabled = true;

            anime({
                targets: '#feriadoInfo',
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutElastic(1, .5)'
            });
        } else {
            feriadoInfo.style.display = 'none';
            periodoSelect.querySelector('option[value="noite"]').disabled = false;
        }

        // Verificar se é domingo
        const diaSemana = new Date(data + 'T00:00:00').getDay();
        if (diaSemana === 0) {
            feriadoInfo.textContent = '🌸 Bom domingo!';
            feriadoInfo.style.display = 'block';
            periodoSelect.value = 'manha';
            periodoSelect.querySelector('option[value="noite"]').disabled = true;
        }

    } catch (error) {
        console.error('Erro ao verificar feriado:', error);
    }
}

// Carregar produtos
async function carregarProdutos() {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('ativo', true)
            .order('nome');

        if (error) throw error;

        const select = document.getElementById('produtoSelect');
        select.innerHTML = '<option value="">Selecione ou digite abaixo</option>';

        data.forEach(produto => {
            const option = document.createElement('option');
            option.value = produto.id;
            option.textContent = produto.nome;
            option.dataset.preco = produto.preco_sugerido;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Verificar se já existe caixa aberto
async function verificarCaixaAberto() {
    try {
        const usuario = await auth.obterUsuarioAtual();
        const hoje = new Date().toISOString().split('T')[0];

        const { data, error } = await supabase
            .from('caixas')
            .select('*')
            .eq('aberto_por', usuario.id)
            .eq('status', 'aberto')
            .order('aberto_em', { ascending: false })
            .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
            caixaAtual = data[0];
            await carregarCaixa();
        }
    } catch (error) {
        console.error('Erro ao verificar caixa:', error);
    }
}

// Abrir caixa
async function abrirCaixa(e) {
    e.preventDefault();
    utils.mostrarLoading();

    try {
        const usuario = await auth.obterUsuarioAtual();
        const data = document.getElementById('dataAbertura').value;
        const periodo = document.getElementById('periodoAbertura').value;
        const saldoInicial = parseFloat(document.getElementById('saldoInicial').value);

        // Verificar se já existe caixa para esta data/período
        const { data: caixaExistente } = await supabase
            .from('caixas')
            .select('*')
            .eq('data', data)
            .eq('periodo', periodo);

        if (caixaExistente && caixaExistente.length > 0) {
            throw new Error('Já existe um caixa aberto para esta data e período.');
        }

        // Criar novo caixa
        const { data: novoCaixa, error } = await supabase
            .from('caixas')
            .insert({
                data: data,
                periodo: periodo,
                saldo_inicial: saldoInicial,
                aberto_por: usuario.id,
                status: 'aberto'
            })
            .select()
            .single();

        if (error) throw error;

        caixaAtual = novoCaixa;
        await carregarCaixa();

        utils.mostrarNotificacao('Caixa aberto com sucesso!', 'success');
        await utils.registrarAuditoria('ABRIR_CAIXA', 'caixas', { caixa_id: novoCaixa.id });

    } catch (error) {
        console.error('Erro ao abrir caixa:', error);
        utils.mostrarNotificacao(error.message, 'error');
    } finally {
        utils.esconderLoading();
    }
}

// Carregar caixa aberto
async function carregarCaixa() {
    // Esconder seção de abertura
    document.getElementById('abrirCaixaSection').style.display = 'none';

    // Mostrar seção de operações
    document.getElementById('operacoesSection').style.display = 'grid';
    document.getElementById('caixaInfoCard').style.display = 'flex';
    document.getElementById('vendaSection').style.display = 'flex';

    // Atualizar status
    const statusBadge = document.getElementById('statusCaixa');
    statusBadge.innerHTML = '<span class="inline-block w-2 h-2 bg-green-600 rounded-full animate-pulse"></span><span>Caixa Aberto</span>';

    // Atualizar informações
    document.getElementById('caixaData').textContent = utils.formatarData(caixaAtual.data);
    document.getElementById('caixaPeriodo').textContent = caixaAtual.periodo === 'manha' ? 'Manhã' : 'Noite';
    document.getElementById('caixaSaldoInicial').textContent = utils.formatarMoeda(caixaAtual.saldo_inicial);

    // Carregar vendas, retiradas e adições
    await carregarVendas();
    await carregarRetiradas();
    await carregarAdicoes();
    await atualizarTotais();
}

// Registrar venda
async function registrarVenda(e) {
    e.preventDefault();
    utils.mostrarLoading();

    try {
        const usuario = await auth.obterUsuarioAtual();
        const produtoId = document.getElementById('produtoSelect').value || null;
        const descricao = document.getElementById('descricaoVenda').value;
        const quantidade = parseInt(document.getElementById('quantidadeVenda').value);
        const valor = parseFloat(document.getElementById('valorVenda').value);
        const pagamento = document.getElementById('pagamentoVenda').value;
        const observacao = document.getElementById('observacaoVenda').value || null;

        const { data, error } = await supabase
            .from('vendas')
            .insert({
                caixa_id: caixaAtual.id,
                produto_id: produtoId,
                descricao: descricao,
                quantidade: quantidade,
                valor: valor,
                pagamento: pagamento,
                observacao: observacao,
                criado_por: usuario.id
            })
            .select()
            .single();

        if (error) throw error;

        // Limpar formulário
        document.getElementById('vendaForm').reset();
        document.getElementById('quantidadeVenda').value = 1;

        // Recarregar vendas
        await carregarVendas();
        await atualizarTotais();

        utils.mostrarNotificacao('Venda registrada com sucesso!', 'success');

        // Animação
        anime({
            targets: '#vendasList .venda-item:first-child',
            scale: [0.9, 1],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutQuad'
        });

    } catch (error) {
        console.error('Erro ao registrar venda:', error);
        utils.mostrarNotificacao(error.message, 'error');
    } finally {
        utils.esconderLoading();
    }
}

// Carregar vendas
async function carregarVendas() {
    try {
        const { data, error } = await supabase
            .from('vendas')
            .select('*')
            .eq('caixa_id', caixaAtual.id)
            .order('criado_em', { ascending: false });

        if (error) throw error;

        vendas = data;
        renderizarVendas();

    } catch (error) {
        console.error('Erro ao carregar vendas:', error);
    }
}

// Renderizar vendas
function renderizarVendas() {
    const container = document.getElementById('vendasList');

    if (vendas.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-8 text-gray-400">
                <span class="material-symbols-outlined text-5xl mb-2">shopping_cart</span>
                <p class="text-sm">Nenhuma venda registrada ainda</p>
            </div>
        `;
        return;
    }

    container.innerHTML = vendas.map(venda => `
        <div class="flex justify-between items-center p-3 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-colors">
            <div class="flex items-center gap-3">
                <div class="bg-primary/20 rounded-full size-8 flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-lg">local_florist</span>
                </div>
                <div>
                    <p class="text-gray-800 dark:text-gray-100 font-medium">${venda.quantidade}x ${venda.descricao}</p>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">
                        ${formatarPagamento(venda.pagamento)} • ${utils.formatarDataHora(venda.criado_em)}
                        ${venda.observacao ? `<br><small>${venda.observacao}</small>` : ''}
                    </p>
                </div>
            </div>
            <p class="font-semibold text-gray-800 dark:text-gray-100">${utils.formatarMoeda(venda.valor)}</p>
        </div>
    `).join('');
}

// Registrar retirada
async function registrarRetirada(e) {
    e.preventDefault();
    utils.mostrarLoading();

    try {
        const usuario = await auth.obterUsuarioAtual();
        const tipo = document.getElementById('tipoRetirada').value;
        const descricao = document.getElementById('descricaoRetirada').value;
        const valor = parseFloat(document.getElementById('valorRetirada').value);

        // Se for outra retirada, validar senha mestra
        if (tipo === 'outra') {
            const senha = document.getElementById('senhaMestra').value;
            const validado = await validarSenhaGerente(senha);
            if (!validado) {
                throw new Error('Senha mestra inválida.');
            }
        }

        const { data, error } = await supabase
            .from('retiradas')
            .insert({
                caixa_id: caixaAtual.id,
                tipo: tipo,
                descricao: descricao,
                valor: valor,
                autorizado_por: usuario.id
            })
            .select()
            .single();

        if (error) throw error;

        // Limpar formulário e fechar modal
        document.getElementById('retiradaForm').reset();
        document.getElementById('modalRetirada').classList.add('hidden');
        const senhaGroup = document.getElementById('senhaMestraGroup');
        if (senhaGroup) senhaGroup.style.display = 'none';

        // Recarregar retiradas
        await carregarRetiradas();
        await atualizarTotais();

        utils.mostrarNotificacao('Retirada registrada com sucesso!', 'success');

    } catch (error) {
        console.error('Erro ao registrar retirada:', error);
        utils.mostrarNotificacao(error.message, 'error');
    } finally {
        utils.esconderLoading();
    }
}

// Validar senha mestra
async function validarSenhaGerente(senha) {
    try {
        // Chamar função do banco que valida a senha mestra
        const { data, error } = await supabase.rpc('validar_senha_mestra', {
            senha_informada: senha
        });

        if (error) {
            console.error('Erro ao validar senha:', error);
            return false;
        }

        return data === true;
    } catch (error) {
        console.error('Erro ao validar senha:', error);
        return false;
    }
}

// Carregar retiradas
async function carregarRetiradas() {
    try {
        const { data, error } = await supabase
            .from('retiradas')
            .select('*')
            .eq('caixa_id', caixaAtual.id)
            .order('criado_em', { ascending: false });

        if (error) throw error;

        retiradas = data;

    } catch (error) {
        console.error('Erro ao carregar retiradas:', error);
    }
}

// Carregar adições manuais
async function carregarAdicoes() {
    try {
        const { data, error } = await supabase
            .from('adicoes_manuais')
            .select('*')
            .eq('caixa_id', caixaAtual.id)
            .order('criado_em', { ascending: false });

        if (error) {
            // Se a tabela não existe ainda, apenas inicializar array vazio
            if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
                console.warn('Tabela adicoes_manuais ainda não foi criada. Execute o script 10_adicoes_manuais.sql');
                adicoes = [];
                return;
            }
            throw error;
        }

        adicoes = data || [];

    } catch (error) {
        console.error('Erro ao carregar adições:', error);
        adicoes = []; // Garantir que adicoes seja sempre um array
    }
}

// Registrar adição manual
async function registrarAdicao(e) {
    e.preventDefault();
    utils.mostrarLoading();

    try {
        const usuario = await auth.obterUsuarioAtual();
        const descricao = document.getElementById('descricaoAdicao').value;
        const valor = parseFloat(document.getElementById('valorAdicao').value);
        const senha = document.getElementById('senhaMestraAdicao').value;

        // Validar senha mestra (sempre obrigatória para adições)
        const validado = await validarSenhaGerente(senha);
        if (!validado) {
            throw new Error('Senha mestra inválida.');
        }

        const { data, error } = await supabase
            .from('adicoes_manuais')
            .insert({
                caixa_id: caixaAtual.id,
                descricao: descricao,
                valor: valor,
                autorizado_por: usuario.id
            })
            .select()
            .single();

        if (error) throw error;

        // Limpar formulário e fechar modal
        document.getElementById('adicaoForm').reset();
        document.getElementById('modalAdicao').classList.add('hidden');

        // Recarregar adições
        await carregarAdicoes();
        await atualizarTotais();

        utils.mostrarNotificacao('Saldo adicionado com sucesso!', 'success');

    } catch (error) {
        console.error('Erro ao registrar adição:', error);
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
            utils.mostrarNotificacao('Tabela de adições não encontrada. Execute o script SQL 10_adicoes_manuais.sql no Supabase.', 'error');
        } else {
            utils.mostrarNotificacao(error.message, 'error');
        }
    } finally {
        utils.esconderLoading();
    }
}

// Validar senha mestra
async function validarSenhaGerente(senha) {
    try {
        // Chamar função do banco que valida a senha mestra
        const { data, error } = await supabase.rpc('validar_senha_mestra', {
            senha_informada: senha
        });

        if (error) {
            console.error('Erro ao validar senha:', error);
            return false;
        }

        return data === true;
    } catch (error) {
        console.error('Erro ao validar senha:', error);
        return false;
    }
}

// Atualizar totais
async function atualizarTotais() {
    const totalVendas = vendas.reduce((sum, v) => sum + parseFloat(v.valor), 0);
    document.getElementById('caixaTotalVendas').textContent = utils.formatarMoeda(totalVendas);

    // Calcular saldo atual: saldo inicial + vendas em dinheiro + adições - retiradas
    const vendasDinheiro = vendas
        .filter(v => v.pagamento === 'dinheiro')
        .reduce((sum, v) => sum + parseFloat(v.valor), 0);
    const totalRetiradas = retiradas.reduce((sum, r) => sum + parseFloat(r.valor), 0);
    const totalAdicoes = adicoes.reduce((sum, a) => sum + parseFloat(a.valor), 0);
    const saldoAtual = parseFloat(caixaAtual.saldo_inicial) + vendasDinheiro + totalAdicoes - totalRetiradas;

    // Atualizar display do saldo atual (se o elemento existir)
    const saldoAtualElement = document.getElementById('caixaSaldoAtual');
    if (saldoAtualElement) {
        saldoAtualElement.textContent = utils.formatarMoeda(saldoAtual);
    }
}

// Fechar caixa e gerar PDF
async function fecharCaixa() {
    if (!utils.confirmarAcao('Deseja realmente fechar o caixa e gerar o PDF?')) {
        return;
    }

    utils.mostrarLoading();

    try {
        const usuario = await auth.obterUsuarioAtual();

        // Calcular totais
        const totalVendas = vendas.reduce((sum, v) => sum + parseFloat(v.valor), 0);
        const totalRetiradas = retiradas.reduce((sum, r) => sum + parseFloat(r.valor), 0);
        const totalAdicoes = adicoes.reduce((sum, a) => sum + parseFloat(a.valor), 0);
        const saldoFinal = parseFloat(caixaAtual.saldo_inicial) + totalVendas + totalAdicoes - totalRetiradas;

        // Atualizar caixa
        const { error } = await supabase
            .from('caixas')
            .update({
                saldo_final: saldoFinal,
                fechado_por: usuario.id,
                fechado_em: new Date().toISOString(),
                status: 'fechado'
            })
            .eq('id', caixaAtual.id);

        if (error) throw error;

        // Gerar PDF
        await gerarPDF();

        utils.mostrarNotificacao('Caixa fechado com sucesso!', 'success');
        await utils.registrarAuditoria('FECHAR_CAIXA', 'caixas', { caixa_id: caixaAtual.id });

        // Recarregar página após 2 segundos
        setTimeout(() => {
            window.location.reload();
        }, 2000);

    } catch (error) {
        console.error('Erro ao fechar caixa:', error);
        utils.mostrarNotificacao(error.message, 'error');
    } finally {
        utils.esconderLoading();
    }
}

// Gerar PDF
async function gerarPDF() {
    console.log('🔥 GERANDO PDF - VERSÃO 2.0 COM LAYOUT MELHORADO! 🔥');
    console.log('Vendas:', vendas.length, 'Retiradas:', retiradas.length);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Cores
    const rosaMedio = [255, 105, 180];
    const cinzaEscuro = [107, 114, 128];

    // Cabeçalho
    doc.setFillColor(...rosaMedio);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('Mande Flores', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Fechamento de Caixa', 105, 30, { align: 'center' });

    // Informações do caixa
    doc.setTextColor(...cinzaEscuro);
    doc.setFontSize(10);
    let y = 50;

    doc.text(`Data: ${utils.formatarData(caixaAtual.data)}`, 20, y);
    doc.text(`Período: ${caixaAtual.periodo === 'manha' ? 'Manhã' : 'Noite'}`, 120, y);
    y += 7;
    doc.text(`Abertura: ${utils.formatarDataHora(caixaAtual.aberto_em)}`, 20, y);
    doc.text(`Fechamento: ${utils.formatarDataHora(new Date())}`, 120, y);

    y += 15;

    // Tabela de vendas
    if (vendas.length > 0) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Vendas', 20, y);
        y += 7;

        const vendasData = vendas.map(v => [
            `${v.quantidade}x`,
            v.descricao + (v.observacao ? `\n${v.observacao}` : ''),
            formatarPagamento(v.pagamento),
            utils.formatarMoeda(v.valor)
        ]);

        doc.autoTable({
            startY: y,
            head: [['Qtd', 'Descrição', 'Pagamento', 'Valor']],
            body: vendasData,
            theme: 'striped',
            headStyles: { fillColor: rosaMedio },
            margin: { left: 20, right: 20 },
            styles: { cellPadding: 3, fontSize: 9 },
            columnStyles: {
                1: { cellWidth: 70 } // Descrição com mais espaço
            }
        });

        y = doc.lastAutoTable.finalY + 10;
    }

    // Resumo final
    const totalVendas = vendas.reduce((sum, v) => sum + parseFloat(v.valor), 0);
    const totalRetiradas = retiradas.reduce((sum, r) => sum + parseFloat(r.valor), 0);
    const totalAdicoes = adicoes.reduce((sum, a) => sum + parseFloat(a.valor), 0);
    const saldoFinal = parseFloat(caixaAtual.saldo_inicial) + totalVendas + totalAdicoes - totalRetiradas;

    // Totais por forma de pagamento
    const totaisPagamento = {
        'Dinheiro': 0,
        'PIX WhatsApp': 0,
        'PIX Maquininha': 0,
        'Débito': 0,
        'Crédito': 0,
        'Link Pagamento': 0
    };

    vendas.forEach(v => {
        const forma = formatarPagamento(v.pagamento);
        totaisPagamento[forma] = (totaisPagamento[forma] || 0) + parseFloat(v.valor);
    });

    // Verificar se precisa de nova página para o resumo
    const alturaResumo = 120; // Estimativa generosa para todo o resumo

    if (y + alturaResumo > 280) {
        doc.addPage();
        y = 20;
    }

    // ========== RESUMO FINANCEIRO ==========
    doc.setFillColor(240, 240, 240);
    doc.rect(15, y - 5, 180, 12, 'F');

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('RESUMO FINANCEIRO', 105, y + 3, { align: 'center' });
    y += 15;

    // Saldo Inicial
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Saldo Inicial:', 20, y);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(utils.formatarMoeda(caixaAtual.saldo_inicial), 190, y, { align: 'right' });
    y += 8;

    // Total Vendas
    doc.setFont(undefined, 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Total em Vendas:', 20, y);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 150, 0);
    doc.text(utils.formatarMoeda(totalVendas), 190, y, { align: 'right' });
    y += 8;

    // Total Adições
    if (totalAdicoes > 0) {
        doc.setFont(undefined, 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text('Adições Manuais:', 20, y);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 150, 0);
        doc.text('+ ' + utils.formatarMoeda(totalAdicoes), 190, y, { align: 'right' });
        y += 8;
    }

    // Total Retiradas
    if (totalRetiradas > 0) {
        doc.setFont(undefined, 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text('Total em Retiradas:', 20, y);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(200, 0, 0);
        doc.text('- ' + utils.formatarMoeda(totalRetiradas), 190, y, { align: 'right' });
        y += 8;
    }

    // Linha separadora
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, 190, y);
    y += 6;

    // Saldo Final (destaque)
    doc.setFillColor(180, 71, 235);
    doc.roundedRect(15, y - 3, 180, 10, 2, 2, 'F');

    doc.setFont(undefined, 'bold');
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text('SALDO FINAL:', 20, y + 4);
    doc.text(utils.formatarMoeda(saldoFinal), 190, y + 4, { align: 'right' });
    y += 18;

    // ========== DETALHAMENTO POR FORMA DE PAGAMENTO ==========
    doc.setFillColor(240, 240, 240);
    doc.rect(15, y - 5, 180, 12, 'F');

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('FORMAS DE PAGAMENTO', 105, y + 3, { align: 'center' });
    y += 15;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(80, 80, 80);

    // Listar todas as formas de pagamento
    Object.entries(totaisPagamento).forEach(([forma, valor]) => {
        if (valor > 0) {
            doc.text(`${forma}:`, 25, y);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text(utils.formatarMoeda(valor), 190, y, { align: 'right' });
            doc.setFont(undefined, 'normal');
            doc.setTextColor(80, 80, 80);
            y += 6;
        }
    });

    // ========== CONFERÊNCIA DE DINHEIRO ==========
    y += 5;

    // Verificar se precisa de nova página
    if (y + 30 > 280) {
        doc.addPage();
        y = 20;
    }

    const dinheiroEsperado = parseFloat(caixaAtual.saldo_inicial) + totaisPagamento['Dinheiro'] + totalAdicoes - totalRetiradas;

    doc.setFillColor(255, 243, 205); // Amarelo claro
    doc.rect(15, y - 5, 180, 12, 'F');

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('CONFERÊNCIA DE DINHEIRO', 105, y + 3, { align: 'center' });
    y += 15;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('Saldo Inicial (dinheiro):', 25, y);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(utils.formatarMoeda(caixaAtual.saldo_inicial), 190, y, { align: 'right' });
    y += 6;

    doc.setFont(undefined, 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text('+ Vendas em Dinheiro:', 25, y);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 150, 0);
    doc.text(utils.formatarMoeda(totaisPagamento['Dinheiro']), 190, y, { align: 'right' });
    y += 6;

    if (totalAdicoes > 0) {
        doc.setFont(undefined, 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text('+ Adições Manuais:', 25, y);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 150, 0);
        doc.text(utils.formatarMoeda(totalAdicoes), 190, y, { align: 'right' });
        y += 6;
    }

    if (totalRetiradas > 0) {
        doc.setFont(undefined, 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text('- Retiradas:', 25, y);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(200, 0, 0);
        doc.text(utils.formatarMoeda(totalRetiradas), 190, y, { align: 'right' });
        y += 6;
    }

    doc.setDrawColor(200, 200, 200);
    doc.line(25, y, 190, y);
    y += 4;

    doc.setFillColor(255, 193, 7); // Amarelo/dourado
    doc.roundedRect(15, y - 3, 180, 10, 2, 2, 'F');
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('DINHEIRO ESPERADO NO CAIXA:', 25, y + 4);
    doc.text(utils.formatarMoeda(dinheiroEsperado), 190, y + 4, { align: 'right' });
    y += 15;

    // ========== RETIRADAS (se houver) ==========
    if (retiradas.length > 0) {
        y += 5;

        // Verificar se precisa de nova página
        if (y + 40 > 280) {
            doc.addPage();
            y = 20;
        }

        doc.setFillColor(240, 240, 240);
        doc.rect(15, y - 5, 180, 12, 'F');

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('RETIRADAS DO CAIXA', 105, y + 3, { align: 'center' });
        y += 15;

        doc.setFontSize(10);
        retiradas.forEach(r => {
            doc.setFont(undefined, 'normal');
            doc.setTextColor(80, 80, 80);
            const tipo = r.tipo === 'passagem' ? 'Passagem' : 'Outra';
            doc.text(`${tipo}: ${r.descricao}`, 25, y);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(200, 0, 0);
            doc.text(utils.formatarMoeda(r.valor), 190, y, { align: 'right' });
            y += 6;
        });
    }

    // ========== ADIÇÕES MANUAIS (se houver) ==========
    if (adicoes.length > 0) {
        y += 5;

        // Verificar se precisa de nova página
        if (y + 40 > 280) {
            doc.addPage();
            y = 20;
        }

        doc.setFillColor(240, 240, 240);
        doc.rect(15, y - 5, 180, 12, 'F');

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('ADIÇÕES MANUAIS DE SALDO', 105, y + 3, { align: 'center' });
        y += 15;

        doc.setFontSize(10);
        adicoes.forEach(a => {
            doc.setFont(undefined, 'normal');
            doc.setTextColor(80, 80, 80);
            doc.text(a.descricao, 25, y);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 150, 0);
            doc.text(utils.formatarMoeda(a.valor), 190, y, { align: 'right' });
            y += 6;
        });
    }

    // Salvar PDF
    const nomeArquivo = `caixa_${caixaAtual.data}_${caixaAtual.periodo}.pdf`;
    doc.save(nomeArquivo);
}

// Formatar forma de pagamento
function formatarPagamento(pagamento) {
    const formas = {
        'dinheiro': 'Dinheiro',
        'pix_whatsapp': 'PIX WhatsApp',
        'pix_maquininha': 'PIX Maquininha',
        'debito': 'Débito',
        'credito': 'Crédito',
        'link_pagamento': 'Link Pagamento'
    };
    return formas[pagamento] || pagamento;
}
