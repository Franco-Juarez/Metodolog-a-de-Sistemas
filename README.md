# Plataforma de Mascotas Perdidas (MichiMapp)

## Integrantes del Grupo 20

* Canclini Lucía
* Rodrigo Alvarez Balboa
* Franco Juarez Acherielli

## 1. Introducción y Objetivos

Este proyecto es una aplicación backend (API REST) desarrollada en **Node.js y TypeScript** que centraliza y organiza información sobre mascotas perdidas, encontradas y en adopción. El objetivo principal es desarrollar una herramienta accesible que aumente la efectividad en la localización de animales.

El desarrollo se basa en la aplicación rigurosa de **Patrones de Diseño** y los principios **SOLID** para crear un sistema más mantenible, flexible y extensible.

### **Tecnologías Clave**

* **Backend:** Node.js, Express.js (TypeScript)
* **Gestor de BD:** PostgreSQL
* **ORM/Capa de Persistencia:** Sequelize (**Conceptual**). La implementación actual utiliza el **Cliente de Supabase** como capa de persistencia y servicio de autenticación.
* **Control de Calidad:** Husky (con hook `pre-commit` para Prettier).
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

    Para asegurar una **instalación limpia y reproducible** y garantizar que todo el equipo use exactamente las mismas versiones, usamos `npm ci`. Esto es posible gracias a que el `package-lock.json` se mantiene versionado, ideal para reproducibilidad.

    ```bash
    npm ci
    
    ```

3.  **Configurar Variables de Entorno:**

    Cree un archivo **`.env`** en la raíz del proyecto y complete las variables necesarias.

    ```env
    SUPABASE_URL=
    SUPABASE_ANON_KEY=
    JWT_SECRET=
    PORT=3000
    ```

### 2.3. Ejecución

Para iniciar el servidor en modo desarrollo (con recarga automática):

```bash

npm run dev 
# Esto ejecuta: tsx watch src/server.ts
```

Si todo es correcto, se verá el mensaje: Servidor corriendo en http://localhost:3000## 

### 2.4. Control de Calidad del Código (Husky + Prettier)

Para garantizar la consistencia del código (estilo uniforme), se configuró Husky para que ejecute automáticamente Prettier en cada git commit.

Husky Hook: pre-commit

Propósito: Formatear y asegurar que el código no contenga errores de estilo antes de permitir el commit. Esto es clave para la Prevención de Deuda Técnica  y la Colaboración en equipo (código más mantenible).

## 3. Estructura del Código Fuente

El proyecto sigue una estructura modular diseñada para cumplir con el **SRP** (separación de responsabilidades) y modularizar la lógica de los patrones.

```txt
src/
├── controllers/
│   ├── Message.Controller.ts
│   ├── Publication.Controller.ts
│   └── User.Controller.ts
│
├── middlewares/
│   └── auth.middleware.ts
│
├── models/
│   ├── pets/
│   │   ├── Cat.Class.ts
│   │   ├── Dog.Class.ts
│   │   ├── Pet.Class.ts
│   │   └── PetFactory.ts
│   │
│   ├── publications/
│   │   ├── Adoption.Class.ts
│   │   ├── Found.Class.ts
│   │   ├── Lost.Class.ts
│   │   ├── Publication.Builder.ts
│   │   ├── Publication.Class.ts
│   │   ├── Publication.Factory.ts
│   │   ├── Publication.interface.ts
│   │   └── Sighted.Class.ts
│   │
│   ├── AuthService.Class.ts
│   ├── DataBase.Class.ts
│   ├── Location.Class.ts
│   ├── Message.Class.ts
│   ├── Server.Class.ts
│   └── User.Class.ts
│
├── routes/
│   ├── Message.Routes.ts
│   ├── Publication.Routes.ts
│   └── User.Routes.ts
│
├── utils/
│   └── validators.ts
│
└── server.ts
```
## 4. Diseño y Diagramas de Arquitectura

### 4.1. Diagrama de Entidad-Relación (ER)
El siguiente diagrama define la estructura de la base de datos (tablas y relaciones de entidad) utilizada para la persistencia del proyecto.

![Diagrama Entidad-Relación del MVP](./img/Diagrama_ER.png)


### 4.2. Diagrama de Clases (UML)
Este diagrama ilustra la arquitectura orientada a objetos, incluyendo la jerarquía de Polimorfismo y la estructura de los Patrones Creacionales.

![Diagrama UML del Sistema MichiMapp](./img/Diagrama_UML.png)

## 5. Rutas Principales del Backend

