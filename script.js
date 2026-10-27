// Perguntas originais do Desafio do Saber
const perguntas = [
  {
    categoria: "CIÊNCIA",
    pergunta: "Qual planeta é conhecido como Planeta Vermelho?",
    opcoes: ["Vênus", "Marte", "Júpiter", "Mercúrio"],
    correta: 1,
    explicacao: "Marte parece avermelhado por causa dos minerais ricos em ferro presentes em seu solo."
  },
  {
    categoria: "MEIO AMBIENTE",
    pergunta: "Qual destas atitudes ajuda a reduzir o lixo?",
    opcoes: ["Usar descartáveis sempre", "Jogar tudo no mesmo cesto", "Reutilizar objetos e reciclar materiais", "Deixar aparelhos ligados sem uso"],
    correta: 2,
    explicacao: "Reutilizar e separar materiais recicláveis ajuda a diminuir a quantidade de resíduos."
  },
  {
    categoria: "MATEMÁTICA",
    pergunta: "Quanto é 25% de 200?",
    opcoes: ["25", "40", "50", "75"],
    correta: 2,
    explicacao: "25% é um quarto. Um quarto de 200 é 50."
  },
  {
    categoria: "TECNOLOGIA",
    pergunta: "O que significa a sigla HTML no desenvolvimento web?",
    opcoes: ["Uma linguagem de marcação usada para estruturar páginas", "Um tipo de computador", "Um programa de edição de fotos", "Uma rede social"],
    correta: 0,
    explicacao: "HTML organiza o conteúdo da página, como títulos, textos, imagens e botões."
  },
  {
    categoria: "GEOGRAFIA",
    pergunta: "Qual é o maior oceano da Terra?",
    opcoes: ["Atlântico", "Índico", "Ártico", "Pacífico"],
    correta: 3,
    explicacao: "O Oceano Pacífico é o maior e também o mais profundo dos oceanos."
  },
  {
    categoria: "LÍNGUA PORTUGUESA",
    pergunta: "Qual palavra é um sinônimo de “rápido”?",
    opcoes: ["Lento", "Veloz", "Distante", "Silencioso"],
    correta: 1,
    explicacao: "Veloz tem sentido semelhante ao de rápido."
  },
  {
    categoria: "CIDADANIA DIGITAL",
    pergunta: "O que é mais seguro ao criar uma senha?",
    opcoes: ["Usar 123456", "Repetir a mesma senha em todos os sites", "Combinar letras, números e símbolos", "Compartilhar a senha com colegas"],
    correta: 2,
    explicacao: "Uma senha longa e difícil de adivinhar, diferente para cada serviço, aumenta a segurança."
  },
  {
    categoria: "ASTRONOMIA",
    pergunta: "Qual estrela está no centro do nosso Sistema Solar?",
    opcoes: ["Sirius", "A Lua", "Polaris", "O Sol"],
    correta: 3,
    explicacao: "O Sol é a estrela no centro do Sistema Solar, e os planetas orbitam ao seu redor."
  }
];

const inicio = document.querySelector("#inicio");
const perguntaTela = document.querySelector("#pergunta-tela");
const resultado = document.querySelector("#resultado");
const perguntaElemento = document.querySelector("#pergunta");
const categoriaElemento = document.querySelector("#categoria");
const opcoesElemento = document.querySelector("#opcoes");
const feedback = document.querySelector("#feedback");
const proximaBotao = document.querySelector("#proxima");
const progressoTexto = document.querySelector("#progresso-texto");
const pontosTexto = document.querySelector("#pontos-texto");
const progressoBarra = document.querySelector("#progresso-barra");

let indiceAtual = 0;
let pontos = 0;
let respondeu = false;

function mostrarTela(telaEscolhida) {
  [inicio, perguntaTela, resultado].forEach(tela => tela.classList.add("escondido"));
  telaEscolhida.classList.remove("escondido");
}

