const searchBar = document.getElementById('searchBar')
const searchButton = document.getElementById('searchButton')
const clearButton = document.getElementById('clearButton')
const recommendations = document.getElementById("recommendations");
searchButton.addEventListener('click', search);
clearButton.addEventListener('click', clear);

function search(){
   clear();
   console.log("searching");
   fetch('../travel_recommendation_api.json')
   .then(response => {
      if (!response.ok) {
         throw new Error('Network response error');
      }

      return response.json();
   })
   .then(data => {
      console.log('Data:', data);
      let searchString = document.getElementById('searchBar').value;
      loadResults(searchString, data)
   })
   .catch(error => {
      console.error('Fetch failed:', error);
   });
}

function clear() {
   recommendations.textContent = '';
}

function handlejson(data) {
   let searchTerm = document.getElementById('searchBar').value;
   console.log(data);
   console.log(searchTerm);
}

function loadResults(searchString, data){
   const beachRegex = /beach/i;
   const countryRegex = /(country|countries)/i;
   const templeRegex = /temple/i;

   if (beachRegex.test(searchString)) {
      console.log("The string contains'beach'.");
      loadBeaches(data.beaches);
   } else {
      console.log("The string does not contain 'beach'.");
   }

   if (countryRegex.test(searchString)) {
      console.log("The string contains'country' or 'countries'.");
      loadCountries(data.countries);
   } else {
      console.log("The string does not contain 'country' or 'countries'.");
   } 
   
   if (templeRegex.test(searchString)) {
      console.log("The string contains 'temple'.");
      loadTemples(data.temples);
   } else {
      console.log("The string does not contain 'temple'.");
   } 
}

function loadBeaches(results) {
   results.forEach(beach=>{
      console.log("Loading recommendation");

      //Creates the unordered list element that holds the information
      let recommendation = document.createElement('ul');

      // Creates the recommendation list item element
      let recommendationItem = document.createElement('li');
      recommendationItem.classList.add('recommendation');

      //Creates the recommendation image element
      let imageListItem = document.createElement('li');
      let image = document.createElement('img');
      image.classList.add("location-image");
      image.src = beach.imageUrl;
      imageListItem.appendChild(image);

      //Create the location paragraph element
      let location = document.createElement('p');
      location.classList.add('location');
      location.textContent = beach.name;

      //Create the description paragraph element
      let description = document.createElement('p');
      description.classList.add('description');
      description.innerHTML = beach.description;

      //Adds the recommendation information to the recommendation, adds it to a list item, and than appends it 
      //to the list of recommendations
      recommendation.appendChild(image);
      recommendation.appendChild(location);
      recommendation.appendChild(description);
      recommendationItem.appendChild(recommendation);
      recommendations.appendChild(recommendationItem);
   });   
}

function loadCountries(countries) {
   countries.forEach(element=>{
      element.cities.forEach(city=>{
      console.log("Loading recommendation");

      //Creates the unordered list element that holds the information
      let recommendation = document.createElement('ul');

      // Creates the recommendation list item element
      let recommendationItem = document.createElement('li');
      recommendationItem.classList.add('recommendation');

      //Creates the recommendation image element
      let imageListItem = document.createElement('li');
      let image = document.createElement('img');
      image.classList.add("location-image");
      image.src = city.imageUrl;
      imageListItem.appendChild(image);

      //Create the location paragraph element
      let location = document.createElement('p');
      location.classList.add('location');
      location.textContent = city.name;

      //Create the description paragraph element
      let description = document.createElement('p');
      description.classList.add('description');
      description.innerHTML = city.description;

      //Adds the recommendation information to the recommendation, adds it to a list item, and than appends it 
      //to the list of recommendations
      recommendation.appendChild(image);
      recommendation.appendChild(location);
      recommendation.appendChild(description);
      recommendationItem.appendChild(recommendation);
      recommendations.appendChild(recommendationItem);
   });   
})
}

function loadTemples(temples) {
   temples.forEach(temple=>{
      console.log("Loading temple recommendation");

      //Creates the unordered list element that holds the information
      let recommendation = document.createElement('ul');

      // Creates the recommendation list item element
      let recommendationItem = document.createElement('li');
      recommendationItem.classList.add('recommendation');

      //Creates the recommendation image element
      let imageListItem = document.createElement('li');
      let image = document.createElement('img');
      image.classList.add("location-image");
      image.src = temple.imageUrl;
      imageListItem.appendChild(image);

      //Create the location paragraph element
      let location = document.createElement('p');
      location.classList.add('location');
      location.textContent = temple.name;

      //Create the description paragraph element
      let description = document.createElement('p');
      description.classList.add('description');
      description.innerHTML = temple.description;

      //Adds the recommendation information to the recommendation, adds it to a list item, and than appends it 
      //to the list of recommendations
      recommendation.appendChild(image);
      recommendation.appendChild(location);
      recommendation.appendChild(description);
      recommendationItem.appendChild(recommendation);
      recommendations.appendChild(recommendationItem);
   });   
}