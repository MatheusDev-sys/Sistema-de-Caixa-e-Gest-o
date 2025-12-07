// Função para gerar PDF de caixas anteriores
async function gerarPDFCaixa(caixaId) {
    try {
        const { data: caixa, error: caixaError } = await supabase
            .from('caixas')
            .select('*')
            .eq('id', caixaId)
            .single();

        if (caixaError) throw caixaError;

        const { data: vendas, error: vendasError } = await supabase
            .from('vendas')
            .select('*')
            .eq('caixa_id', caixaId)
            .order('criado_em');

        if (vendasError) throw vendasError;

        const { data: retiradas, error: retiradasError } = await supabase
            .from('retiradas')
            .select('*')
            .eq('caixa_id', caixaId)
            .order('criado_em');

        if (retiradasError) throw retiradasError;

        // Buscar adições manuais (pode não existir a tabela ainda)
        let adicoes = [];
        try {
            const { data: adicoesData, error: adicoesError } = await supabase
                .from('adicoes_manuais')
                .select('*')
                .eq('caixa_id', caixaId)
                .order('criado_em');

            if (!adicoesError) {
                adicoes = adicoesData || [];
            }
        } catch (e) {
            console.warn('Tabela adicoes_manuais não encontrada:', e);
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const rosaMedio = [180, 71, 235];
        const cinzaEscuro = [107, 114, 128];

        doc.setFillColor(...rosaMedio);
        doc.rect(0, 0, 210, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.text('Mande Flores', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text('Fechamento de Caixa', 105, 30, { align: 'center' });

        doc.setTextColor(...cinzaEscuro);
        doc.setFontSize(10);
        let y = 50;

        doc.text('Data: ' + utils.formatarData(caixa.data), 20, y);
        doc.text('Período: ' + (caixa.periodo === 'manha' ? 'Manhã' : 'Noite'), 120, y);
        y += 7;
        doc.text('Abertura: ' + utils.formatarDataHora(caixa.aberto_em), 20, y);
        doc.text('Fechamento: ' + utils.formatarDataHora(caixa.fechado_em), 120, y);

        y += 15;

        if (vendas.length > 0) {
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('Vendas', 20, y);
            y += 7;

            const vendasData = vendas.map(v => [
                v.quantidade + 'x',
                v.descricao + (v.observacao ? `\n${v.observacao}` : ''),
                v.pagamento,
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

        const totalVendas = vendas.reduce((sum, v) => sum + parseFloat(v.valor), 0);
        const totalRetiradas = retiradas.reduce((sum, r) => sum + parseFloat(r.valor), 0);
        const totalAdicoes = adicoes.reduce((sum, a) => sum + parseFloat(a.valor), 0);

        const totaisPagamento = {
            'Dinheiro': 0,
            'PIX WhatsApp': 0,
            'PIX Maquininha': 0,
            'Cartão': 0,  // Agrupa débito, crédito e cartão
            'Link Pagamento': 0
        };

        vendas.forEach(v => {
            const pagamento = v.pagamento;
            const formas = {
                'dinheiro': 'Dinheiro',
                'pix_whatsapp': 'PIX WhatsApp',
                'pix_maquininha': 'PIX Maquininha',
                'debito': 'Cartão',  // Unificado
                'credito': 'Cartão', // Unificado
                'cartao': 'Cartão',  // Nova opção
                'link_pagamento': 'Link Pagamento'
            };
            const forma = formas[pagamento] || pagamento;
            totaisPagamento[forma] = (totaisPagamento[forma] || 0) + parseFloat(v.valor);
        });

        const alturaResumo = 120;
        if (y + alturaResumo > 280) {
            doc.addPage();
            y = 20;
        }

        // RESUMO FINANCEIRO
        doc.setFillColor(240, 240, 240);
        doc.rect(15, y - 5, 180, 12, 'F');
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('RESUMO FINANCEIRO', 105, y + 3, { align: 'center' });
        y += 15;

        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text('Saldo Inicial:', 20, y);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(utils.formatarMoeda(caixa.saldo_inicial), 190, y, { align: 'right' });
        y += 8;

        doc.setFont(undefined, 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text('Total em Vendas:', 20, y);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(0, 150, 0);
        doc.text(utils.formatarMoeda(totalVendas), 190, y, { align: 'right' });
        y += 8;

        if (totalRetiradas > 0) {
            doc.setFont(undefined, 'normal');
            doc.setTextColor(80, 80, 80);
            doc.text('Total em Retiradas:', 20, y);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(200, 0, 0);
            doc.text('- ' + utils.formatarMoeda(totalRetiradas), 190, y, { align: 'right' });
            y += 8;
        }

        if (totalAdicoes > 0) {
            doc.setFont(undefined, 'normal');
            doc.setTextColor(80, 80, 80);
            doc.text('Adições Manuais:', 20, y);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(0, 150, 0);
            doc.text('+ ' + utils.formatarMoeda(totalAdicoes), 190, y, { align: 'right' });
            y += 8;
        }

        doc.setDrawColor(200, 200, 200);
        doc.line(20, y, 190, y);
        y += 6;

        doc.setFillColor(180, 71, 235);
        doc.roundedRect(15, y - 3, 180, 10, 2, 2, 'F');
        doc.setFont(undefined, 'bold');
        doc.setFontSize(13);
        doc.setTextColor(255, 255, 255);
        doc.text('SALDO FINAL:', 20, y + 4);
        doc.text(utils.formatarMoeda(caixa.saldo_final), 190, y + 4, { align: 'right' });
        y += 18;

        // FORMAS DE PAGAMENTO
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

        Object.entries(totaisPagamento).forEach(([forma, valor]) => {
            if (valor > 0) {
                doc.text(forma + ':', 25, y);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(utils.formatarMoeda(valor), 190, y, { align: 'right' });
                doc.setFont(undefined, 'normal');
                doc.setTextColor(80, 80, 80);
                y += 6;
            }
        });

        // CONFERÊNCIA DE DINHEIRO
        y += 5;
        if (y + 30 > 280) {
            doc.addPage();
            y = 20;
        }

        const dinheiroEsperado = parseFloat(caixa.saldo_inicial) + totaisPagamento['Dinheiro'] + totalAdicoes - totalRetiradas;

        doc.setFillColor(255, 243, 205);
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
        doc.text(utils.formatarMoeda(caixa.saldo_inicial), 190, y, { align: 'right' });
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

        doc.setFillColor(255, 193, 7);
        doc.roundedRect(15, y - 3, 180, 10, 2, 2, 'F');
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('DINHEIRO ESPERADO NO CAIXA:', 25, y + 4);
        doc.text(utils.formatarMoeda(dinheiroEsperado), 190, y + 4, { align: 'right' });
        y += 15;

        // RETIRADAS
        if (retiradas.length > 0) {
            y += 5;
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
                doc.text(tipo + ': ' + r.descricao, 25, y);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(200, 0, 0);
                doc.text(utils.formatarMoeda(r.valor), 190, y, { align: 'right' });
                y += 6;
            });
        }

        // ADIÇÕES MANUAIS
        if (adicoes.length > 0) {
            y += 5;
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

        const nomeArquivo = 'caixa_' + caixa.data + '_' + caixa.periodo + '.pdf';
        doc.save(nomeArquivo);

    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar PDF: ' + error.message);
    }
}
