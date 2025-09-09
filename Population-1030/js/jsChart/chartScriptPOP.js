// Defaults
Chart.defaults.color = '#444'; //'#ffff';
Chart.defaults.borderColor = '#444'; '#ffff';
Chart.defaults.font.size = 12;
Chart.defaults.font.family = 'Verdana';

// -----------------------------------------------------------
// 1. Funciones de renderizado de gráficos
// -----------------------------------------------------------

// 1.1. Gráfico de barras por quartier
function QuartersBubblesPopFamChart(uniqueQuartiers, datasetsBienfaiteurs, datasetsCerisiers, datasetsColignon,
    datasetsCoteauxJosaphat, datasetsHelmetHamoir, datasetsJardin, datasetsLinthout, datasetsNord,
    datasetsPalaisReine, datasetsParcJosaphat, datasetsPlasky, datasetsReyers, datasetsTerdeltFleur, XYregressionLinear, id) {

    const data = {
        datasets: [
            {
                label: uniqueQuartiers[0],
                data: datasetsBienfaiteurs,
                backgroundColor: styles.color.alphas[0], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[0], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsBienfaiteurs.map(item => item.z),
                pointHoverRadius: 15, // Rayon visuel agrandi lors du survol
            },
            {
                label: uniqueQuartiers[1],
                data: datasetsCerisiers,
                backgroundColor: styles.color.alphas[1], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[1], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsCerisiers.map(item => item.z),
            },
            {
                label: uniqueQuartiers[2],
                data: datasetsColignon,
                backgroundColor: styles.color.alphas[2], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[2], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsColignon.map(item => item.z),
            },
            {
                label: uniqueQuartiers[3],
                data: datasetsCoteauxJosaphat,
                backgroundColor: styles.color.alphas[3], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[3], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsCoteauxJosaphat.map(item => item.z),
            },

            {
                label: uniqueQuartiers[4],
                data: datasetsHelmetHamoir,
                backgroundColor: styles.color.alphas[4], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[4], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsHelmetHamoir.map(item => item.z),
            },
            {
                label: uniqueQuartiers[5],
                data: datasetsJardin,
                backgroundColor: styles.color.alphas[5], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[5], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsJardin.map(item => item.z),
            },
            {
                label: uniqueQuartiers[6],
                data: datasetsLinthout,
                backgroundColor: styles.color.alphas[6], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[6], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsLinthout.map(item => item.z),
            },
            {
                label: uniqueQuartiers[7],
                data: datasetsNord,
                backgroundColor: styles.color.alphas[7], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[7], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsNord.map(item => item.z),
            },

            {
                label: uniqueQuartiers[8],
                data: datasetsPalaisReine,
                backgroundColor: styles.color.alphas[8], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[8], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsPalaisReine.map(item => item.z),
            },
            {
                label: uniqueQuartiers[9],
                data: datasetsParcJosaphat,
                backgroundColor: styles.color.alphas[9], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[9], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsParcJosaphat.map(item => item.z),
            },
            {
                label: uniqueQuartiers[10],
                data: datasetsPlasky,
                backgroundColor: styles.color.alphas[10], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[10], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsPlasky.map(item => item.z),
            },
            {
                label: uniqueQuartiers[11],
                data: datasetsReyers,
                backgroundColor: styles.color.alphas[11], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[11], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsReyers.map(item => item.r) * 10,
            },

            {
                label: uniqueQuartiers[12],
                data: datasetsTerdeltFleur,
                backgroundColor: styles.color.alphas[12], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[12], //styles.color.solids.map(eachColor => eachColor),
                //radius: datasetsTerdeltFleur.map(item => item.r),
            },
            {
                type: 'line',
                label: 'régression linéaire',
                data: XYregressionLinear,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderColor: 'rgba(0, 0, 0, 0.7)',
                borderWidth: 1,
                fill: false,
                pointRadius: 0,
                tension: 0.1
            },
        ],
    };

    const options = {
        //responsive: false,
        elements: {
            point: {
                borderWidth: 2,
                hoverBorderWidth: 3, // Ancho del trazo cuando se pasa el cursor sobre él.
                pointHoverRadius: 20, // Rayon visuel agrandi lors du survol,
                pointStyle: 'rectRounded', // 'cross', 'crossRot', 'dash', "line", 'rect', 'rectRounded', 'rectRot', 'star', 'triangle', 
                hitRadius: 10,
                radius: function (context) {
                    var value = context.dataset.data[context.dataIndex];
                    var size = context.chart.width;
                    var base = Math.abs(value.v) / 10;
                    var rFinal = (size / 50) * base;
                    //console.log(rFinal)
                    return rFinal;
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        // Calcula el radio de la burbuja
                        const radius = context.dataset.data[context.dataIndex].r;
                        // Devuelve el tamaño deseado (por ejemplo, el radio multiplicado por un factor)
                        //return `${context.raw.quartier}, Pop: ${context.raw.x}, Mén: ${context.raw.y}, Rel: ${context.raw.r}`;
                        return `${context.raw.quartier}, ${context.raw.block}, Pop: ${context.raw.x}, Mén: ${context.raw.y.toFixed(0)}, Rel: ${context.raw.v.toFixed(2)}`;
                    }
                }
            },
            legend: { position: 'right', labels: { font: { size: 10 } }, position: 'right', padding: 0 },
            title: { display: true },
        },
        aspectRatio: 5 / 3,
        layout: {
            padding: 16
        },
        scales: {
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'total ménages'
                },
            },
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'total habitants'
                },
            },
        },
        maintainAspectRatio: false,
        scaleFontColor: Chart.defaults.color,
    };

    new Chart(id, { type: 'bubble', data, options });
}

