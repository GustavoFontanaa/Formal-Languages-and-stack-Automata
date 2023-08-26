document.addEventListener('DOMContentLoaded', function () {
  const loadButton = document.getElementById('loadButton');
  loadButton.addEventListener('click', loadGrammarFromFile);

  const generateButton = document.getElementById('generateButton');
  generateButton.addEventListener('click', generateAndDisplaySentence);
});

function loadGrammarFromFile() {
  const fileInput = document.getElementById('fileInput');
  const grammarInput = document.getElementById('grammarInput');

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const content = event.target.result;
    grammarInput.value = content;
  };

  reader.readAsText(file);
}

function deriveSentence(grammar, symbol) {
  let stack = [symbol];
  let output = '';

  while (stack.length > 0) {
    let current = stack.pop();
    if (grammar['T'].includes(current)) {
      output += current;
    } else if (grammar['N'].includes(current)) {
      let production =
        grammar['P'][current][
          Math.floor(Math.random() * grammar['P'][current].length)
        ];
      stack.push(...production.reverse());
    }
  }

  return output;
}

function generateAndDisplaySentence() {
  const grammarInput = document.getElementById('grammarInput').value;
  const grammar = JSON.parse(grammarInput);
  const resultElement = document.getElementById('result');
  const derivationProcessElement = document.getElementById('derivationProcess');

  if (
    !grammar ||
    !grammar['N'] ||
    !grammar['T'] ||
    !grammar['P'] ||
    !grammar['S']
  ) {
    resultElement.innerHTML = 'Entrada inválida.';
  }

  let stack = [grammar['S']];
  let output = '';
  let derivationSteps = '';

  while (stack.length > 0) {
    let current = stack.pop();
    if (grammar['T'].includes(current)) {
      output += current;
    } else if (grammar['N'].includes(current)) {
      let production =
        grammar['P'][current][
          Math.floor(Math.random() * grammar['P'][current].length)
        ];
      stack.push(...production.reverse());
    }

    derivationSteps += `<div>${stack.join(' ')} ➔ ${output}</div>`;
  }

  derivationProcessElement.innerHTML = derivationSteps;
  resultElement.innerHTML = 'Sentença gerada: ' + output;
}
