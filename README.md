# Plataforma de Mascotas Perdidas (MichiMaPP)

Integrantes: Lucía Canclini, Rodrigo Álvarez Balboa, Franco Juárez Acherielli

## 1. Introducción y Objetivos

Este proyecto es una aplicación backend (API REST) desarrollada en **Node.js y TypeScript** que centraliza y organiza información sobre mascotas perdidas, encontradas y en adopción. El objetivo principal es desarrollar una herramienta accesible que aumente la efectividad en la localización de animales.

El desarrollo se basa en la aplicación rigurosa de **Patrones de Diseño** y los principios **SOLID** para crear un sistema más mantenible, flexible y extensible.

### **Tecnologías Clave**

* **Backend:** Node.js, Express.js, Sequelize (TypeScript)
* **Gestor de BD:** PostgreSQL
* **Gestión de Repositorio:** GitHub para gestión de repositorios y CI/CD.

---

## 2. Guía de Inicio Rápido (Quickstart)

Esta sección explica cómo levantar el entorno de desarrollo local y garantizar la **reproducibilidad** del entorno.

### 2.1. Requisitos Previos

1.  **Node.js** (se recomienda usar [nvm](https://github.com/nvm-sh/nvm) o Docker para control de versiones).
2.  **Gestor de paquetes** NPM.
3.  Un servidor de **PostgreSQL** disponible.

### 2.2. Configuración e Instalación de Dependencias

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/Franco-Juarez/Metodolog-a-de-Sistemas
    
    ```

2.  **Instalar dependencias:**

    Para asegurar una **instalación limpia y reproducible** y garantizar que todo el equipo use exactamente las mismas versiones, usamos `npm ci`. Esto es posible gracias a que el `package-lock.json` se mantiene versionado, asegurando el determinismo del grafo de dependencias.

    ```bash
    # npm ci: instala exactamente lo que dice el package-lock.json (ideal para reproducibilidad).
    npm ci
    ```

3.  **Configurar Variables de Entorno:**

    Cree un archivo **`.env`** en la raíz del proyecto y complete las variables necesarias.

    ```env
    # Puerto de la API
    PORT=3000

    # Credenciales de PostgreSQL
    DB_HOST=localhost
    DB_USER=petuser
    DB_PASS=secret
    DB_NAME=petfinder_db

    # Claves del cliente Supabase (para simular autenticación)
    SUPABASE_URL=...
    SUPABASE_ANON_KEY=...
    ```

### 2.3. Ejecución

Para iniciar el servidor en modo desarrollo (con recarga automática):

```bash
# Ejecuta el script 'dev' definido en package.json
npm run dev 
# Esto ejecuta: tsx watch src/server.ts
```

Si todo es correcto, verá el mensaje: Servidor corriendo en http://localhost:3000## 

## 3. Estructura del Código Fuente

El proyecto sigue una estructura modular diseñada para cumplir con el **SRP** (separación de responsabilidades) y modularizar la lógica de los patrones.

#### pedí algunos archivos que tal vez falten crear por los tipos de patrones de diseño usadods

```txt
src/
├── config/                  # Archivos de configuración
├── core/                    # Módulos centrales (Singleton, Interfaces)
│   ├── Database.ts          # Patrón Singleton (Conexión a BD)
│   ├── IDatabaseClient.ts   # Interfaz para DIP
│   └── Server.ts
├── interfaces/              # Abstracciones (Contratos)
│   └── IPublication.ts
├── models/                  # Entidades de dominio
│   ├── pets/
│   │   ├── Pet.ts           # Clase base abstracta (Polimorfismo)
│   │   ├── Cat.ts
│   │   └── Dog.ts
│   └── locations/
│       └── Location.ts
├── publications/
│   ├── factory/
│   │   ├── PublicationBuilder.ts        # Patrón Builder
│   │   ├── PublicationFactory.ts        # Patrón Factory (Refactorizado para OCP)
│   │   └── IPublicationConstructor.ts   # Soporte para Factory Registrada
│   └── types/
│       ├── Adoption.ts
│       ├── Found.ts
│       ├── Lost.ts
│       └── Sighted.ts
├── services/
│   ├── IAuthService.ts
│   ├── IUserRepository.ts
│   ├── SupabaseAuthService.ts
│   ├── SupabaseUserRepository.ts
│   └── PublicationService.ts
├── routes/
│   └── User.Routes.ts
├── app.ts
└── server.ts
```

## 4. Documentación de Arquitectura (Patrones y SOLID)

La implementación se guía por la necesidad de crear un código **fácil de entender, mantener y extender**.

#### hay que continuar explicando lo que se hizo en el codigo


---

## 🙋‍♂️ Integrantes del Equipo

* Canclini Lucía
* Rodrigo Alvarez Balboa
* Franco Juarez Acherielli