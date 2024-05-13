# Ejecutar pruebas de regresión con Resemble

## Versiones usadas

> En cuanto a las versiones que se usaron para correr las pruebas en esta herramienta, tenemos las siguientes:
> 
>- *Node:* 20.13.1
> - *npm:* 10.5.2
> 
>Estas versiones fueron instaladas descargando la última versión con soporte a largo plazo (LTS) presente en la página de [node](https://nodejs.org/en/).

## Instalación y ejecución

A continuación se detallan los pasos para realizar la correcta ejecución de las pruebas de regresión con la herramienta *Resemble*:

1. Clonar este repositorio con el comando 

    git clone https://github.com/jmblancor1/GhostTeam11.git

2. Abrir un consola cmd o git bash en la ruta donde se haya clonado el repositorio.

3. Ubicarse en la ruta "_\VRTResemble".

    cd VRTResemble

4. En un explorador de archivos, ubicar en esta ruta el archivo package-lock.json y eliminarlo.

5. Instalar las dependencias requeridas con el comando 

    npm install.

6. Ejecutar las pruebas con el comando 

    node index.js.

7. Al terminar la ejecución se generarán las comparaciones de Ghost. 

    - En la carpeta results/fecha-de-ejecución podrá encontrar:
        - Las imágenes del resultado de cada comparación así: compare-funcionalidad-ejecutada
        - El reporte con los resultados: report.html