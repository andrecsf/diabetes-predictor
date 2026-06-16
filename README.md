# 🩺 PredBets (Preditor de Diabetes)

Aplicação web para predição de risco de diabetes em pacientes do sexo feminino, utilizando Machine Learning com Random Forest. O usuário insere dados clínicos e o sistema retorna a probabilidade de diagnóstico positivo para diabetes.

Projeto desenvolvido para a disciplina de Desenvolvimento Mobile — SENAC.

---

## 👥 Equipe

| Nome | GitHub |
|---|---|
| André Costa | — |
| Caio Victor | — |
| Leticia Gabrielle | — |
| Luciana Borges | — |
| Priscila Barbosa | — |

---

## 🛠️ Tecnologias

**Backend**
- Python 3
- FastAPI
- Scikit-learn (Random Forest)
- Joblib
- NumPy
- Pydantic

**Frontend**
- HTML5
- CSS3
- JavaScript (Vanilla)

---

## 📁 Estrutura do Projeto

```
diabetes-predictor-main/
├── main.py                    # API FastAPI com endpoint de predição
├── index.html                 # Interface web
├── modelo_diabetes_rf.pkl     # Modelo Random Forest treinado
└── static/
    ├── script.js              # Lógica de validação e chamada à API
    └── style.css              # Estilização da interface
```

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos

- Python 3.10+
- pip

### 1. Instalar dependências

```bash
pip install fastapi uvicorn scikit-learn joblib numpy pydantic
```

### 2. Iniciar o servidor

```bash
uvicorn main:app --reload
```

O servidor estará disponível em `http://127.0.0.1:8000`.

### 3. Abrir o frontend

Abra o arquivo `index.html` diretamente no navegador **ou** sirva com extensão Live Server (VS Code).

> ⚠️ O `script.js` faz requisição para `http://127.0.0.1:8000/predict`, então o backend precisa estar rodando antes de usar a interface.

---

## 🔌 Endpoint da API

### `POST /predict`

Recebe os dados clínicos do paciente e retorna o resultado da predição.

**Request body (JSON):**

| Campo | Tipo | Intervalo | Descrição |
|---|---|---|---|
| `gestacoes` | float | 0 – 20 | Número de gestações |
| `glicose` | float | 0 – 300 | Concentração de glicose (mg/dL) |
| `pressao_arterial` | float | 0 – 200 | Pressão arterial diastólica (mmHg) |
| `espessura_pele` | float | 0 – 100 | Espessura da dobra cutânea do tríceps (mm) |
| `insulina` | float | 0 – 900 | Insulina sérica 2 horas (µU/mL) |
| `imc` | float | 0 – 70 | Índice de Massa Corporal |
| `historico_familiar` | float | 0 – 3 | Função de pedigree de diabetes |
| `idade` | float | 1 – 120 | Idade em anos |

**Exemplo de requisição:**

```json
{
  "gestacoes": 2,
  "glicose": 148,
  "pressao_arterial": 72,
  "espessura_pele": 35,
  "insulina": 0,
  "imc": 33.6,
  "historico_familiar": 0.627,
  "idade": 50
}
```

**Resposta:**

```json
{
  "resultado": 1,
  "probabilidade": 0.87
}
```

- `resultado`: `1` = alto risco de diabetes / `0` = baixo risco
- `probabilidade`: probabilidade estimada de diabetes (0 a 1)

---

## 🖥️ Interface Web

A interface apresenta um formulário com os 8 campos clínicos. Ao clicar em **Resultado**:

- Todos os campos são validados (valores obrigatórios e dentro dos limites)
- Os dados são enviados à API via `fetch`
- O resultado é exibido na tela:
  - ⚠️ **Alto risco** — com a probabilidade percentual
  - ✅ **Baixo risco** — com a probabilidade percentual

---

## 📊 Modelo

O modelo utilizado é um **Random Forest Classifier** treinado com o dataset Pima Indians Diabetes (originalmente disponibilizado pelo National Institute of Diabetes and Digestive and Kidney Diseases). O arquivo `modelo_diabetes_rf.pkl` contém o modelo serializado via `joblib`.

> O modelo é voltado para pacientes do sexo feminino com herança indígena Pima, com pelo menos 21 anos.
