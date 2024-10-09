# TCIT Challenge - Frontend para Aplicación de Manejo de Posts

Aplicación para lectura, creación y eliminación de mensajes (posts). Frontend (cliente) desarrollado con React y Redux, hoja de estilos por Tailwind CSS.
Desarrollado por [Mauricio Oyarzún](https://github.com/moyarzun).

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clonar el repositorio de GitHub:

    ```bash
    git clone https://github.com/moyarzun/tcit-forum-frontend.git
    cd tcit-forum-frontend
    ```

2. Instalar las dependencias del proyecto:

    ```bash
    npm install
    ```

## Ejecución en Ambiente de Desarrollo

1. Iniciar la aplicación:

    ```bash
    npm start
    ```

2. Abrir navegador en [http://localhost:3000](http://localhost:3000)

## Ejecución en Ambiente de Producción

1. Compilar la versión de producción. Esto generará archivos estáticos optimizados en la carpeta `build`:

    ```bash
    npm run build
    ```

2. Iniciar la aplicación, sirviendo los archivos estáticos de la carpeta `build`:

    ```bash
    serve -s build
    ```
