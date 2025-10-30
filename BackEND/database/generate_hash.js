// Script para generar hash de contraseña
// Ejecutar: node BackEnd/database/generate_hash.js

import bcrypt from 'bcrypt';

const password = 'Test123!';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  console.log('\n🔐 Hash generado para contraseña: Test123!');
  console.log('\nHash:', hash);
  console.log('\n📝 Copia este hash y reemplázalo en el archivo cleanup_and_seed.sql');
  console.log('\n');
});
