const fastify = require('fastify')({ logger: true });
const mysql = require('mysql2/promise');

// Configuração do MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DB || 'sensor_data',
  waitForConnections: true,
  connectionLimit: 10,
});

// Criação da tabela (executada na inicialização)
// async function initializeDatabase() {
//   try {
//     const connection = await pool.getConnection();
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS readings (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         data DATE NOT NULL,
//         hora TIME NOT NULL,
//         temperatura FLOAT NOT NULL,
//         nivel FLOAT NOT NULL,
//         rpm FLOAT NOT NULL,
//         corrente FLOAT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);
//     connection.release();
//     fastify.log.info('Tabela criada com sucesso!');
//   } catch (err) {
//     fastify.log.error('Erro ao criar tabela:', err);
//     process.exit(1);
//   }
// }

// Função para gerar dados aleatórios (como antes)
function generateRandomData() {
  return {
    data: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().split(' ')[0],
    temperatura: parseFloat((Math.random() * 40 + 20).toFixed(1)), // 20.0 a 60.0
    nivel: parseFloat((Math.random() * 100).toFixed(1)),           // 0.0 a 100.0
    rpm: parseFloat((Math.random() * 5000 + 1000).toFixed(1)),    // 1000.0 a 6000.0
    corrente: parseFloat((Math.random() * 15 + 5).toFixed(1))      // 5.0 a 20.0
  };
}

// Endpoint para inserir dados no MySQL
fastify.post('/sensors', async (request, reply) => {
  const data = generateRandomData();
  
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO readings (data, hora, temperatura, nivel, rpm, corrente) VALUES (?, ?, ?, ?, ?, ?)',
      [data.data, data.hora, data.temperatura, data.nivel, data.rpm, data.corrente]
    );
    connection.release();
    return { success: true, message: 'Dados inseridos!', data };
  } catch (err) {
    fastify.log.error(err);
    return { success: false, error: 'Falha ao inserir dados' };
  }
});

// Inicialização
const start = async () => {
  // await initializeDatabase();
  try {
    await fastify.listen({
      port: 3000,
      host: '0.0.0.0'
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();