const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('dev.db');

console.log('🔧 Insertando usuarios manualmente...');

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT,
  isActive BOOLEAN DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  lastLogin DATETIME
)`, (err) => {
  if (err) {
    console.error('Error creando tabla:', err);
    return;
  }
  
  // Insertar usuario de prueba
  db.run(`INSERT OR REPLACE INTO users (id, code, email, password, role, isActive) 
          VALUES (?, ?, ?, ?, ?, ?)`, 
    ['clz1234567890', 'EST25001', 'alex.rivera@colegio.edu', 'estudiante123', 'STUDENT', 1],
    function(err) {
      if (err) {
        console.error('Error insertando usuario:', err);
      } else {
        console.log('✅ Usuario insertado con ID:', this.lastID);
        
        // Verificar inserción
        db.all("SELECT * FROM users", [], (err, rows) => {
          if (err) {
            console.error('Error consultando:', err);
          } else {
            console.log('👤 Usuarios en BD:', rows.length);
            rows.forEach(row => {
              console.log(`- ${row.email} | ${row.password} | ${row.role}`);
            });
          }
          db.close();
        });
      }
    }
  );
});
