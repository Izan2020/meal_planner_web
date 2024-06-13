// Setiap akun gratis (Spoonacular API) memiliki batasan request sebanyak 150 untuk sehari.
// Berikut link untuk daftar akun Spoonacular 'https://spoonacular.com/food-api/console#Dashboard'

const apiKey = '74f94846b3514d59b598a6fede5ed3bb';
const baseUrl = `https://api.spoonacular.com/recipes`;
const apiPricing = `<a href="https://spoonacular.com/food-api/pricing" style="color: white;" target="_blank">Pricing Disini</a>`;
const pathToHere = `<a href="vscode:./service.js#L4" style="color: white;">'serivce.js > apiKey'</a>`;


const express = require(`express`);
const service = express.Router();

service.use(express.json());
service.post(`/get-recipe`, async (req, res) => { 
    try {              
        const {
            queryDiet,
            queryAllergy,
            queryCalories 
        } = req.body;
                    
        const response = await fetch(`${baseUrl}/complexSearch?apiKey=${apiKey}&diet=${queryDiet}&intolerances=${queryAllergy}&minCalories=${queryCalories}`);
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
        console.log(`JSON Response :`, data);
        return res.send(data);
    } catch (error) {
        console.log(`Client Exception : ${error}`)
        return res.status(500).send(`Client Exception - ${error}`);
    }
});

service.get(`/get-ingredients`, async (req, res) => {
    try {
        const  recipeId  = req.query.recipeId;
        const response = await fetch(`${baseUrl}/${recipeId}/information?apiKey=${apiKey}`,{
            method: `GET`,
            headers: {
                "Content-Type": "application/json" 
            }
        });
        if(!response.ok) {
             // Throws an Error Message
             if (response.status == 401) {
                return res.status(response.status).send(`API Service unauthorized, Ganti API Key-nya di ${pathToHere}.`);
            }
            if (response.status == 402) {
                return res.status(response.status).send(`Bayar API Service dek, ${apiPricing}.`);
            }     
            
            console.log(`Service Error Occured : ${response.json}`)
            return res.status(response.status).send(`Service Error Occured - ${response.url}`);
        }
        const data = await response.json()        
        return res.send(data);
    } catch (error) {
        console.log(`Client Exception : ${error}`)
        return res.status(500).send(`Client Exception - ${error}`);
    }
});



module.exports = service;