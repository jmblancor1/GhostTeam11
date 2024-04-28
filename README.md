# Pruebas automatizadas de software Grupo # 11

<h2>Instrucciones para ejecutar los escenarios</h2>
<lu>
  <li>Se debe tener instalado de forma local el software Ghost</li>
  <li>Se debe tener instalada la aplicación Cypress</li>
  <li>Se debe tener instalada la aplicación RIPuppets</li>
  <li>Se debe clonar el proyecto GitHub de pruebas automatizadas: git clone https://github.com/jmblancor1/GhostTeam11.git</li>
  <li>Se debe iniciar el servicio Ghost: ghost start</li>
  <li>Se debe ingresar al directorio donde quedó clonado el repositorio github e iniciar el servicio Cypress desde esta ubicación: cypress open
  <li>Para iniciar los escenarios de prueba se deben seleccionar los enlaces de los archivos que presenta la interfaz Cypress</li>
</lu>

## Ejecutar pruebas con RIPuppet

### Versiones usadas

> En cuanto a las versiones que se usaron para correr las pruebas en esta herramienta, tenemos las siguientes:
>
> - **Node:** 18.20.1
> - **npm:** 10.5.0
> - **playwright:** 1.43.1
>
> Las primeras dos fueron instaladas mediante **nvm** que es un sistema gestor de versiones de Node y la última usando el comando `npm install playwright`


### Instalación y ejecución

A continuación se detallan los pasos para realizar la correcta ejecución de las pruebas de rippers con la herramienta **RIPuppet**:

1. Poner a correr el proyecto de Ghost en una consola independiente que se ubicara en la raíz de este proyecto y desde allí ejecutar el comando `../node_modules/ghost-cli/bin/ghost start`.

2. Clonar o hacer fork del repositorio de git dado por SoftwareDesignLab para el tutorial de rippers.

`https://github.com/TheSoftwareDesignLab/RIPuppetCoursera`

3. Para el correcto funcionamiento de esta herramienta fue necesario realizar dos acciones de configuración.

- Para poder trabajar con las versiones mencionadas anteriormente, fue necesario borrar el archivo `package-lock.json`

- En el archivo [index.js](/RIPUPPETCOURSERA/index.js) en la línea 147 fue necesario cambiar el valor de **networkidle2** por **networkidle**, ya que esta línea estaba generando error.

4. Una vez hecho lo anterior se ejecutan el comando `npm install`.

5. En este punto, fue necesario adicionar la lógica para que el ripper hiciera el loggeo en la aplicación de Ghost, para ello:

- Primero, se adicionaron las siguientes líneas de código en la línea 85 del archivo [index.js](/RIPUPPETCOURSERA/index.js).

```javascript
const config = require('./config.json');
// Navegar a la URL de login especificada en el archivo de configuración
await page.goto(config.url);
// Esperar que los campos de entrada sean visibles y llenarlos con los valores de configuración
await page.waitForSelector('input[name="identification"]', { state: 'visible', timeout: 30000 });
await page.fill('input[name="identification"]', config.values.identification);
await page.fill('input[name="password"]', config.values.password);
// Hacer clic en el botón de submit y esperar a la navegación
await page.click('button[type="submit"]');
await page.waitForNavigation();
```

- Luego de ello se modifico el archivo [config.json](/RIPUPPETCOURSERA/config.json) para que almacenara las credenciales para realizar el loggeo. De igual manera se ajusta el número de niveles que se requiere que recorra la prueba.

```json
{
    "url": "http://localhost:2368/ghost/#/signin",
    "headless": true,
    "depthLevels": 4,
    "inputValues": false,
    "values": {"identification": "nombre.apellido@uniandes.edu.co",
        "password": "contrasena123"
        },
    "browsers": ["chromium", "webkit", "firefox"]
}
```

6. Ejecutar el comando `node index.js` desde la raíz del repositorio para ejecutar las pruebas y esperar a ques estas finalicen.

7. Ir a la ruta `/results` y ejecutar dos comandos:

- Una única vez ejecutar `npm install http-server`
- Posteriormente y cada que se requiera visualizar nuevos resultados, ejecutar el comando `http-server`

8. El último comando creará un servidor http en la dirección `http:localhost:8080` para revisar el reporte generado con todos sus resultados en los diferentes navegadores en los que se ejecutó la prueba.