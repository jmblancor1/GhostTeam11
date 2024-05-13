const compareImages = require("resemblejs/compareImages");
const fs = require('fs');
const config = require("./config.json");

function sanitizeFileName(fileName) {
    const accentMap = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
    };
    const sanitized = fileName.replace(/[\/\\:\s]/g, '_').replace(/[áéíóúÁÉÍÓÚ]/g, function(letter) {
        return accentMap[letter];
    }).replace(/__/g, '_'); // Remover dobles guiones bajos
    return sanitized;
}

function browser(b, scenario, datetime) {
    const beforeImageFile = `../../screenshots/${scenario.before}`;
    const afterImageFile = `../../screenshots/${scenario.after}`;
    const sanitizedLabel = sanitizeFileName(scenario.label);
    return `<div class="browser" id="test0">
        <div class="btitle">
            <h2>Browser: ${b}</h2>
            <p>Scenario: ${scenario.label}</p>
        </div>
        <div class="imgline">
            <div class="imgcontainer">
                <span class="imgname">Reference</span>
                <img class="img2" src="${beforeImageFile}" id="refImage" label="Reference">
            </div>
            <div class="imgcontainer">
                <span class="imgname">Test</span>
                <img class="img2" src="${afterImageFile}" id="testImage" label="Test">
            </div>
        </div>
        <div class="imgline">
            <div class="imgcontainer">
                <span class="imgname">Diff</span>
                <img class="imgfull" src="./compare-${sanitizedLabel}.png" id="diffImage" label="Diff">
            </div>
        </div>
    </div>`;
}

function createReport(datetime, scenarios) {
    let reportHTML = `
    <html>
        <head>
            <title>VRT Report</title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for <a href="${config.url}">${config.url}</a></h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
    `;
    
    for (const scenario of scenarios) {
        reportHTML += browser(config.browsers[0], scenario, datetime);
    }

    reportHTML += `
            </div>
        </body>
    </html>
    `;
    
    return reportHTML;
}



function createReport(datetime, resInfo, scenario) {
    const config = require("./config.json");
    return `
    <html>
        <head>
            <title>VRT Report</title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for <a href="${config.url}">${config.url}</a></h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${Object.keys(resInfo).map(b => browser(b, resInfo[b], datetime, scenario)).join('')}
            </div>
        </body>
    </html>`;
}


async function executeTest() {
    let resultInfo = {};
    const datetime = new Date().toISOString().replace(/:/g, ".");
    
    for (const scenario of config.scenarios) {
        const beforeImageFile = `./screenshots/${scenario.before}`;
        const afterImageFile = `./screenshots/${scenario.after}`;

        if (fs.existsSync(beforeImageFile) && fs.existsSync(afterImageFile)) {
            try {
                const data = await compareImages(
                    fs.readFileSync(beforeImageFile),
                    fs.readFileSync(afterImageFile),
                    config.options
                );

                resultInfo[scenario.label] = {
                    isSameDimensions: data.isSameDimensions,
                    dimensionDifference: data.dimensionDifference,
                    rawMisMatchPercentage: data.rawMisMatchPercentage,
                    misMatchPercentage: data.misMatchPercentage,
                    diffBounds: data.diffBounds,
                    analysisTime: data.analysisTime
                };
                if (!fs.existsSync(`./results/${datetime}`)){
                    fs.mkdirSync(`./results/${datetime}`, { recursive: true });
                }
                const sanitizedLabel = sanitizeFileName(scenario.label);
                fs.writeFileSync(`./results/${datetime}/compare-${sanitizedLabel}.png`, data.getBuffer());
            } catch (error) {
                console.error(`Error al comparar imágenes para el escenario "${scenario.label}":`, error);
            }
        } else {
            console.error(`Los screenshots antes y después para el escenario "${scenario.label}" no existen.`);
        }
    }

    fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, config.scenarios));
    fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);
    console.log('------------------------------------------------------------------------------------')
    console.log("Ejecución finalizada. Verifica el informe en la carpeta de resultados", resultInfo);
    return resultInfo;
}

(async () => console.log(await executeTest()))();
