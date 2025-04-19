const toggleSearch = () => {
    const searchForm = document.querySelector('.search-form');
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const searchClose = document.querySelector('.search-close');  // Close button for search form
    const clearHistoryBtn = document.createElement("button");  // Clear history button
    const historyList = document.createElement("ul");  // History list
    
    // Set up the history list and clear history button
    historyList.className = "search-history";
    searchForm.appendChild(historyList);
  
    clearHistoryBtn.className = "clear-history";
    clearHistoryBtn.type = "button";
    clearHistoryBtn.textContent = "Clear History";
    searchForm.appendChild(clearHistoryBtn);
  
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  
    // Perform the search
    const performSearch = (query) => {
      const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.description.toLowerCase().includes(query)
      );
      showNotes(filtered);
      saveToSearchHistory(query);
    };
  
    // Save to localStorage
    const saveToSearchHistory = (query) => {
      if (!searchHistory.includes(query)) {
        searchHistory.unshift(query);
        if (searchHistory.length > 10) searchHistory.pop(); // Limit to 10
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        renderSearchHistory();
      }
    };
  
    // Render the history dropdown
    const renderSearchHistory = () => {
      historyList.innerHTML = "";
    
      if (searchHistory.length === 0) {
        searchForm.classList.remove("show-history");
        clearHistoryBtn.style.display = "none";  // 👈 Hide if no history
        return;
      }
    
      searchForm.classList.add("show-history");
    
      // 👇 Only show the button if the search bar is open
      clearHistoryBtn.style.display = searchForm.classList.contains("active-search") ? "block" : "none";
    
      searchHistory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        li.addEventListener("click", () => {
          searchInput.value = item;
          performSearch(item);
        });
        historyList.appendChild(li);
      });
    };  
    
    // Clear history
    const clearSearchHistory = () => {
      searchHistory = [];
      localStorage.removeItem("searchHistory");
      renderSearchHistory(); // This will hide it too
    };
  
    // Event: Search icon click toggles input
    searchButton.addEventListener('click', () => {
      searchForm.classList.toggle('active-search');
      // 👇 Re-render to update Clear History button visibility
      renderSearchHistory();
    });
    
  
    // Real-time search while typing
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      
      if (!query) {
        showNotes();  // Show all notes when input is cleared
        return;
      }
  
      const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.description.toLowerCase().includes(query)
      );
      
      showNotes(filtered);
    });
  
    // Event: Clear history button
    clearHistoryBtn.addEventListener("click", clearSearchHistory);
  
    // Event: Close search form
    searchClose.addEventListener("click", () => {
      // Reset search input and hide history
      searchInput.value = "";
      searchForm.classList.remove("show-history");
      searchForm.classList.remove("active-search");
      showNotes();  // Reset to all notes, but don't clear history
    });
  
    // Render search history
    renderSearchHistory();
  };
  
  toggleSearch();