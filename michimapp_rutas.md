# Ejemplos de Testing de API - MichiMapp Backend

## Índice

- [Users](#users)
- [Publications](#publications)
- [Messages](#messages)
- [Locations](#locations)
- [Notas importantes](#notas-importantes)

------------------------------------------------------------------------

## Users

### Registro de usuario

``` bash
curl -X POST http://localhost:3000/api/users/register   -H "Content-Type: application/json"   -d '{
    "email": "usuario@example.com",
    "password": "password123",
    "name": "Usuario Test"
  }'
```

### Login

``` bash
curl -X POST http://localhost:3000/api/users/login   -H "Content-Type: application/json"   -d '{
    "email": "test2@example.com",
    "password": "test123"
  }'
```

**Respuesta esperada:**

``` json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

⚠️ **Guardar el token para endpoints protegidos**

------------------------------------------------------------------------

## Publications

### Crear publicación (requiere auth)

``` bash
curl -X POST http://localhost:3000/api/publications   -H "Content-Type: application/json"   -H "Authorization: Bearer TU_TOKEN_AQUI"   -d '{
    "description": "Perdí a mi perro en el parque",
    "creatorUserId": "844e9d5e-1313-4837-aa18-bf63c34df942",
    "publicationType": "lost",
    "petName": "Max",
    "petType": "Dog",
    "petBreed": "Labrador",
    "petColor": "Dorado",
    "petSize": "Grande",
    "petAge": 3,
    "petURL": "https://example.com/max.jpg",
    "latitude": -34.603722,
    "longitude": -58.381592,
    "reference_address": "Parque Centenario, Buenos Aires"
  }'
```

### Obtener todas las publicaciones

``` bash
curl http://localhost:3000/api/publications
```

### Obtener publicaciones con filtros

``` bash
curl "http://localhost:3000/api/publications?type=lost"
curl "http://localhost:3000/api/publications?user=844e9d5e-1313-4837-aa18-bf63c34df942"
curl "http://localhost:3000/api/publications?age=3"
curl "http://localhost:3000/api/publications?size=Grande"
curl "http://localhost:3000/api/publications?type=lost&size=Grande&age=3"
```

### Obtener publicación por ID

``` bash
curl http://localhost:3000/api/publications/ID_DE_PUBLICACION

Ejemplo:

curl http://localhost:3000/api/publications/eff2bb49-0571-46eb-9d19-72b3be51341e
```

### Desactivar publicación (requiere auth)

``` bash
curl -X DELETE http://localhost:3000/api/publications/ID_DE_PUBLICACION   -H "Authorization: Bearer TU_TOKEN_AQUI"
```

------------------------------------------------------------------------

## Messages (En desarrollo)

### Crear mensaje (requiere auth)

``` bash
curl -X POST http://localhost:3000/api/messages   -H "Content-Type: application/json"   -H "Authorization: Bearer TU_TOKEN_AQUI"   -d '{
    "publication_id": "123",
    "content": "Vi a esta mascota ayer!"
  }'
```

**Respuesta:**

``` json
{
  "message": "🚧 Feature en desarrollo",
  "details": "El sistema de comentarios aún no está implementado",
  "status": "coming_soon"
}
```

### Obtener mensajes de una publicación

``` bash
curl http://localhost:3000/api/messages/publication/ID_PUBLICACION
```

### Actualizar mensaje (requiere auth)

``` bash
curl -X PUT http://localhost:3000/api/messages/ID_MENSAJE   -H "Content-Type: application/json"   -H "Authorization: Bearer TU_TOKEN_AQUI"   -d '{
    "content": "Mensaje actualizado"
  }'
```

### Eliminar mensaje (requiere auth)

``` bash
curl -X DELETE http://localhost:3000/api/messages/ID_MENSAJE   -H "Authorization: Bearer TU_TOKEN_AQUI"
```

------------------------------------------------------------------------

## Notas importantes

### Autenticación

-   Endpoints marcados con **(requiere auth)** necesitan:

        Authorization: Bearer TU_TOKEN_AQUI

-   Token expira a las 2 horas.

### Formato de datos

-   `Content-Type: application/json`
-   Fechas en ISO 8601
-   UUIDs generados automáticamente

### Códigos de respuesta

-   200 OK
-   201 Created
-   400 Bad Request
-   401 Unauthorized
-   403 Forbidden
-   404 Not Found
-   500 Internal Server Error
-   501 Not Implemented
