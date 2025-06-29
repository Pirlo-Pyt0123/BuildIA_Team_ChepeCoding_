const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta a la base de datos
const dbPath = path.join(__dirname, 'dev.db');

console.log('🔍 Verificando base de datos en:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error conectando a la BD:', err.message);
    return;
  }
  console.log('✅ Conectado a SQLite');
});

// Consultar usuarios
db.all("SELECT * FROM users", [], (err, rows) => {
  if (err) {
    console.error('❌ Error en consulta:', err.message);
    return;
  }
  
  console.log('👤 Usuarios encontrados:', rows.length);
  rows.forEach((row) => {
    console.log(`- ${row.email} | ${row.password} | ${row.role}`);
  });
  
  db.close();
});
