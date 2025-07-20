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
  const Aleatorio = gerarHexAleatorioEntre(ValorMIn, ValorMax)


  const INCREMENTO = 4096;
  

  configForm.addEventListener("submit", (event) => {
    event.preventDefault();

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
    let enderecoPilhaDecimal = enderecoBaseDecimal + Aleatorio;
    let enderecoDadoDecimal = enderecoPilhaDecimal + INCREMENTO;
    let enderecoExtraDadosDecimal = enderecoDadoDecimal + INCREMENTO;

    const formatarHex = (decimal) => {
      let hex = decimal.toString(16).toUpperCase();
      return `${hex.padStart(4, '0')}`;
    };

    enderecoPilhaSpan.textContent = formatarHex(enderecoPilhaDecimal);
    enderecoDadoSpan.textContent = formatarHex(enderecoDadoDecimal);
    enderecoExtraDadosSpan.textContent = formatarHex(enderecoExtraDadosDecimal);
    enderecoCodigoSpan.textContent = formatarHex(enderecoBaseInput.value);
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
                    if (flowCodigoPilha) flowPilhaCodigo.style.display = 'block';
                    break;
                default:
                    break;
            }
        });
    }
    
    hideAllGpfFlowDiagrams();
});

