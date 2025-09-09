
// ----------------------------------------------------------------------
// 1. Funciones javascript a usar con solo archivos GeoJSON
// ----------------------------------------------------------------------

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para calcular la linea de regresion lineal a partir de los resultados
// obtenidos en la funcion getAllCoordinatesAsArray
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * Calcula la línea de regresión lineal y devuelve sus coordenadas para graficarla.
 * @param {Array<Object>} coordinates - Un array de objetos con pares { x, y }.
 * @returns {Object} Un objeto que contiene las propiedades 'm' (pendiente), 'b' (intercepto) y 'line' (coordenadas para la gráfica).
 */
function calculateLinearRegressionAndLine(coordinates) {
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    let n = coordinates.length;

    if (n === 0) {
        return { m: 0, b: 0, line: [] };
    }

    coordinates.forEach(point => {
        sumX += point.x;
        sumY += point.y;
        sumXY += point.x * point.y;
        sumXX += point.x * point.x;
    });

    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const b = (sumY / n) - (m * sumX / n);

    // Obtener los puntos inicial y final para graficar la línea
    const firstPoint = coordinates[0];
    const lastPoint = coordinates[n - 1];

    const line = [];
    if (firstPoint && lastPoint) {
        const x1 = firstPoint.x;
        const y1 = m * x1 + b;
        const x2 = lastPoint.x;
        const y2 = m * x2 + b;

        line.push({ x: x1, y: y1 });
        line.push({ x: x2, y: y2 });
    }

    return { m: m, b: b, line: line };
}
// ----------------------------------------------------------------------
// Ejemplo de uso:
// 1. Obtén el array de coordenadas usando la función anterior.
//    (Asegúrate de haber ordenado las coordenadas primero)
// const allRegressionCoordinates = [
//  { x: 10, y: 15 },
//  { x: 20, y: 30 },
//  { x: 30, y: 32 },
//  { x: 40, y: 45 },
//  { x: 50, y: 55 }
// ];
// 2. Llama a la función de regresión
// const regressionLine = calculateLinearRegression(allRegressionCoordinates);
// console.log('Parámetros de la línea de regresión:');
// console.log('Pendiente (m):', regressionLine.m);
// console.log('Intercepto (b):', regressionLine.b);
// La ecuación de la línea de regresión es: y = mx + b
// console.log(`Ecuación: y = ${regressionLine.m.toFixed(2)}x + ${regressionLine.b.toFixed(2)}`);



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para Obtener una funcion de regresion lineal
// con multiples archivos geojson con todas las Coordenadas en un Array Simple
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ejemplo de uso:
// Suponiendo que 'json_PrimesVelo1030' contiene 'NTotal' y 'json_SchaerbeekDemographicDistribution' contiene 'Pop1030_Population'.
// Ambos archivos deben tener una propiedad común como 'BlockParcel' o 'Quartier' para emparejar.
// NOTA: Para este ejemplo, usaremos 'Quartier' como propiedad de referencia.

//const regressionData = getAllCoordinatesAsArray(
//  json_SchaerbeekDemographicDistributionHouse, // Primer archivo (eje X)
//  json_SchaerbeekDemographicDistribution,  // Segundo archivo (eje Y)
//  'Pop1030_Menages1030',   // Propiedad para el eje X
//  'Pop1030_Population',   // Propiedad para el eje Y
//  'BlockParcel' // Propiedad de referencia para agrupar y emparejar
//);
// Muestra el resultado final
// console.log(regressionData);

/**
 * Recopila todos los pares de coordenadas (x, y) de dos archivos en un único array.
 * @param {Object} dataX - El primer conjunto de datos (para el eje X).
 * @param {Object} dataY - El segundo conjunto de datos (para el eje Y).
 * @param {string} xAxisProperty - La propiedad para el eje X.
 * @param {string} yAxisProperty - La propiedad para el eje Y.
 * @param {string} referenceProperty - La propiedad común usada para emparejar los datos.
 * @returns {Array<Array<number>>} Un array de arrays, donde cada array interno es un par [x, y].
 */
