const searchInput = document.querySelector(".search-box");
const cardsContainer = document.querySelector(".cards");

/* Function to Render Notes */
function renderNotes(notes){

    cardsContainer.innerHTML = ""; // clear old cards

    if(notes.length === 0){
        cardsContainer.innerHTML = 
            "<p style='font-size:18px;'>No matching notes found </p>";
        return;
    }

    notes.forEach(note => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-img"></div>
            <h3>${note.title}</h3>
            <p>${note.code}</p>
            <p>${note.author}</p>
            <div class="rating">⭐ ${note.rating || "5.0"}</div>
            <span class="price">Rs.${note.price}</span>
        `;

        cardsContainer.appendChild(card);
    });
}


/* Search When User Presses Enter */
searchInput.addEventListener("keypress", async function(e){

    if(e.key === "Enter"){

        const query = searchInput.value.trim();

        if(query === ""){
            alert("Please enter something to search");
            return;
        }

        try{

            const response = await fetch(
                `http://localhost:5000/notes?search=${query}`
            );

            const data = await response.json();

            renderNotes(data);

        } catch(error){
            console.error("Error:", error);
            alert("Backend not connected yet ⚠️");
        }

    }

});