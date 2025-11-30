// ============================================
// MÓDULO DE DASHBOARD
// ============================================

let vendasMensaisChart = null;
let pagamentosChart = null;

// Inicializar página
document.addEventListener('DOMContentLoaded', async () => {
    // Verificar autenticação e permissão
    await auth.verificarPermissao(['gerente', 'admin']);

    // Carregar dados do usuário
    const usuario = await auth.obterUsuarioAtual();
    if (usuario) {
        document.getElementById('usuarioNome').textContent = usuario.nome;

        // Mostrar link admin se for admin
        if (usuario.cargo === 'admin') {
            document.getElementById('adminLink').style.display = 'block';
        }

        // Saudação personalizada
        const saudacao = utils.obterSaudacao();
        document.getElementById('saudacao').textContent = `${saudacao}!`;
    }

    // Definir ano e mês atuais
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.toLocaleDateString('pt-BR', { month: 'long' });

    document.getElementById('anoGrafico').textContent = ano;
    document.getElementById('mesAtual').textContent = mes;

    // Carregar dados
    await carregarMetricas();
    await carregarGraficos();

    // Animação de entrada
    anime({
        targets: '.metric-card',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuad'
    });
});

// Carregar métricas
async function carregarMetricas() {
    try {
        const hoje = new Date();
        const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().split('T')[0];
        const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).toISOString().split('T')[0];
        const seteDiasAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        // Total do mês
        const { data: vendasMes } = await supabase
            .from('vendas')
            .select('valor, caixa_id')
            .gte('criado_em', primeiroDiaMes)
            .lte('criado_em', ultimoDiaMes);

        if (vendasMes) {
            const totalMes = vendasMes.reduce((sum, v) => sum + parseFloat(v.valor), 0);
            document.getElementById('totalMes').textContent = utils.formatarMoeda(totalMes);

            // Animar valor
            animarValor('totalMes', 0, totalMes);
        }

        // Vendas da semana
        const { data: vendasSemana } = await supabase
            .from('vendas')
            .select('valor')
            .gte('criado_em', seteDiasAtras);

        if (vendasSemana) {
            const totalSemana = vendasSemana.reduce((sum, v) => sum + parseFloat(v.valor), 0);
            document.getElementById('vendasSemana').textContent = utils.formatarMoeda(totalSemana);
            animarValor('vendasSemana', 0, totalSemana);
        }

        // Produto mais vendido
        const { data: produtos } = await supabase
            .from('vendas')
            .select('descricao, quantidade')
            .gte('criado_em', primeiroDiaMes);

        if (produtos && produtos.length > 0) {
            const contagem = {};
            produtos.forEach(p => {
                const desc = p.descricao;
                contagem[desc] = (contagem[desc] || 0) + p.quantidade;
            });

            const maisVendido = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0];
            if (maisVendido) {
                document.getElementById('produtoMaisVendido').textContent = maisVendido[0];
                document.getElementById('qtdProdutoMaisVendido').textContent = `${maisVendido[1]} vendas`;
            }
        }

        // Dia mais lucrativo
        const { data: caixas } = await supabase
            .from('caixas')
            .select('id, data, saldo_final')
            .gte('data', primeiroDiaMes)
            .lte('data', ultimoDiaMes)
            .eq('status', 'fechado')
            .order('saldo_final', { ascending: false })
            .limit(1);

        if (caixas && caixas.length > 0) {
            const diaMaisLucrativo = caixas[0];
            document.getElementById('diaMaisLucrativo').textContent = utils.formatarData(diaMaisLucrativo.data);
            document.getElementById('valorDiaMaisLucrativo').textContent = utils.formatarMoeda(diaMaisLucrativo.saldo_final);
        }

    } catch (error) {
        console.error('Erro ao carregar métricas:', error);
    }
}

// Animar valor monetário
function animarValor(elementId, inicio, fim) {
    const elemento = document.getElementById(elementId);
    const duracao = 1000;
    const incremento = (fim - inicio) / (duracao / 16);
    let valorAtual = inicio;

    const intervalo = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= fim) {
            valorAtual = fim;
            clearInterval(intervalo);
        }
        elemento.textContent = utils.formatarMoeda(valorAtual);
    }, 16);
}

// Carregar gráficos
async function carregarGraficos() {
    await carregarGraficoVendasMensais();
    await carregarGraficoPagamentos();
}

// Gráfico de vendas mensais
async function carregarGraficoVendasMensais() {
    try {
        const ano = new Date().getFullYear();
        const meses = [];
        const valores = [];

        // Buscar vendas de cada mês
        for (let mes = 0; mes < 12; mes++) {
            const primeiroDia = new Date(ano, mes, 1).toISOString();
            const ultimoDia = new Date(ano, mes + 1, 0, 23, 59, 59).toISOString();

            const { data } = await supabase
                .from('vendas')
                .select('valor')
                .gte('criado_em', primeiroDia)
                .lte('criado_em', ultimoDia);

            const total = data ? data.reduce((sum, v) => sum + parseFloat(v.valor), 0) : 0;

            meses.push(new Date(ano, mes).toLocaleDateString('pt-BR', { month: 'short' }));
            valores.push(total);
        }

        // Criar gráfico
        const ctx = document.getElementById('vendasMensaisChart').getContext('2d');

        if (vendasMensaisChart) {
            vendasMensaisChart.destroy();
        }

        vendasMensaisChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Vendas (R$)',
                    data: valores,
                    backgroundColor: 'rgba(255, 105, 180, 0.6)',
                    borderColor: 'rgba(255, 105, 180, 1)',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return utils.formatarMoeda(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Erro ao carregar gráfico de vendas mensais:', error);
    }
}

// Gráfico de formas de pagamento
async function carregarGraficoPagamentos() {
    try {
        const ano = new Date().getFullYear();
        const primeiroDia = new Date(ano, 0, 1).toISOString().split('T')[0];
        const ultimoDia = new Date(ano, 11, 31).toISOString().split('T')[0];

        const { data } = await supabase
            .from('vendas')
            .select('pagamento, valor')
            .gte('criado_em', primeiroDia)
            .lte('criado_em', ultimoDia);

        if (!data || data.length === 0) {
            return;
        }

        // Agrupar por forma de pagamento
        const totais = {};
        data.forEach(v => {
            const forma = formatarPagamento(v.pagamento);
            totais[forma] = (totais[forma] || 0) + parseFloat(v.valor);
        });

        const labels = Object.keys(totais);
        const valores = Object.values(totais);

        // Cores para cada forma de pagamento
        const cores = [
            'rgba(255, 105, 180, 0.8)',  // Rosa
            'rgba(152, 216, 200, 0.8)',  // Verde menta
            'rgba(230, 230, 250, 0.8)',  // Lavanda
            'rgba(255, 229, 217, 0.8)',  // Pêssego
            'rgba(255, 107, 107, 0.8)',  // Coral
            'rgba(147, 112, 219, 0.8)'   // Roxo
        ];

        // Criar gráfico
        const ctx = document.getElementById('pagamentosChart').getContext('2d');

        if (pagamentosChart) {
            pagamentosChart.destroy();
        }

        pagamentosChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: valores,
                    backgroundColor: cores,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = utils.formatarMoeda(context.parsed);
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Erro ao carregar gráfico de pagamentos:', error);
    }
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
