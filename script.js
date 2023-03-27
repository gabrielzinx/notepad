const buttonNewNote = window.document.querySelector("#button-new-note");
const buttonClearAll = window.document.querySelector("#button-clear-all");
const container = window.document.querySelector("#container");

loadNotes()

function loadNotes() {
    if (localStorage.getItem("notes")) {
        const notes = JSON.parse(localStorage["notes"]);
        for (let index = 0; index < notes.length; index++) {
            let note = notes[index];
            createNote(note.title, note.menssage);
        };
    };
};

function createNote(title, menssage) {
    // Cria uma nova nota na lista
    const note = window.document.createElement("li");

    // Cria um novo input com o atributo maxlength de 22
    const input = window.document.createElement("input");
    input.type = "text";
    input.setAttribute("maxlength", "22");
    input.setAttribute("placeholder", "Your Title");
    if (title) input.value = title;

    // Cria um novo ícone de lixeira com a classe "icon-trash"
    const icon = document.createElement("i");
    icon.className = "icon-trash";
    icon.onclick = () => removeNote(icon)

    // Cria um novo contêiner para o input e o ícone de lixeira
    const div = window.document.createElement("div");
    div.appendChild(input);
    div.appendChild(icon);

    // Cria um novo textarea com 30 colunas e 10 linhas
    const textArea = window.document.createElement("textarea");
    textArea.cols = "30";
    textArea.rows = "10";
    textArea.style.resize = "none";
    textArea.setAttribute("placeholder", "Your menssage here");
    if (menssage) textArea.value = menssage;

    // Adiciona o contêiner e o textarea ao novo item da lista
    note.append(div);
    note.append(textArea);

    // Adiciona o novo item da lista à lista existente
    container.append(note);
};

function removeNote(el) {
    const notes = JSON.parse(localStorage["notes"]);
    const element = el.parentNode.parentNode;
    const indexElement = Array.prototype.indexOf.call(container.children, element);
    if (window.confirm("Tem certeza que deseja excluir esta nota?")) {
        element.remove();
        notes.splice(indexElement, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
    };
};

function removeAllNotes() {
    if (window.confirm("Tem certeza que deseja excluir todas as nota?")) {
        const elementCount = container.childElementCount;
        for (let index = elementCount; index > 0; index--) {
            container.childNodes[index].remove();
            localStorage.clear();
        };
    };
};

function saveNotes() {
    const elementCount = container.childElementCount;
    if (elementCount > 0) {
        const notes = [];
        for (let index = 1; index <= elementCount; index++) {
            const title = container.childNodes[index].firstChild.firstChild.value;
            const menssage = container.childNodes[index].lastChild.value;
            notes.push({title: title, menssage: menssage});
        };
        localStorage.setItem("notes", JSON.stringify(notes));
    };
}

buttonNewNote.addEventListener("click", () => {
    createNote();
});

buttonClearAll.addEventListener("click", () => {
    removeAllNotes();
});

window.addEventListener("unload", () => {
    saveNotes();
});
  
setInterval(saveNotes, 5000);