document
  .getElementById("search-input")
  .addEventListener("keyup", inputActionsHandler);

const addKeyBtn = document.getElementById("add-key");
addKeyBtn.addEventListener("click", addKey);
const saveKeyBtn = document.getElementById("save-key");
saveKeyBtn.addEventListener("click", saveKey);
window.addEventListener("load", getAllKeys);

document.getElementById("search-input").focus();

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
  removeAllChildNodes(results);
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
    removeAllChildNodes(list);
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

async function deleteKey(evt) {
  const key = evt.target.getAttribute("data-key");
  console.log("Deleting", key);
  await window.eAPI.deleteKey(key);
  await getAllKeys();
  const input = document.getElementById("search-input");
  input.focus();
  inputActionsHandler({ key: "" });
}

function renderResultRow(key, idx) {
  let row = document.createElement("div");
  row.classList.add("result-key-row");
  let resKeyDiv = document.createElement("div");
  resKeyDiv.classList.add("result-key");
  let resKeyLnk = document.createElement("a");
  resKeyLnk.id = `result-key-${idx}`;
  resKeyLnk.href = "#";
  resKeyLnk.innerText = key;
  resKeyDiv.appendChild(resKeyLnk);

  let resKeyRemoveDiv = document.createElement("div");
  resKeyRemoveDiv.classList.add("result-key-remove");
  let resKeyRemoveLnk = document.createElement("a");
  resKeyRemoveLnk.href = "#";
  resKeyRemoveLnk.innerText = "-";
  resKeyRemoveLnk.setAttribute("data-key", key);
  resKeyRemoveLnk.addEventListener("click", deleteKey);
  resKeyRemoveDiv.appendChild(resKeyRemoveLnk);

  row.appendChild(resKeyDiv);
  row.appendChild(resKeyRemoveDiv);
  return row;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
