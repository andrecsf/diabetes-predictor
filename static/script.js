async function prever() {
    const campos = [
        { id: "gestacoes", min: 0, max: 20 },
        { id: "glicose", min: 0, max: 300 },
        { id: "pressao_arterial", min: 0, max: 200 },
        { id: "espessura_pele", min: 0, max: 100 },
        { id: "insulina", min: 0, max: 900 },
        { id: "imc", min: 0, max: 70 },
        { id: "historico_familiar", min: 0, max: 3 },
        { id: "idade", min: 1, max: 120 },
    ];

    let valido = true;

    for (const campo of campos) {
        const input = document.getElementById(campo.id);
        const erro = document.getElementById(`erro_${campo.id}`);
        const valor = parseFloat(input.value);

        if (input.value === "" || valor < campo.min || valor > campo.max) {
            input.classList.add("invalido");
            erro.innerHTML = `Insira um valor correto (entre ${campo.min} e ${campo.max})`;
            valido = false;
        } else {
            input.classList.remove("invalido");
            erro.innerHTML = "";
        }
    }

    if (!valido) return;

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

    const resultado = await response.json();
    const div = document.getElementById("resultado");

    if (resultado.resultado === 1) {
        div.innerHTML = `⚠️ Alto risco de diabetes — probabilidade: ${(resultado.probabilidade * 100).toFixed(0)}%`;
    } else {
        div.innerHTML = `✅ Baixo risco de diabetes — probabilidade de risco: ${(resultado.probabilidade * 100).toFixed(0)}%`;
    }
}