// ============================================
// FUNÇÕES COMPARTILHADAS - AVATAR
// ============================================

function abrirModalAvatar() {
    const modal = document.getElementById('modalAvatar');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

async function salvarAvatar() {
    const input = document.getElementById('avatarInput');
    const file = input.files[0];

    if (!file) {
        Notificacao.mostrar('Selecione uma imagem primeiro!', 'warning');
        return;
    }

    // VALIDAÇÃO DE SEGURANÇA: apenas JPEG e PNG
    const tiposPermitidos = ['image/jpeg', 'image/png'];
    if (!tiposPermitidos.includes(file.type)) {
        Notificacao.mostrar('Apenas arquivos JPEG e PNG são permitidos por segurança!', 'error');
        return;
    }

    // Validação de tamanho (máx 2MB)
    if (file.size > 2 * 1024 * 1024) {
        Notificacao.mostrar('Arquivo muito grande! Máximo 2MB.', 'error');
        return;
    }

    try {
        const usuario = await auth.obterUsuarioAtual();
        const nomeArquivo = `${usuario.id}_${Date.now()}.${file.type.split('/')[1]}`;

        // Upload para Supabase Storage
        const { data, error } = await supabase.storage
            .from('avatars')
            .upload(nomeArquivo, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Obter URL pública
        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(nomeArquivo);

        // Atualizar na tabela usuarios
        const { error: updateError } = await supabase
            .from('usuarios')
            .update({ foto_url: urlData.publicUrl })
            .eq('id', usuario.id);

        if (updateError) throw updateError;

        // Atualizar UI
        const avatarImg = document.getElementById('userAvatar');
        const initials = document.getElementById('userInitials');

        if (avatarImg && initials) {
            avatarImg.src = urlData.publicUrl;
            avatarImg.classList.remove('hidden');
            initials.classList.add('hidden');
        }

        document.getElementById('modalAvatar').classList.add('hidden');
        Notificacao.mostrar('Avatar atualizado com sucesso!', 'success');

    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        Notificacao.mostrar('Erro ao salvar avatar: ' + error.message, 'error');
    }
}

// Tornar funções globais
window.abrirModalAvatar = abrirModalAvatar;
window.salvarAvatar = salvarAvatar;