function getAllCoordinatesAsArray(dataX, dataY, xAxisProperty, yAxisProperty, referenceProperty) {
    const allCoordinates = [];
    const xValuesMap = {};

    // 1. Recorre el primer archivo para mapear los valores de X
    if (dataX?.type === 'FeatureCollection' && Array.isArray(dataX?.features)) {
        dataX.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature?.properties?.[referenceProperty];
                    const xValue = subFeature?.properties?.[xAxisProperty];
                    if (refValue !== undefined && typeof xValue === 'number') {
                        xValuesMap[refValue] = xValue;
                    }
                });
            }
        });
    }

    // 2. Recorre el segundo archivo, empareja y crea el array de objetos
    if (dataY?.type === 'FeatureCollection' && Array.isArray(dataY?.features)) {
        dataY.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature?.properties?.[referenceProperty];
                    const yValue = subFeature?.properties?.[yAxisProperty];

                    if (xValuesMap.hasOwnProperty(refValue) && typeof yValue === 'number') {
                        const xValue = xValuesMap[refValue];

                        // Crea un objeto con claves descriptivas 'x' y 'y'
                        allCoordinates.push({ x: xValue, y: yValue });
                    }
                });
            }
        });
    }

    // 3. Ordena el array de coordenadas en base al valor de x
    allCoordinates.sort((a, b) => a.x - b.x);

    return allCoordinates;
}

function getAllCoordinatesAsArray_01(dataX, dataY, xAxisProperty, yAxisProperty, referenceProperty) {
    const allCoordinates = [];
    const xValuesMap = {};

    // 1. Recorre el primer archivo para mapear los valores de X por la propiedad de referencia
    if (dataX?.type === 'FeatureCollection' && Array.isArray(dataX?.features)) {
        dataX.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature?.properties?.[referenceProperty];
                    const xValue = subFeature?.properties?.[xAxisProperty];
                    if (refValue !== undefined && typeof xValue === 'number') {
                        xValuesMap[refValue] = xValue;
                    }
                });
            }
        });
    }

    // 2. Recorre el segundo archivo, empareja los valores y crea un array simple de coordenadas
    if (dataY?.type === 'FeatureCollection' && Array.isArray(dataY?.features)) {
        dataY.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature?.properties?.[referenceProperty];
                    const yValue = subFeature?.properties?.[yAxisProperty];

                    if (xValuesMap.hasOwnProperty(refValue) && typeof yValue === 'number') {
                        const xValue = xValuesMap[refValue];
                        allCoordinates.push([xValue, yValue]);
                    }
                });
            }
        });
    }
    return allCoordinates;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Regresion lineal a partir de multiples archivos geojson
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ejemplo de uso:
// Suponiendo que 'json_PrimesVelo1030' contiene 'NTotal' y 'json_SchaerbeekDemographicDistribution' contiene 'Pop1030_Population'.
// Ambos archivos deben tener una propiedad común como 'BlockParcel' o 'Quartier' para emparejar.
// NOTA: Para este ejemplo, usaremos 'Quartier' como propiedad de referencia.

//const regressionData = getCoordinatesFromMultipleFiles(
//  json_SchaerbeekDemographicDistributionHouse, // Primer archivo (eje X)
//  json_SchaerbeekDemographicDistribution,  // Segundo archivo (eje Y)
//  'Pop1030_Menages1030',   // Propiedad para el eje X
//  'Pop1030_Population',   // Propiedad para el eje Y
//  'BlockParcel' // Propiedad de referencia para agrupar y emparejar
//);
// Muestra el resultado final
// console.log(regressionData);

