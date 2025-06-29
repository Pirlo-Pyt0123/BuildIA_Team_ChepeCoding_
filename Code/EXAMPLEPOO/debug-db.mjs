import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function debugPrisma() {
  try {
    console.log('🔍 Verificando conexión a Prisma...');
    
    // Verificar que la tabla existe
    const userCount = await prisma.user.count();
    console.log('📊 Total de usuarios en BD:', userCount);
    
    // Listar todos los usuarios
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        code: true,
        password: true,
        role: true,
        isActive: true
      }
    });
    
    console.log('👤 Usuarios encontrados:');
    allUsers.forEach(user => {
      console.log(`- ${user.email} | ${user.code} | ${user.password} | ${user.role} | Activo: ${user.isActive}`);
    });
    
    // Probar búsqueda específica
    const testUser = await prisma.user.findUnique({
      where: { email: 'alex.rivera@colegio.edu' }
    });
    
    if (testUser) {
      console.log('✅ Usuario de prueba encontrado:', testUser.email);
      console.log('🔐 Contraseña en BD:', testUser.password);
      console.log('🏃‍♂️ Probando autenticación manual...');
      
      const isPasswordCorrect = testUser.password === 'estudiante123';
      console.log('🎯 Password match:', isPasswordCorrect);
    } else {
      console.log('❌ No se encontró el usuario de prueba');
    }
    
  } catch (error) {
    console.error('💥 Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugPrisma();
