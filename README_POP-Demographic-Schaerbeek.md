# 👥 Demographic Study of the Population — Schaerbeek 1030

> Analysis of the size, distribution, structure, and age profile of the Schaerbeek population, based on the Belgian National Register · Data as of March 2026

---

## 🔗 Quick Access

| Tool | Description | Link |
|---|---|---|
| 🗺️ **Interactive Map** | Population density and distribution by urban block | [index.html](https://gis1030.github.io/POP-Demographic-Schaerbeek/) |

---

## 📋 About the Project

This project provides a comprehensive demographic study of the **population of the municipality of Schaerbeek**, analysing characteristics including population size, geographic distribution, age structure, sex ratio, and household composition.

The study measures **population density** based on the number of people living in specific geographic areas, expressed as inhabitants per square kilometre. The spatial unit of analysis corresponds to the **urban blocks (îlots urbains)** of the municipality of Schaerbeek, recently updated with new boundary definitions.

Data is sourced from the **Belgian National Register** (Registre National / Rijksregister), the authoritative source for population statistics in Belgium.

---

## 🧭 Contents

### 🗺️ Interactive Map

The map displays population data aggregated at the urban block level across Schaerbeek.

**Available indicators**

- 👥 Total population per urban block
- 📊 Population density (inhabitants/km²)
- 🧑‍🤝‍🧑 Age structure distribution
- ♀♂ Sex ratio by block
- 🏠 Number of households

**Base maps** — Google Terrain (default) · Google Satellite · OpenStreetMap

---

## 🛠️ Technologies

- **HTML / CSS / JavaScript** — 100% client-side application, no server required
- **Leaflet.js** — interactive mapping with choropleth layers
- **GitHub Pages** — static hosting

---

## 🌐 Compatibility

Compatible with recent versions of **Firefox**, **Chrome**, and **Edge**.
Optimised for desktop use; the map is responsive on mobile.

---

## 📁 Repository Structure

```
POP-Demographic-Schaerbeek/
├── index.html                        # Interactive map
├── css/                              # Stylesheets and UI assets
└── Population-1030/                  # GeoJSON data (JS wrapper format)
    └── *.js                          # Population datasets by urban block
```

---

## 📅 Changelog

| Date | Description |
|---|---|
| March 2026 | Dataset refreshed with new urban block boundaries |
| December 2025 | Annual data update |
| August 2025 | Intermediate update |
| January 2025 | Initial publication |

---

## 📄 Data Sources

| Dataset | Source | Date |
|---|---|---|
| Population statistics | Belgian National Register (Registre National) — Commune de Schaerbeek | March 2026 |
| Urban block boundaries | Municipal GIS reference layer — updated boundaries | March 2026 |

Data is extracted from the National Register and aggregated at the urban block level. Published as static GeoJSON files for client-side rendering. No individual-level data is published.

---

## 🔒 Data Protection (GDPR)

All published data consists exclusively of **aggregated statistics at the urban block level**. No data enabling the identification of any individual is published.

The processing of population data for statistical purposes is grounded in:
- **Article 6.1(e) of the GDPR** — processing necessary for the performance of a task carried out in the public interest
- **Belgian legislation on population registers**

### Data Controller

**Commune de Schaerbeek** · Place Colignon · 1030 Brussels · Belgium

---

## 📄 Licence

This project is licensed under the **European Union Public Licence v. 1.2 (EUPL-1.2)**.
See the [LICENSE](LICENSE) file for the full text.

[![License: EUPL-1.2](https://img.shields.io/badge/License-EUPL%201.2-blue.svg)](https://eupl.eu/1.2/en/)

> © 2024–2026 Direction des Systèmes d'Information (DSI) · Commune de Schaerbeek · 1030 Brussels · Belgium

---

*Commune de Schaerbeek · Direction des Systèmes d'Information (DSI) · 1030 Brussels · Belgium*