/**
 * Genera pares de coordenadas (x, y) para una regresión lineal a partir de dos archivos.
 * * @param {Object} dataX - El primer conjunto de datos (para el eje X).
 * @param {Object} dataY - El segundo conjunto de datos (para el eje Y).
 * @param {string} xAxisProperty - El nombre de la propiedad para el eje X.
 * @param {string} yAxisProperty - El nombre de la propiedad para el eje Y.
 * @param {string} referenceProperty - La propiedad común usada para emparejar los datos.
 * @returns {Object} Un objeto con las coordenadas agrupadas por la propiedad de referencia.
 */
function getCoordinatesFromMultipleFiles(dataX, dataY, xAxisProperty, yAxisProperty, referenceProperty) {
    const coordinates = {};
    const xValuesMap = {};

    // 1. Recorre el primer archivo para mapear los valores de X por la propiedad de referencia
    if (dataX?.type === 'FeatureCollection' && Array.isArray(dataX?.features)) {
        dataX.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature?.properties?.[referenceProperty];
                    const xValue = subFeature?.properties?.[xAxisProperty];
                    if (refValue !== undefined && typeof xValue === 'number') {
                        xValuesMap[refValue] = xValue;
                    }
                });
            }
        });
    }

    // 2. Recorre el segundo archivo y empareja los valores con los datos de X
    if (dataY?.type === 'FeatureCollection' && Array.isArray(dataY?.features)) {
        dataY.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature?.properties?.[referenceProperty];
                    const yValue = subFeature?.properties?.[yAxisProperty];

                    // Si el valor de referencia existe en el mapa de X y el valor Y es numérico
                    if (xValuesMap.hasOwnProperty(refValue) && typeof yValue === 'number') {
                        const xValue = xValuesMap[refValue];

                        if (!coordinates[refValue]) {
                            coordinates[refValue] = [];
                        }
                        // Agrega el par de coordenadas [x, y]
                        coordinates[refValue].push([xValue, yValue]);
                    }
                });
            }
        });
    }
    return coordinates;
}




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Regresion lineal apartir de datos de un archivo geojson
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ejemplo de uso con el archivo 'SchaerbeekDemographicDistribution.js'
// Obtener las coordenadas para la regresión
//const regressionData = getCoordinatesForRegression(
//  json_SchaerbeekDemographicDistribution,
//  'Pop1030_Homme',
//  'Pop1030_Population',
//  'BlockParcel'
//);
// Imprime el resultado
//console.log(regressionData);

function getCoordinatesForRegression(data, xAxisProperty, yAxisProperty, referenceProperty) {
    const coordinates = {};

    if (data?.type === 'FeatureCollection' && Array.isArray(data?.features)) {
        data.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    const xValue = subFeature?.properties?.[xAxisProperty];
                    const yValue = subFeature?.properties?.[yAxisProperty];
                    const referenceValue = subFeature?.properties?.[referenceProperty];

                    // Verifica si los valores de las propiedades existen y son números
                    if (typeof xValue === 'number' && typeof yValue === 'number' && referenceValue !== undefined) {
                        if (!coordinates[referenceValue]) {
                            coordinates[referenceValue] = [];
                        }
                        // Agrega el par de coordenadas [x, y] al grupo correspondiente
                        coordinates[referenceValue].push([xValue, yValue]);
                    }
                });
            }
        });
    }
    return coordinates;
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para agrupar elementos en base a una Propiedad de Referencia 
// con detalles de propoiedades
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Ejemplo de uso con el archivo 'SchaerbeekDemographicDistribution.js'
// Propiedades de población que deseas incluir

// const populationDetails = ['Pop1030_Population', 'Pop1030_Femme', 'Pop1030_Homme'];
// Agrupar 'BlockParcel' por 'Quartier' e incluir los detalles de población
//const blockParcelsWithPopulation = groupValuesWithDetails(
//  json_SchaerbeekDemographicDistribution,
//  'Quartier',
//  'BlockParcel',
//  populationDetails
//);
// Muestra el resultado en la consola
// console.log(blockParcelsWithPopulation);

