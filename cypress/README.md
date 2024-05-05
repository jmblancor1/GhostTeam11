# Ejecutar pruebas automatizadas E2E con Cypress

## Versiones usadas

> En cuanto a las versiones que se usaron para correr las pruebas en esta herramienta, tenemos las siguientes:
>
> - **Node:** 20.12.2
> - **npm:** 10.5.0
>
> Estas versiones fueron instaladas descargando la última versión con soporte a largo plazo (LTS) presente en la página de [node](https://nodejs.org/en/).

## Instalación y ejecución

A continuación se detallan los pasos para realizar la correcta ejecución de las pruebas automatizadas E2E con la herramienta **Cypress**:

1. Clonar este repositorio con el comando 

    `git clone https://github.com/jmblancor1/GhostTeam11.git`

2. Abrir un consola cmd o git bash en la ruta donde se haya clonado el repositorio.

3. Eliminar el archivo `package-lock.json` presente en la ruta `/cypress`.

4. Instalar las dependencias requeridas con el comando 

    `npm install`.

5. Ejecutar las pruebas con el comando 
    
    `cypress open`.

6. Se debe abrir una instancia de Cypress para configurar las pruebas a ejecutar.

![cypress open](cypress/assets/1.png)

7. Dar clic en _Add project_ y luego en _browse manually_.

![cypress open](cypress/assets/2.png)

8. Seleccionar la carpeta _cypress_ presente en la raíz del repositorio y dar clic en _Select folder_.

![cypress open](cypress/assets/3.png)

9. Seleccionar la opción _E2E testing_.

![cypress open](cypress/assets/4.png)

10. Dar clic en _Continue_.

![cypress open](cypress/assets/5.png)

11. Dar clic en _Start E2E testing in Chrome_. Este paso abrirá una instancia del navegador Chrome para ejecutar las pruebas E2E.

![cypress open](cypress/assets/6.png)

12. Dar clic en cada test a ejecutar.

![cypress open](cypress/assets/7.png)

13. Para volver al listado de pruebas y ejecutar otro test, se debe dar clic en _Specs_.

![cypress open](cypress/assets/8.png)

14. Repetir los pasos 12 y 13 hasta finalizar la ejecución de todas las pruebas.