import fs from 'fs';

// Verificar que todos los archivos necesarios existen
const requiredFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'src/pages/LoginPage.tsx',
  'src/pages/StudentDashboard.tsx',
  'src/pages/TeacherDashboard.tsx',
  'package.json',
  'vite.config.ts',
  'tailwind.config.js',
  'tsconfig.json'
];

console.log('🔍 Verificando archivos del proyecto...\n');

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - FALTA`);
    allFilesExist = false;
  }
});

console.log('\n📊 Resumen:');
if (allFilesExist) {
  console.log('✅ Todos los archivos necesarios están presentes');
  console.log('🚀 El proyecto debería estar funcional');
} else {
  console.log('❌ Faltan algunos archivos');
}

// Verificar dependencias en package.json
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'];
  
  console.log('\n📦 Verificando dependencias:');
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - FALTA`);
    }
  });
} catch (error) {
  console.log('❌ Error leyendo package.json');
}