function groupValuesWithDetails(data, referenceProperty, valueProperty, detailProperties) {
    const groupedData = {};

    if (data?.type === 'FeatureCollection' && Array.isArray(data?.features)) {
        data.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    const referenceValue = subFeature?.properties?.[referenceProperty];
                    const value = subFeature?.properties?.[valueProperty];

                    if (referenceValue !== undefined && value !== undefined) {
                        if (!groupedData[referenceValue]) {
                            groupedData[referenceValue] = [];
                        }

                        // Crea un objeto para cada BlockParcel con sus propiedades de detalle
                        const blockParcelDetails = {
                            [valueProperty]: value
                        };

                        detailProperties.forEach(detailProp => {
                            blockParcelDetails[detailProp] = subFeature?.properties?.[detailProp] || 0;
                        });

                        groupedData[referenceValue].push(blockParcelDetails);
                    }
                });
            }
        });
    }
    return groupedData;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para agrupar elementos en base a una Propiedad de Referencia
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Ejemplo de uso con tu archivo 'SchaerbeekDemographicDistribution.js'
// 1. Llama a la función para agrupar los 'BlockParcel' por 'Quartier'
// const blockParcelsByQuartier = groupValuesByProperty(json_SchaerbeekDemographicDistribution,'Quartier','BlockParcel');
// 2. Muestra el resultado en la consola
// console.log(blockParcelsByQuartier);
function groupValuesByProperty(data, referenceProperty, valueProperty) {
    const groupedData = {};

    if (data?.type === 'FeatureCollection' && Array.isArray(data?.features)) {
        data.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    // Accede a los valores de forma segura
                    const referenceValue = subFeature?.properties?.[referenceProperty];
                    const value = subFeature?.properties?.[valueProperty];

                    // Agrupa los valores si existen y son válidos
                    if (referenceValue !== undefined && value !== undefined) {
                        // Si el barrio no existe en el objeto, lo crea con un array vacío
                        if (!groupedData[referenceValue]) {
                            groupedData[referenceValue] = [];
                        }
                        // Añade el BlockParcel al array del barrio correspondiente
                        groupedData[referenceValue].push(value);
                    }
                });
            }
        });
    }
    return groupedData;
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para Contar Valores Específicos por Propiedad de Referencia
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function countValuesByReference(data, referenceProperty, valueToCount) {
    const allReferenceValues = new Set();
    const allValueToCountValues = new Set();

    // Paso 1: Recorrer los datos para obtener todos los valores únicos
    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature.properties[referenceProperty];
                    const valToCount = subFeature.properties[valueToCount];
                    if (refValue !== undefined) allReferenceValues.add(refValue);
                    if (valToCount !== undefined) allValueToCountValues.add(valToCount);
                });
            }
        });
    }

    // Paso 2: Inicializar el objeto de conteo con 0s para todas las combinaciones
    const counts = { 'TotalData': 0 };
    allReferenceValues.forEach(refValue => {
        counts[refValue] = { 'Total': 0 };
        allValueToCountValues.forEach(valToCount => {
            counts[refValue][valToCount] = 0;
        });
    });

    // Paso 3: Recorrer los datos nuevamente para realizar el conteo
    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature.properties[referenceProperty];
                    const valToCount = subFeature.properties[valueToCount];

                    if (refValue !== undefined && valToCount !== undefined) {
                        counts[refValue][valToCount]++;
                        counts[refValue]['Total']++;
                        counts['TotalData']++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar elementos con una propiedad específica en un rango de años
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const startYear = 2021;
// const endYear = 2025;
//const countedByQuartierWithPrimes = countElementsWithSpecificPropertyByYearRange(json_PrimesVelo1030, 'Quartier', 'primes', startYear, endYear);
// console.log(`Recuento de 'primes' por 'Quartier' entre ${startYear} y ${endYear}:`, countedByQuartierWithPrimes);

function countElementsWithSpecificPropertyByYearRange(data, referenceProperty, detailProperty, startYear, endYear) {
    const counts = {
        'TotalData': 0
    };

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;
                    const referenceValue = subFeature.properties[referenceProperty];
                    const detailValue = subFeature.properties[detailProperty];

                    if (year >= startYear && year <= endYear && referenceValue !== undefined && detailValue !== undefined) {

                        if (!counts[referenceValue]) {
                            counts[referenceValue] = {
                                'Total': 0,
                                'Details': {}
                            };
                        }

                        // Incrementar el contador total y el general
                        counts[referenceValue]['Total']++;
                        counts['TotalData']++;

                        if (!counts[referenceValue]['Details'][detailValue]) {
                            counts[referenceValue]['Details'][detailValue] = 0;
                        }
                        counts[referenceValue]['Details'][detailValue]++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar elementos con una propiedad específica en un rango de años
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const startYear = 2021;
// const endYear = 2025;
// const countedByQuartierWithPrimes = countElementsWithDetails(json_PrimesVelo1030, 'Quartier', 'primes', startYear, endYear);
// console.log(`Recuento de 'primes' por 'Quartier' entre ${startYear} y ${endYear}:`, countedByQuartierWithPrimes);

function countElementsWithDetails(data, referenceProperty, detailProperty, startYear, endYear) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;
                    const referenceValue = subFeature.properties[referenceProperty];
                    const detailValue = subFeature.properties[detailProperty];

                    // Filtrar por rango de año y verificar la existencia de propiedades
                    if (year >= startYear && year <= endYear && referenceValue !== undefined && detailValue !== undefined) {

                        // Inicializar el objeto para el valor de referencia si no existe
                        if (!counts[referenceValue]) {
                            counts[referenceValue] = {
                                'Total': 0,
                                'Details': {}
                            };
                        }

                        // Incrementar el contador total
                        counts[referenceValue]['Total']++;

                        // Inicializar y/o incrementar el contador para el valor de detalle
                        if (!counts[referenceValue]['Details'][detailValue]) {
                            counts[referenceValue]['Details'][detailValue] = 0;
                        }
                        counts[referenceValue]['Details'][detailValue]++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar elementos con una propiedad específica en un rango de años
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//const startYear = 2021;
// const endYear = 2025;
// const countedByQuartierWithPrimes = countElementsWithSpecificPropertyByYearRange(json_PrimesVelo1030, 'Quartier', 'primes', startYear, endYear);
// console.log(`Recuento de 'primes' por 'Quartier' entre ${startYear} y ${endYear}:`, countedByQuartierWithPrimes);

function countElementsWithSpecificPropertyByYearRange_OLD(data, referenceProperty, detailProperty, startYear, endYear) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;
                    const referenceValue = subFeature.properties[referenceProperty];
                    const detailValue = subFeature.properties[detailProperty];

                    if (year >= startYear && year <= endYear && referenceValue !== undefined && detailValue !== undefined) {
                        // Inicializar el objeto para el valor de referencia si no existe
                        if (!counts[referenceValue]) {
                            counts[referenceValue] = {
                                'Total': 0,
                                'Details': {}
                            };
                        }

                        // Incrementar el contador total
                        counts[referenceValue]['Total']++;

                        // Inicializar y/o incrementar el contador para el valor de detalle
                        if (!counts[referenceValue]['Details'][detailValue]) {
                            counts[referenceValue]['Details'][detailValue] = 0;
                        }
                        counts[referenceValue]['Details'][detailValue]++;
                    }
                });
            }
        });
    }
    return counts;
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para Contar y Desglosar Elementos
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const countedByYearWithQuartier = countElementsWithDetails(json_PrimesVelo1030, 'year', 'Quartier');
// console.log('Recuento por año con desglose de barrios:', countedByYearWithQuartier);
// Ejemplo de salida para un año:
/*
{
  "2021": {
    "Total": 150,
    "Details": {
      "Helmet-Hamoir": 30,
      "Terdelt-Fleur": 45,
      "Bienfaiteurs": 75
    }
  },
  "2022": { ... }
}
*/

