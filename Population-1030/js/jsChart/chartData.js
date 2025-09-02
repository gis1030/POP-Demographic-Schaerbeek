function dataCharts_G01() {
    // All data
    const DataALL = json_SchaerbeekDemographicDistribution;
    const Data011 = json_SchaerbeekDemographicDistributionHouse;

    // DataALL >> json_SchaerbeekDemographicDistribution
    //-----------------------------------------------------------------------

    // label > Quartier List
    const uniqueQuartiers = getUniqueValues(DataALL, 'Quartier');

    // Datavalues > Total población por barrio
    const sumTotalPopByQuartier = sumValuesByProperty(DataALL, 'Quartier', 'Pop1030_Population');
    const sumTotalPopMenByQuartier = sumValuesByProperty(DataALL, 'Quartier', 'Pop1030_Homme');
    const sumTotalPopWomenByQuartier = sumValuesByProperty(DataALL, 'Quartier', 'Pop1030_Femme');

    // KPI Data
    const densityPopulationByQuartier = sumValuesByProperty(DataALL, 'Quartier', 'DensityPopulation (hab/km2)');
    const areaQuartier = sumValuesByProperty(DataALL, 'Quartier', 'BlockParcel.Area (km2)');
    const sumTotalPopHommes = sumAllValues(DataALL, 'Pop1030_Homme');
    const sumTotalPopFemmes = sumAllValues(DataALL, 'Pop1030_Femme');
    const sumTotalPop = sumAllValues(DataALL, 'Pop1030_Population');
    const sumAreaTotal = sumAllValues(DataALL, 'BlockParcel.Area (km2)');

    // Densite de la population a Schaerbeek par ilots urbanistiques
    var densityPopulation1030 = sumTotalPop / sumAreaTotal;

    // Calcula la densidad de población por barrio (hab/km2)
    var data01 = 0; var areaTotal = 0; var populationTotal = 0
    for (let i = 0; i < Object.keys(areaQuartier).length; i++) {
        const label = Object.keys(areaQuartier)[i];
        const area = areaQuartier[Object.keys(areaQuartier)[i]];
        if (sumTotalPopByQuartier[label] !== undefined) {
            data01 = sumTotalPopByQuartier[label] / area;
        } else {
            data01 = 0;
        }
        areaTotal += area;
        populationTotal += sumTotalPopByQuartier[label];
        densityPopulationByQuartier[Object.keys(densityPopulationByQuartier)[i]] = data01;
    }

    //console.log('Area de Schaerbeek:', areaTotal);
    //console.log('Población total de Schaerbeek:', populationTotal);
    //console.log('Densidad de población por barrio (hab/km2) - Calculada:', densityPopulationByQuartier);
    //console.log('Área de barrio (km2):', areaQuartier);
    //console.log('numero de quartier', Object.keys(areaQuartier).length)
    //console.log('nombre del barrio:', Object.keys(areaQuartier)[0])
    //console.log('area del barrio:', areaQuartier[Object.keys(areaQuartier)[0]])
    //console.log('total poblacion', sumTotalPopByQuartier['Bienfaiteurs'])
    //console.log('Suma de población total por barrio:', sumTotalPopByQuartier);
    //console.log('Suma de población masculina por barrio:', sumTotalPopMenByQuartier);
    //console.log('Suma de población femenina por barrio:', sumTotalPopWomenByQuartier);
    //console.log('Densidad de población por barrio (hab/km2):', densityPopulationByQuartier);

    // a. Ordena los valores de las etiquetas del eje-x (label) 
    // en funcion de los valores eje-y en orden descendente
    //==================================================
    const entradas01 = Object.entries(sumTotalPopByQuartier); // 1. Convertir a pares [clave, valor]
    const entradasOrdenadas01 = entradas01.sort((a, b) => b[1] - a[1]); // 2. Ordenar en orden descendente por el valor
    //console.log('Entradas ordenadas:', entradasOrdenadas);  // 3. Mostrar los resultados

    var labelsDownward = [];
    for (let i = 0; i < entradasOrdenadas01.length; i++) {
        const data00 = entradasOrdenadas01[i][0];
        labelsDownward[i] = data00;
    }
    //console.log('Labels ordenados:', labelsDownward);

    // a. Ordena los valores de las etiquetas del eje-x (label) 
    // en funcion de los valores eje-y en orden ascendente
    //==================================================
    const entradas02 = Object.entries(sumTotalPopByQuartier); // 1. Convertir a un array de entradas (pares clave-valor)
    entradas02.sort((a, b) => a[1] - b[1]); // 2. Ordenar el array por los valores (menor a mayor)
    const valoresOrdenados02 = entradas02.map(entrada => entrada[1]); // 3. Extraer solo los valores ordenados
    // console.log('Entradas ordenadas:', valoresOrdenados02);

    var labelsUpgrade = [];
    for (let i = 0; i < valoresOrdenados02.length; i++) {
        const data00 = entradas02[i][0];
        labelsUpgrade[i] = data00;
    }
    //console.log('Labels ordenados:', labelsUpgrade);

    // c. Genera los datavalues a graficar en el buen orden
    //DataValues >>  labelsDownward
    //==================================================
    var dataValuesPop = []; var dataValuesDensity = [];
    var dataValuesMen = []; var dataValuesWomen = [];
    var data01 = 0; var data02 = 0;
    var data03 = 0; var data04 = 0;

    for (let i = 0; i < labelsDownward.length; i++) {
        // Obtener la etiqueta correspondiente para el total de la poblacion
        // dataValuesPop
        const label = labelsDownward[i];
        if (sumTotalPopByQuartier[label] !== undefined) {
            data01 = sumTotalPopByQuartier[label];
        } else {
            data01 = 0;
        }
        dataValuesPop[i] = data01; // Total Poblacion

        // Obtener la etiqueta correspondiente para el total de la densidad 
        // de población
        if (densityPopulationByQuartier[label] !== undefined) {
            data02 = densityPopulationByQuartier[label];
        } else {
            data02 = 0;
        }
        dataValuesDensity[i] = data02; // Total Chefs Hommes

        // Obtener la etiqueta correspondiente para el total de Hombres
        // dataValuesMen
        if (sumTotalPopMenByQuartier[label] !== undefined) {
            data03 = sumTotalPopMenByQuartier[label];
        } else {
            data03 = 0;
        }
        dataValuesMen[i] = data03; // Total Chefs Femmes

        // Obtener la etiqueta correspondiente para el total de Mujeres
        // dataValuesWomen
        if (sumTotalPopWomenByQuartier[label] !== undefined) {
            data04 = sumTotalPopWomenByQuartier[label];
        } else {
            data04 = 0;
        }
        dataValuesWomen[i] = data04; // Densidad de población
    }
    //console.log('DataValues Total Menages:', dataValues01);

    // e. Genera los datavalues a graficar en el buen orden
    // para las graficas piramidales >>  labelsUpgrade
    //==================================================
    var dataValuesPopPyram = []; var dataDensityPopPyram = [];
    var dataValuesMenPyram = []; var dataValuesWomenPyram = [];
    var data01 = 0; var data02 = 0; var data03 = 0; var data04 = 0;

    for (let i = 0; i < labelsUpgrade.length; i++) {
        if (sumTotalPopMenByQuartier[labelsUpgrade[i]] !== undefined) {
            data01 = sumTotalPopMenByQuartier[labelsUpgrade[i]];
        } else {
            data01 = 0;
        }
        dataValuesMenPyram[i] = data01; // Total Chefs Hommes

        if (sumTotalPopWomenByQuartier[labelsUpgrade[i]] !== undefined) {
            data02 = sumTotalPopWomenByQuartier[labelsUpgrade[i]];
        } else {
            data02 = 0;
        }
        dataValuesWomenPyram[i] = data02; // Total Chefs Femmes

        if (sumTotalPopByQuartier[labelsUpgrade[i]] !== undefined) {
            data03 = sumTotalPopByQuartier[labelsUpgrade[i]];
        } else {
            data03 = 0;
        }
        dataValuesPopPyram[i] = data03; // Densidad de población

        if (densityPopulationByQuartier[labelsUpgrade[i]] !== undefined) {
            data04 = densityPopulationByQuartier[labelsUpgrade[i]];
        } else {
            data04 = 0;
        }
        dataDensityPopPyram[i] = data04; // Total Chefs Hommes
    }
    //console.log('DataValues Total Menages:', dataValues01);
    //console.log('Lista de Barrios:', labelsUpgrade)
    //console.log('Densidad de población por Barrio:', dataDensityPopPyram)

    //Data011 >> json_SchaerbeekDemographicDistributionHouse
    //-----------------------------------------------------------------------

    // Datavalues > Total población por barrio
    const sumTotalHouseByQuartier = sumValuesByProperty(Data011, 'Quartier', 'Pop1030_Menages1030');
    const sumTotalChefMenByQuartier = sumValuesByProperty(Data011, 'Quartier', 'Pop1030_Homme');
    const sumTotalChefWomenByQuartier = sumValuesByProperty(Data011, 'Quartier', 'Pop1030_Femme');
    // console.log('Suma de ménages total por barrio:', sumTotalHouseByQuartier);
    // console.log('Suma de población masculina por barrio:', sumTotalChefMenByQuartier);
    // console.log('Suma de población femenina por barrio:', sumTotalChefWomenByQuartier);

    // KPI Data
    const sumTotalHouse = sumAllValues(Data011, 'Pop1030_Menages1030');
    const sumTotalChefHommes = sumAllValues(Data011, 'Pop1030_Homme');
    const sumTotalChefFemmes = sumAllValues(Data011, 'Pop1030_Femme');
    var densityHouse = sumTotalHouse / sumAreaTotal;
    //console.log('Densité de ménages (men/km²):', densityHouse.toFixed(4));
    //console.log('Total de ménages :', sumTotalHouse);
    //console.log('Area Total :', sumAreaTotal);

    //DataValues >>
    var dataValuesHouse = []; var dataValuesChefMen = []; var dataValuesChefWomen = [];
    var data01 = 0; var data02 = 0; var data03 = 0;

    for (let i = 0; i < labelsDownward.length; i++) {
        const label = labelsDownward[i];
        if (sumTotalHouseByQuartier[label] !== undefined) {
            data01 = sumTotalHouseByQuartier[label];
        } else {
            data01 = 0;
        }
        dataValuesHouse[i] = data01; // Total Menages

        if (sumTotalChefMenByQuartier[label] !== undefined) {
            data02 = sumTotalChefMenByQuartier[label];
        } else {
            data02 = 0;
        }
        dataValuesChefMen[i] = data02; // Total Chefs Hommes

        if (sumTotalChefWomenByQuartier[label] !== undefined) {
            data03 = sumTotalChefWomenByQuartier[label];
        } else {
            data03 = 0;
        }
        dataValuesChefWomen[i] = data03; // Total Chefs Femmes
    }
    //console.log('DataValues Total Menages:', dataValuesHouse);



    return {
        // json_SchaerbeekDemographicDistribution
        labelsDownward: labelsDownward,
        dataValuesPop: dataValuesPop,
        dataValuesMen: dataValuesMen,
        dataValuesWomen: dataValuesWomen,
        densityPopulationByQuartier: densityPopulationByQuartier,
        // json_json_SchaerbeekDemographicDistributionHouse
        dataValuesHouse: dataValuesHouse,
        dataValuesChefMen: dataValuesChefMen,
        dataValuesChefWomen: dataValuesChefWomen,
        // json_SchaerbeekDemographicDistribution >> Pyramid
        labelsUpgrade: labelsUpgrade,
        dataValuesPopPyram: dataValuesPopPyram,
        dataValuesMenPyram: dataValuesMenPyram,
        dataValuesWomenPyram: dataValuesWomenPyram,
        dataDensityPopPyram: dataDensityPopPyram,
        //KPI Data Total1010
        sumTotalPopHommes: sumTotalPopHommes,
        sumTotalPopFemmes: sumTotalPopFemmes,
        sumTotalPop: sumTotalPop,
        sumAreaTotal: sumAreaTotal,
        densityPopulation1030: densityPopulation1030,
        //KPI Total Menages
        sumTotalHouse: sumTotalHouse,
        sumTotalChefHommes: sumTotalChefHommes,
        sumTotalChefFemmes: sumTotalChefFemmes,
        densityHouse: densityHouse
    };
}

