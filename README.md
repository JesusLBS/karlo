# Karlo

## Desarrollado por: Jesus Chicho Hernández

Este proyecto es una prueba técnica que consta de dos aplicaciones:

- **karlo-back**: API backend desarrollada en Node.js utilizando Sequelize como ORM y PostgreSQL como base de datos.
- **karlo-front**: Aplicación frontend desarrollada en React.

El propósito de este proyecto es demostrar habilidades en el desarrollo fullstack, integrando un backend robusto con un frontend moderno.

---

## Características y Habilidades

### Backend (karlo-back)
- **Base de datos y ORM:**  
  Uso de PostgreSQL con Sequelize para manejar consultas y relaciones de forma eficiente.
- **Seguridad:**  
  Implementación de autenticación segura con JWT.
- **Buenas prácticas:**  
  Uso de variables de entorno (.env) y configuración modular.
- **Gestión de dependencias:**  
  Se utiliza Yarn para la instalación y manejo de paquetes.

### Frontend (karlo-front)
- Desarrollo en React, siguiendo prácticas modernas de componentes y hooks.
- Integración con la API backend para mostrar datos y gestionar la interacción del usuario.

---

## Estructura del Proyecto

La carpeta principal del repositorio se llama **karlo** y contiene dos subcarpetas:

karlo/

       ├── karlo-back     # API backend en Node.js

       └── karlo-front    # Aplicación frontend en React


---

## Instrucciones de Inicio

### Requisitos Previos
- Tener instalado **Node.js** y **Yarn**.
- Contar con una instancia local de **PostgreSQL**.
- La base de datos local debe llamarse: `karlo_local`.

### Configuración del Backend (karlo-back)

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/JesusLBS/karlo.git
   cd karlo/karlo-back
2. **Instala las dependencias:**
    ```bash
    yarn install
3. **Configura las variables de entorno:**

    Copia el archivo .env.example y renómbralo a .env.dev:

    ```bash
    Copiar Editar
    cp .env.example .env.dev
4. **Ejecutar migraciones:**

    ```bash
    yarn migrate
5. **Iniciar api:**
    ```bash
    yarn dev
El backend estará disponible en http://localhost:3000.


### Licencia

Este proyecto no está licenciado para uso público. Todos los derechos reservados. Para obtener permisos de uso, contacta al propietario del proyecto en chichohdzjesus@gmail.com.

Consulta la licencia completa en [NOTICE.txt](./NOTICE.txt).
