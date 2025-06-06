const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");

// Array of month names
const months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

// Retrieve notes from localStorage or initialize an empty array
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

// Flags and ID for note updates
let isUpdate = false, updateId;

// Open the popup box to add a new note
addBox.addEventListener("click", () => {
  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

// Close the popup box and reset fields
closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});

// Display existing notes from localStorage
function showNotes(filtered = notes) {
  document.querySelectorAll(".note").forEach(li => li.remove());
  filtered.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", '<br/>');
    let liTag = `<li class="note">
                    <div class="details">
                        <p>${note.title}</p>
                        <span>${filterDesc}</span>
                    </div>
                    <div class="bottom-content">
                        <span>${note.date}</span>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="menu">
                                <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </div>
                </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

showNotes();

// Show menu options for each note
function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

// Delete a specific note
function deleteNote(noteId) {
  Swal.fire({
    title: 'Are you sure?',
    text: "This note will be permanently deleted.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      notes.splice(noteId, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      showNotes();

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your note has been deleted.',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}


// Update a specific note
function updateNote(noteId, title, filterDesc) {
  let description = filterDesc.replaceAll('<br/>', '\r\n');
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "Update a Note";
  addBtn.innerText = "Update Note";
}

// Add or update a note on button click
addBtn.addEventListener("click", e => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();

  if (title || description) {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear();

    let noteInfo = { title, description, date: `${month} ${day}, ${year}` }
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});

// Download all notes in ZIP
function downloadNotesZip() {
  if (notes.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'No notes to download',
      text: 'You have no notes saved yet.',
    });
    return;
  }

  const zip = new JSZip();

  notes.forEach((note, index) => {
    const filename = `${note.title || "Untitled"}-${index + 1}.txt`;
    const content = `Title: ${note.title || "Untitled"}\nDate: ${note.date}\n\n${note.description}`;
    zip.file(filename, content);
  });

  zip.generateAsync({ type: "blob" }).then((content) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "QuickNotes.zip";
    link.click();
  });
}

const downloadBtn = document.querySelector(".download-btn");
const authPopupBox = document.querySelector(".auth-popup-box");
const authForm = document.getElementById("auth-form");
const closeAuthModal = document.querySelector(".close-auth-modal");
const switchAuthText = document.getElementById("switch-auth");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
let isRegistering = false;

// Show the login modal when the download button is clicked
downloadBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent download button default action
  const userData = localStorage.getItem("user");
  
  if (userData) {
    // If user is already logged in, proceed with the download
    Swal.fire({
      title: 'Logged in!',
      text: 'Download started.',
      icon: 'success',
    }).then(() => {
      downloadNotesZip();
    });
  } else {
    // Show the login/register modal
    authPopupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
  }
});

// Handle form submission for login/register
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();

  if (username) {
    if (isRegistering && email) {
      // Register the user
      const user = { username, email };
      localStorage.setItem("user", JSON.stringify(user));
      Swal.fire({
        icon: 'success',
        title: `Registered! Welcome ${username}`,
      }).then(() => {
        authPopupBox.classList.remove("show");
        document.querySelector("body").style.overflow = "auto";
        downloadNotesZip(); // Start the download after registration
      });
    } else if (!isRegistering) {
      // Login the user
      const user = { username };
      localStorage.setItem("user", JSON.stringify(user));
      Swal.fire({
        icon: 'success',
        title: 'Logged in!',
        text: 'Download started.',
      }).then(() => {
        authPopupBox.classList.remove("show");
        document.querySelector("body").style.overflow = "auto";
        downloadNotesZip(); // Start the download after login
      });
    }
  }
});

// Switch between login and registration forms
switchAuthText.addEventListener("click", () => {
  isRegistering = !isRegistering;
  if (isRegistering) {
    document.querySelector("header p").innerText = "Register";
    switchAuthText.innerText = "Already have an account? Login";
    document.querySelector(".email").style.display = "block";
    authForm.querySelector("button").innerText = "Register";
  } else {
    document.querySelector("header p").innerText = "Login";
    switchAuthText.innerText = "Don't have an account? Register";
    document.querySelector(".email").style.display = "none";
    authForm.querySelector("button").innerText = "Login";
  }
});

// Close the auth modal
closeAuthModal.addEventListener("click", () => {
  authPopupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});
