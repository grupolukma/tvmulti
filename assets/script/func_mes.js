// Arquivo: assets/script/func_mes.js

// 1. Dados dos funcionários (Substitua por uma chamada de API real se tiver)
const funcionarios = [
    { nome: "Thifante", cargo: "Desenvolvedora Sênior", foto: "assets/images/funcionarios/elefante.jpg" },
    { nome: "Capielton", cargo: "Analista de Marketing", foto: "assets/images/funcionarios/capivara.jpg" }
    // Adicione mais funcionários aqui
];

let funcionarioAtualIndex = 0;
const tempoDeExibicao = 8000; // 8 segundos por funcionário

/**
 * Atualiza a seção 'func_mes' com os dados do funcionário.
 * @param {Object} funcionario - O objeto do funcionário a ser exibido.
 */
function exibirFuncionario(funcionario) {
    const fotoElement = document.getElementById('func-foto');
    const nomeElement = document.getElementById('func-nome');
    const cargoElement = document.getElementById('func-cargo');

    // Validação básica
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
 * Alterna para o próximo funcionário na lista.
 */
function alternarFuncionario() {
    // Incrementa o índice e volta para 0 se chegar ao final da lista
    funcionarioAtualIndex = (funcionarioAtualIndex + 1) % funcionarios.length;
    exibirFuncionario(funcionarios[funcionarioAtualIndex]);
}

// 2. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    if (funcionarios.length > 0) {
        // Exibe o primeiro funcionário ao carregar a página
        exibirFuncionario(funcionarios[funcionarioAtualIndex]);

        // Se houver mais de um, inicia a rotação
        if (funcionarios.length > 1) {
            setInterval(alternarFuncionario, tempoDeExibicao);
        }
    } else {
        // Trata o caso de não haver dados
        const funcMesSection = document.getElementById('func_mes');
        if (funcMesSection) {
            funcMesSection.innerHTML = '<p style="text-align: center;">Nenhum funcionário do mês para exibir.</p>';
        }
    }
});