function countElementsWithDetails_02(data, referenceProperty, detailProperty) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const referenceValue = subFeature.properties[referenceProperty];
                    const detailValue = subFeature.properties[detailProperty];

                    if (referenceValue !== undefined && detailValue !== undefined) {
                        // Inicializar el objeto para el valor de referencia si no existe
                        if (!counts[referenceValue]) {
                            counts[referenceValue] = {
                                'Total': 0,
                                'Details': {}
                            };
                        }

                        // Incrementar el contador total
                        counts[referenceValue]['Total']++;

                        // Inicializar y/o incrementar el contador para el valor de detalle
                        if (!counts[referenceValue]['Details'][detailValue]) {
                            counts[referenceValue]['Details'][detailValue] = 0;
                        }
                        counts[referenceValue]['Details'][detailValue]++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para Contar Valores Específicos por Propiedad de Referencia
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// a. Contar los tipos de 'primes' por 'Quartier'
// const primesByQuartier = countValuesByReference(json_PrimesVelo1030, 'Quartier', 'primes');
// console.log('Tipos de primes por barrio con total:', primesByQuartier);
//
// Ejemplo de salida para "Helmet-Hamoir":
// "Helmet-Hamoir": { "TotalData": 52, "VAE": 30, "cargo": 10, "Prime vélo électrique": 18 }

function countValuesByReference_00(data, referenceProperty, valueToCount) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const referenceValue = subFeature.properties[referenceProperty];
                    const valueCounted = subFeature.properties[valueToCount];

                    if (referenceValue !== undefined && valueCounted !== undefined) {
                        // Inicializar el objeto para la propiedad de referencia si no existe
                        if (!counts[referenceValue]) {
                            counts[referenceValue] = {
                                TotalData: 0
                            };
                        }
                        // Inicializar el contador para el valor específico si no existe
                        if (!counts[referenceValue][valueCounted]) {
                            counts[referenceValue][valueCounted] = 0;
                        }

                        // Incrementar el contador específico y el total
                        counts[referenceValue][valueCounted]++;
                        counts[referenceValue].TotalData++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar elementos con una propiedad específica
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Contar elementos por 'year' que tienen una propiedad 'Quartier'
// const countedByYearWithQuartier = countElementsWithSpecificProperty(json_PrimesVelo1030, 'year', 'Quartier');
// console.log('Recuento de elementos por año con propiedad Quartier:', countedByYearWithQuartier);

function countElementsWithSpecificProperty(data, referenceProperty, specificProperty) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const referenceValue = subFeature.properties[referenceProperty];

                    if (referenceValue !== undefined && subFeature.properties[specificProperty] !== undefined) {
                        if (!counts[referenceValue]) {
                            counts[referenceValue] = 0;
                        }
                        counts[referenceValue]++;
                    }
                });
            }
        });
    }
    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para sumar los valores de cualquier 