function QuartersBarPopulationChart(labelsDownward, dataValuesPop, dataValuesMen, dataValuesWomen, id) {
    const data = {
        labels: labelsDownward,
        datasets: [
            {
                label: 'population de Schaerbeek',
                data: dataValuesPop,
                tension: 0.5,
                backgroundColor: styles.color.alphas[0], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[0], //styles.color.solids.map(eachColor => eachColor),
                borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'hommes',
                data: dataValuesMen,
                backgroundColor: styles.color.alphas[2],
                borderColor: styles.color.solids[2],
                borderWidth: 1,
                barPercentage: 0.9
            },

            {
                type: 'bar',
                label: 'femmes',
                data: dataValuesWomen,
                backgroundColor: styles.color.alphas[3],
                borderColor: styles.color.solids[3],
                borderWidth: 1,
                barPercentage: 0.9
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
            }
        },
        scales: {
            x: {
                display: true,
                title: { display: true },
                stacked: true,
                padding: 0,
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'total habitants'
                },
                beginAtZero: true, //min: 0, //suggestedMin
                max: 20000, // suggestedMax
                stepSize: 5000,
                padding: 0,
                stacked: 'single',
                grid: { drawOnChartArea: true, },
                ticks: {
                    stepSize: 5000
                },
                stacked: true,
            },
        },
        maintainAspectRatio: false,
        scaleFontColor: Chart.defaults.color,
    };

    new Chart(id, { type: 'line', data, options });
}

function QuartersBarHouseChart(labelsDownward, dataValuesHouse, dataValuesChefMen, dataValuesChefWomen, id) {
    const data = {
        labels: labelsDownward,
        datasets: [
            {
                label: 'ménages à Schaerbeek',
                data: dataValuesHouse,
                tension: 0.5,
                backgroundColor: styles.color.alphas[0], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[0], //styles.color.solids.map(eachColor => eachColor),
                borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'chef de menages hommes',
                data: dataValuesChefMen,
                backgroundColor: styles.color.alphas[2],
                borderColor: styles.color.solids[2],
                borderWidth: 1,
                barPercentage: 0.9
            },

            {
                type: 'bar',
                label: 'chef de menages femmes',
                data: dataValuesChefWomen,
                backgroundColor: styles.color.alphas[3],
                borderColor: styles.color.solids[3],
                borderWidth: 1,
                barPercentage: 0.9
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
            }
        },
        scales: {
            x: {
                display: true,
                title: { display: true },
                stacked: true,
                padding: 0,
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'total habitants'
                },
                beginAtZero: true, //min: 0, //suggestedMin
                max: 8000, // suggestedMax
                stepSize: 2000,
                padding: 0,
                stacked: 'single',
                grid: { drawOnChartArea: true, },
                ticks: {
                    stepSize: 2000
                },
                stacked: true,
            },
        },
        maintainAspectRatio: false,
        scaleFontColor: Chart.defaults.color,
    };

    new Chart(id, { type: 'line', data, options });

}

