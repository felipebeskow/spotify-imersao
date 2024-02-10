// Importando os módulos necessários
const express = require('express');
const fs = require('fs');
const path = require('path');

// Criando uma nova aplicação express
const app = express();

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

/*
// Criando um endpoint que lê e retorna um arquivo JSON
app.get('/artists', (req, res) => {
    fs.readFile('./api-artists/artists.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocorreu um erro ao ler o arquivo');
        } else {
            res.json(JSON.parse(data));
        }
    });
});*/

// Criando um endpoint que lê e retorna um arquivo JSON
app.get('/artists', (req, res) => {
    fs.readFile('./api-artists/artists.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ocorreu um erro ao ler o arquivo');
        } else {
            const obj = JSON.parse(data);
            const filtro = req.query.name_like.toUpperCase();
            if (filtro) {
                const resultado = obj.artists.filter(item => item.name.toUpperCase().includes(filtro));
                res.json(resultado);
            } else {
                res.json(obj);
            }
        }
    });
});

// Iniciando o servidor na porta 3000
app.listen(10000, () => {
    console.log('Servidor rodando na porta 10000');
});