// propiedad numérica basándose en cualquier otra propiedad de referencia.
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// a. Sumar 'NTotal' por 'year'
// -------------
// const sumNTotalByYear = sumValuesByProperty(json_PrimesVelo1030, 'year', 'NTotal');
//console.log('Suma de NTotal por año:', sumNTotalByYear);
// b. Sumar 'NTotal' por tipo de 'primes'
// -------------
// const sumNTotalByPrimes = sumValuesByProperty(json_PrimesVelo1030, 'primes', 'NTotal');
// console.log('Suma de NTotal por tipo de prime:', sumNTotalByPrimes);
// c. Sumar 'NTotal' por 'Quartier'
// -------------
// const sumNTotalByQuartier = sumValuesByProperty(json_PrimesVelo1030, 'Quartier', 'NTotal');
// console.log('Suma de NTotal por barrio:', sumNTotalByQuartier);

function sumValuesByProperty(data, referenceProperty, valueProperty) {
    const totals = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const referenceValue = subFeature.properties[referenceProperty];
                    const valueToSum = subFeature.properties[valueProperty];

                    // Verifica que ambas propiedades existan y que el valor a sumar sea un número
                    if (referenceValue !== undefined && typeof valueToSum === 'number') {
                        if (!totals[referenceValue]) {
                            totals[referenceValue] = 0;
                        }
                        totals[referenceValue] += valueToSum;
                    }
                });
            }
        });
    }
    return totals;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para sumar todos los valores de una propiedad específica
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Sumar todos los valores de 'NTotal'
// const totalNTotal = sumAllValues(json_PrimesVelo1030, 'NTotal');
// console.log('Suma total de NTotal:', totalNTotal);

