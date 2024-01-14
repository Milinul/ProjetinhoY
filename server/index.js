const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//criar base de dados
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'dbpessoas'
})

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão bem-sucedida ao banco de dados');
    }
});

// Iniciar o servidor
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});

// Endpoint para "/login"
app.post('/login', (req, res) => {
    const sentLoginUserName = req.body.loginuserName;
    const sentLoginPassword = req.body.loginpassword;

    const SQL = 'SELECT * FROM `users` WHERE username = ? AND password = ?';
    const values = [sentLoginUserName, sentLoginPassword];

    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta SQL:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.json({ message: "Credenciais não correspondem" });
            }
        }
    });
});

// Endpoint para "/dashboard"
app.get('/dashboard', (req, res) => {
    const SQL = 'SELECT * FROM pacientes_v3';

    db.query(SQL, (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta SQL:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(204).json({ message: "Sem pacientes disponíveis" });
                // Ou, se preferir enviar uma resposta vazia:
                // res.status(204).send();
            }
        }
    });
});

// Endpoint para "/dashboard/:id_ala"
app.get('/dashboard/:id_ala', (req, res) => {
    const id_ala = req.params.id_ala;
    const SQL = 'SELECT * FROM pacientes_v3 WHERE id_ala = ?';
    
    db.query(SQL, [id_ala], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta SQL:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(204).json({ message: `Sem pacientes disponíveis para a ala ${id_ala}` });
                // Ou, se preferir enviar uma resposta vazia:
                // res.status(204).send();
            }
        }
    });
});