function QuartersBarHouseChart2(labelsDownward, dataValuesHouse, dataValuesPop, densityPopulationByQuartier, id) {
    const data = {
        labels: labelsDownward,
        datasets: [
            {
                label: 'ménages',
                type: 'line',
                tension: 0.25,
                data: dataValuesHouse,
                backgroundColor: styles.color.alphas[5], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[5], //styles.color.solids.map(eachColor => eachColor),
                borderWidth: 2,
                yAxisID: 'y',
            },
            {
                label: 'population',
                type: 'bar',
                data: dataValuesPop,
                backgroundColor: styles.color.alphas[0], // styles.color.alphas.map(eachColor => eachColor),
                borderColor: styles.color.solids[0], //styles.color.solids.map(eachColor => eachColor),
                borderWidth: 2,
                yAxisID: 'y',
            },
            {
                type: 'bar',
                label: 'densité (hab/km²)',
                data: densityPopulationByQuartier,
                backgroundColor: styles.color.alphas[2],
                borderColor: styles.color.solids[2],
                borderWidth: 2,
                yAxisID: 'y1',
            },
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        scales: {
            x: {
                display: true,
                title: { display: true },
                //stacked: true,
                padding: 0,
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'total habitants'
                },
                beginAtZero: true, //min: 0, //suggestedMin
                max: 20000, // suggestedMax
                stepSize: 5000,
                padding: 0,
                stacked: 'single',
                grid: { drawOnChartArea: true, },
                ticks: {
                    stepSize: 5000
                },
                stacked: true,
            },
            y1: {
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'densité (hab/km²)'
                },
                beginAtZero: true, //min: 0, //suggestedMin
                max: 35000, // suggestedMax
                stepSize: 5000,
                padding: 0,
                stacked: 'single',
                grid: { drawOnChartArea: true, },
                ticks: {
                    stepSize: 5000
                },
                stacked: true,
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
        },
    };

    new Chart(id, { type: 'line', data, options });

}

// 1.3. Gráfico de radar
function heightRadarChart(labelsData, dataValues, id) {

    const data = {
        labels: labelsData,
        datasets: [{
            label: 'hab/km²',
            data: dataValues,
            borderColor: styles.color.solids.map(eachColor => eachColor),
            backgroundColor: styles.color.alphas.map(eachColor => eachColor),
            borderWidth: 1
        }]
    };


    // Configuración base del plugin de etiquetas de datos
    const datalabelsBaseConfig = {
        color: '#000000ff',
        font: {
            family: 'Verdana',
            weight: 'light',
            size: 12,
        },
        align: 'right', //center, start, end, right, bottom, left, top
        anchor: 'end', // 'end', 'start', 'center'
        offset: 3,
        rotation: 15,
        display: 'auto',
        //clamp: false,
        formatter: (value) => new Intl.NumberFormat().format(Math.abs(value).toFixed(2)),
    };

    // Aplica la configuración base y la específica a cada dataset
    data.datasets.forEach(dataset => {
        dataset.datalabels = { ...datalabelsBaseConfig, ...dataset.datalabels };
    });

    const options = {
        indexAxis: 'y',
        startAngle: 45,
        elements: {
            point: {
                radius: 3,
                backgroundColor: styles.color.solids[0],
                borderColor: styles.color.alphas[0],
                borderWidth: 2
            }
        },
        plugins: {
            legend: { display: false, labels: { font: { size: 10 } }, position: 'right', padding: 0 },
            title: { display: false, text: data.datasets[0].label },
            datalabels: {} // Deja un objeto vacío para el plugin
        },
        scales: {
            r: {
                pointLabels: { color: 'black', font: { size: 10, weight: 'light' } },
                angleLines: { display: true, color: '#88888888', lineWidth: 0.3 },
                ticks: { display: false },
                grid: {
                    display: true, lineWidth: 0.3, tickMarkLength: 100 // Removes the circulair lines
                },
            }
        },
    };

    new Chart(id, { type: 'radar', data, options, plugins: [ChartDataLabels] });
    //new Chart(id, { type: 'polarArea', data, options, plugins: [ChartDataLabels] });
    //new Chart(id, { type: 'doughnut', data, options, plugins: [ChartDataLabels] });
}

