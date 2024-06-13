// Setiap akun gratis (Spoonacular API) memiliki batasan request sebanyak 150 untuk sehari.
// Berikut link untuk daftar akun Spoonacular 'https://spoonacular.com/food-api/console#Dashboard'

// Sesuaikan API Key dari Spoonacular.
const apiKey = 'YOUR_API_KEY';

const baseUrl = `https://api.spoonacular.com/recipes`;
const apiPricing = `<a href="https://spoonacular.com/food-api/pricing" style="color: white;" target="_blank">Pricing Disini</a>`;
const pathToHere = `<a href="vscode:${__dirname}/remote_data_source.js" style="color: white;">'serivce.js > apiKey'</a>`;


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
        return res.status(500).send(`Client Exception - Check your Connection`);
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
        return res.status(500).send(`Client Exception - Check your Connection`);
    }
});



module.exports = service;