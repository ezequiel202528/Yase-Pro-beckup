// 
async function sincronizarPainelSelos() {
    const elLote = document.getElementById('lote_documento');
    const elSeloProx = document.getElementById('proximo_selo_num');
    const elQtd = document.getElementById('qtd_restante_texto');

    try {
        // 1. Busca o lote ABERTO
        const { data: lote, error } = await _supabase
            .from('rem_essas')
            .select('*')
            .eq('status_lote', 'ABERTO')
            .maybeSingle();

        if (error || !lote) {
            if (elLote) elLote.innerText = "NENHUM LOTE ATIVO";
            return;
        }

        // 2. Conta no banco quantos itens já usaram esse prefixo
        const { count: usados } = await _supabase
            .from('itens_os')
            .select('*', { count: 'exact', head: true })
            .eq('prefixo_selo', lote.prefixo);

        const totalLote = parseInt(lote.qtd_selos) || 0;
        const quantidadeUsada = usados || 0;
        
        const proximoSelo = parseInt(lote.selo_inicio) + quantidadeUsada;
        const restante = totalLote - quantidadeUsada;

        // 3. Atualiza a Interface
        if (elLote) elLote.innerHTML = `LOTE: <span class="text-amber-500 font-black">${lote.prefixo}</span>`;
        if (elSeloProx) elSeloProx.innerText = proximoSelo;
        if (elQtd) elQtd.innerText = restante;

        window.prefixoAtualSelo = lote.prefixo;

    } catch (err) {
        console.error("Erro na sincronização:", err);
    }
}

// Inicia e escuta mudanças
window.addEventListener('load', () => {
    sincronizarPainelSelos();
    
    _supabase
        .channel('mudanca_selos')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'itens_os' }, () => {
            setTimeout(sincronizarPainelSelos, 500);
        })
        .subscribe();
});