function QuartersDensitePop(labelsData, dataValues, id) {

    const data = {
        labels: labelsData,
        datasets: [{
            // label: 'hab/km²',
            data: dataValues,
            borderColor: styles.color.solids.map(eachColor => eachColor),
            backgroundColor: styles.color.alphas.map(eachColor => eachColor),
            borderWidth: 1
        }]
    };

    // Configuración base del plugin de etiquetas de datos
    const datalabelsBaseConfig = {
        color: '#000000ff',
        font: {
            size: 10,
        },
        align: 'center', //center, start, end, right, bottom, left, top
        anchor: 'center', // 'end', 'start', 'center'
        offset: 0,
        rotation: 10,
        display: 'auto',
        //clamp: false,
        formatter: (value) => new Intl.NumberFormat().format(Math.abs(value / 1000).toFixed(1)) + "K",
        /*
        formatter: (value) => {
            let sum = 0;
            let dataArr = data.datasets[0].data;
            dataArr.map(data => {
                sum += data;
            });
            let percentage = (value * 100 / sum).toFixed(2) + "%";
            return percentage;
        },
        */
    };

    // Aplica la configuración base y la específica a cada dataset
    data.datasets.forEach(dataset => {
        dataset.datalabels = { ...datalabelsBaseConfig, ...dataset.datalabels };
    });

    // Configuración base del plugin de etiquetas de datos
    const options = {
        borderRadius: 10,
        padding: 4,
        responsive: true,
        maintainAspectRatio: true,
        padding: 4,
        rotation: 45,
        tooltips: {
            enabled: false
        },
        plugins: {
            legend: {
                position: 'right',
                labels: { color: Chart.defaults.color },
                legend: { display: false, labels: { font: { size: 10 } }, position: 'right', padding: 0 },
                title: { display: false, text: data.datasets[0].label },
                datalabels: {} // Deja un objeto vacío para el plugin,
            },
        }
    };

    new Chart(id, { type: 'doughnut', data, options, plugins: [ChartDataLabels] });
    //new Chart(id, { type: 'pie', data, options, plugins: [ChartDataLabels] });
}

