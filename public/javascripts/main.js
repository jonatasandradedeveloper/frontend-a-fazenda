const url = 'http://localhost:7007/fazenda.json';
const c = (el) => document.querySelector(el);

function compare(a, b) {
  if (a.positive < b.positive) {
    return 1;
  }
  if (a.positive > b.positive) {
    return -1;
  }
  return 0;
}

function readJson() {
  fetch(url, {
    dataType: 'json',
  })

    .then(response => {
    if (!response.ok) {
      throw new Error("Erro HTTP: " + response.status);
    }
    return response.json();
  })
    .then(json => {
    this.response = json;

    response.data.sort(compare).map((item, index)=>{

      let contentItem = c('.container .result .content').cloneNode(true);

      contentItem.querySelector('.picture img').src = item.picture;
      contentItem.querySelector('.nome').innerHTML = item.name;
      contentItem.querySelector('.description').innerHTML = item.description;
      contentItem.querySelector('.classification').innerHTML = index + 1;

      const Total = parseInt(item.positive) + parseInt(item.negative);
      const Positive = ( parseInt(item.positive) / Total) * 100;
      const Negative = ( parseInt(item.negative) / Total) * 100;

      if(item.positive) {
        contentItem.querySelector('.number').innerHTML = Positive.toFixed(1)+'%';
      }else {
        contentItem.querySelector('.number').innerHTML = 0 + '%';
      }

      if(item.negative) {
        contentItem.querySelector('.number1').innerHTML = Negative.toFixed(1)+'%';
      }else {
        contentItem.querySelector('.number1').innerHTML = 0 + '%';
      }

      c('.conteudo').append( contentItem );

    });
  })
    .catch(function () {
    this.dataError = true;
  })
}

readJson();
