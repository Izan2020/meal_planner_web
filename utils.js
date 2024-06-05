
// Sets Alertbox Message
export function setAlertBoxMessage(message) {    
    const alertBox = document.getElementById('alert');
    alertBox.className = 'alert';
    return alertBox.innerHTML = `
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
                ${message}
                `;
}

// Set Result list innerHTML with list of Items
export function dataSuccess(recipe) {
    return  `
    <a id="recipe-card" href="https://www.google.com/search?q=${recipe.title}" target="_blank">
                    <img src="${recipe.image}" alt="">
                    <h1>
                    ${recipe.title} <br> 
                    <ul>
                    ${recipe.nutrition.nutrients[0].amount}kcal
                    </ul>
                    </h1>                                 
                </a>                
    `;
}

// Set Loading Status
export function setLoading(status) {
    const loadingIndicator = document.getElementById('loading');
    if(!status) {
        return loadingIndicator.innerHTML = '';
    }
    loadingIndicator.innerHTML = 'Loading...';
}

// Set Check input value of maxium Calories
export function checkInputValue(event) {
    const maxValue = 2200
    // Maximal input Value
    if (event.target.value > maxValue) {
        event.target.value = maxValue;
    }
}

// Loads option Values
export function createOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.text = text;
    return option;
}

// Check loading Status 
export function checkLoading() {
    const loadingIndicator = document.getElementById('loading');
    if (loadingIndicator.innerHTML == 'Loading..') return setAlertBoxMessage('Still Loading Please wait...');
}
