document.addEventListener("DOMContentLoaded", () => {
  const configForm = document.getElementById("configForm");
  const enderecoBaseInput = document.getElementById("enderecoBase");
  const enderecoBaseError = document.getElementById("enderecoBaseError");
  const enderecoPilhaSpan = document.getElementById("enderecoPilha");
  const enderecoDadoSpan = document.getElementById("enderecoDado");
  const enderecoExtraDadosSpan = document.getElementById("enderecoExtraDados");
  const enderecoCodigoSpan = document.getElementById("enderecoCodigo");
  
  function gerarHexAleatorioEntre(min, max) {
  
  const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
  return numeroAleatorio;
  }

  const ValorMax = 4096;
  const ValorMIn = 2048;
  const INCREMENTO = 4096;

  

  configForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const Aleatorio1 = gerarHexAleatorioEntre(ValorMIn, ValorMax)
    const Aleatorio2 = gerarHexAleatorioEntre(ValorMIn, ValorMax)

    const enderecoBaseHex = enderecoBaseInput.value.trim();
    enderecoBaseError.textContent = "";
    const hexPattern = /^[0-9a-fA-F]{4}$/; 
    if (!hexPattern.test(enderecoBaseHex)) { 
        enderecoBaseError.textContent = "Por favor, insira um endereço hexadecimal válido com 4 dígitos (ex: 0x1A2B).";
        enderecoPilhaSpan.textContent = "N/A";
        enderecoDadoSpan.textContent = "N/A";
        enderecoExtraDadosSpan.textContent = "N/A";
        return;
    }

    if(enderecoBaseInput.value[0].toUpperCase() >= "D") {
        enderecoBaseError.textContent = "Por favor, insira um endereço menor que D0000";
        return;
    }


    let enderecoBaseDecimal = parseInt(enderecoBaseHex, 16);
    let enderecoPilhaDecimal = enderecoBaseDecimal + Aleatorio1;
    let enderecoDadoDecimal = enderecoPilhaDecimal + Aleatorio2;
    let enderecoExtraDadosDecimal = enderecoDadoDecimal + INCREMENTO;

    const formatarHex = (decimal) => {
      let hex = decimal.toString(16).toUpperCase();
      return `${hex.padStart(4, '0')}`;
    };

    enderecoPilhaSpan.textContent = formatarHex(enderecoPilhaDecimal);
    enderecoDadoSpan.textContent = formatarHex(enderecoDadoDecimal);
    enderecoExtraDadosSpan.textContent = formatarHex(enderecoExtraDadosDecimal);
    enderecoCodigoSpan.textContent = formatarHex(enderecoBaseInput);

    // VALORES PARA O PONTEIRO SP EM GPF DE PILHA EM DADOS
    let SPMin = 0;
    let SPMax = ((enderecoDadoDecimal * 16) - 1) - (enderecoPilhaDecimal * 16);
    const spanSPMin = document.getElementById("SPMin");
    const spanSPMax = document.getElementById("SPMax");
    
    spanSPMax.textContent = formatarHex(SPMax);
    spanSPMin.textContent = formatarHex(SPMin);

    // VAlORES PARA O PONTEIRO SP EM GPF DE PILHA EM CODIGO
    let SPCMin = 0;
    let SPCMax = ((enderecoDadoDecimal * 16) - 1) - (enderecoPilhaDecimal * 16);
    const spanSPCMin = document.getElementById("SPCMin");
    const spanSPCMax = document.getElementById("SPCMax");

    spanSPCMax.textContent = formatarHex(SPCMax);
    spanSPCMin.textContent = formatarHex(SPCMin);

    // VALORES PARA O PONTEIRO IP EM GPF DE CODIGO EM PILHA
    let IPMin = 0;
    let IPMax = ((enderecoPilhaDecimal * 16) - 1) - (enderecoBaseDecimal * 16);
    const spanIPMin = document.getElementById("IPMin");
    const spanIPMax = document.getElementById("IPMax");

    spanIPMax.textContent = formatarHex(IPMax);
    spanIPMin.textContent = formatarHex(IPMin);

  });
  
    const gpfSelect = document.getElementById('GpfSelect');
    const flowPilhaDados = document.getElementById('flowPilhaDados');
    const flowPilhaCodigo = document.getElementById('flowPilhaCodigo');
    const flowCodigoPilha = document.getElementById('flowCodigoPilha'); 

    
    function hideAllGpfFlowDiagrams() {
        if (flowPilhaDados) flowPilhaDados.style.display = 'none';
        if (flowPilhaCodigo) flowPilhaCodigo.style.display = 'none';
        if (flowCodigoPilha) flowCodigoPilha.style.display = 'none';
    }

    
    if (gpfSelect) { 
        gpfSelect.addEventListener('change', (event) => {
            const selectedOption = event.target.value; 
            hideAllGpfFlowDiagrams();

            switch (selectedOption) {
                case 'PilhaDados':
                    if (flowPilhaDados) flowPilhaDados.style.display = 'block'; 
                    break;
                case 'PilhaCodigo':
                    if (flowPilhaCodigo) flowPilhaCodigo.style.display = 'block';
                    break;
                case 'CodigoPilha':
                    if (flowCodigoPilha) flowCodigoPilha.style.display = 'block';
                    break;
                default:
                    break;
            }
        });
    }
    
    hideAllGpfFlowDiagrams();

    



    
});

