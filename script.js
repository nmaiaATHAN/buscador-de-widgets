function buscarWidget() {
  const jsonInput = document.getElementById('jsonInput').value;
  const widgetNamesInput = document.getElementById('widgetName').value;

  let resultadoDiv = document.getElementById('resultadoJson');
  resultadoDiv.textContent = ''; // limpa resultados anteriores

  let parsedJson;
  try {
    parsedJson = JSON.parse(jsonInput);
  } catch (e) {
    resultadoDiv.textContent = 'Erro ao analisar o JSON. Verifique o formato.';
    return;
  }

  const widgets = parsedJson.states || [];
  const widgetNames = widgetNamesInput.split(',').map(name => name.trim());

  let yOffset = -200;
  let resultadoFinal = '';

  widgetNames.forEach(widgetName => {
    const widget = widgets.find(w => w.name === widgetName);

    if (widget) {
      if (!widget.properties) {
        widget.properties = {};
      }

      widget.properties.offset = {
        x: 320,
        y: yOffset
      };

      yOffset -= 200; // dobra o valor de y para o próximo widget

      resultadoFinal += JSON.stringify(widget, null, 2) + '\n\n';
    } else {
      resultadoFinal += `Widget "${widgetName}" não encontrado.\n\n`;
    }
  });

  resultadoDiv.textContent = resultadoFinal.trim();
}