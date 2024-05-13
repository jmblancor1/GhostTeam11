# Ejecutar pruebas de regresión con Backstop

## Versiones usadas

> En cuanto a las versiones que se usaron para correr las pruebas en esta herramienta, tenemos las siguientes:
>
> - **Node:** 20.13.1
> - **npm:** 10.5.2
>
> Estas versiones fueron instaladas descargando la última versión con soporte a largo plazo (LTS) presente en la página de [node](https://nodejs.org/en/).

## Instalación y ejecución

A continuación se detallan los pasos para realizar la correcta ejecución de las pruebas de regresión con la herramienta **Backstop**:

1. Clonar este repositorio con el comando 

    `git clone https://github.com/jmblancor1/GhostTeam11.git`

2. Abrir un consola cmd o git bash en la ruta donde se haya clonado el repositorio.

3. Ubicarse en la ruta "_\VRTBackstop_".

    `cd VRTBackstop`

4. En un explorador de archivos, ubicar en esta ruta el archivo `package-lock.json` y eliminarlo.

5. Instalar las dependencias requeridas con el comando 

    `npm install`.

6. Ejecutar las pruebas con el comando 

    `npx backstop test`.

7. Al terminar la ejecución se generarán las comparaciones de Ghost y se le abrirá el reporte con diferencias. 

    - En la carpeta backstop_data/html_report/index.html podrá consultar el reporte
    - En la carpeta backstop_data/bitmaps_test/fecha-de-ejecución podrá encontrar las imágenes que se generan 