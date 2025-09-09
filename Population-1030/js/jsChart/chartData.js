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

function dataCharts_G03() {
    // All data
    const DataALL = json_SchaerbeekDemographicDistribution;
    const Data011 = json_SchaerbeekDemographicDistributionHouse;

    // label > Quartier List
    const uniqueQuartiers = getUniqueValues(DataALL, 'Quartier');
    // label > Block Parcel List
    const uniqueBlockParcel = getUniqueValues(DataALL, 'BlockParcel');
    // label BlockParcel With Quartier
    const uniqueBlockParcelQuartier = groupValuesByProperty(DataALL, 'Quartier', 'BlockParcel');
    // Datavalues > Total población por 'BlockParcel'
    // const sumTotalPopBlockParcel = sumValuesByProperty(DataALL, 'BlockParcel', 'Pop1030_Population');
    // Datavalues > Total familias por 'BlockParcel'
    // const sumTotalFamBlockParcel = sumValuesByProperty(Data011, 'BlockParcel', 'Pop1030_Menages1030');

    //console.log('liste Quartier', uniqueQuartiers);
    //console.log('liste ilot urbanistique', uniqueBlockParcel);
    //console.log('liste ilot urbanistique avec Quartier', uniqueBlockParcelQuartier);
    //console.log('Total población por ilot urbanistique', sumTotalPopBlockParcel);
    //console.log('Total familias por ilot urbanistique', sumTotalFamBlockParcel);
    //console.log('Detalles de los datos par ilot urbanistiaue y quartier', blockParcelsWithPopulation);

    // Population par Quartier et ilot Urbanistique 
    // BEGIN +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Propiedades de población que deseas incluir
    const populationDetails01 = ['Pop1030_Population', 'Pop1030_Femme', 'Pop1030_Homme'];
    const blockParcelsWithPopulation = groupValuesWithDetails(
        DataALL,
        'Quartier',
        'BlockParcel',
        populationDetails01
    );
    //console.log('Detalles de los datos de familia para el barrio Bienfaiteurs:', blockParcelsWithPopulation);

    // 1. Accede al array de objetos par Quartier
    const bienfaiteursDataPop = blockParcelsWithPopulation['Bienfaiteurs']; // 'Bienfaiteurs', 
    const cerisiersDataPop = blockParcelsWithPopulation['Cerisiers']; // 'Cerisiers'
    const colignonDataPop = blockParcelsWithPopulation['Colignon']; // 'Colignon',
    const coteauxjosaphatDataPop = blockParcelsWithPopulation['Coteaux-Josaphat']; // 'Coteaux-Josaphat'
    const helmethamoirDataPop = blockParcelsWithPopulation['Helmet-Hamoir']; // 'Helmet-Hamoir'
    const jardinDataPop = blockParcelsWithPopulation['Jardin']; // 'Jardin'
    const linthoutDataPop = blockParcelsWithPopulation['Linthout']; // 'Linthout'
    const nordDataPop = blockParcelsWithPopulation['Nord']; // 'Nord'
    const palaisreineDataPop = blockParcelsWithPopulation['Palais-Reine']; // 'Palais-Reine'
    const parcjosaphatDataPop = blockParcelsWithPopulation['Parc Josaphat']; // 'Parc Josaphat'
    const plaskyDataPop = blockParcelsWithPopulation['Plasky']; // 'Plasky'
    const reyersDataPop = blockParcelsWithPopulation['Reyers']; // 'Reyers'
    const terdeltfleurDataPop = blockParcelsWithPopulation['Terdelt-Fleur']; // 'Terdelt-Fleur'

    // 2. Utiliza .map() para crear un nuevo array con solo los valores de 'Pop1030_Population'
    const bienfaiteursValuesPop = bienfaiteursDataPop.map(item => item.Pop1030_Population);
    const cerisiersValuesPop = cerisiersDataPop.map(item => item.Pop1030_Population);
    const colignonValuesPop = colignonDataPop.map(item => item.Pop1030_Population);
    const coteauxjosaphatValuesPop = coteauxjosaphatDataPop.map(item => item.Pop1030_Population);
    const helmethamoirValuesPop = helmethamoirDataPop.map(item => item.Pop1030_Population);
    const jardinValuesPop = jardinDataPop.map(item => item.Pop1030_Population);
    const linthoutValuesPop = linthoutDataPop.map(item => item.Pop1030_Population);
    const nordValuesPop = nordDataPop.map(item => item.Pop1030_Population);
    const palaisreineValuesPop = palaisreineDataPop.map(item => item.Pop1030_Population);
    const parcjosaphatValuesPop = parcjosaphatDataPop.map(item => item.Pop1030_Population);
    const plaskyValuesPop = plaskyDataPop.map(item => item.Pop1030_Population);
    const reyersValuesPop = reyersDataPop.map(item => item.Pop1030_Population);
    const terdeltfleurValuesPop = terdeltfleurDataPop.map(item => item.Pop1030_Population);

    //console.log('Detalles de los datos poblacion para el barrio Bienfaiteurs:', bienfaiteursDataPop);
    //console.log('Detalles de los datos de pobalcion total para el barrio Bienfaiteurs:', bienfaiteursValuesPop);
    //console.log('liste ilot urbanistique avec Quartier', uniqueBlockParcelQuartier['Bienfaiteurs']);
    // END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // Menages par Quartier et ilot Urbanistique
    // BEGIN +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Propiedades de población que deseas incluir
    const populationDetails02 = ['Pop1030_Menages1030'];
    const blockParcelsWithFamilies = groupValuesWithDetails(
        Data011,
        'Quartier',
        'BlockParcel',
        populationDetails02
    );
    //console.log('Detalles de los datos de familia para el barrio Bienfaiteurs:', blockParcelsWithFamilies);

    // 1. Accede al array de objetos par Quartier
    const bienfaiteursDataFam = blockParcelsWithFamilies['Bienfaiteurs']; // 'Bienfaiteurs', 
    const cerisiersDataFam = blockParcelsWithFamilies['Cerisiers']; // 'Cerisiers'
    const colignonDataFam = blockParcelsWithFamilies['Colignon']; // 'Colignon',
    const coteauxjosaphatDataFam = blockParcelsWithFamilies['Coteaux-Josaphat']; // 'Coteaux-Josaphat'
    const helmethamoirDataFam = blockParcelsWithFamilies['Helmet-Hamoir']; // 'Helmet-Hamoir'
    const jardinDataFam = blockParcelsWithFamilies['Jardin']; // 'Jardin'
    const linthoutDataFam = blockParcelsWithFamilies['Linthout']; // 'Linthout'
    const nordDataFam = blockParcelsWithFamilies['Nord']; // 'Nord'
    const palaisreineDataFam = blockParcelsWithFamilies['Palais-Reine']; // 'Palais-Reine'
    const parcjosaphatDataFam = blockParcelsWithFamilies['Parc Josaphat']; // 'Parc Josaphat'
    const plaskyDataFam = blockParcelsWithFamilies['Plasky']; // 'Plasky'
    const reyersDataFam = blockParcelsWithFamilies['Reyers']; // 'Reyers'
    const terdeltfleurDataFam = blockParcelsWithFamilies['Terdelt-Fleur']; // 'Terdelt-Fleur'

    // 2. Utiliza .map() para crear un nuevo array con solo los valores de 'Pop1030_Menages1030'
    const bienfaiteursValuesFam = bienfaiteursDataFam.map(item => item.Pop1030_Menages1030);
    const cerisiersValuesFam = cerisiersDataFam.map(item => item.Pop1030_Menages1030);
    const colignonValuesFam = colignonDataFam.map(item => item.Pop1030_Menages1030);
    const coteauxjosaphatValuesFam = coteauxjosaphatDataFam.map(item => item.Pop1030_Menages1030);
    const helmethamoirValuesFam = helmethamoirDataFam.map(item => item.Pop1030_Menages1030);
    const jardinValuesFam = jardinDataFam.map(item => item.Pop1030_Menages1030);
    const linthoutValuesFam = linthoutDataFam.map(item => item.Pop1030_Menages1030);
    const nordValuesFam = nordDataFam.map(item => item.Pop1030_Menages1030);
    const palaisreineValuesFam = palaisreineDataFam.map(item => item.Pop1030_Menages1030);
    const parcjosaphatValuesFam = parcjosaphatDataFam.map(item => item.Pop1030_Menages1030);
    const plaskyValuesFam = plaskyDataFam.map(item => item.Pop1030_Menages1030);
    const reyersValuesFam = reyersDataFam.map(item => item.Pop1030_Menages1030);
    const terdeltfleurValuesFam = terdeltfleurDataFam.map(item => item.Pop1030_Menages1030);

    //console.log('Detalles de los datos de familia para el barrio Bienfaiteurs:', bienfaiteursDataFam);
    //console.log('Detalles de los datos de familia totales para el barrio Bienfaiteurs:', bienfaiteursValuesFam);
    //console.log('liste ilot urbanistique avec Quartier', uniqueBlockParcelQuartier['Bienfaiteurs']);
    // END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //console.log('Detalles de los datos de pobalcion total para el barrio Bienfaiteurs:', bienfaiteursValuesPop);
    //console.log('Detalles de los datos de familia totales para el barrio Bienfaiteurs:', bienfaiteursValuesFam);
    //console.log('liste ilot urbanistique avec Quartier', uniqueBlockParcelQuartier['Bienfaiteurs']);

    //console.log(Object.keys(uniqueBlockParcelQuartier).length); // numero de Quartiers
    //console.log(Object.keys(bienfaiteursValuesPop).length); // numero de ilots par Quartiers
    //console.log(bienfaiteursValuesPop[0]); // valor de population para el ilot 0
    //console.log(bienfaiteursValuesFam[0]); // valor de familias para el ilot 0
    //console.log(uniqueBlockParcelQuartier['Bienfaiteurs'][0]); // nombre del ilot

    // Bienfaiteurs
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsBienfaiteurs = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Bienfaiteurs']).length; i++) {
        const label = Object.keys(bienfaiteursValuesPop)[i];

        data00 = bienfaiteursValuesPop[i];
        data01 = bienfaiteursValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Bienfaiteurs'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsBienfaiteurs.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Bienfaiteurs'
        });
    }
    //console.log(datasetsBienfaiteurs)

    // Cerisiers
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsCerisiers = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Cerisiers']).length; i++) {
        const label = Object.keys(cerisiersValuesPop)[i];

        data00 = cerisiersValuesPop[i];
        data01 = cerisiersValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Cerisiers'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsCerisiers.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Cerisiers'
        });
    }
    //console.log(datasetsCerisiers)

    // Colignon
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsColignon = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Colignon']).length; i++) {
        const label = Object.keys(colignonValuesPop)[i];

        data00 = colignonValuesPop[i];
        data01 = colignonValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Colignon'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsColignon.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Colignon'
        });
    }
    //console.log(datasetsColignon)

    // Coteaux-Josaphat
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsCoteauxJosaphat = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Coteaux-Josaphat']).length; i++) {
        const label = Object.keys(coteauxjosaphatValuesPop)[i];

        data00 = coteauxjosaphatValuesPop[i];
        data01 = coteauxjosaphatValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Coteaux-Josaphat'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsCoteauxJosaphat.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Coteaux-Josaphat'
        });
    }
    //console.log(datasetsCoteauxJosaphat)

    // Helmet-Hamoir
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsHelmetHamoir = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Helmet-Hamoir']).length; i++) {
        const label = Object.keys(helmethamoirValuesPop)[i];

        data00 = helmethamoirValuesPop[i];
        data01 = helmethamoirValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Helmet-Hamoir'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsHelmetHamoir.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Helmet-Hamoir'
        });
    }
    //console.log(datasetsHelmetHamoir)

    // Jardin
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsJardin = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Jardin']).length; i++) {
        const label = Object.keys(jardinValuesPop)[i];

        data00 = jardinValuesPop[i];
        data01 = jardinValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Jardin'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsJardin.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Jardin'
        });
    }
    //console.log(datasetsJardin)

    // Linthout
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsLinthout = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Linthout']).length; i++) {
        const label = Object.keys(linthoutValuesPop)[i];

        data00 = linthoutValuesPop[i];
        data01 = linthoutValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Linthout'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsLinthout.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Linthout'
        });
    }
    //console.log(datasetsLinthout)

    // Nord
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsNord = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Nord']).length; i++) {
        const label = Object.keys(nordValuesPop)[i];

        data00 = nordValuesPop[i];
        data01 = nordValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Nord'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsNord.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Nord'
        });
    }
    //console.log(datasetsNord)

    // Palais-Reine
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsPalaisReine = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Palais-Reine']).length; i++) {
        const label = Object.keys(palaisreineValuesPop)[i];

        data00 = palaisreineValuesPop[i];
        data01 = palaisreineValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Palais-Reine'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsPalaisReine.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Palais-Reine'
        });
    }
    //console.log(datasetsPalaisReine)

    // Parc Josaphat
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsParcJosaphat = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Parc Josaphat']).length; i++) {
        const label = Object.keys(parcjosaphatValuesPop)[i];

        data00 = parcjosaphatValuesPop[i];
        data01 = parcjosaphatValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Parc Josaphat'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsParcJosaphat.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Parc Josaphat'
        });
    }
    //console.log(datasetsParcJosaphat)

    // Plasky
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsPlasky = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Plasky']).length; i++) {
        const label = Object.keys(plaskyValuesPop)[i];

        data00 = plaskyValuesPop[i];
        data01 = plaskyValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Plasky'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsPlasky.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Plasky'
        });
    }
    //console.log(datasetsPlasky)

    // Reyers
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsReyers = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Reyers']).length; i++) {
        const label = Object.keys(reyersValuesPop)[i];

        data00 = reyersValuesPop[i];
        data01 = reyersValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Reyers'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsReyers.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Reyers'
        });
    }
    //console.log(datasetsReyers)

    // Terdelt-Fleur
    //=============================
    var data00 = 0; var data01 = 0; var data02 = 0; var data03 = 0;
    datasetsTerdeltFleur = [];
    for (let i = 0; i < Object.keys(uniqueBlockParcelQuartier['Terdelt-Fleur']).length; i++) {
        const label = Object.keys(terdeltfleurValuesPop)[i];

        data00 = terdeltfleurValuesPop[i];
        data01 = terdeltfleurValuesFam[i];
        data02 = uniqueBlockParcelQuartier['Terdelt-Fleur'][i];
        data03 = Math.round((data00 / data01) * 100) / 100;

        datasetsTerdeltFleur.push({
            x: data00,
            y: data01,
            v: isNaN(data03) ? 0 : data03,
            block: data02,
            quartier: 'Terdelt-Fleur'
        });
    }
    //console.log(datasetsTerdeltFleur)

    // Regresion Lineal
    // DataALL = json_SchaerbeekDemographicDistribution;
    // Data011 = json_SchaerbeekDemographicDistributionHouse;
    //===================================================================
    const regressionData01 = getCoordinatesFromMultipleFiles(
        DataALL,  // Segundo archivo (eje X)
        Data011, // Primer archivo (eje Y)
        'Pop1030_Population',   // Propiedad para el eje X
        'Pop1030_Menages1030',   // Propiedad para el eje Y
        'BlockParcel' // Propiedad de referencia para agrupar y emparejar
    );
    // Muestra el resultado final
    //console.log("valores de regresion lineal", regressionData);

    const regressionDataXY = getAllCoordinatesAsArray(
        DataALL,
        Data011,
        'Pop1030_Population',
        'Pop1030_Menages1030',
        'BlockParcel'
    );
    //console.log("valores de regresion lineal simple array", regressionDataXY);

    //Llama a la función de regresión
    const regressionResult = calculateLinearRegressionAndLine(regressionDataXY);
    const XYregressionLinear = regressionResult.line
    //console.log('Resultados de la regresión:');
    //console.log('Pendiente (m):', regressionResult.m.toFixed(2));
    //console.log('Intercepto (b):', regressionResult.b.toFixed(2));
    //console.log('Coordenadas para la línea de regresión:', XYregressionLinear);
    //console.log(`Ecuación: y = ${regressionResult.m.toFixed(2)}x + ${regressionResult.b.toFixed(2)}`);

    XYregressionLinear[0]['v'] = (1 / regressionResult.m.toFixed(2));
    XYregressionLinear[1]['v'] = (1 / regressionResult.m.toFixed(2));
    XYregressionLinear[0]['quartier'] = 'Schaerbeek';
    XYregressionLinear[1]['quartier'] = 'Schaerbeek';
    //console.log(XYregressionLinear);


    //KPI Calculo del total de la poblacion por edades
    //===================================================================
    const sumTotal_0009 = sumAllValues(DataALL, 'Pop1030_de 0-9 ans');
    const sumTotal_1019 = sumAllValues(DataALL, 'Pop1030_de 10-19 ans');
    const sumTotal_2029 = sumAllValues(DataALL, 'Pop1030_de 20-29 ans');
    const sumTotal_3039 = sumAllValues(DataALL, 'Pop1030_de 30-39 ans');
    const sumTotal_4049 = sumAllValues(DataALL, 'Pop1030_de 40-49 ans');
    const sumTotal_5059 = sumAllValues(DataALL, 'Pop1030_de 50-59 ans');
    const sumTotal_6069 = sumAllValues(DataALL, 'Pop1030_de 60-69 ans');
    const sumTotal_7099 = sumAllValues(DataALL, 'Pop1030_de 70 ans et plus');
    //console.log(sumTotal_0009)

    return {
        uniqueQuartiers: uniqueQuartiers,
        uniqueBlockParcel: uniqueBlockParcel,
        uniqueBlockParcelQuartier: uniqueBlockParcelQuartier,

        // datasets
        datasetsBienfaiteurs,
        datasetsCerisiers,
        datasetsColignon,
        datasetsCoteauxJosaphat,
        datasetsHelmetHamoir,
        datasetsJardin,
        datasetsLinthout,
        datasetsNord,
        datasetsPalaisReine,
        datasetsParcJosaphat,
        datasetsPlasky,
        datasetsReyers,
        datasetsTerdeltFleur,
        // regresion Data
        XYregressionLinear,
        // KPI Data
        sumTotal_0009,
        sumTotal_1019,
        sumTotal_2029,
        sumTotal_3039,
        sumTotal_4049,
        sumTotal_5059,
        sumTotal_6069,
        sumTotal_7099,
    }
}