function atualizarProgresso() {
  progressoTexto.textContent = `Pergunta ${Math.min(indiceAtual + 1, perguntas.length)} de ${perguntas.length}`;
  pontosTexto.textContent = `Pontos: ${pontos}`;
  progressoBarra.style.width = `${(indiceAtual / perguntas.length) * 100}%`;
}

function iniciarQuiz() {
  indiceAtual = 0;
  pontos = 0;
  respondeu = false;
  mostrarTela(perguntaTela);
  mostrarPergunta();
}

function mostrarPergunta() {
  respondeu = false;
  const atual = perguntas[indiceAtual];
  categoriaElemento.textContent = atual.categoria;
  perguntaElemento.textContent = atual.pergunta;
  opcoesElemento.replaceChildren();
  feedback.textContent = "";
  feedback.className = "feedback";
  proximaBotao.classList.add("escondido");
  atualizarProgresso();

  atual.opcoes.forEach((opcaoTexto, indice) => {
    const botao = document.createElement("button");
    botao.className = "opcao";
    botao.type = "button";

    const letra = document.createElement("span");
    letra.className = "letra";
    letra.textContent = String.fromCharCode(65 + indice);

    const texto = document.createElement("span");
    texto.textContent = opcaoTexto;

    botao.append(letra, texto);
    botao.addEventListener("click", () => verificarResposta(indice, botao));
    opcoesElemento.appendChild(botao);
  });
}

function verificarResposta(indiceEscolhido, botaoEscolhido) {
  if (respondeu) return;
  respondeu = true;

  const atual = perguntas[indiceAtual];
  const botoes = [...opcoesElemento.querySelectorAll("button")];
  botoes.forEach(botao => { botao.disabled = true; });

  if (indiceEscolhido === atual.correta) {
    pontos++;
    botaoEscolhido.classList.add("correta");
    feedback.textContent = `Isso mesmo! ${atual.explicacao}`;
    feedback.classList.add("acerto");
  } else {
    botaoEscolhido.classList.add("errada");
    botoes[atual.correta].classList.add("correta");
    feedback.textContent = `Quase! ${atual.explicacao}`;
    feedback.classList.add("erro");
  }

  pontosTexto.textContent = `Pontos: ${pontos}`;
  proximaBotao.textContent = indiceAtual === perguntas.length - 1 ? "Ver resultado →" : "Próxima pergunta →";
  proximaBotao.classList.remove("escondido");
}

function mostrarResultado() {
  mostrarTela(resultado);
  progressoTexto.textContent = "Quiz concluído";
  pontosTexto.textContent = `Pontos: ${pontos}`;
  progressoBarra.style.width = "100%";
  document.querySelector("#nota").textContent = `${pontos}/${perguntas.length}`;

  const titulo = document.querySelector("#resultado-titulo");
  const descricao = document.querySelector("#resultado-descricao");
  const icone = document.querySelector("#resultado-icone");

  if (pontos === perguntas.length) {
    titulo.textContent = "Incrível! Você gabaritou!";
    descricao.textContent = "Você acertou todas as perguntas. Continue curioso e aprendendo!";
    icone.textContent = "🏆";
  } else if (pontos >= 5) {
    titulo.textContent = "Mandou muito bem!";
    descricao.textContent = "Você demonstrou bons conhecimentos. Revise as explicações e tente chegar ao total!";
    icone.textContent = "🌟";
  } else {
    titulo.textContent = "Continue aprendendo!";
    descricao.textContent = "Errar faz parte do aprendizado. Jogue novamente e veja como sua pontuação pode melhorar!";
    icone.textContent = "🌱";
  }
}

document.querySelector("#comecar").addEventListener("click", iniciarQuiz);
proximaBotao.addEventListener("click", () => {
  if (indiceAtual < perguntas.length - 1) {
    indiceAtual++;
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});
document.querySelector("#reiniciar").addEventListener("click", iniciarQuiz);
