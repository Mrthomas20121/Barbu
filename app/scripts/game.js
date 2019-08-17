// game lobby
function createNewGameLobby() {
  location.assign('./lobby.html');
}

// add player inputs based on the number of players
function addPlayersInputs() {
  let number = document.getElementById('nb');
  let nb = number.value;
  let result = document.getElementById('players');
  for (let i = 1; i <= nb; i++) {
    let label = document.createElement('label');
    label.setAttribute('for', `player${i}`);
    label.innerHTML = `Joueur N°${i}`
    let input = document.createElement('input');
    input.name = `player${i}`;
    input.placeholder = `Nom du Joueur N°${i}`
    input.classList.add('form-control')
    result.appendChild(label);
    result.appendChild(input);
  }
  let btn = document.createElement('button');
  btn.classList.add('button');
  btn.classList.add('blue');
  btn.classList.add('fill');
  btn.addEventListener('click', (ev) => {
    getPlayers();
  })
  btn.innerHTML = 'Commence la partie';
  result.appendChild(btn);
  document.getElementById('add').style.display = 'none';
}
function reload() {
  location.reload();
}

// get all players inputs and use it to generate the json files.
function getPlayers() {
  const fs = require('fs');
  let playerInputs = document.querySelectorAll('div#players input')
  checkForEmptyInput(playerInputs);
  let json = {};
  for (const playerInput of playerInputs) {
    json[playerInput.value] = {
      choix: {
        'pas-de-coeur': false,
        'roi-de-coeur': false,
        'pas-de-plis': false,
        'deux-dernier-plis': false,
        'pas-de-dame': false,
        'réussite': false,
        'salade': false,
      },
      points: [0]
    };
  }
  fs.unlinkSync('./app/data/data.json');
  fs.writeFileSync('./app/data/data.json', JSON.stringify(json, null, 2), 'utf8');
  location.assign('game.html')
}

// check for empty input value
function checkForEmptyInput(inputs=new NodeList()) {
  inputs.forEach((value, key) => {
    if(value.value == '') return false;
  });

}

// get data
function getData() {
  const fs = require('fs');
  return JSON.parse(fs.readFileSync('./app/data/data.json', 'utf8'));
}

function gameLoading() {
  let json = getData();
  let data = Object.values(json);
  let playerThead = document.getElementById('player');
  let keys = Object.keys(data[0].choix);
  let playerKeys = Object.keys(json);
  playerKeys.forEach(element => {
    playerThead.innerHTML += `<td>${element}</td>`
  })
  let elem = document.getElementById('score');
  for (let i = 0; i <  json[playerKeys[0]].points.length; i++) {
    let tr = document.createElement('tr');

    for (const player of playerKeys) {
      let td = document.createElement('td');
      td.innerHTML = json[player].points[i];
      tr.append(td);
    }
    elem.append(tr);

  }
  showPlayers();
}

function showPlayers() {
  let data = getData();
  let players = Object.keys(data);
  let select = document.getElementById('playersSelect');
  players.forEach(player => {
    // console.log(player)
    let option = document.createElement('option');
    option.value = player;
    option.text = player;
    select.append(option);
  });
}

function addPoints() {
  const fs = require('fs');
  let json = getData();
  let player = document.getElementById('playersSelect').value;
  let point = document.getElementById('points').value;
  // add 
  console.log(json[player].points[json[player].points.length-1], parseInt(point));
  json[player].points.push(json[player].points[json[player].points.length-1] + parseInt(point));
  fs.writeFileSync('./app/data/data.json', JSON.stringify(json, null, 2));
}

function chooseAction() {
  const fs = require('fs');
  let json = getData();
  let action = document.getElementById('action');
  let player = document.getElementById('playerSelect2');

  json[player].choix[action] = true;
  fs.writeFileSync('./app/data/data.json', JSON.stringify(json, null, 2));

}