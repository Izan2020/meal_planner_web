import {setLoading, setAlertBoxMessage, dataSuccess, checkLoading} from './utils.js';

// Setiap akun gratis (Spoonacular API) memiliki batasan request sebanyak 150 untuk sehari.
// Berikut link untuk daftar akun Spoonacular 'https://spoonacular.com/food-api/console#Dashboard'

const apiKey = '56e4ebab9792420887dd7c3d0b0e5c08';
const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
const apiPricing = `<a href="https://spoonacular.com/food-api/pricing" style="color: white;" target="_blank">Pricing Disini</a>`;
const pathToHere = `<a href="vscode:./service.js#L4" style="color: white;">'serivce.js > apiKey'</a>`;

// Fetch meals data from Internet (Spoonacular API)
export function getMealData() {
    const dietaryPreferences = document.getElementsByName('dietary-preferences')[0].value;
    const allergies = document.getElementsByName('allergies')[0].value;
    const calorieTarget = document.getElementsByName('calorie-target')[0].value;    
    const resultList = document.getElementById('result-list');

    // Input Validation
    if (dietaryPreferences == '' || allergies == '' || calorieTarget == '') {        
        // Throws an Error Message
        return setAlertBoxMessage(`Fill the Blanks!`);
    }
    
    checkLoading();
    setLoading(true);

    // GET - Meals based on Dietary Preferences, Allergy and Maximum Calories
    fetch(`${baseUrl}&diet=${dietaryPreferences}&intolerances=${allergies}&minCalories=${calorieTarget}`)
        .then(response => {
            if (!response.ok) {                              
                setLoading(false);
                // Throws an Error Message
                if(response.status == 401) {
                    return setAlertBoxMessage(`API Service unauthorized, Ganti API Key-nya di ${pathToHere}.`);
                }
                if(response.status == 402) {
                    return setAlertBoxMessage(`Bayar API Service dek, ${apiPricing}.`);
                }
                return setAlertBoxMessage(`Failed to Retrieve Data : ${response.status}.`);
            }
            return response.json();
        }).then((data) => {
            // If data result is Empty throws an Error
            if (data.results.length === 0) {                
                setLoading(false);
                return setAlertBoxMessage(`No result Found.`);
            }        
            data.results.forEach((recipe) =>  {
                // Append list of data into cards
                const recipeItem = document.createElement('recipe-item');
                recipeItem.innerHTML = dataSuccess(recipe);
                resultList.appendChild(recipeItem);
            });
                        
            
            setLoading(false);                        
        });
}
