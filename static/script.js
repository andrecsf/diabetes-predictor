async function prever() {
    const dados = {
        gestacoes: parseFloat(document.getElementById("gestacoes").value),
        glicose: parseFloat(document.getElementById("glicose").value),
        pressao_arterial: parseFloat(document.getElementById("pressao_arterial").value),
        espessura_pele: parseFloat(document.getElementById("espessura_pele").value),
        insulina: parseFloat(document.getElementById("insulina").value),
        imc: parseFloat(document.getElementById("imc").value),
        historico_familiar: parseFloat(document.getElementById("historico_familiar").value),
        idade: parseFloat(document.getElementById("idade").value),
    };

    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });

    const div = document.getElementById("resultado");

    if (resultado.resultado === 1) {
        div.innerHTML = `⚠️ Alto risco de diabetes — probabilidade: ${(resultado.probabilidade * 100).toFixed(0)}%`;
    } else {
        div.innerHTML = `✅ Baixo risco de diabetes — probabilidade de risco: ${(resultado.probabilidade * 100).toFixed(0)}%`;
    }
}