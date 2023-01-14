document
  .getElementById("search-input")
  .addEventListener("keyup", inputActionsHandler);
const addKeyBtn = document.getElementById("add-key");
addKeyBtn.addEventListener("click", addKey);
const saveKeyBtn = document.getElementById("save-key");
saveKeyBtn.addEventListener("click", saveKey);
window.addEventListener("load", getAllKeys);

var all_keys = [];
var selected_idx = 0;

async function saveKey() {
  const input = document.getElementById("search-input");
  const textArea = document.getElementById("set-value");
  await window.eAPI.setValue(input.value, textArea.value);
  await getAllKeys();
  saveKeyBtn.hidden = true;
  addKeyBtn.hidden = false;
  input.focus();
  input.select();
  inputActionsHandler({ key: "" });
}

async function addKey(evt) {
  const results = document.getElementById("result-rows");
  results.innerHTML = "";
  const textArea = document.createElement("textarea");
  textArea.id = "set-value";
  results.appendChild(textArea);
  addKeyBtn.hidden = true;
  saveKeyBtn.hidden = false;
}

async function getAllKeys() {
  all_keys = await window.eAPI.getKeys();
  console.log(`Got all keys ${all_keys}`);
}

async function inputActionsHandler(event) {
  const list = document.getElementById("result-rows");
  console.log(event.key, list.children.length);
  const input = document.getElementById("search-input");
  if (
    (event.key == "ArrowDown" || event.key == "ArrowUp") &&
    list.children.length > 0
  ) {
    list.children[selected_idx].classList.remove("result-key-row-selected");
    if (event.key == "ArrowDown") {
      selected_idx++;
      if (selected_idx >= list.children.length) {
        selected_idx = list.children.length - 1;
      }
    }
    if (event.key == "ArrowUp") {
      selected_idx--;
      if (selected_idx < 0) {
        selected_idx = 0;
      }
    }
    list.children[selected_idx].classList.add("result-key-row-selected");
    list.children[selected_idx].focus();
    input.focus();
  } else if (event.key == "Enter") {
    const key = document.getElementById(`result-key-${selected_idx}`).innerText;
    const value = await window.eAPI.getValue(key);
    console.log(key, value);
    await navigator.clipboard.writeText(value);
    await window.eAPI.appHide();
    window.close();
  } else {
    const searchText = input.value.toUpperCase();
    list.innerHTML = "";
    for (let [idx, key] of filterKeys(searchText).entries()) {
      list.appendChild(renderResultRow(key, idx));
    }
    if (list.children.length > 0) {
      list.children[selected_idx].classList.remove("result-key-row-selected");
      selected_idx = 0;
      list.children[selected_idx].classList.add("result-key-row-selected");
    }
  }
}

function filterKeys(searchText) {
  if (searchText == "") {
    return [];
  }
  return all_keys.filter((key) => key.toUpperCase().indexOf(searchText) > -1);
}

function renderResultRow(key, idx) {
  let row = document.createElement("div");
  row.classList.add("result-key-row");
  let content = `
  <div class="result-key">
    <a href="#" id="result-key-${idx}">${key}</a>
  </div>
  <div class="result-key-remove">
    <a href="#">-</a>
  </div>
  `;
  row.innerHTML = content;
  return row;
}