function sumAllValues(data, valueProperty) {
    let totalSum = 0;

    if (data?.type === 'FeatureCollection' && Array.isArray(data?.features)) {
        data.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    const valueToSum = subFeature?.properties?.[valueProperty];

                    if (typeof valueToSum === 'number') {
                        totalSum += valueToSum;
                    }
                });
            }
        });
    }
    return totalSum;
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para Sumar Valores de una Propiedad Específica
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Ejemplo de uso con el archivo 'Primes1030_DSD_Velos_en2.js'
// Sumar todos los valores de 'NTotal' para el barrio 'Cerisiers'
// const totalNTotalForCerisiers = sumSpecificValuesByProperty(json_PrimesVelo1030, 'Quartier', 'NTotal', 'Cerisiers');
//console.log(`Suma total de 'NTotal' para el barrio 'Cerisiers': ${totalNTotalForCerisiers}`);

function sumSpecificValuesByProperty(data, referenceProperty, valueProperty, specificValue) {
    let totalSum = 0;

    if (data?.type === 'FeatureCollection' && Array.isArray(data?.features)) {
        data.features.forEach(feature => {
            if (feature?.type === 'FeatureCollection' && Array.isArray(feature?.features)) {
                feature.features.forEach(subFeature => {
                    const refValue = subFeature?.properties?.[referenceProperty];
                    const valueToSum = subFeature?.properties?.[valueProperty];

                    // Comprueba si la propiedad de referencia coincide con el valor específico y si el valor a sumar es un número.
                    if (refValue === specificValue && typeof valueToSum === 'number') {
                        totalSum += valueToSum;
                    }
                });
            }
        });
    }
    return totalSum;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para obtener valores únicos de una propiedad específica
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// a.
// const uniqueYears2 = getUniqueValues(json_PrimesVelo1030, 'year');
// console.log('Años únicos:', uniqueYears2);
// b.
// const uniquePrimes = getUniqueValues(json_PrimesVelo1030, 'primes');
// console.log('Tipos de primes únicos:', uniquePrimes);
// c.
// const uniqueQuartiers = getUniqueValues(json_PrimesVelo1030, 'Quartier');
// console.log('Barrios únicos:', uniqueQuartiers);

function getUniqueValues(data, propertyName) {
    const uniqueValues = new Set();

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    // Verifica si la propiedad existe en el objeto
                    if (subFeature.properties && subFeature.properties[propertyName]) {
                        uniqueValues.add(subFeature.properties[propertyName]);
                    }
                });
            }
        });
    }

    // Convierte el Set a un array y lo ordena
    return Array.from(uniqueValues).sort();
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar IDs por rango de años
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const startYear = 2021;
// const endYear = 2022;
// const countForRange = countIdsByYearRange(json_PrimesVelo1030, startYear, endYear);
// console.log(`Número de IDs entre el ${startYear} y el ${endYear}: ${countForRange}`);

