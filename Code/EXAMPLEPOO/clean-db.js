const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

console.log('🗑️ Eliminando toda la base de datos...');

// Opción 1: Eliminar el archivo de base de datos completamente
if (fs.existsSync('dev.db')) {
  fs.unlinkSync('dev.db');
  console.log('✅ Archivo dev.db eliminado');
} else {
  console.log('ℹ️ No existe dev.db');
}

// Opción 2: Crear nueva BD vacía y eliminar todas las tablas
const db = new sqlite3.Database('dev.db');

console.log('🔧 Creando base de datos limpia...');

// Obtener lista de todas las tablas
db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, rows) => {
  if (err) {
    console.error('Error obteniendo tablas:', err);
    return;
  }
  
  console.log('📋 Tablas encontradas:', rows.length);
  
  if (rows.length === 0) {
    console.log('✅ Base de datos ya está vacía');
    db.close();
    return;
  }
  
  // Eliminar cada tabla
  let tablesDropped = 0;
  rows.forEach(row => {
    if (row.name !== 'sqlite_sequence') { // No eliminar tabla del sistema
      db.run(`DROP TABLE IF EXISTS "${row.name}"`, (err) => {
        if (err) {
          console.error(`Error eliminando tabla ${row.name}:`, err);
        } else {
          console.log(`🗑️ Tabla "${row.name}" eliminada`);
        }
        
        tablesDropped++;
        if (tablesDropped === rows.length) {
          console.log('🎉 ¡Base de datos completamente limpia!');
          
          // Verificar que esté vacía
          db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, finalRows) => {
            if (err) {
              console.error('Error verificando:', err);
            } else {
              console.log('📊 Tablas restantes:', finalRows.length);
              finalRows.forEach(row => {
                console.log(`  - ${row.name}`);
              });
            }
            db.close();
          });
        }
      });
    } else {
      tablesDropped++;
    }
  });
});
