// -------------------------- ADDING REFERENCE --------------------------
const input = document.querySelector("#newnote");
const title = document.querySelector("#note-title");
const addbtn = document.querySelector("#btn-add");
const allnote = document.querySelector("#your_notes");
const body = document.querySelector("body");
const notediv = document.querySelector(".right-side");
const dltbtn_text = "🗑️ Delete";
const titleicon = "✍️";

// -------------------------- Functions --------------------------

function createNote() {
  // creating elements
  const div = document.createElement("div");
  div.className = "note-card";

  const h3 = document.createElement("h3");
  h3.textContent = titleicon + title.value;

  const para = document.createElement("p");
  para.textContent = input.value;

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
  deleteNote(dltbtn, div);
}

function deleteNote(dltbtn, noteElemnt) {
  dltbtn.addEventListener("click", () => {
    noteElemnt.remove();
  });
}

// -------------------------- Event Listeners --------------------------
addbtn.addEventListener("click", createNote);