| Módulo        | Endpoint / Acción                          | Descripción |
|---------------|----------------------------------------------|-------------|
| **Users**     | POST /api/users/register                     | Registro de usuario. |
|               | POST /api/users/login                        | Login y obtención de token JWT. |
|               | (Auth) — token obligatorio                   | Requerido para rutas protegidas. |
| **Publications** | POST /api/publications (auth)             | Crear una publicación (lost, found, sighted, adoption). |
|               | GET /api/publications                        | Obtener todas las publicaciones. |
|               | GET /api/publications?filters                | Filtrar por tipo, tamaño, edad, usuario, etc. |
|               | GET /api/publications/:id                    | Obtener publicación por ID específico. |
|               | DELETE /api/publications/:id (auth)          | Desactivar publicación. |
| **Messages**  | POST /api/messages (auth)                    | Crear mensaje (feature en desarrollo). |
|               | GET /api/messages/publication/:id            | Obtener mensajes de una publicación. |
|               | PUT /api/messages/:id (auth)                 | Actualizar mensaje. |
|               | DELETE /api/messages/:id (auth)              | Eliminar mensaje. |
| **Locations** | POST /api/locations (auth)                   | Registrar ubicación asociada. |
|               | GET /api/locations/:id                       | Obtener ubicación por ID. |
|               | GET /api/locations                           | Obtener todas las ubicaciones. |
|               | PUT /api/locations/:id (auth)                | Actualizar ubicación. |
|               | DELETE /api/locations/:id (auth)             | Eliminar ubicación. |
|


## 6. Documentación de Arquitectura (Patrones y SOLID)

La implementación se guía por la necesidad de crear un código **fácil de entender, mantener y extender**.



### 6.1 Patrones y Principios Aplicados

| **Patrón**         | **Archivo(s)**                                     | **Justificación Arquitectónica**                                                                                      | **SOLID** |
|--------------------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|-----------|
| **Singleton**      | `models/DataBase.Class.ts`                          | Centraliza la conexión a BD → evita duplicación y garantiza consistencia.                                              | **DIP**   |
| **Factory Method** | `models/publications/Publication.Factory.ts`         | Elimina `switch` y permite registrar nuevos tipos de publicaciones sin modificar código existente.                      | **OCP**   |
| **Builder**        | `models/publications/Publication.Builder.ts`         | Simplifica la creación de objetos complejos (Publicaciones) y mejora la claridad del código.                           | **SRP**   |


### 6.2. Principios SOLID Aplicados

| Principio | Dónde se Aplica | Problema que Resuelve (Code Smell) |
|-----------|------------------|-------------------------------------|
| **SRP (Responsabilidad Única)** | `models/publications/Publication.Builder.ts`, `models/User.Class.ts`, `controllers/User.Controller.ts` | Evita *God Classes*: cada clase cumple un único propósito. |
| **DIP (Inversión de Dependencias)** | `models/DataBase.Class.ts` | El patrón Singleton centraliza la conexión a la base de datos, evitando que los módulos de alto nivel (como los servicios y controladores) tengan que instanciar directamente la conexión con new. Esto reduce el acoplamiento y facilita la portabilidad si se cambiara el ORM o gestor de BD. |
| **OCP (Abierto/Cerrado)** | `models/publications/Publication.Factory.ts`, `models/pets/Pet.Class.ts` | Permite agregar tipos de publicaciones o especies sin modificar las clases existentes. |
| **ISP (Segregación de Interfaces)** | `models/publications/Publication.interface.ts` | Evita interfaces gordas: cada publicación define solo los campos y métodos necesarios para su rol. |

### 6.3 Clean Code: Cohesión y Legibilidad
1. Cohesión de Responsabilidades, por ejemplo la eliminación de Setters (Inmutabilidad). Al eliminar los setters de las entidades (Pet.Class.ts), se garantiza que el estado de los objetos de dominio es inmutable una vez creados. Esto previene cambios de estado inesperados y simplifica el debugging, lo cual es una práctica clave de Clean Code.

Encapsulamiento del JSON (Builder): El patrón Builder (Publication.Builder.ts) encapsula el proceso de construcción, haciendo que el código del cliente sea más fácil de leer, ya que no tiene que preocuparse por el orden o la validación de los 10+ parámetros del objeto.

2. Legibilidad y Uniformidad (Prettier/Husky)
El setup de Husky y Prettier garantiza la uniformidad del código del equipo.

Clean as You Code: El hook pre-commit asegura que el código sea formateado y limpiado antes de que ingrese al historial de Git. Este control automatizado es la defensa más efectiva contra la acumulación de Deuda Técnica en forma de desorden de estilo y errores de sintaxis.

### 6.4. Patrones de Comportamiento (Para Implementar a Futuro)

| Patrón    | Dónde se Aplicará                 | Justificación |
|-----------|------------------------------------|---------------|
| **Observer** | Módulo de Notificaciones | El sistema notificará automáticamente a los usuarios suscritos (Observers) cuando haya una nueva publicación (Subject). Esto permite una relación dinámica y desacoplada. |
| **Strategy** | Módulo de Búsquedas y Filtros | Permite aplicar distintas estrategias de ordenamiento o filtros. El algoritmo es intercambiable en tiempo de ejecución sin modificar la clase principal de búsqueda. |


---