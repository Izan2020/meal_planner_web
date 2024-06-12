// Setiap akun gratis (Spoonacular API) memiliki batasan request sebanyak 150 untuk sehari.
// Berikut link untuk daftar akun Spoonacular 'https://spoonacular.com/food-api/console#Dashboard'

const apiKey = '56e4ebab9792420887dd7c3d0b0e5c08';
const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;
const apiPricing = `<a href="https://spoonacular.com/food-api/pricing" style="color: white;" target="_blank">Pricing Disini</a>`;
const pathToHere = `<a href="vscode:./service.js#L4" style="color: white;">'serivce.js > apiKey'</a>`;


const express = require(`express`);
const service = express.Router();

service.use(express.json());
service.post(`/get-recipe`, async (req, res) => { 
    console.log(`Body Diet :`, req.body);
    try {              
        const {
            queryDiet,
            queryAllergy,
            queryCalories 
        } = req.body;
                    
        const response = await fetch(`${baseUrl}&diet=${queryDiet}&intolerances=${queryAllergy}&minCalories=${queryCalories}`);
        if (!response.ok) {
            // Throws an Error Message
            if (response.status == 401) {
                return res.status(response.status).send(`API Service unauthorized, Ganti API Key-nya di ${pathToHere}.`);
            }
            if (response.status == 402) {
                return res.status(response.status).send(`Bayar API Service dek, ${apiPricing}.`);
            }            
            console.log(`Service Error Occured : ${response.json}`)
            return res.status(response.status).send(`Service Error Occured - ${response.status}`);
        }
        const data = await response.json()
        return res.send(data);
    } catch (error) {
        console.log(`Client Exception : ${error}`)
        return res.status(500).send(`Client Exception - ${error}`);
    }
});



module.exports = service;