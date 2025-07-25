// -------------------------- ADDING REFERENCE --------------------------
const input = document.querySelector("#newnote");
const title = document.querySelector("#note-title");
const addbtn = document.querySelector("#add-btn");
const allnote = document.querySelector("#your_notes");
const body = document.querySelector("body");
const notediv = document.querySelector(".right-side");
const searchInput = document.querySelector("#search-note");
const dltbtn_text = "🗑️ Delete";
const titleicon = "✍️";

// -------------------------- Localstorage --------------------------
function saveNotesToStorage(note) {
  localStorage.setItem("Notes", JSON.stringify(note));
}

function getNotesFromStorage() {
  return JSON.parse(localStorage.getItem("Notes")) || [];
}
// -------------------------- Functions --------------------------

function createNoteDOM(noteObj) {
  const { id, Title, Note } = noteObj;

  // creating elements
  const div = document.createElement("div");
  div.className = "note-card";

  const h3 = document.createElement("h3");
  h3.textContent = titleicon + Title;

  const para = document.createElement("p");
  para.textContent = Note;

  const dltdiv = document.createElement("div");
  dltdiv.id = "note-dlt";

  const dltbtn = document.createElement("button");
  dltbtn.textContent = dltbtn_text;

  //appending items
  allnote.appendChild(div);
  div.appendChild(h3);
  div.appendChild(para);
  div.appendChild(dltdiv);
  dltdiv.appendChild(dltbtn);

  //adding features
  deleteNote(dltbtn, div, id);

  return div;
}

function deleteNote(dltbtn, noteElement, noteId) {
  dltbtn.addEventListener("click", () => {
    noteElement.remove();

    const allNotes = getNotesFromStorage();
    const updatedNotes = allNotes.filter((note) => note.id !== noteId);
    saveNotesToStorage(updatedNotes);
  });
}

function addNewNote() {
  const titleValue = title.value.trim();
  const noteValue = input.value.trim();

  if (!titleValue || !noteValue) {
    alert("Title and Note cannot be empty!");
    return;
  }

  const tags = extractTagsFromText(noteValue);

  const noteObj = {
    id: Date.now(),
    Title: titleValue,
    Note: noteValue,
    Tags: tags,
  };

  const div = createNoteDOM(noteObj);
  allnote.appendChild(div);

  const existingTasks = getNotesFromStorage();
  existingTasks.push(noteObj);
  saveNotesToStorage(existingTasks);

  // clear fields
  title.value = "";
  input.value = "";
}

function loadFromStorage() {
  const notes = getNotesFromStorage();
  notes.forEach((note) => {
    const div = createNoteDOM(note);
    allnote.appendChild(div);
  });
}

function searchNotes() {
  const rawvalue = searchInput.value.trim();
  const allvalue = rawvalue.toLowerCase().replace("#", "");
  const allnotes = getNotesFromStorage();

  if (rawvalue.startsWith("#")) {
    // 🏷️ Tag based search
    const filtered = allnotes.filter(note => note.Tags.includes(allvalue));
    displayNotes(filtered);
  } else {
    // 🔍 Normal keyword-based search (title + content)
    const filtered = allnotes.filter(note =>
      note.Title.toLowerCase().includes(allvalue) ||
      note.Note.toLowerCase().includes(allvalue)
    );
    displayNotes(filtered);
  }
}

function extractTagsFromText(text) {
  const tags = text.match(/#\w+/g); // e.g. ["#school", "#urgent"]
  return tags ? tags.map((tag) => tag.slice(1).toLowerCase()) : [];
}

function displayNotes(notesArray) {
  allnote.innerHTML = ""; // pehle saare old notes hata do

  notesArray.forEach((note) => {
    const div = createNoteDOM(note);
    allnote.appendChild(div);
  });
}

// -------------------------- Event Listeners --------------------------
addbtn.addEventListener("click", addNewNote);

searchInput.addEventListener("input", searchNotes)

window.addEventListener("DOMContentLoaded", loadFromStorage);
