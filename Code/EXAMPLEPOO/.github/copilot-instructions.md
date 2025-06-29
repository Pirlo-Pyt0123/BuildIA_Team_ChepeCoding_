# Instrucciones para GitHub Copilot

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Proyecto: Plataforma Educativa Gamificada

Este proyecto es una aplicación web educativa con las siguientes características:

### Tecnologías Principales
- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS con tema personalizado futurista
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion
- **Routing**: React Router DOM
- **Build Tool**: Vite

### Arquitectura del Proyecto
- **src/components/**: Componentes reutilizables
- **src/pages/**: Páginas principales (Login, StudentDashboard, TeacherDashboard)
- **src/components/ui/**: Componentes base de interfaz
- **src/components/student/**: Componentes específicos para estudiantes
- **src/components/teacher/**: Componentes específicos para docentes

### Diseño y UX
- **Color Scheme**: Tema oscuro con acentos neón (azul, verde, púrpura)
- **Fuentes**: Inter, Poppins, Space Grotesk
- **Responsivo**: Mobile-first con breakpoints de Tailwind
- **Animaciones**: Transiciones suaves, efectos hover, entrada de componentes

### Funcionalidades Clave
#### Dashboard Estudiante:
- Sistema de monedas y rankings
- Desafíos académicos interactivos
- Tienda virtual de recompensas
- Progreso gamificado

#### Dashboard Docente:
- Gestión de estudiantes y clases
- Creación y seguimiento de desafíos
- Sistema de mensajería
- Generación de reportes
- Asistente IA (placeholder)

### Convenciones de Código
- Usa TypeScript estricto
- Componentes funcionales con hooks
- Props interfaces bien tipadas
- Clases de Tailwind organizadas
- Comentarios descriptivos en español
- Nombres de variables y funciones en inglés
- Textos de UI en español

### Patrones de Diseño
- Componentes modulares y reutilizables
- Motion components para animaciones
- Glass morphism effects
- Gradientes y efectos neón
- Grid y flex layouts responsivos
