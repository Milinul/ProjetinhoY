const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3030;

// Configurações da conexão
const dbConfig = {
    user: 'SYS',
    password: 'root',
    connectString: 'localhost:1521/XEPDB1',
    privilege: oracledb.SYSDBA
  };

app.use(bodyParser.json());
app.use(cors());

// Rota para obter todos os usuários da tabela USERS
app.get('/dashboard', async (req, res) => {
  let connection;

  try {
    // Estabelece a conexão
    //console.log('Conectando ao banco de dados...');
    connection = await oracledb.getConnection(dbConfig);
    //console.log('Conexão estabelecida com sucesso.');

    // Realiza a consulta
    //console.log('Executando a consulta SQL...');
    const result = await connection.execute('SELECT * FROM PACIENTES', [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    //console.log('Consulta SQL executada com sucesso.');

    // Processa os resultados antes de enviá-los
    const processedResults = result.rows.map(row => ({
      id_ala: row['ID_ALA'] !== undefined ? String(row['ID_ALA']) : null,
      nome_ala: row['NOME_ALA'] !== undefined ? String(row['NOME_ALA']) : null,
    }));

    // Retorna os resultados processados como JSON
    res.status(200).json(processedResults);
  } catch (err) {
    console.error('Erro ao consultar a tabela PACIENTES:', err);
    res.status(500).json({ error: 'Erro ao consultar a tabela PACIENTES' });
  } finally {
    // Libera a conexão
    if (connection) {
      try {
        await connection.close();
        //console.log('Conexão fechada.');
      } catch (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
    }
  }
});

app.get('/dashboard/:id_ala', async (req, res) => {
  let connection;

  try {
    // Estabelece a conexão
    connection = await oracledb.getConnection(dbConfig);

    const id_ala = req.params.id_ala;
    //console.log('id_ala recebido:', id_ala);

    // Utilize o método OUT_FORMAT_OBJECT para simplificar o mapeamento
    const result = await connection.execute('SELECT * FROM PACIENTES WHERE id_ala = :id', { id: id_ala }, { outFormat: oracledb.OUT_FORMAT_OBJECT });

    // Retorna os resultados processados como JSON
    const processedResults = result.rows.map(row => ({
      id: row['ID'] !== undefined ? String(row['ID']) : null,
      nome: row['NOME'] !== undefined ? String(row['NOME']) : null,
      idade: row['IDADE'] !== undefined ? String(row['IDADE']) : null,
      tipo_sanguineo: row['TIPO_SANGUINEO'] !== undefined ? String(row['TIPO_SANGUINEO']) : null,
      situacao: row['SITUACAO'] !== undefined ? String(row['SITUACAO']) : null,
      leitos: row['LEITOS'] !== undefined ? String(row['LEITOS']) : null,
      id_ala: row['ID_ALA'] !== undefined ? String(row['ID_ALA']) : null,
      nome_ala: row['NOME_ALA'] !== undefined ? String(row['NOME_ALA']) : null,
      diagnostico: row['DIAGNOSTICO'] !== undefined ? String(row['DIAGNOSTICO']) : null,
      relatorio: row['RELATORIO'] !== undefined ? String(row['RELATORIO']) : null
    }));

    //console.log('Resultados da consulta:', processedResults);
    res.status(200).json(processedResults);
  } catch (err) {
    console.error('Erro ao consultar a tabela PACIENTES:', err);
    res.status(500).json({ error: 'Erro ao consultar a tabela PACIENTES' });
  } finally {
    // Libera a conexão
    if (connection) {
      try {
        await connection.close();
        //console.log('Conexão fechada.');
      } catch (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
    }
  }
});

// Endpoint POST para autenticação de usuários
app.post('/login', async (req, res) => {
    let connection;
  
    try {
      // Estabelece a conexão
      connection = await oracledb.getConnection(dbConfig);
  
      // Extrai os dados do corpo da requisição
      const sentLoginUserName = req.body.loginuserName;
      const sentLoginPassword = req.body.loginpassword;
  
      // Realiza a consulta
      const result = await connection.execute(
        'SELECT * FROM USERS WHERE username = :username AND password = :password',
        { username: sentLoginUserName, password: sentLoginPassword }
      );
  
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.json({ message: 'Credenciais não correspondem' });
      }
    } catch (err) {
      console.error('Erro ao autenticar usuário:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } finally {
      // Libera a conexão
      if (connection) {
        try {
          await connection.close();
          //console.log('Conexão fechada.');
        } catch (err) {
            console.error('Erro ao autenticar usuário:', err.message);
            res.status(500).json({ error: 'Erro interno do servidor' });            
        }
      }
    }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado - rodando na porta ${PORT}`);
});