function dataCharts_G02(Quartier) {

    // All data
    const Data012 = json_SchaerbeekDemographicDistributionMen;
    const Data013 = json_SchaerbeekDemographicDistributionWomen;

    const uniqueQuartiers = getUniqueValues(Data012, 'Quartier');

    // Data Hommes
    const sumTotalPopHommes_0009 = sumValuesByProperty(Data012, 'Quartier', 'Pop1030_de 0-9 ans'); //Pop1030_de 0-9 ans
    const sumTotalPopHommes_1019 = sumValuesByProperty(Data012, 'Quartier', 'Pop1030_de 10-19 ans'); //Pop1030_de 10-19 ans
    const sumTotalPopHommes_2029 = sumValuesByProperty(Data012, 'Quartier', 'Pop1030_de 20-29 ans'); //Pop1030_de 20-29 ans
    const sumTotalPopHommes_3039 = sumValuesByProperty(Data012, 'Quartier', 'Pop1030_de 30-39 ans'); //Pop1030_de 30-39 ans
    const sumTotalPopHommes_4049 = sumValuesByProperty(Data012, 'Quartier', 'Pop1030_de 40-49 ans'); //Pop1030_de 40-49 ans
    const sumTotalPopHommes_5059 = sumValuesByProperty(Data012, 'Quartier', 'Pop1030_de 50-59 ans'); //Pop1030_de 50-59 ans
    const sumTotalPopHommes_6069 = sumValuesByProperty(Data012, 'Quartier', 'Pop1030_de 60-69 ans'); //Pop1030_de 60-69 ans
    const sumTotalPopHommes_70plus = sumValuesByProperty(Data012, 'Quartier', 'Pop1030_de 70 ans et plus'); //Pop1030_de 70 ans et plus

    sumTotalPopHommes_0009['Schaerbeek'] = sumAllValues(Data012, 'Pop1030_de 0-9 ans');
    sumTotalPopHommes_1019['Schaerbeek'] = sumAllValues(Data012, 'Pop1030_de 10-19 ans');
    sumTotalPopHommes_2029['Schaerbeek'] = sumAllValues(Data012, 'Pop1030_de 20-29 ans');
    sumTotalPopHommes_3039['Schaerbeek'] = sumAllValues(Data012, 'Pop1030_de 30-39 ans');
    sumTotalPopHommes_4049['Schaerbeek'] = sumAllValues(Data012, 'Pop1030_de 40-49 ans');
    sumTotalPopHommes_5059['Schaerbeek'] = sumAllValues(Data012, 'Pop1030_de 50-59 ans');
    sumTotalPopHommes_6069['Schaerbeek'] = sumAllValues(Data012, 'Pop1030_de 60-69 ans');
    sumTotalPopHommes_70plus['Schaerbeek'] = sumAllValues(Data012, 'Pop1030_de 70 ans et plus');

    // Data Femmes
    const sumTotalPopFemmes_0009 = sumValuesByProperty(Data013, 'Quartier', 'Pop1030_de 0-9 ans'); //Pop1030_de 0-9 ans
    const sumTotalPopFemmes_1019 = sumValuesByProperty(Data013, 'Quartier', 'Pop1030_de 10-19 ans'); //Pop1030_de 10-19 ans
    const sumTotalPopFemmes_2029 = sumValuesByProperty(Data013, 'Quartier', 'Pop1030_de 20-29 ans'); //Pop1030_de 20-29 ans
    const sumTotalPopFemmes_3039 = sumValuesByProperty(Data013, 'Quartier', 'Pop1030_de 30-39 ans'); //Pop1030_de 30-39 ans
    const sumTotalPopFemmes_4049 = sumValuesByProperty(Data013, 'Quartier', 'Pop1030_de 40-49 ans'); //Pop1030_de 40-49 ans
    const sumTotalPopFemmes_5059 = sumValuesByProperty(Data013, 'Quartier', 'Pop1030_de 50-59 ans'); //Pop1030_de 50-59 ans
    const sumTotalPopFemmes_6069 = sumValuesByProperty(Data013, 'Quartier', 'Pop1030_de 60-69 ans'); //Pop1030_de 60-69 ans
    const sumTotalPopFemmes_70plus = sumValuesByProperty(Data013, 'Quartier', 'Pop1030_de 70 ans et plus'); //Pop1030_de 70 ans et plus

    sumTotalPopFemmes_0009['Schaerbeek'] = sumAllValues(Data013, 'Pop1030_de 0-9 ans');
    sumTotalPopFemmes_1019['Schaerbeek'] = sumAllValues(Data013, 'Pop1030_de 10-19 ans');
    sumTotalPopFemmes_2029['Schaerbeek'] = sumAllValues(Data013, 'Pop1030_de 20-29 ans');
    sumTotalPopFemmes_3039['Schaerbeek'] = sumAllValues(Data013, 'Pop1030_de 30-39 ans');
    sumTotalPopFemmes_4049['Schaerbeek'] = sumAllValues(Data013, 'Pop1030_de 40-49 ans');
    sumTotalPopFemmes_5059['Schaerbeek'] = sumAllValues(Data013, 'Pop1030_de 50-59 ans');
    sumTotalPopFemmes_6069['Schaerbeek'] = sumAllValues(Data013, 'Pop1030_de 60-69 ans');
    sumTotalPopFemmes_70plus['Schaerbeek'] = sumAllValues(Data013, 'Pop1030_de 70 ans et plus');

    // Schaerbeek
    const PopulationAgesFemmes_Schaerbeek_00 = {
        '0-9': sumTotalPopFemmes_0009['Schaerbeek'],
        '10-19': sumTotalPopFemmes_1019['Schaerbeek'],
        '20-29': sumTotalPopFemmes_2029['Schaerbeek'],
        '30-39': sumTotalPopFemmes_3039['Schaerbeek'],
        '40-49': sumTotalPopFemmes_4049['Schaerbeek'],
        '50-59': sumTotalPopFemmes_5059['Schaerbeek'],
        '60-69': sumTotalPopFemmes_6069['Schaerbeek'],
        '70+': sumTotalPopFemmes_70plus['Schaerbeek']
    };

    // Return
    //labelsAges = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
    labelsAges = ['70 ans et plus', '60 à 69 ans', '50 à 59 ans ', '40 à 49 ans', '30 à 39 ans', '20 à 29 ans', '10 à 19 ans', '0 à 9 ans'];

    const PopulationAgesFemmes_Quartier = [
        sumTotalPopFemmes_70plus[Quartier],
        sumTotalPopFemmes_6069[Quartier],
        sumTotalPopFemmes_5059[Quartier],
        sumTotalPopFemmes_4049[Quartier],
        sumTotalPopFemmes_3039[Quartier],
        sumTotalPopFemmes_2029[Quartier],
        sumTotalPopFemmes_1019[Quartier],
        sumTotalPopFemmes_0009[Quartier],
    ];
    const PopulationAgesHommes_Quartier = [
        sumTotalPopHommes_70plus[Quartier],
        sumTotalPopHommes_6069[Quartier],
        sumTotalPopHommes_5059[Quartier],
        sumTotalPopHommes_4049[Quartier],
        sumTotalPopHommes_3039[Quartier],
        sumTotalPopHommes_2029[Quartier],
        sumTotalPopHommes_1019[Quartier],
        sumTotalPopHommes_0009[Quartier],
    ];

    const PopulationAgesFemmes_Schaerbeek = [
        sumTotalPopFemmes_70plus['Schaerbeek'],
        sumTotalPopFemmes_6069['Schaerbeek'],
        sumTotalPopFemmes_5059['Schaerbeek'],
        sumTotalPopFemmes_4049['Schaerbeek'],
        sumTotalPopFemmes_3039['Schaerbeek'],
        sumTotalPopFemmes_2029['Schaerbeek'],
        sumTotalPopFemmes_1019['Schaerbeek'],
        sumTotalPopFemmes_0009['Schaerbeek'],
    ];
    const PopulationAgesHommes_Schaerbeek = [
        sumTotalPopHommes_70plus['Schaerbeek'],
        sumTotalPopHommes_6069['Schaerbeek'],
        sumTotalPopHommes_5059['Schaerbeek'],
        sumTotalPopHommes_4049['Schaerbeek'],
        sumTotalPopHommes_3039['Schaerbeek'],
        sumTotalPopHommes_2029['Schaerbeek'],
        sumTotalPopHommes_1019['Schaerbeek'],
        sumTotalPopHommes_0009['Schaerbeek'],
    ];

    return {
        labelsAges: labelsAges,
        PopulationAgesHommes_Quartier: PopulationAgesHommes_Quartier,
        PopulationAgesFemmes_Quartier: PopulationAgesFemmes_Quartier,
        // SChaerbeek ALL
        PopulationAgesHommes_Schaerbeek: PopulationAgesHommes_Schaerbeek,
        PopulationAgesFemmes_Schaerbeek: PopulationAgesFemmes_Schaerbeek
    };

}

