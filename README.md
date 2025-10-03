# Proyecto Metodologías de Sistemas II: Plataforma de Mascotas Perdidas

## Grupo 20  
**Integrantes:**  
- Canclini Lucía  
- Rodrigo Alvarez Balboa  
- Franco Juarez Acherielli  

---

## Introducción

La pérdida de una mascota es una situación angustiante para cualquier familia. En este contexto, resulta clave aprovechar el intercambio y la circulación de información entre los usuarios, fomentando la participación de la ciudadanía en una tarea colectiva como lo es el cuidado animal.

A partir de esta problemática surge la idea de desarrollar una aplicación web que centraliza y organiza la información de animales perdidos, encontrados y avistados. El objetivo es brindar una herramienta accesible, rápida y clara que aumente las posibilidades de reunir a las mascotas con sus familias.

---


## Objetivos

### Objetivo general

Desarrollar una aplicación web que facilite la búsqueda y publicación de mascotas perdidas, mejorando la experiencia del usuario y aumentando la efectividad en la localización de animales.

### Objetivos específicos

- Centralizar la información en una única plataforma dedicada a mascotas perdidas, encontradas, en adopción o avistadas.
- Implementar filtros y mapas interactivos que agilicen la búsqueda.
- Incorporar notificaciones automáticas de publicaciones cercanas para mantener alerta al resto de la comunidad.
- Diseñar un sistema de publicación sencillo que permita subir fotos.
- Garantizar un proceso de registro rápido y amigable para los usuarios.

---

## Requerimientos principales

- Registrar publicación de mascota con foto, datos básicos y ubicación.
- Modificar y eliminar publicaciones.
- Buscar y filtrar por criterios (tipo, raza, color, estado).
- Enviar y recibir notificaciones de mascotas cercanas.
- Visualizar publicaciones en mapa interactivo.

---

## Tecnologías a implementar

- **REACT (Typescript)**
- Herramientas de diseño UI como Bootstrap, MaterialUI o Tailwind.
- Node.js
- Express.js + Sequelize
- PostgreSQL
- GitHub para gestión de repositorios y CI/CD.

---

## Patrones de Diseño

En el desarrollo de la aplicación se aplicarán distintos **patrones de diseño** para mejorar la flexibilidad, escalabilidad y mantenibilidad del sistema. Estos se clasifican en **creacionales**, **estructurales** y **de comportamiento**.

### Patrones Creacionales

Los patrones creacionales controlan **cómo se crean los objetos**, evitando acoplamientos rígidos y facilitando cambios futuros, promoviendo la reutilización de código.

- **Singleton (Base de datos)**:  
  Se utilizará para garantizar que exista **una única conexión activa** a la base de datos en todo el sistema, evitando la creación de conexiones múltiples a base de datos y centralizando la gestión de este recurso.  
  *Justificación*: asegura acceso global, control centralizado y evita inconsistencias de datos.

- **Factory Method (Usuarios y publicaciones)**:  
  Permitirá crear distintos tipos de usuarios (administrador, estándar, visitante) y publicaciones (perdido, encontrado, en adopción, avistado) sin que el cliente conozca las clases, a través de interfases.  
  *Justificación*: encapsula la creación de objetos y facilita la extensión a futuro.

- **Builder (Formularios de publicación)**:  
  Útil para construir objetos complejos como publicaciones, donde se combinan múltiples parámetros (foto, especie, raza, ubicación, estado, comentarios).  
  *Justificación*: permite gran facilidad para armar objetos con muchas combinaciones de parámetros opcionales, como formularios dinámicos con distintos campos, evitando constructores con muchos parámetros.

---

### Patrones Estructurales

Estos patrones ayudan a **conectar, organizar y simplificar las relaciones entre clases y objetos** para formar estructuras flexibles y fáciles de mantener.

- **Adapter (Mapa con Leaflet)**:  
  El sistema necesita integrar la librería externa **Leaflet**, cuya clase principal (`L.map`) no coincide con la interfaz esperada. Se utilizará un Adapter que actúe como traductor entre nuestra lógica y la API de Leaflet.  
  *Justificación*: es como un traductor, convierte la interfaz de una clase en otra interfaz que espera el cliente, permite integrar librerías externas sin modificar su código.

- **Facade (Gestión de subsistemas)**:  
  Se implementará una fachada que proporcione un interfaz unificada de acciones complejas (ejemplo: al publicar mascota: guardar datos, subir imagen, actualizar mapa, enviar notificación).  
  *Justificación*: reduce el acoplamiento del cliente con los detalles internos, simplifica la interacción y mejora la legibilidad del sistema.

---

### Patrones de Comportamiento

Estos patrones definen cómo los objetos **se comunican y reparten responsabilidades**, reduciendo dependencias y facilitando extensiones.

- **Observer (Notificaciones a usuarios)**:  
  Cada vez que se publique o actualice una mascota (publishers), el sistema notificará automáticamente a los usuarios suscritos en la zona (suscribers).  
  *Justificación*: desacopla al publicador (sistema) de los suscriptores/observadores (usuarios), permitiendo suscripción/desuscripción dinámica.

- **Strategy (Filtros y ordenamiento de búsquedas)**:  
  Se usará para aplicar distintas estrategias de ordenamiento (por fecha, ubicación, relevancia) o filtros (por especie, tamaño, estado).  
  *Justificación*: el algoritnmo se vuelve intercambiable en tiempo de ejecución, permite intercambiar algoritmos sin modificar el contexto, evitando condicionales extensos y favoreciendo extensibilidad.

---

## Conclusiones

En un escenario real de uso, una familia que pierde a su perro podría publicar de forma rápida la información junto con fotos y geolocalización; al mismo tiempo, otra persona que lo vea en la calle podría registrarlo como “avistado”, y el sistema generaría una coincidencia inmediata. Este tipo de interacciones reduce de forma significativa el tiempo de búsqueda y aumenta las posibilidades de reencuentro.
