# QuickNote!

QuickNote is a simple front-end note-taking web app where users can create, edit, delete, and search notes. It also allows users to download all their notes in a zip file. The app includes a login and registration feature that uses local storage to save user data.

## Features
- Create Notes: Add new notes with a title and description.
- Edit Notes: Update existing notes with a new title or description.
- Delete Notes: Permanently delete notes from the app.
- Download Notes: Download all notes as a zip file containing individual text files for each note.
- Real-Time Search: Users can search through their notes in real time as they type, filtering out notes based on the entered search term.
- Login/Register:
  - Login: Users can log in with just a username.
  - Register: Users can register by providing their username and email.
  - After logging in or registering, users can start the download immediately.


## Technologies Used
 - HTML: Structure and layout of the web pages.
 - CSS: Styling of the app to make it responsive and user-friendly.
 - JavaScript: Functional logic for adding, editing, deleting, searching, and downloading notes.
 - SweetAlert2: For nice-looking alert pop-ups.
 - JSZip: For generating a zip file containing all notes.

## How It Works
1. Login/Register Flow:
   - When the user clicks the "Download All Notes" button, a login or register modal will pop up.
   - Login: The user enters their username, and once successful, a "logged in! download started" message will appear, followed by the download of all notes.
   - Register: The user enters their email and username, and after successful registration, a "registered! welcome [user]" message will appear.

2. Notes Functionality:
   - Users can add notes with titles and descriptions.
   - Notes can be updated or deleted.
   - Notes are stored in localStorage, so they persist across sessions.

3. Real-Time Search:
   - Users can search their notes using a search bar at the top of the page.
   - As the user types, the notes are filtered instantly based on the title or description, allowing for a smooth and responsive search experience.

4. Download Notes:
   - All notes can be downloaded in a zip file. Each note is saved as a text file with the title, date, and description.

## Setup
To run the project locally:

 1. Clone the repository:
<br/> git clone https://github.com/your-username/quicknote.git
<br/>cd quicknote

3. Open the index.html file in your web browser:
open index.html

4. Start using the app! You can add notes, edit them, delete them, search for specific notes, and download them as a zip file.

## Contributing
If you have any suggestions or improvements, feel free to create an issue or submit a pull request.

## License
This project is open-source and available under the [MIT License](#license).
