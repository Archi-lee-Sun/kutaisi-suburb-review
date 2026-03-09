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