function countIdsByYearRange(data, startYear, endYear) {
    let count = 0;

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            // Navegar a través de la FeatureCollection anidada
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;

                    // Verificar si el objeto tiene un 'id' y si el 'year' está dentro del rango especificado
                    if (subFeature.properties && subFeature.properties.id && year >= startYear && year <= endYear) {
                        count++;
                    }
                });
            }
        });
    }
    return count;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar IDs para un año específico
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const countFor2025 = countIdsBySpecificYear(json_PrimesVelo1030, 2025);
// console.log(`Número de IDs para el año 2025: ${countFor2025}`);

function countIdsBySpecificYear(data, yearToCount) {
    let count = 0;

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            // Navegar a través de la FeatureCollection anidada
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;

                    // Verifica si el objeto tiene un 'id' y si el 'year' coincide con el deseado
                    if (subFeature.properties && subFeature.properties.id && year === yearToCount) {
                        count++;
                    }
                });
            }
        });
    }
    return count;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para contar IDs por año
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const idCounts = countIdsByYear(json_PrimesVelo1030);
// console.log('Número de IDs por año:', idCounts);

function countIdsByYear(data) {
    const counts = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            // Navegar a través de la FeatureCollection anidada
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;

                    if (year && subFeature.properties.id) {
                        // Si el año aún no está en el objeto, inicialízalo en 0
                        if (!counts[year]) {
                            counts[year] = 0;
                        }
                        // Incrementa el contador para ese año
                        counts[year]++;
                    }
                });
            }
        });
    }

    return counts;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para crear conjuntos de datos por año
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const datasetsByYear = createDatasetsByYear(json_PrimesVelo1030);
// console.log('Datos del año 2025:', datasetsByYear[2025]);

function createDatasetsByYear(data) {
    const datasets = {};

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            // Accede a las características anidadas que contienen los datos
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    const year = subFeature.properties.year;

                    // Verifica que el objeto tenga un 'id' y un 'year'
                    if (subFeature.properties && subFeature.properties.id && year) {
                        if (!datasets[year]) {
                            datasets[year] = [];
                        }
                        datasets[year].push(subFeature);
                    }
                });
            }
        });
    }

    return datasets;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Función para obtener años únicos
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const uniqueYears = getUniqueYears(json_PrimesVelo1030); >> Para ver el resultado en la consola
// console.log('Años únicos encontrados:', uniqueYears); >> Para acceder a los datos de un año específico, por ejemplo 2025:

function getUniqueYears(data) {
    const years = new Set();

    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        data.features.forEach(feature => {
            // Como el archivo tiene una FeatureCollection anidada, se debe iterar sobre sus 'features' internas
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    if (subFeature.properties && subFeature.properties.year) {
                        years.add(subFeature.properties.year);
                    }
                });
            }
        });
    }

    // Convierte el Set a un array y lo ordena para una mejor presentación
    return Array.from(years).sort();
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Función para contar IDs en los datos
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const numberOfIds = countIds(json_PrimesVelo1030);
// console.log(`El número total de IDs es: ${numberOfIds}`);

function countIds(data) {
    let count = 0;
    // Comprueba si el objeto es un FeatureCollection
    if (data.type === 'FeatureCollection' && Array.isArray(data.features)) {
        // Itera sobre las características de la colección principal
        data.features.forEach(feature => {
            // Si la característica es a su vez una FeatureCollection, itera sobre sus características
            if (feature.type === 'FeatureCollection' && Array.isArray(feature.features)) {
                feature.features.forEach(subFeature => {
                    // Si la característica tiene una propiedad 'id', incrementa el contador
                    if (subFeature.properties && subFeature.properties.id) {
                        count++;
                    }
                });
            } else if (feature.properties && feature.properties.id) {
                // Si la característica tiene una propiedad 'id', incrementa el contador
                count++;
            }
        });
    }
    return count;
}