// 1.1. Gráfico de barras por Genero
function createOptimizedPopulationPyramid(id, labelsData, dataValuesWomen, dataValuesMen, options = {}) {
    const ctx = document.getElementById(id);
    // Verifica si el contexto del canvas es válido
    if (!ctx) {
        console.error(`El elemento con ID "${id}" no fue encontrado.`);
        return;
    }
    // data
    const dataValuesWomenN = dataValuesWomen.map(elemento => elemento * (-1));
    const data = {
        labels: labelsData,
        datasets: [
            {
                label: 'hommes',
                data: dataValuesMen,
                backgroundColor: styles.color.alphas[2],
                borderColor: styles.color.solids[2],
                borderWidth: 1,
                barPercentage: 1,
                barThickness: 25,
                datalabels: {
                    color: '#000',
                    anchor: 'end',
                    align: 'end',
                    formatter: (value) => new Intl.NumberFormat().format(value),
                    clamp: true // <- Esta es la propiedad que ajusta la etiqueta
                }
            },
            {
                label: 'femmes',
                data: dataValuesWomenN,
                backgroundColor: styles.color.alphas[3],
                borderColor: styles.color.solids[3],
                borderWidth: 1,
                barPercentage: 1,
                barThickness: 25,
                datalabels: {
                    color: '#000',
                    anchor: 'start',
                    align: 'start',
                    formatter: (value) => new Intl.NumberFormat().format(Math.abs(value)),
                    clamp: true // <- Esta es la propiedad que ajusta la etiqueta
                }
            }
        ]
    };

    // Encuentra el valor de datos absoluto máximo para establecer los límites del eje dinámicamente
    const maxDataValue = Math.max(
        ...data.datasets.flatMap(dataset => dataset.data.map(Math.abs))
    );
    const maxAxisValue = Math.ceil(maxDataValue * 1.3);

    // Configuración base del plugin de etiquetas de datos
    const datalabelsBaseConfig = {
        color: '#000',
        font: {
            family: 'Verdana',
            weight: 'light',
            size: 12,
        },
        align: 'center', //center, start, end, right, bottom, left, top
        anchor: 'center', // 'end', 'start', 'center'
        offset: 5,
        rotation: 0,
        display: 'auto',
        //clamp: false,
        formatter: (value) => new Intl.NumberFormat().format(Math.abs(value)),
    };

    // Aplica la configuración base y la específica a cada dataset
    data.datasets.forEach(dataset => {
        dataset.datalabels = { ...datalabelsBaseConfig, ...dataset.datalabels };
    });

    const defaultOptions = {
        indexAxis: 'y',
        responsive: true,
        scales: {
            x: {
                stacked: true,
                position: 'bottom',
                ticks: { callback: (value) => Math.abs(value), display: false, padding: 0, color: 'black' },
                title: { display: true, text: 'total habitants' },
                // Límites del eje calculados dinámicamente
                min: -maxAxisValue,
                max: maxAxisValue,
                grid: { display: false, drawOnChartArea: true, offset: true, color: '#d56408ff' },
                border: { display: true },
                display: true,
                color: 'red',
            },
            y: {
                stacked: true,
                title: { display: false, text: 'Grupo de Edad' },
                border: { display: true },
                ticks: { tickLength: 0, autoSkip: false, color: 'black', display: true, padding: 0 },
                stacked: true,
                grid: { display: false, drawOnChartArea: true, offset: false, color: '#ffffffff' },
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        label += new Intl.NumberFormat().format(Math.abs(context.parsed.x));
                        return label;
                    }
                }
            },
            title: {
                display: false,
                text: 'Pyramide de population'
            },
            legend: { display: true, labels: { font: { size: 10 } }, position: 'right', align: 'start', padding: 0 },
            datalabels: {} // Deja un objeto vacío para el plugin
        }
    };
    const finalOptions = Chart.helpers.merge(defaultOptions, options);

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: finalOptions,
        plugins: [ChartDataLabels]
    });
}

function createLabelsDataKPI_02(id, label01, data) {
    // Obtener el contexto del canvas
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');

    // Posición del texto
    const x = canvas.width / 2;
    const y1 = canvas.height / 3; // Posición para la primera línea
    const y2 = canvas.height / 3 * 1.9; // Posición para la segunda línea

    // Datos del KPI
    const kpiLabel = label01;
    const kpiValue = data;

    // Dibujar el KPI
    ctx.font = 'bold 50px Lexend Deca';
    ctx.fillStyle = 'rgba(21, 0, 255, 0.7)'; // Color oscuro para el texto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(kpiLabel, x, y1);

    ctx.font = 'bold 45px Lexend Deca';
    ctx.fillStyle = 'rgba(194, 34, 72, 0.7)'; // Color oscuro para el texto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(kpiValue, x, y2);
}

function createLabelsDataKPI_03(id, label01, label02, data) {
    // Obtener el contexto del canvas
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');

    // Posición del texto
    const x = canvas.width / 2;
    const y1 = canvas.height / 4; // Posición para la primera línea
    const y2 = canvas.height / 4 * 2; // Posición para la segunda línea
    const y3 = canvas.height / 4 * 3.2; // Posición para la tercera línea

    // Datos del KPI
    const kpiLabel01 = label01;
    const kpiLabel02 = label02;
    const kpiValue = data;

    // Dibujar el KPI
    ctx.font = 'bold 50px Lexend Deca';
    ctx.fillStyle = 'rgba(21, 0, 255, 0.7)'; // Color oscuro para el texto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(kpiLabel01, x, y1);

    // Dibujar el KPI
    ctx.font = 'bold 50px Lexend Deca';
    ctx.fillStyle = 'rgba(21, 0, 255, 0.7)'; // Color oscuro para el texto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(kpiLabel02, x, y2);

    ctx.font = 'bold 45px Lexend Deca';
    ctx.fillStyle = 'rgba(194, 34, 72, 0.7)'; // Color oscuro para el texto
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(kpiValue, x, y3);
}

