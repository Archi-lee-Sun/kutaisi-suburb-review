const params = new URLSearchParams(window.location.search)
const id = params.get('id')


fetch('/api/suburbs/' + id)
    .then(res => res.json())
    .then(function(suburb){
        
        document.getElementById('suburb-image').src = '/images/' + suburb.image
        document.getElementById("avg-lighting").textContent = suburb.ratings.lighting
        document.getElementById("avg-roads").textContent = suburb.ratings.roads
        document.getElementById("avg-neighborhood").textContent = suburb.ratings.neighborhood
        document.getElementById("avg-cleanliness").textContent = suburb.ratings.cleanliness
    })


fetch('/api/reviews/' + id) 
    .then(res => res.json())
    .then(function(reviews){
        displayReviews(reviews)
    })


function displayReviews(reviews){
    const container = document.getElementById("reviews-container")
    container.innerHTML = ''
    
    if (reviews.length === 0){
        container.innerHTML = '<p class="empty-reviews">Empty</p>';
        return;
    }


    reviews.forEach(function(review){
        const card = document.createElement('div');
        card.className = 'review-card';

        card.innerHTML = `
         <div class="review-header">
                <span class="review-author">${review.author.name}</span>
                <span class="review-date">${review.createdAt}</span>
            </div>
            <div class="review-ratings">
                <span class="review-rating-item">Lighting <span>${review.ratings.lighting}★</span></span>
                <span class="review-rating-item">Roads <span>${review.ratings.roads}★</span></span>
                <span class="review-rating-item">Neighborhood <span>${review.ratings.neighborhood}★</span></span>
                <span class="review-rating-item">Cleanliness <span>${review.ratings.cleanliness}★</span></span>
            </div>
            <p class="review-comment">${review.comment}</p>
        `;


        container.appendChild(card)
    });
}


document.getElementById("review-form").addEventListener('submit' , function(event){
    event.preventDefault();
    handleSubmit();
})


function handleSubmit(){


    const lighting = document.querySelector('input[name = "lighting"]:checked').value;
    const roads = document.querySelector('input[name = "roads"]:checked').value;
    const neighborhood = document.querySelector('input[name = "neighborhood"]:checked').value;
    const cleanliness = document.querySelector('input[name = "cleanliness"]:checked').value;
    

    const name = document.getElementById('author-name').value ;
    const comment = document.getElementById('comment').value ;


    

    const reviewData = {
         suburbId: id,
         author: { name: name }, 
         ratings: {
            lighting: Number(lighting),
            roads: Number(roads),
            neighborhood: Number(neighborhood),
            cleanliness: Number(cleanliness)
        },
        comment: comment,
        createdAt: new Date().toLocaleDateString()
    }

    fetch('/api/reviews' , {
        method : 'POST' , 
        headers : {'Content-type' : 'application/json'} ,
        body : JSON.stringify(reviewData)
    })
    .then(res => res.json())
    .then(function(result){
        if(result.success){
            fetch('/api/reviews/' + id)
            .then(res => res.json())
            .then(function(reviews){
                displayReviews(reviews);
            });
        }
    });
    
}