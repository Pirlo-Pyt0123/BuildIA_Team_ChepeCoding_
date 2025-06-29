import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function simpleSeed() {
  try {
    console.log('🌱 Seed simple iniciado...');
    
    // Limpiar todo primero
    await prisma.studentProfile.deleteMany();
    await prisma.teacherProfile.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Datos anteriores eliminados');

    // Crear un usuario de prueba simple
    const testUser = await prisma.user.create({
      data: {
        code: 'EST25001',
        email: 'alex.rivera@colegio.edu',
        password: 'estudiante123',
        role: 'STUDENT',
        isActive: true,
      }
    });
    console.log('✅ Usuario base creado:', testUser.email);

    // Crear perfil de estudiante
    const studentProfile = await prisma.studentProfile.create({
      data: {
        userId: testUser.id,
        name: 'Alex Rivera',
        avatar: 'A',
        grade: '7mo',
        section: 'A',
        coins: 2500,
        level: 15,
        experience: 750,
        maxExperience: 1000,
        totalXP: 12450,
        challengesCompleted: 42,
        winStreak: 7,
        perfectScores: 15,
        totalStudyTime: '127h 32m',
        favoriteTime: 'Tarde (14:00 - 18:00)',
        learningStyle: 'Visual',
        courseRanking: 3,
        schoolRanking: 12,
        countryRanking: 156,
        ownedFrames: JSON.stringify(['none', 'classic', 'gold']),
        ownedBanners: JSON.stringify(['cosmic', 'ocean', 'forest']),
        selectedFrame: 'classic',
        selectedBanner: 'cosmic',
        accuracy: 87.0,
        avgTime: '3m 45s',
        bestSubject: 'Matemáticas',
        improvement: '+12%',
        achievements: JSON.stringify([
          { id: 'first_challenge', name: 'Primer Desafío', icon: '🎯', description: 'Completaste tu primer desafío', date: '2024-01-20' }
        ])
      }
    });
    console.log('✅ Perfil de estudiante creado');

    // Crear un profesor de prueba
    const teacherUser = await prisma.user.create({
      data: {
        code: 'DOC25001',
        email: 'prof.garcia@colegio.edu',
        password: 'profesor123',
        role: 'TEACHER',
        isActive: true,
      }
    });
    console.log('✅ Usuario profesor creado:', teacherUser.email);

    const teacherProfile = await prisma.teacherProfile.create({
      data: {
        userId: teacherUser.id,
        name: 'Prof. García',
        avatar: 'PG',
        subject: 'Matemáticas',
        department: 'Ciencias Exactas',
        yearsExperience: 15,
        totalStudents: 120,
        activeClasses: 6,
        completedAssignments: 45,
        avgPerformance: 87.5,
        classes: JSON.stringify(['7mo A', '7mo B', '8vo A']),
        specializations: JSON.stringify(['Álgebra', 'Geometría'])
      }
    });
    console.log('✅ Perfil de profesor creado');

    console.log('🎉 Seed simple completado exitosamente!');
    
  } catch (error) {
    console.error('❌ Error en seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

simpleSeed();
