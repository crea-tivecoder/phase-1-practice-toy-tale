let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

 // Fetch toys from the API
 fetch('http://localhost:3000/toys')
 .then(response => response.json())
 .then(toys => {
   toys.forEach(toy => renderToyCard(toy));
 });

// Function to render a toy card
function renderToyCard(toy) {
 const card = document.createElement('div');
 card.classList.add('card');
 card.innerHTML = `
   <h2>${toy.name}</h2>
   <img src="${toy.image}" class="toy-avatar" />
   <p>${toy.likes} Likes</p>
   <button class="like-btn" data-id="${toy.id}">Like ❤️</button>
 `;
 toyCollection.appendChild(card);

 // Event listener for like button
 const likeBtn = card.querySelector('.like-btn');
 likeBtn.addEventListener('click', () => {
   const newLikes = toy.likes + 1;
   updateLikes(toy.id, newLikes);
 });
}

// Event listener for adding a new toy
newToyBtn.addEventListener('click', () => {
 toyForm.style.display = toyForm.style.display === 'none' ? 'block' : 'none';
});

toyForm.addEventListener('submit', event => {
 event.preventDefault();
 const name = toyForm.name.value;
 const image = toyForm.image.value;

 // Validate inputs
 if (name && image) {
   const formData = {
     name: name,
     image: image,
     likes: 0
   };

   // POST request to add new toy
   fetch('http://localhost:3000/toys', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json'
     },
     body: JSON.stringify(formData)
   })
     .then(response => response.json())
     .then(newToy => {
       renderToyCard(newToy);
       toyForm.reset();
       toyForm.style.display = 'none';
     });
 }
});

// Function to update likes for a toy
function updateLikes(toyId, newLikes) {
 fetch(`http://localhost:3000/toys/${toyId}`, {
   method: 'PATCH',
   headers: {
     'Content-Type': 'application/json',
     Accept: 'application/json'
   },
   body: JSON.stringify({
     likes: newLikes
   })
 })
   .then(response => response.json())
   .then(updatedToy => {
     const toyCard = document.querySelector(`.like-btn[data-id="${toyId}"]`).parentElement;
     toyCard.querySelector('p').textContent = `${updatedToy.likes} Likes`;
   });
};