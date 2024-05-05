# Ejecutar pruebas automatizadas E2E con Kraken

## Versiones usadas

> En cuanto a las versiones que se usaron para correr las pruebas en esta herramienta, tenemos las siguientes:
>
> - **Node:** 20.12.2
> - **npm:** 10.5.0
>
> Estas versiones fueron instaladas descargando la última versión con soporte a largo plazo (LTS) presente en la página de [node](https://nodejs.org/en/).

## Instalación y ejecución

A continuación se detallan los pasos para realizar la correcta ejecución de las pruebas automatizadas E2E con la herramienta **Kraken**:

1. Clonar este repositorio con el comando 

    `git clone https://github.com/jmblancor1/GhostTeam11.git`

2. Abrir un consola cmd o git bash en la ruta donde se haya clonado el repositorio.

3. Eliminar el archivo `package-lock.json` presente en la ruta `/kraken`.

4. Instalar las dependencias requeridas con el comando 

    `npm install`.

5. Ejecutar las pruebas con el comando 
    
    `./node_modules/kraken-node/bin/kraken-node run`.