// -----------------------------------------------------------
// 2. Función principal para orquestar la visualización
// -----------------------------------------------------------

const printCharts = () => {
    // Remove loading message, show chart panels 
    const DataALL = json_SchaerbeekDemographicDistribution;
    const Data011 = json_SchaerbeekDemographicDistributionHouse;
    const Data012 = json_SchaerbeekDemographicDistributionMen;
    const Data013 = json_SchaerbeekDemographicDistributionWomen;
    //console.log(DataALL);

    const { labelsDownward, dataValuesPop, dataValuesMen, dataValuesWomen, densityPopulationByQuartier,//DataALL
        dataValuesHouse, dataValuesChefMen, dataValuesChefWomen, //Data ALL
        labelsUpgrade, dataValuesPopPyram, dataValuesMenPyram, dataValuesWomenPyram, dataDensityPopPyram, //Data011
        sumTotalPopHommes, sumTotalPopFemmes, sumTotalPop, sumAreaTotal, densityPopulation1030, //KPI Population1030
        sumTotalHouse, sumTotalChefHommes, sumTotalChefFemmes, densityHouse //KPI Menages1030
    } = dataCharts_G01();
    //console.log('Labels ordenados:', labelsDownward)

    //  KPI Data
    createLabelsDataKPI_02('kpi001', 'population au RN', sumTotalPop);
    createLabelsDataKPI_02('kpi002', 'hommes au RN', sumTotalPopHommes);
    createLabelsDataKPI_02('kpi003', 'femmes au RN', sumTotalPopFemmes);
    createLabelsDataKPI_02('kpi004', 'surface schaerbeek (km²)', '8.721');
    createLabelsDataKPI_02('kpi005', 'îlots urbanistiques (km²)', sumAreaTotal.toFixed(3));
    createLabelsDataKPI_03('kpi006', 'densité de', 'population (hab/km²)', densityPopulation1030.toFixed(3));

    createLabelsDataKPI_02('kpi007', 'ménages dans le RN', sumTotalHouse);
    createLabelsDataKPI_02('kpi008', 'chefs de ménage hommes', sumTotalChefHommes);
    createLabelsDataKPI_02('kpi009', 'chefs de ménage femmes', sumTotalChefFemmes);
    createLabelsDataKPI_02('kpi010', 'îlots urbanistiques (km²)', sumAreaTotal.toFixed(3));
    createLabelsDataKPI_03('kpi011', 'densité de', 'ménages (men/km²)', densityHouse.toFixed(3));

    // Call each chart function passing the coasters and DOM Canvas tag ID to be rendered
    QuartersBarPopulationChart(labelsDownward, dataValuesPop, dataValuesMen, dataValuesWomen, 'chart020')
    QuartersBarHouseChart(labelsDownward, dataValuesHouse, dataValuesChefMen, dataValuesChefWomen, 'chart030')
    QuartersBarHouseChart2(labelsDownward, dataValuesHouse, dataValuesPop, densityPopulationByQuartier, 'chart050')
    //console.log(densityPopulationByQuartier)

    QuartersDensitePop(labelsUpgrade, dataDensityPopPyram, 'chart032')
    createOptimizedPopulationPyramid('chart031', labelsUpgrade, dataValuesWomenPyram, dataValuesMenPyram);

    //Schaerbeek >> pyramid population
    /*
        var Quartier = document.getElementById("featuresOptions");
        Quartier.addEventListener("change", function () {
            var valorSeleccionado = Quartier.value;
            console.log("El valor seleccionado es: " + valorSeleccionado);
    
            var textoSeleccionado = this.options[this.selectedIndex].text;
            console.log("El texto seleccionado es: " + textoSeleccionado);
        });
    */
    // Función para actualizar los datos de un gráfico existente
    const updateChartData = (chartId, data01, data02, label) => {
        const chart = Chart.getChart(chartId)
        const data01N = data01.map(elemento => elemento * (-1));
        chart.data.datasets[0].data = data01N
        chart.data.datasets[1].data = data02
        //chart.data.datasets[0].label = label
        chart.update()
    }

    document.querySelector('#featuresOptions').onchange = e => {
        const { value: property, text: label } = e.target.selectedOptions[0]
        //console.log(property, label)
        const { labelsAges, PopulationAgesHommes_Quartier, PopulationAgesFemmes_Quartier } = dataCharts_G02(label);
        //console.log(labelsAges)
        //console.log(PopulationAgesHommes_Quartier)
        //console.log(PopulationAgesFemmes_Quartier)

        const chart = Chart.getChart('chart022')
        chart.destroy()
        createOptimizedPopulationPyramid('chart022', labelsAges, PopulationAgesFemmes_Quartier, PopulationAgesHommes_Quartier);
    }

    const { labelsAges, PopulationAgesHommes_Quartier, PopulationAgesFemmes_Quartier,
        PopulationAgesHommes_Schaerbeek, PopulationAgesFemmes_Schaerbeek } = dataCharts_G02('Bienfaiteurs');
    options = { scales: { y: { title: { display: true, text: 'Grupo de Edad' }, }, }, }
    createOptimizedPopulationPyramid('chart021', labelsAges, PopulationAgesFemmes_Schaerbeek, PopulationAgesHommes_Schaerbeek);
    createOptimizedPopulationPyramid('chart022', labelsAges, PopulationAgesFemmes_Quartier, PopulationAgesHommes_Quartier);

    // Grafico bubble
    const {
        // Labels
        uniqueQuartiers, uniqueBlockParcel, uniqueBlockParcelQuartier,
        // datasets
        datasetsBienfaiteurs, datasetsCerisiers, datasetsColignon, datasetsCoteauxJosaphat, datasetsHelmetHamoir,
        datasetsJardin, datasetsLinthout, datasetsNord, datasetsPalaisReine, datasetsParcJosaphat,
        datasetsPlasky, datasetsReyers, datasetsTerdeltFleur,
        // regresion Data
        XYregressionLinear,
        // KPI Data
        sumTotal_0009, sumTotal_1019, sumTotal_2029, sumTotal_3039, sumTotal_4049, sumTotal_5059, sumTotal_6069, sumTotal_7099,
    } = dataCharts_G03();
    //console.log("valores de regresion lineal :", XYregressionLinear);

    //console.log(datasetsBienfaiteurs)
    QuartersBubblesPopFamChart(uniqueQuartiers, datasetsBienfaiteurs, datasetsCerisiers, datasetsColignon,
        datasetsCoteauxJosaphat, datasetsHelmetHamoir, datasetsJardin, datasetsLinthout, datasetsNord,
        datasetsPalaisReine, datasetsParcJosaphat, datasetsPlasky, datasetsReyers, datasetsTerdeltFleur, XYregressionLinear, chart060)

    // KPI Data
    createLabelsDataKPI_02('kpi012', '0 à 9 ans', sumTotal_0009);
    createLabelsDataKPI_02('kpi013', '10 à 19 ans', sumTotal_1019);
    createLabelsDataKPI_02('kpi014', '20 à 29 ans', sumTotal_2029);
    createLabelsDataKPI_02('kpi015', '30 à 39 ans', sumTotal_3039);
    createLabelsDataKPI_02('kpi016', '40 à 49 ans', sumTotal_4049);
    createLabelsDataKPI_02('kpi017', '50 à 59 ans', sumTotal_5059);
    createLabelsDataKPI_02('kpi018', '60 à 69 ans', sumTotal_6069);
    createLabelsDataKPI_02('kpi019', '70 ans et plus', sumTotal_7099);
}

// -----------------------------------------------------------
// 3. Ejecución del código al cargar la página
// -----------------------------------------------------------

// Se asegura de que el código se ejecute cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', printCharts);