document.addEventListener("DOMContentLoaded", () => {
  const configForm = document.getElementById("configForm");
  const enderecoBaseInput = document.getElementById("enderecoBase");
  const enderecoBaseError = document.getElementById("enderecoBaseError");
  const enderecoPilhaSpan = document.getElementById("enderecoPilha");
  const enderecoDadoSpan = document.getElementById("enderecoDado");
  const enderecoExtraDadosSpan = document.getElementById("enderecoExtraDados");

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


    let enderecoBaseDecimal = parseInt(enderecoBaseHex, 16);

    let enderecoPilhaDecimal = enderecoBaseDecimal + INCREMENTO;
    let enderecoDadoDecimal = enderecoPilhaDecimal + INCREMENTO;
    let enderecoExtraDadosDecimal = enderecoDadoDecimal + INCREMENTO;

    const formatarHex = (decimal) => {
      let hex = decimal.toString(16).toUpperCase();
      return `${hex.padStart(4, '0')}`;
    };

    enderecoPilhaSpan.textContent = formatarHex(enderecoPilhaDecimal);
    enderecoDadoSpan.textContent = formatarHex(enderecoDadoDecimal);
    enderecoExtraDadosSpan.textContent = formatarHex(enderecoExtraDadosDecimal);
  });
});
