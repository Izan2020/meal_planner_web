import {createOption} from './utils.js';
import { allergyOptions, dietOptions } from './static-data.js';
import { getMealData } from './service.js';
import { checkInputValue } from './utils.js';

//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ██╗███╗░░██╗██╗████████╗██╗░█████╗░██╗░░░░░  ░██████╗████████╗░█████╗░████████╗███████╗░░
// ██║████╗░██║██║╚══██╔══╝██║██╔══██╗██║░░░░░  ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝░░
// ██║██╔██╗██║██║░░░██║░░░██║███████║██║░░░░░  ╚█████╗░░░░██║░░░███████║░░░██║░░░█████╗░░░░
// ██║██║╚████║██║░░░██║░░░██║██╔══██║██║░░░░░  ░╚═══██╗░░░██║░░░██╔══██║░░░██║░░░██╔══╝░░░░
// ██║██║░╚███║██║░░░██║░░░██║██║░░██║███████╗  ██████╔╝░░░██║░░░██║░░██║░░░██║░░░███████╗░░
// ╚═╝╚═╝░░╚══╝╚═╝░░░╚═╝░░░╚═╝╚═╝░░╚═╝╚══════╝  ╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝░░░╚═╝░░░╚══════╝░░
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// OnStart
document.addEventListener('DOMContentLoaded', () => {    
    // Loads Option Value from static-data.js (Dietary Preferences)
    dietOptions.forEach(optionD => {
    const dietPreferencesSelect = document.getElementsByName('dietary-preferences')[0];
    dietPreferencesSelect.appendChild(createOption(optionD, optionD));
    });

    // Loads Option Value from static-data.js (Allergies)
    allergyOptions.forEach(optionA => {    
    const allergiesSelect = document.getElementsByName('allergies')[0];
    allergiesSelect.appendChild(createOption(optionA, optionA));
    });
});

// OnClick Button Generate
var buttonGenerate = document.getElementById('button-generate');
buttonGenerate.addEventListener('click', (e) => {
    e.preventDefault();
    getMealData()});

// OnChangeValue Calories Input
var inputCalories = document.getElementsByName('calorie-target')[0];
inputCalories.addEventListener('input', (event) => checkInputValue(event));

