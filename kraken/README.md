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

3. Ubicarse en la ruta "_\kraken_".

    `cd kraken`

4. En un explorador de archivos, ubicar en esta ruta el archivo `package-lock.json` y eliminarlo.

5. Instalar las dependencias requeridas con el comando 

    `npm install`.

6. Debido a que la herramienta solo permite ejecutar un feature a la vez, es necesario mover de ubicación el archivo _.feature_ de cada funcionalidad a probar.

    De acuerdo con lo anterior, en un explorador de archivos debe ubicarse el archivo a copiar en la ruta  "_\kraken\features\feature_definitions"_ y pegarlo en la ruta "_\kraken\features_".

6. Ejecutar las pruebas con el comando 
    
    `./node_modules/kraken-node/bin/kraken-node run`.

7. Repetir los pasos 5 y 6 hasta finalizar la ejecución de todas las pruebas.