// Arquivo: assets/script/func_mes.js

(function() {
    
    // URL do Script de acesso à Planilha Google (O mesmo usado em noticia.js e aniversariantes.js)
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyjbDKL2rlCIlTNZPD2kVoHS8e6uTCQI4BrJ8iaMHwbSLtsSSAmfxC7PQ-NGagYiHCUbA/exec'; 

    // O caminho base para as fotos. (Deve ser o mesmo do seu arquivo original)
    const BASE_IMAGE_PATH_FUNCIONARIO = 'assets/images/funcionarios/'; 

    let funcionarios = [];
    let funcionarioAtualIndex = 0;
    const tempoDeExibicao = 8000; // 8 segundos por funcionário
    let intervalId;

    /**
     * Atualiza a seção 'func_mes' com os dados do funcionário.
     * @param {Object} funcionario - O objeto do funcionário a ser exibido.
     */
    function exibirFuncionario(funcionario) {
        const fotoElement = document.getElementById('func-foto');
        const nomeElement = document.getElementById('func-nome');
        const cargoElement = document.getElementById('func-cargo');

        if (!funcionario || !fotoElement || !nomeElement || !cargoElement) {
            console.error("Erro: Elementos do Funcionário do Mês não encontrados ou dados inválidos.");
            return;
        }
        
        // Atualiza os elementos
        fotoElement.src = funcionario.foto;
        fotoElement.alt = `Foto de ${funcionario.nome}`;
        nomeElement.textContent = funcionario.nome;
        cargoElement.textContent = funcionario.cargo;
    }

    /**
     * Alterna para o próximo funcionário na lista e exibe.
     */
    function alternarFuncionario() {
        if (funcionarios.length === 0) return;
        funcionarioAtualIndex = (funcionarioAtualIndex + 1) % funcionarios.length;
        exibirFuncionario(funcionarios[funcionarioAtualIndex]);
    }

    /**
     * Busca os dados dos funcionários na Google Sheet.
     */
    async function fetchFuncionarioDoMes() {
        // Usa o parâmetro ?sheet=Mes conforme solicitado
        const url = `${WEB_APP_URL}?sheet=Mes`; 
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} ao buscar Funcionário do Mês.`);
            }
            
            const rawData = await response.json();

            // Mapeia e filtra os dados da planilha
            funcionarios = rawData
                .map(item => {
                    // O script do GAS converte os cabeçalhos para minúsculo (nome, cargo, foto_url)
                    const filename = String(item.foto_url || '').trim().toLowerCase();
                    
                    return {
                        nome: item.nome,
                        cargo: item.cargo,
                        // Combina o caminho base com o nome do arquivo da planilha
                        foto: BASE_IMAGE_PATH_FUNCIONARIO + filename 
                    };
                })
                .filter(item => item.nome); // Filtra itens sem nome

            if (funcionarios.length > 0) {
                exibirFuncionario(funcionarios[funcionarioAtualIndex]);

                if (intervalId) {
                    clearInterval(intervalId);
                }
                if (funcionarios.length > 1) {
                    intervalId = setInterval(alternarFuncionario, tempoDeExibicao);
                }
            } else {
                const funcMesSection = document.getElementById('func_mes');
                if (funcMesSection) {
                    funcMesSection.innerHTML = '<p style="text-align: center;">Nenhum funcionário do mês para exibir.</p>';
                }
            }

        } catch (error) {
            console.error('Func_mes.js: Falha ao carregar os dados do Funcionário do Mês.', error);
            const funcMesSection = document.getElementById('func_mes');
            if (funcMesSection) {
                 funcMesSection.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar dados do Mês.</p>';
            }
        }
    }

    // 2. Inicialização: Busca os dados ao carregar a página
    document.addEventListener('DOMContentLoaded', () => {
        fetchFuncionarioDoMes();
    });

})();