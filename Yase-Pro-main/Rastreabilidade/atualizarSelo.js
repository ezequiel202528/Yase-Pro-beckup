/**
 * RASTREABILIDADE - YA SE PRO
 * atualizarSelo.js: Versão com Trava de Segurança em Tempo Real
 */



function aplicarBloqueioSistema(quantidade) {
    const isBloqueado = quantidade <= 0;
    
    // Seleciona o botão de registro
    const btnRegistrar = document.querySelector('button[onclick="registrarItem()"]');
    const inputs = document.querySelectorAll('main input, main select');
    const badgeSelo = document.getElementById('qtd_restante_texto');

    if (isBloqueado) {
        // --- ESTADO BLOQUEADO (Mantendo o tamanho original) ---
        if (btnRegistrar) {
            btnRegistrar.disabled = true;
            btnRegistrar.innerHTML = '<i class="fa-solid fa-lock"></i> BLOQUEADO';
            
            // Removemos o 'w-full' e classes de preenchimento exagerado
            btnRegistrar.className = "px-6 py-2 bg-slate-700 text-slate-400 rounded-lg text-[10px] font-black uppercase cursor-not-allowed transition-all opacity-80";
        }
        
        inputs.forEach(el => {
            el.disabled = true;
            el.classList.add('opacity-50', 'cursor-not-allowed');
        });

        if(badgeSelo) badgeSelo.classList.replace('bg-amber-500', 'bg-red-600');

    } else {
        // --- ESTADO LIBERADO (Volta para o estilo original do YaSe PRO) ---
        if (btnRegistrar) {
            btnRegistrar.disabled = false;
            btnRegistrar.innerHTML = '<i class="fa-solid fa-plus-circle mr-2"></i> REGISTRAR';
            
            // Aqui usei as classes originais do seu HTML: px-6, py-2 e o azul indigo
            btnRegistrar.className = "px-6 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all active:scale-95";
        }
        
        inputs.forEach(el => {
            el.disabled = false;
            el.classList.remove('opacity-50', 'cursor-not-allowed');
        });

        if(badgeSelo) badgeSelo.classList.replace('bg-red-600', 'bg-amber-500');
    }
}

function exibirDadosVazios() {
    document.getElementById('lote_documento').innerText = "NENHUMA NF-E ATIVA";
    document.getElementById('proximo_selo_num').innerText = "---";
    document.getElementById('qtd_restante_texto').innerText = "0";
}

// Inicializa
document.addEventListener('DOMContentLoaded', monitorarLoteAtivo);