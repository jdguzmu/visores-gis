/* ============================================================
   VISOR OPH ENTERPRISE
   ArcGIS Maps SDK for JavaScript 5.0, sin Vite
   Carga CDN 5.0 robusta: el main.js NO es module para que funcione
   mejor en pruebas locales y espera a que exista $arcgis.import().
   ============================================================ */

function waitForArcgisImport(timeoutMs = 15000) {
    const start = Date.now();

    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            if (globalThis.$arcgis && typeof globalThis.$arcgis.import === "function") {
                clearInterval(timer);
                resolve();
                return;
            }

            if (Date.now() - start > timeoutMs) {
                clearInterval(timer);
                reject(new Error("No se ha podido cargar $arcgis.import(). Revisa la conexión a https://js.arcgis.com/5.0/ o prueba desde http://localhost / Tomcat, no desde file://."));
            }
        }, 50);
    });
}

(async () => {
    await waitForArcgisImport();
    const Map = await $arcgis.import("@arcgis/core/Map.js");
    const MapView = await $arcgis.import("@arcgis/core/views/MapView.js");
    const MapImageLayer = await $arcgis.import("@arcgis/core/layers/MapImageLayer.js");
    const WMSLayer = await $arcgis.import("@arcgis/core/layers/WMSLayer.js");
    const WMTSLayer = await $arcgis.import("@arcgis/core/layers/WMTSLayer.js");
    const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
    const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
    const SpatialReference = await $arcgis.import("@arcgis/core/geometry/SpatialReference.js");
    const Extent = await $arcgis.import("@arcgis/core/geometry/Extent.js");
    const ScaleBar = await $arcgis.import("@arcgis/core/widgets/ScaleBar.js");
    const Legend = await $arcgis.import("@arcgis/core/widgets/Legend.js");
    const Measurement = await $arcgis.import("@arcgis/core/widgets/Measurement.js");
    const identify = await $arcgis.import("@arcgis/core/rest/identify.js");
    const IdentifyParameters = await $arcgis.import("@arcgis/core/rest/support/IdentifyParameters.js");
    const query = await $arcgis.import("@arcgis/core/rest/query.js");
    const locator = await $arcgis.import("@arcgis/core/rest/locator.js");
    const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
    const reactiveUtils = await $arcgis.import("@arcgis/core/core/reactiveUtils.js");


    const APP = {
        user: "chms",
        pass: "chms",
        homeExtent: {
			xmin: 450000,
			ymin: 4560000,
			xmax: 760000,
			ymax: 4855000,
			spatialReference: { wkid: 25829 }
			},
        sr: new SpatialReference({ wkid: 25829 }),
        layers: [],
        layerById: new globalThis.Map(),
        activeBase: "pnoa",
        geocoderUrl: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
    };

    const baseDefs = [
        {
            id: "pnoa",
            title: "PNOA máxima actualidad",
            type: "wmts",
            url: "https://www.ign.es/wmts/pnoa-ma",
            layerId: "OI.OrthoimageCoverage"
        },
        {
			id: "raster",
			title: "Cartografía raster IGN",
			type: "wms",
			url: "https://www.ign.es/wms-inspire/mapa-raster",
			layerName: "mtn_rasterizado"
		},
		{
			id: 'SIGPAC 97-03',
			title: 'SIGPAC (1997 - 2003)',
			type: 'wms',
			url: 'https://www.ign.es/wms/pnoa-historico',
			layerName: 'SIGPAC'
		},


		{
			id: 'ams1956',
			title: 'Americano Serie B 1956-1957',
			type: 'wms',
			url: 'https://www.ign.es/wms/pnoa-historico',
			layerName: 'AMS_1956-1957'
		},
		{
			id: "mdt",
			title: "MDT CHMS",
			type: "mapserver",
			url: "https://siams.chminosil.es/server/rest/services/MDTs/MDT_02_CHMSb/MapServer"
		},
        {
            id: "blank",
            title: "Fondo blanco",
            type: "blank"
        },
		{
			id: "pnoa_historico_year",
			title: "PNOA histórico por año",
			type: "wms",
			url: "https://www.ign.es/wms/pnoa-historico",
			layerName: "PNOA2023"
		}
    ];

    const highlightLayer = new GraphicsLayer({
	title: "Selección",
	listMode: "hide"
	});

	const coordMarkerLayer = new GraphicsLayer({
    title: "Marcador de coordenadas",
    listMode: "hide"
	});
    const map = new Map({
        basemap: null,
        layers: [highlightLayer, coordMarkerLayer]
    });


    const view = new MapView({
        container: "viewDiv",
        map: map,
        spatialReference: APP.sr,
        extent: APP.homeExtent,
        constraints: {
            snapToZoom: false
        }
    });

    const scaleBar = new ScaleBar({
        view: view,
        unit: "metric",
        style: "ruler"
    });

    view.ui.add(scaleBar, {
		position: "bottom-left",
		index: 1
		});

    const measurement = new Measurement({
        view: view,
        container: "measurementWidget"
    });

    const legend = new Legend({
        view: view,
        container: "legendWidget"
    });

    let identifyResults = [];
    let identifyIndex = 0;

    let attributeTableRows = [];
    let attributeTableFields = [];
    let attributeTableFieldAliases = {};
    let attributeTableFieldTypes = {};
    let attributeTablePage = 1;
    let attributeTableTotalCount = 0;
    let attributeTableSortField = null;
    let attributeTableSortDirection = "asc";
    let attributeTableSelectedIndex = null;
    let attributeTableUrl = null;
    let attributeTableWhere = "1=1";
    let attributeTableRequestId = 0;
    let attributeTableSearchTimer = null;
    const ATTRIBUTE_PAGE_SIZE = 50;
    const ATTRIBUTE_EXPORT_BATCH_SIZE = 1000;

    /* ============================================================
       MARCADORES / BOOKMARKS
       ============================================================ */

    const BOOKMARKS_STORAGE_KEY = "siams_viewer_bookmarks";
    const BOOKMARKS_FORMAT = "siams-bookmarks";
    const BOOKMARKS_FORMAT_VERSION = 2;
    let bookmarks = [];

/* NUEVO: grupos del árbol abiertos */

	const openServices = new Set();
	const openSublayerGroups = new Set();
    /* ============================================================
       LOGIN
       ============================================================ */

    function initLogin() {
        const loginOverlay = document.getElementById("loginOverlay");
        const loginUser = document.getElementById("loginUser");
        const loginPass = document.getElementById("loginPass");
        const loginBtn = document.getElementById("loginBtn");
        const loginError = document.getElementById("loginError");

        if (sessionStorage.getItem("visorOPH_enterprise_login") === "ok") {
            loginOverlay.style.display = "none";
            return;
        }

        function comprobarLogin() {
            const user = loginUser.value.trim();
            const pass = loginPass.value.trim();

            if (user === APP.user && pass === APP.pass) {
                sessionStorage.setItem("visorOPH_enterprise_login", "ok");
                loginOverlay.style.display = "none";
            } else {
                loginError.textContent = "Usuario o contraseña incorrectos";
                loginPass.value = "";
                loginPass.focus();
            }
        }

        loginBtn.addEventListener("click", comprobarLogin);

        [loginUser, loginPass].forEach(input => {
            input.addEventListener("keydown", e => {
                if (e.key === "Enter") comprobarLogin();
            });
        });
    }

    /* ============================================================
       CAPAS Y MAPAS BASE
       ============================================================ */

    function initBaseLayers() {
        baseDefs.forEach(def => {
            let layer = null;

            if (def.type === "wmts") {
                layer = new WMTSLayer({
                    url: def.url,
                    title: def.title,
                    visible: def.id === APP.activeBase,
                    activeLayer: { id: def.layerId }
                });
            }

            if (def.type === "wms") {
                layer = new WMSLayer({
                    url: def.url,
                    title: def.title,
                    visible: def.id === APP.activeBase,
                    sublayers: [{ name: def.layerName }]
                });
            }

			if (def.type === "mapserver") {
				layer = new MapImageLayer({
					url: def.url,
					title: def.title,
					visible: def.id === APP.activeBase,
					opacity: 1
			});
			}

            if (def.type === "blank") {
                layer = new GraphicsLayer({
                    title: def.title,
                    visible: def.id === APP.activeBase,
                    listMode: "hide"
                });
            }

            if (layer) {
                layer.id = "base_" + def.id;
                layer.listMode = "hide";
                APP.layerById.set(layer.id, layer);
                map.add(layer, 0);
                if (layer.load) {
                    layer.load().catch(error => console.warn("No se pudo cargar el mapa base:", def.title, error));
                }
            }
        });

        const activeDef = baseDefs.find(item => item.id === APP.activeBase);

        if (activeDef && activeDef.type === "basemap") {
            map.basemap = activeDef.basemap;
        }

        renderBases();
    }

    function setBase(id) {
        APP.activeBase = id;

        const def = baseDefs.find(item => item.id === id);

        map.basemap = def && def.type === "basemap" ? def.basemap : null;

        baseDefs.forEach(base => {
            const layer = APP.layerById.get("base_" + base.id);
            if (layer) {
                layer.visible = base.id === id;
            }
        });

        renderBases();
    }

    function renderBases() {
        const el = document.getElementById("baseGrid");
        if (!el) return;

        el.innerHTML = "";

        baseDefs.forEach(base => {
            const card = document.createElement("div");
            card.className = "basecard" + (base.id === APP.activeBase ? " active" : "");
            card.onclick = () => setBase(base.id);

            card.innerHTML = `
                <div class="thumb">${escapeHtml(base.title.split(" ")[0])}</div>
                <div>${escapeHtml(base.title)}</div>
            `;

            el.appendChild(card);
        });
    }

    function initOperationalLayers() {
        SERVICES.forEach((service, index) => {
            const layer = new MapImageLayer({
                url: service.url,
                title: service.title,
                visible: service.visible,
                opacity: 0.85
            });

            layer.id = service.id || ("svc_" + index);
            layer.legacyId = "svc_" + index;
            layer.customConfig = service;

            APP.layers.push(layer);
            APP.layerById.set(layer.id, layer);
            map.add(layer);

            layer.load()
                .then(() => {
                    renderServiceList();
                    renderSearchLayerSelect();
                    renderTableLayerSelect();
                })
                .catch(error => {
                    console.warn("No se pudo cargar el servicio:", service.title, error);
                    renderServiceList();
                });
        });

        renderServiceList();
    }

    //---------------------------------------------------------

function renderServiceList() {
    const list = document.getElementById("serviceList");
    const queryText = (document.getElementById("layerSearch")?.value || "").toLowerCase();

    list.innerHTML = "";

    APP.layers.forEach(layer => {
        const title = layer.title || layer.customConfig.title;

        if (queryText && !title.toLowerCase().includes(queryText)) {
            return;
        }

        const isServiceOpen = openServices.has(layer.id);

        const serviceWrap = document.createElement("div");
        serviceWrap.className = "service-tree";

        const serviceRow = document.createElement("div");
        serviceRow.className = "service-row service-root";

        serviceRow.innerHTML = `
            <input type="checkbox" ${layer.visible ? "checked" : ""}>

            <span class="sublayer-toggle">
                ${isServiceOpen ? "▾" : "▸"}
            </span>

            <span class="service-title" title="${escapeHtml(title)}">
                ${escapeHtml(title)}
            </span>

            <input class="service-opacity" type="range" min="0" max="1" step="0.05" value="${layer.opacity ?? 0.85}">
        `;

        const serviceCheck = serviceRow.querySelector("input[type='checkbox']");
        const toggle = serviceRow.querySelector(".sublayer-toggle");
        const opacity = serviceRow.querySelector(".service-opacity");

        serviceCheck.onchange = e => {
            e.stopPropagation();
            layer.visible = e.target.checked;
            renderSearchLayerSelect();
            renderTableLayerSelect();
        };

        toggle.onclick = e => {
            e.stopPropagation();

            if (isServiceOpen) {
                openServices.delete(layer.id);
            } else {
                openServices.add(layer.id);
            }

            renderServiceList();
        };

        opacity.oninput = e => {
            layer.opacity = Number(e.target.value);
        };

        serviceWrap.appendChild(serviceRow);

        if (isServiceOpen) {
            if (layer.loaded && layer.sublayers) {
                const sublayerContainer = document.createElement("div");
                sublayerContainer.className = "sublayer-tree";

                renderSublayerTree(layer.sublayers, sublayerContainer, 1, layer.id);

                serviceWrap.appendChild(sublayerContainer);
            } else {
                const loading = document.createElement("div");
                loading.className = "sublayer-loading";
                loading.textContent = "Cargando subcapas...";
                serviceWrap.appendChild(loading);
            }
        }

        list.appendChild(serviceWrap);
    });

    if (!list.children.length) {
        list.innerHTML = '<div class="attribute-empty">Sin servicios coincidentes.</div>';
    }
}


function renderSublayerTree(sublayers, parent, depth = 1, serviceId = "") {
    if (!sublayers) return;

    [...sublayers]
        .sort((a, b) => a.id - b.id)
        .forEach(sublayer => {

            const hasChildren =
                sublayer.sublayers &&
                sublayer.sublayers.length > 0;

        const groupKey = `${serviceId}_${sublayer.id}`;
        const isOpen = openSublayerGroups.has(groupKey);

        const row = document.createElement("div");

        row.className = hasChildren
            ? "service-row sublayer-row sublayer-group"
            : "service-row sublayer-row";

        row.style.paddingLeft = `${depth * 18}px`;

        row.innerHTML = `
            <input type="checkbox" ${sublayer.visible ? "checked" : ""}>

            <span class="sublayer-toggle">
                ${hasChildren ? (isOpen ? "▾" : "▸") : "•"}
            </span>

            <span class="service-title" title="${escapeHtml(sublayer.title)}">
                ${escapeHtml(sublayer.title)}
                <span class="sublayer-id">(${sublayer.id})</span>
            </span>
        `;

        const checkbox = row.querySelector("input");
        const toggle = row.querySelector(".sublayer-toggle");

        checkbox.onchange = e => {
            e.stopPropagation();
            setSublayerVisibilityRecursive(sublayer, e.target.checked);
            renderServiceList();
        };

        if (hasChildren) {
            toggle.onclick = e => {
                e.stopPropagation();

                if (isOpen) {
                    openSublayerGroups.delete(groupKey);
                } else {
                    openSublayerGroups.add(groupKey);
                }

                renderServiceList();
            };

            row.ondblclick = e => {
                e.stopPropagation();

                if (isOpen) {
                    openSublayerGroups.delete(groupKey);
                } else {
                    openSublayerGroups.add(groupKey);
                }

                renderServiceList();
            };
        }

        parent.appendChild(row);

        if (hasChildren && isOpen) {
            renderSublayerTree(
                sublayer.sublayers,
                parent,
                depth + 1,
                serviceId
            );
        }
    });
}

function setSublayerVisibilityRecursive(sublayer, visible) {
    sublayer.visible = visible;

    if (sublayer.sublayers && sublayer.sublayers.length) {
        sublayer.sublayers.forEach(child => {
            setSublayerVisibilityRecursive(child, visible);
        });
    }
}

//----------------------------------------------------------


    function showAllServices() {
        APP.layers.forEach(layer => layer.visible = true);
        renderServiceList();
        renderSearchLayerSelect();
        renderTableLayerSelect();
    }

    function hideAllServices() {
        APP.layers.forEach(layer => layer.visible = false);
        renderServiceList();
        renderSearchLayerSelect();
        renderTableLayerSelect();
    }

    /* ============================================================
       SUBCAPAS
       ============================================================ */

    function flattenSublayers(layer) {
        const out = [];

        function walk(collection) {
            if (!collection) return;

            collection.forEach(sublayer => {
                if (sublayer.sublayers && sublayer.sublayers.length) {
                    walk(sublayer.sublayers);
                } else {
                    out.push(sublayer);
                }
            });
        }

        walk(layer.sublayers);
        return out.sort((a, b) => a.id - b.id);
    }

    function visibleOperationalLayers() {
        return APP.layers.filter(layer => layer.visible);
    }

    function getSelectedService(selectId) {
        const id = document.getElementById(selectId).value;
        return APP.layerById.get(id);
    }

    /* ============================================================
       IDENTIFICACIÓN
       ============================================================ */

    view.on("click", event => {
        const layers = visibleOperationalLayers();

        if (!layers.length) {
            return;
        }

        const infoBox = document.getElementById("infoBox");
        const infoBody = document.getElementById("infoBody");

        infoBox.classList.add("show");
        infoBody.textContent = "Consultando capas visibles...";

        identifyResults = [];
        identifyIndex = 0;

        const tasks = layers.map(layer => {
            const params = new IdentifyParameters({
                geometry: event.mapPoint,
                mapExtent: view.extent,
                width: view.width,
                height: view.height,
                tolerance: 5,
                returnGeometry: true,
                layerOption: "visible",
                spatialReference: view.spatialReference
            });

            return identify.identify(layer.url, params)
                .then(response => ({
                    layer,
                    results: response.results || []
                }))
                .catch(error => {
                    console.warn("Error identify:", layer.title, error);
                    return { layer, results: [] };
                });
        });

        Promise.all(tasks).then(responses => {
            responses.forEach(response => {
                response.results.forEach(result => {
                    identifyResults.push({
                        serviceTitle: response.layer.title,
                        layerName: result.layerName,
                        feature: result.feature,
                        attributes: result.feature?.attributes || {}
                    });
                });
            });

            renderIdentifyPage();
        });
    });

    function renderIdentifyPage() {
        const infoBody = document.getElementById("infoBody");

        if (!identifyResults.length) {
            infoBody.textContent = "Sin resultados en las capas visibles.";
            return;
        }

        const item = identifyResults[identifyIndex];
        const attributes = item.attributes || {};

        let html = `
            <div class="identify-pager">
                <button id="identifyPrev" type="button">◀ Anterior</button>
                <span>${identifyIndex + 1} de ${identifyResults.length}</span>
                <button id="identifyNext" type="button">Siguiente ▶</button>
            </div>

            <div class="popup">
                <h4>${escapeHtml(item.layerName || item.serviceTitle)}</h4>
                <div class="result-title">${escapeHtml(item.serviceTitle)}</div>
                <table>
        `;

        Object.keys(attributes).slice(0, 40).forEach(key => {
            html += `
                <tr>
                    <td>${escapeHtml(key)}</td>
                    <td>${formatAttributeValue(attributes[key])}</td>
                </tr>
            `;
        });

        html += `
                </table>
            </div>
        `;

        infoBody.innerHTML = html;

        document.getElementById("identifyPrev").onclick = () => {
            identifyIndex = identifyIndex <= 0 ? identifyResults.length - 1 : identifyIndex - 1;
            renderIdentifyPage();
        };

        document.getElementById("identifyNext").onclick = () => {
            identifyIndex = identifyIndex >= identifyResults.length - 1 ? 0 : identifyIndex + 1;
            renderIdentifyPage();
        };

        highlightFeature(item.feature);
    }

    /* ============================================================
       BUSCADOR
       ============================================================ */

    function renderSearchLayerSelect() {
        const select = document.getElementById("searchLayer");
        if (!select) return;
        const current = select.value;

        select.innerHTML = "";

        visibleOperationalLayers().forEach(layer => {
            const option = document.createElement("option");
            option.value = layer.id;
            option.textContent = layer.title;
            select.appendChild(option);
        });

        if (current && [...select.options].some(opt => opt.value === current)) {
            select.value = current;
        }

        renderSearchSubLayerSelect();
    }

    function renderSearchSubLayerSelect() {
        const service = getSelectedService("searchLayer");
        const select = document.getElementById("searchSubLayer");
        if (!select) return;

        select.innerHTML = "";

        if (!service || !service.loaded) {
            select.innerHTML = '<option value="">Sin subcapas</option>';
            renderSearchFields();
            return;
        }

        flattenSublayers(service).forEach(sl => {
            const option = document.createElement("option");
            option.value = sl.id;
            option.textContent = `${sl.id} - ${sl.title}`;
            select.appendChild(option);
        });

        renderSearchFields();
    }

    function renderSearchFields() {
        const service = getSelectedService("searchLayer");
        const sublayerId = document.getElementById("searchSubLayer").value;
        const fieldSelect = document.getElementById("searchField");
        if (!fieldSelect) return;

        fieldSelect.innerHTML = '<option value="">Cargando campos...</option>';

        if (!service || sublayerId === "") {
            fieldSelect.innerHTML = '<option value="">Sin campos</option>';
            return;
        }

        const sl = service.findSublayerById(Number(sublayerId));

        if (!sl) {
            fieldSelect.innerHTML = '<option value="">Sin campos</option>';
            return;
        }

        sl.load()
            .then(() => {
                fieldSelect.innerHTML = "";

                (sl.fields || []).forEach(field => {
                    if (field.type === "geometry" || field.type === "blob" || field.type === "raster") {
                        return;
                    }

                    const option = document.createElement("option");
                    option.value = field.name;
                    option.textContent = field.alias || field.name;
                    fieldSelect.appendChild(option);
                });

                if (!fieldSelect.children.length) {
                    fieldSelect.innerHTML = '<option value="">Sin campos</option>';
                }
            })
            .catch(() => {
                fieldSelect.innerHTML = '<option value="">Error cargando campos</option>';
            });
    }

    function runAttributeSearch() {
        const service = getSelectedService("searchLayer");
        const sublayerId = document.getElementById("searchSubLayer").value;
        const field = document.getElementById("searchField").value;
        const value = document.getElementById("searchValue").value.trim();
        const results = document.getElementById("searchResults");

        if (!service || sublayerId === "" || !field || !value) {
            results.textContent = "Selecciona servicio, subcapa, campo y valor.";
            return;
        }

        const url = `${service.url}/${sublayerId}`;

        const q = new Query({
            where: `${field} LIKE '%${escapeSql(value)}%'`,
            outFields: ["*"],
            returnGeometry: true,
            spatialRelationship: "intersects",
            outSpatialReference: view.spatialReference,
            num: 100
        });

        results.textContent = "Buscando...";

        query.executeQueryJSON(url, q)
            .then(featureSet => {
                const features = featureSet.features || [];

                highlightLayer.removeAll();

                if (!features.length) {
                    results.textContent = "Sin resultados.";
                    return;
                }

                results.innerHTML = `<b>${features.length}</b> resultado(s).`;

                features.forEach((feature, index) => {
                    const attrs = feature.attributes || {};
                    const main =
                        attrs[field] ??
                        attrs.NOMBRE ??
                        attrs.Nombre ??
                        attrs.nombre ??
                        attrs.OBJECTID ??
                        `Resultado ${index + 1}`;

                    const row = document.createElement("div");
                    row.className = "result-row";
                    row.innerHTML = `
                        <div class="result-title">${escapeHtml(main)}</div>
                        <div>${Object.entries(attrs).slice(0, 4).map(([k, v]) => `<b>${escapeHtml(k)}</b>: ${formatAttributeValue(v)}`).join("<br>")}</div>
                    `;

                    row.onclick = () => zoomToFeature(feature);
                    results.appendChild(row);
                });

                zoomToFeature(features[0]);
            })
            .catch(error => {
                results.textContent = "Error en búsqueda REST: " + error.message;
            });
    }

    function clearSearch() {
        highlightLayer.removeAll();
        document.getElementById("searchResults").textContent = "Búsqueda limpiada.";
    }

    /* ============================================================
       BUSCADOR DE DIRECCIONES Y LUGARES ESRI
       ============================================================ */

    function runAddressSearch() {
        const input = document.getElementById("addressSearchValue");
        const results = document.getElementById("addressSearchResults");

        if (!input || !results) return;

        const text = input.value.trim();

        if (!text) {
            results.textContent = "Introduce una dirección, municipio o lugar.";
            return;
        }

        results.textContent = "Buscando en el localizador de Esri...";

        locator.addressToLocations(APP.geocoderUrl, {
            address: {
                SingleLine: text
            },
            categories: [],
            outFields: ["*"],
            maxLocations: 10,
            outSpatialReference: APP.sr
        })
            .then(candidates => {
                coordMarkerLayer.removeAll();

                const valid = (candidates || []).filter(candidate => {
                    return candidate && candidate.location && candidate.score >= 70;
                });

                if (!valid.length) {
                    results.textContent = "Sin resultados. Prueba con otra dirección o lugar.";
                    return;
                }

                results.innerHTML = `<b>${valid.length}</b> resultado(s) encontrados.`;

                valid.forEach((candidate, index) => {
                    const location = candidate.location;
                    const attrs = candidate.attributes || {};
                    const title = candidate.address || attrs.LongLabel || attrs.Match_addr || `Resultado ${index + 1}`;
                    const score = Math.round(candidate.score || 0);

                    const row = document.createElement("div");
                    row.className = "result-row";
                    row.innerHTML = `
                        <div class="result-title">${escapeHtml(title)}</div>
                        <div>Coincidencia: ${score}%</div>
                    `;

                    row.onclick = () => zoomToAddressCandidate(candidate);
                    results.appendChild(row);
                });

                zoomToAddressCandidate(valid[0]);
            })
            .catch(error => {
                console.error("Error en búsqueda de direcciones Esri:", error);
                results.textContent = "Error consultando el localizador de Esri: " + (error.message || error);
            });
    }

    function zoomToAddressCandidate(candidate) {
        if (!candidate || !candidate.location) return;

        const point = candidate.location;
        const attrs = candidate.attributes || {};
        const title = candidate.address || attrs.LongLabel || attrs.Match_addr || "Resultado de búsqueda";

        coordMarkerLayer.removeAll();

        const marker = new Graphic({
            geometry: point,
            symbol: {
                type: "simple-marker",
                style: "circle",
                color: [0, 116, 217, 0.95],
                size: 14,
                outline: {
                    color: [255, 255, 255, 1],
                    width: 3
                }
            },
            attributes: {
                Dirección: title,
                Puntuación: Math.round(candidate.score || 0)
            },
            popupTemplate: {
                title: "Dirección / lugar",
                content: `${escapeHtml(title)}<br>Coincidencia: ${Math.round(candidate.score || 0)}%`
            }
        });

        coordMarkerLayer.add(marker);

        view.goTo({
            target: point,
            scale: 5000
        }, {
            duration: 600
        }).then(() => {
            view.openPopup({
                features: [marker],
                location: point
            });
        }).catch(() => {});
    }

    function clearAddressSearch() {
        coordMarkerLayer.removeAll();
        const results = document.getElementById("addressSearchResults");
        const input = document.getElementById("addressSearchValue");
        if (input) input.value = "";
        if (results) results.textContent = "Búsqueda limpiada.";
    }

    /* ============================================================
       TABLA DE ATRIBUTOS
       ============================================================ */

    function toggleAttributeTable() {
        const box = document.getElementById("attributeTableBox");
        box.classList.toggle("show");

        if (box.classList.contains("show")) {
            renderTableLayerSelect();
            setTimeout(() => view.resize(), 150);
        }
    }

    function renderTableLayerSelect() {
        const select = document.getElementById("tableLayerSelect");
        if (!select) return;

        const current = select.value;
        select.innerHTML = "";

        visibleOperationalLayers().forEach(layer => {
            const option = document.createElement("option");
            option.value = layer.id;
            option.textContent = layer.title;
            select.appendChild(option);
        });

        if (!select.children.length) {
            select.innerHTML = '<option value="">No hay servicios visibles</option>';
        } else if (current && [...select.options].some(opt => opt.value === current)) {
            select.value = current;
        }

        renderTableSubLayerSelect();
    }

    function renderTableSubLayerSelect() {
        const service = getSelectedService("tableLayerSelect");
        const select = document.getElementById("tableSubLayerSelect");
        if (!select) return;

        select.innerHTML = "";

        if (!service || !service.loaded) {
            select.innerHTML = '<option value="">Sin subcapas</option>';
            return;
        }

        flattenSublayers(service).forEach(sl => {
            const option = document.createElement("option");
            option.value = sl.id;
            option.textContent = `${sl.id} - ${sl.title}`;
            select.appendChild(option);
        });
    }

    async function loadAttributeTable() {
        const service = getSelectedService("tableLayerSelect");
        const sublayerId = document.getElementById("tableSubLayerSelect").value;
        const content = document.getElementById("attributeTableContent");

        if (!service || sublayerId === "") {
            content.innerHTML = '<div class="attribute-empty">Selecciona un servicio visible y una subcapa.</div>';
            resetAttributeTableState();
            return;
        }

        content.innerHTML = '<div class="attribute-loading"><span class="table-spinner"></span>Cargando tabla de atributos...</div>';
        resetAttributeTableState(false);
        attributeTableUrl = `${service.url}/${sublayerId}`;
        const sublayer = flattenSublayers(service).find(sl => String(sl.id) === String(sublayerId));

        try {
            if (sublayer && typeof sublayer.load === "function") {
                await sublayer.load();
                (sublayer.fields || []).forEach(field => {
                    attributeTableFieldAliases[field.name] = field.alias || field.name;
                    attributeTableFieldTypes[field.name] = field.type || "string";
                });
            }

            attributeTableFields = Object.keys(attributeTableFieldAliases).slice(0, 45);
            attributeTableWhere = buildAttributeTableWhere();
            await fetchAttributeTablePage();
        } catch (error) {
            content.innerHTML = `<div class="attribute-empty">Error cargando tabla REST: ${escapeHtml(error.message)}</div>`;
            updateAttributePageInfo();
            updateAttributeRecordCount();
        }
    }

    function resetAttributeTableState(clearUrl = true) {
        attributeTableRows = [];
        attributeTableFields = [];
        attributeTableFieldAliases = {};
        attributeTableFieldTypes = {};
        attributeTablePage = 1;
        attributeTableTotalCount = 0;
        attributeTableSortField = null;
        attributeTableSortDirection = "asc";
        attributeTableSelectedIndex = null;
        attributeTableWhere = "1=1";
        if (clearUrl) attributeTableUrl = null;
        updateAttributePageInfo();
        updateAttributeRecordCount();
    }

    function escapeSqlLiteral(value) {
        return String(value).replace(/'/g, "''");
    }

    function buildAttributeTableWhere() {
        const text = (document.getElementById("tableFilter")?.value || "").trim();
        if (!text) return "1=1";

        const escaped = escapeSqlLiteral(text);
        const numericValue = Number(text.replace(",", "."));
        const clauses = [];

        attributeTableFields.forEach(field => {
            const type = String(attributeTableFieldTypes[field] || "").toLowerCase();
            if (type.includes("string") || type.includes("guid") || type.includes("global-id")) {
                clauses.push(`${field} LIKE '%${escaped}%'`);
            } else if (!Number.isNaN(numericValue) && (
                type.includes("integer") || type.includes("double") || type.includes("single") ||
                type.includes("small-integer") || type.includes("oid")
            )) {
                clauses.push(`${field} = ${numericValue}`);
            }
        });

        return clauses.length ? `(${clauses.join(" OR ")})` : "1=0";
    }

    function applyAttributeTableFilter() {
        clearTimeout(attributeTableSearchTimer);
        attributeTableSearchTimer = setTimeout(async () => {
            if (!attributeTableUrl) return;
            attributeTablePage = 1;
            attributeTableWhere = buildAttributeTableWhere();
            await fetchAttributeTablePage();
        }, 350);
    }

    async function fetchAttributeTablePage() {
        if (!attributeTableUrl) return;
        const content = document.getElementById("attributeTableContent");
        const requestId = ++attributeTableRequestId;
        content.innerHTML = '<div class="attribute-loading"><span class="table-spinner"></span>Consultando registros...</div>';

        try {
            const countQuery = new Query({ where: attributeTableWhere });
            const total = await query.executeForCount(attributeTableUrl, countQuery);
            if (requestId !== attributeTableRequestId) return;

            attributeTableTotalCount = Number(total) || 0;
            const totalPages = Math.max(1, Math.ceil(attributeTableTotalCount / ATTRIBUTE_PAGE_SIZE));
            attributeTablePage = Math.min(Math.max(attributeTablePage, 1), totalPages);

            if (!attributeTableTotalCount) {
                attributeTableRows = [];
                renderAttributeTablePage();
                return;
            }

            const pageQuery = new Query({
                where: attributeTableWhere,
                outFields: ["*"],
                returnGeometry: true,
                outSpatialReference: view.spatialReference,
                start: (attributeTablePage - 1) * ATTRIBUTE_PAGE_SIZE,
                num: ATTRIBUTE_PAGE_SIZE
            });

            if (attributeTableSortField) {
                pageQuery.orderByFields = [`${attributeTableSortField} ${attributeTableSortDirection.toUpperCase()}`];
            }

            const featureSet = await query.executeQueryJSON(attributeTableUrl, pageQuery);
            if (requestId !== attributeTableRequestId) return;

            const features = featureSet.features || [];
            if (!attributeTableFields.length && features.length) {
                attributeTableFields = Object.keys(features[0].attributes || {}).slice(0, 45);
                attributeTableFields.forEach(field => {
                    if (!attributeTableFieldAliases[field]) attributeTableFieldAliases[field] = field;
                });
            }

            const pageStart = (attributeTablePage - 1) * ATTRIBUTE_PAGE_SIZE;
            attributeTableRows = features.map((feature, offset) => ({
                index: pageStart + offset,
                feature,
                props: feature.attributes || {}
            }));
            attributeTableSelectedIndex = null;
            renderAttributeTablePage();
        } catch (error) {
            if (requestId !== attributeTableRequestId) return;
            content.innerHTML = `<div class="attribute-empty">Error consultando la tabla: ${escapeHtml(error.message)}</div>`;
            updateAttributePageInfo();
            updateAttributeRecordCount();
        }
    }

    async function setAttributeTableSort(field) {
        if (attributeTableSortField === field) {
            attributeTableSortDirection = attributeTableSortDirection === "asc" ? "desc" : "asc";
        } else {
            attributeTableSortField = field;
            attributeTableSortDirection = "asc";
        }
        attributeTablePage = 1;
        await fetchAttributeTablePage();
    }

    function renderAttributeTablePage() {
        const content = document.getElementById("attributeTableContent");

        if (!attributeTableRows.length) {
            content.innerHTML = '<div class="attribute-empty">Sin registros para mostrar.</div>';
            updateAttributePageInfo();
            updateAttributeRecordCount();
            return;
        }

        let html = '<table class="professional-attribute-table"><thead><tr>';
        attributeTableFields.forEach(field => {
            const alias = attributeTableFieldAliases[field] || field;
            const active = attributeTableSortField === field;
            const indicator = active ? (attributeTableSortDirection === "asc" ? "▲" : "▼") : "↕";
            html += `<th data-field="${escapeHtml(field)}" title="${escapeHtml(field)}"><button class="table-sort-button" type="button" data-sort-field="${escapeHtml(field)}"><span>${escapeHtml(alias)}</span><small>${indicator}</small></button><span class="column-resizer" aria-hidden="true"></span></th>`;
        });
        html += "</tr></thead><tbody>";

        attributeTableRows.forEach(row => {
            const selected = row.index === attributeTableSelectedIndex ? " selected" : "";
            html += `<tr class="${selected.trim()}" data-row-index="${row.index}" tabindex="0">`;
            attributeTableFields.forEach(field => {
                const rawValue = row.props[field] ?? "";
                html += `<td data-field="${escapeHtml(field)}" title="${escapeHtml(rawValue)}">${formatAttributeValue(rawValue)}</td>`;
            });
            html += "</tr>";
        });
        html += "</tbody></table>";
        content.innerHTML = html;

        content.querySelectorAll("button[data-sort-field]").forEach(button => {
            button.addEventListener("click", () => setAttributeTableSort(button.dataset.sortField));
        });

        content.querySelectorAll("tr[data-row-index]").forEach(tr => {
            const selectRow = (zoom = false) => {
                attributeTableSelectedIndex = Number(tr.dataset.rowIndex);
                content.querySelectorAll("tr.selected").forEach(item => item.classList.remove("selected"));
                tr.classList.add("selected");
                const row = attributeTableRows.find(item => item.index === attributeTableSelectedIndex);
                highlightFeature(row?.feature);
                if (zoom) zoomToFeature(row?.feature);
            };
            tr.addEventListener("click", () => selectRow(false));
            tr.addEventListener("dblclick", () => selectRow(true));
            tr.addEventListener("keydown", event => {
                if (event.key === "Enter") selectRow(true);
            });
        });

        enableAttributeColumnResizing(content.querySelector("table"));
        updateAttributePageInfo();
        updateAttributeRecordCount();
    }

    function enableAttributeColumnResizing(table) {
        if (!table) return;
        table.querySelectorAll(".column-resizer").forEach(resizer => {
            resizer.addEventListener("mousedown", event => {
                event.preventDefault();
                event.stopPropagation();
                const th = resizer.closest("th");
                const startX = event.clientX;
                const startWidth = th.getBoundingClientRect().width;
                const onMove = moveEvent => {
                    const width = Math.max(80, startWidth + moveEvent.clientX - startX);
                    th.style.width = `${width}px`;
                    th.style.minWidth = `${width}px`;
                    th.style.maxWidth = `${width}px`;
                };
                const onUp = () => {
                    document.removeEventListener("mousemove", onMove);
                    document.removeEventListener("mouseup", onUp);
                    document.body.classList.remove("resizing-table-column");
                };
                document.body.classList.add("resizing-table-column");
                document.addEventListener("mousemove", onMove);
                document.addEventListener("mouseup", onUp);
            });
        });
    }

    function updateAttributePageInfo() {
        const pageInfo = document.getElementById("attributeTablePageInfo");
        if (!pageInfo) return;
        const totalPages = attributeTableTotalCount ? Math.ceil(attributeTableTotalCount / ATTRIBUTE_PAGE_SIZE) : 0;
        pageInfo.textContent = `${attributeTableTotalCount ? attributeTablePage : 0} / ${totalPages}`;

        const first = document.getElementById("attributeFirstPage");
        const prev = document.getElementById("attributePrevPage");
        const next = document.getElementById("attributeNextPage");
        const last = document.getElementById("attributeLastPage");
        if (first) first.disabled = attributeTablePage <= 1;
        if (prev) prev.disabled = attributeTablePage <= 1;
        if (next) next.disabled = !totalPages || attributeTablePage >= totalPages;
        if (last) last.disabled = !totalPages || attributeTablePage >= totalPages;
    }

    function updateAttributeRecordCount() {
        const element = document.getElementById("attributeTableRecordCount");
        if (!element) return;
        if (!attributeTableTotalCount) {
            element.textContent = "0 registros";
            return;
        }
        const first = (attributeTablePage - 1) * ATTRIBUTE_PAGE_SIZE + 1;
        const last = Math.min(attributeTablePage * ATTRIBUTE_PAGE_SIZE, attributeTableTotalCount);
        element.textContent = `${first.toLocaleString("es-ES")}-${last.toLocaleString("es-ES")} de ${attributeTableTotalCount.toLocaleString("es-ES")} registros`;
    }

    async function nextAttributePage() {
        const totalPages = Math.max(1, Math.ceil(attributeTableTotalCount / ATTRIBUTE_PAGE_SIZE));
        if (attributeTablePage < totalPages) {
            attributeTablePage++;
            await fetchAttributeTablePage();
        }
    }

    async function prevAttributePage() {
        if (attributeTablePage > 1) {
            attributeTablePage--;
            await fetchAttributeTablePage();
        }
    }

    async function firstAttributePage() {
        if (attributeTablePage !== 1) {
            attributeTablePage = 1;
            await fetchAttributeTablePage();
        }
    }

    async function lastAttributePage() {
        const totalPages = Math.max(1, Math.ceil(attributeTableTotalCount / ATTRIBUTE_PAGE_SIZE));
        if (attributeTablePage !== totalPages) {
            attributeTablePage = totalPages;
            await fetchAttributeTablePage();
        }
    }

    async function exportAttributeTableCsv() {
        if (!attributeTableUrl || !attributeTableTotalCount) {
            alert("No hay registros para exportar.");
            return;
        }

        const button = document.querySelector('[onclick="exportAttributeTableCsv()"]');
        const originalText = button?.textContent;
        if (button) {
            button.disabled = true;
            button.textContent = "Exportando...";
        }

        try {
            const allFeatures = [];
            for (let start = 0; start < attributeTableTotalCount; start += ATTRIBUTE_EXPORT_BATCH_SIZE) {
                const q = new Query({
                    where: attributeTableWhere,
                    outFields: ["*"],
                    returnGeometry: false,
                    start,
                    num: Math.min(ATTRIBUTE_EXPORT_BATCH_SIZE, attributeTableTotalCount - start)
                });
                if (attributeTableSortField) {
                    q.orderByFields = [`${attributeTableSortField} ${attributeTableSortDirection.toUpperCase()}`];
                }
                const featureSet = await query.executeQueryJSON(attributeTableUrl, q);
                allFeatures.push(...(featureSet.features || []));
            }

            const separator = ";";
            const header = attributeTableFields.map(field => csvValue(attributeTableFieldAliases[field] || field)).join(separator);
            const body = allFeatures.map(feature => {
                const attrs = feature.attributes || {};
                return attributeTableFields.map(field => csvValue(attrs[field] ?? "")).join(separator);
            }).join("\n");

            const csv = "\ufeff" + header + "\n" + body;
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            const selectedService = document.getElementById("tableLayerSelect");
            const serviceName = selectedService?.selectedOptions?.[0]?.textContent || "tabla_atributos";
            link.href = url;
            link.download = `${safeFileName(serviceName)}.csv`;
            link.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
            alert(`No se pudo completar la exportación: ${error.message}`);
        } finally {
            if (button) {
                button.disabled = false;
                button.textContent = originalText;
            }
        }
    }


    /* ============================================================
       MARCADORES
       ============================================================ */

    function getLayerIdAliases(layer) {
        return [layer.id, layer.legacyId].filter(Boolean);
    }

    function getBookmarkValueByLayerId(source, layer) {
        if (!source || typeof source !== "object") return undefined;

        for (const id of getLayerIdAliases(layer)) {
            if (Object.prototype.hasOwnProperty.call(source, id)) {
                return source[id];
            }
        }

        return undefined;
    }

    function bookmarkContainsLayer(bookmark, layer) {
        if (!Array.isArray(bookmark.visibleLayers)) return false;
        return getLayerIdAliases(layer).some(id => bookmark.visibleLayers.includes(id));
    }

    function migrateBookmarkLayerIds(bookmark) {
        if (!bookmark || typeof bookmark !== "object") return bookmark;

        const migrated = { ...bookmark };
        const visibleLayers = [];
        const visibleSublayers = {};
        const layerOpacities = {};

        APP.layers.forEach(layer => {
            if (bookmarkContainsLayer(bookmark, layer)) {
                visibleLayers.push(layer.id);
            }

            const sublayers = getBookmarkValueByLayerId(bookmark.visibleSublayers, layer);
            if (Array.isArray(sublayers)) {
                visibleSublayers[layer.id] = sublayers.map(Number).filter(Number.isFinite);
            }

            const opacity = getBookmarkValueByLayerId(bookmark.layerOpacities, layer);
            if (opacity !== undefined && Number.isFinite(Number(opacity))) {
                layerOpacities[layer.id] = Number(opacity);
            }
        });

        if (Array.isArray(bookmark.visibleLayers)) migrated.visibleLayers = visibleLayers;
        if (bookmark.visibleSublayers) migrated.visibleSublayers = visibleSublayers;
        if (bookmark.layerOpacities) migrated.layerOpacities = layerOpacities;

        return migrated;
    }

    function normalizeImportedBookmark(item, index) {
        if (!item ||
            !Number.isFinite(Number(item.xmin)) ||
            !Number.isFinite(Number(item.ymin)) ||
            !Number.isFinite(Number(item.xmax)) ||
            !Number.isFinite(Number(item.ymax))) {
            return null;
        }

        return migrateBookmarkLayerIds({
            id: item.id || "bm_import_" + Date.now() + "_" + index,
            name: item.name || "Marcador importado " + (index + 1),
            xmin: Number(item.xmin),
            ymin: Number(item.ymin),
            xmax: Number(item.xmax),
            ymax: Number(item.ymax),
            wkid: Number(item.wkid || 25829),
            scale: item.scale ? Number(item.scale) : null,
            createdAt: item.createdAt || new Date().toISOString(),
            activeBase: item.activeBase || null,
            pnoaYear: item.pnoaYear || null,
            visibleLayers: Array.isArray(item.visibleLayers) ? item.visibleLayers : null,
            visibleSublayers: item.visibleSublayers && typeof item.visibleSublayers === "object"
                ? item.visibleSublayers
                : null,
            layerOpacities: item.layerOpacities && typeof item.layerOpacities === "object"
                ? item.layerOpacities
                : null
        });
    }

    function loadBookmarks() {
        try {
            const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
            const parsed = stored ? JSON.parse(stored) : [];
            const storedBookmarks = Array.isArray(parsed)
                ? parsed
                : (Array.isArray(parsed?.bookmarks) ? parsed.bookmarks : []);

            bookmarks = storedBookmarks
                .map((item, index) => normalizeImportedBookmark(item, index))
                .filter(Boolean);

            persistBookmarks();
        } catch (error) {
            console.warn("No se pudieron cargar los marcadores:", error);
            bookmarks = [];
        }

        renderBookmarks();
    }

    function persistBookmarks() {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    }

    function saveBookmark() {
        if (!view || !view.extent) {
            alert("El mapa todavía no está listo para guardar marcadores.");
            return;
        }

        const nombre = prompt("Nombre del marcador:", "Marcador " + (bookmarks.length + 1));
        if (!nombre || !nombre.trim()) return;

        const extent = view.extent.clone ? view.extent.clone() : view.extent;
        const visibleLayers = APP.layers.filter(layer => layer.visible).map(layer => layer.id);
        const layerOpacities = {};
        const visibleSublayers = {};

        APP.layers.forEach(layer => {
            layerOpacities[layer.id] = layer.opacity ?? 0.85;

            if (!layer.loaded || !layer.sublayers) return;
            visibleSublayers[layer.id] = flattenSublayers(layer)
                .filter(sublayer => sublayer.visible)
                .map(sublayer => Number(sublayer.id));
        });

        bookmarks.push({
            id: "bm_" + Date.now(),
            name: nombre.trim(),
            xmin: extent.xmin,
            ymin: extent.ymin,
            xmax: extent.xmax,
            ymax: extent.ymax,
            wkid: extent.spatialReference?.wkid || 25829,
            scale: view.scale,
            createdAt: new Date().toISOString(),
            activeBase: APP.activeBase,
            pnoaYear: document.getElementById("pnoaYearSelect")?.value || null,
            visibleLayers,
            visibleSublayers,
            layerOpacities
        });

        persistBookmarks();
        renderBookmarks();
    }

    function renderBookmarks() {
        const container = document.getElementById("bookmarkList");
        if (!container) return;

        if (!bookmarks.length) {
            container.innerHTML = '<div class="attribute-empty">No hay marcadores guardados.</div>';
            return;
        }

        container.innerHTML = "";

        bookmarks.forEach((bookmark, index) => {
            const row = document.createElement("div");
            row.className = "result-row bookmark-row";
            row.innerHTML = `
                <div class="result-title">${escapeHtml(bookmark.name)}</div>
                <div class="bookmark-meta">
                    EPSG:${escapeHtml(bookmark.wkid || 25829)}
                    ${bookmark.scale ? " · 1:" + Math.round(bookmark.scale).toLocaleString("es-ES") : ""}
                </div>
                <div class="search-actions bookmark-actions">
                    <button class="smallbtn" type="button" data-action="go">Ir</button>
                    <button class="smallbtn" type="button" data-action="rename">Renombrar</button>
                    <button class="smallbtn" type="button" data-action="delete">Eliminar</button>
                </div>
            `;

            row.querySelector('[data-action="go"]').onclick = event => {
                event.preventDefault();
                event.stopPropagation();
                zoomToBookmark(bookmark);
            };
            row.querySelector('[data-action="rename"]').onclick = event => {
                event.preventDefault();
                event.stopPropagation();
                renameBookmark(index);
            };
            row.querySelector('[data-action="delete"]').onclick = event => {
                event.preventDefault();
                event.stopPropagation();
                deleteBookmark(index);
            };

            container.appendChild(row);
        });
    }

    async function restoreBookmarkLayer(layer, bookmark) {
        layer.visible = bookmarkContainsLayer(bookmark, layer);

        const opacity = getBookmarkValueByLayerId(bookmark.layerOpacities, layer);
        if (opacity !== undefined && Number.isFinite(Number(opacity))) {
            layer.opacity = Number(opacity);
        }

        const savedSublayers = getBookmarkValueByLayerId(bookmark.visibleSublayers, layer);
        if (!Array.isArray(savedSublayers)) return;

        try {
            if (!layer.loaded) await layer.load();
            if (!layer.sublayers) return;

            const visibleIds = new Set(savedSublayers.map(Number));
            flattenSublayers(layer).forEach(sublayer => {
                sublayer.visible = visibleIds.has(Number(sublayer.id));
            });
        } catch (error) {
            console.warn(`No se pudieron restaurar las subcapas de ${layer.title}:`, error);
        }
    }

    async function zoomToBookmark(bookmark) {
        if (!bookmark) return;

        if (bookmark.activeBase) setBase(bookmark.activeBase);

        if (bookmark.pnoaYear && bookmark.activeBase === "pnoa_historico_year") {
            const select = document.getElementById("pnoaYearSelect");
            if (select) select.value = bookmark.pnoaYear;
            setPnoaHistoricalYear(bookmark.pnoaYear);
        }

        if (Array.isArray(bookmark.visibleLayers)) {
            await Promise.allSettled(
                APP.layers.map(layer => restoreBookmarkLayer(layer, bookmark))
            );

            renderServiceList();
            renderSearchLayerSelect();
            renderTableLayerSelect();
        }

        const extent = new Extent({
            xmin: Number(bookmark.xmin),
            ymin: Number(bookmark.ymin),
            xmax: Number(bookmark.xmax),
            ymax: Number(bookmark.ymax),
            spatialReference: { wkid: Number(bookmark.wkid || 25829) }
        });

        try {
            await view.goTo(extent, { duration: 600 });
        } catch (error) {
            if (error?.name !== "AbortError") {
                console.warn("No se pudo ir al marcador:", error);
                alert("No se pudo ir al marcador. Revisa la consola del navegador.");
            }
        }
    }

    function renameBookmark(index) {
        const bookmark = bookmarks[index];
        if (!bookmark) return;

        const newName = prompt("Nuevo nombre del marcador:", bookmark.name);
        if (!newName || !newName.trim()) return;

        bookmark.name = newName.trim();
        persistBookmarks();
        renderBookmarks();
    }

    function deleteBookmark(index) {
        const bookmark = bookmarks[index];
        if (!bookmark) return;
        if (!confirm(`¿Eliminar el marcador "${bookmark.name}"?`)) return;

        bookmarks.splice(index, 1);
        persistBookmarks();
        renderBookmarks();
    }

    function clearBookmarks() {
        if (!bookmarks.length) {
            alert("No hay marcadores para eliminar.");
            return;
        }
        if (!confirm("¿Eliminar todos los marcadores guardados?")) return;

        bookmarks = [];
        persistBookmarks();
        renderBookmarks();
    }

    function exportBookmarksJson() {
        if (!bookmarks.length) {
            alert("No hay marcadores para exportar.");
            return;
        }

        const payload = {
            format: BOOKMARKS_FORMAT,
            version: BOOKMARKS_FORMAT_VERSION,
            exportedAt: new Date().toISOString(),
            bookmarks
        };
        const data = JSON.stringify(payload, null, 2);
        const blob = new Blob([data], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const date = new Date().toISOString().slice(0, 10);

        link.href = url;
        link.download = `marcadores_siams_${date}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 0);
    }

    function importBookmarks() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";
        input.style.display = "none";

        input.onchange = event => {
            const file = event.target.files?.[0];
            if (file) importBookmarksJson(file);
            input.remove();
        };

        document.body.appendChild(input);
        input.click();
    }

    function importBookmarksJson(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = event => {
            try {
                const parsed = JSON.parse(event.target.result);
                const imported = Array.isArray(parsed)
                    ? parsed
                    : (parsed?.format === BOOKMARKS_FORMAT && Array.isArray(parsed.bookmarks)
                        ? parsed.bookmarks
                        : null);

                if (!imported) {
                    alert("El archivo JSON no tiene un formato de marcadores compatible.");
                    return;
                }

                const valid = imported
                    .map((item, index) => normalizeImportedBookmark(item, index))
                    .filter(Boolean);

                if (!valid.length) {
                    alert("No se encontraron marcadores válidos en el archivo.");
                    return;
                }

                const existingIds = new Set(bookmarks.map(bookmark => bookmark.id));
                valid.forEach((bookmark, index) => {
                    if (existingIds.has(bookmark.id)) {
                        bookmark.id = `bm_import_${Date.now()}_${index}`;
                    }
                    existingIds.add(bookmark.id);
                });

                bookmarks = bookmarks.concat(valid);
                persistBookmarks();
                renderBookmarks();
                alert(`${valid.length} marcador(es) importado(s).`);
            } catch (error) {
                alert("No se pudo importar el archivo JSON de marcadores.");
                console.error("Error importando marcadores:", error);
            }
        };
        reader.onerror = () => alert("No se pudo leer el archivo seleccionado.");
        reader.readAsText(file, "utf-8");
    }

    /* ============================================================
       MEDICIÓN
       ============================================================ */

    function toggleMeasureBox() {
        document.getElementById("measureBox").classList.toggle("show");
    }

    function setMeasureTool(type) {
        if (type === "distance") {
            measurement.activeTool = "distance";
        } else if (type === "area") {
            measurement.activeTool = "area";
        }
    }

    function clearMeasurement() {
        measurement.clear();
    }

    /* ============================================================
       IMPRESIÓN HTML MEJORADA
       ============================================================ */

    function getActiveBaseTitle() {
        const def = baseDefs.find(item => item.id === APP.activeBase);
        return def ? def.title : (APP.activeBase || "Sin mapa base");
    }

    function getVisibleLayerTitles() {
        return APP.layers
            .filter(layer => layer.visible)
            .map(layer => layer.title || layer.customConfig?.title || layer.id);
    }

    function getCurrentCenterText() {
        const center = view.center;
        if (!center) return "-";
        return `X: ${center.x.toFixed(2)} · Y: ${center.y.toFixed(2)}`;
    }

    function getPrintOptions() {
        return {
            title: document.getElementById("printTitle")?.value || "Visor SIAMS",
            subtitle: document.getElementById("printSubtitle")?.value || "",
            paperSize: document.getElementById("printSize")?.value || "A4",
            orientation: document.getElementById("printOrientation")?.value || "landscape",
            showLegend: document.getElementById("printShowLegend")?.checked !== false,
            showLayerList: document.getElementById("printShowLayerList")?.checked !== false,
            showMetadata: document.getElementById("printShowMetadata")?.checked !== false
        };
    }

    function quickPrintPreset(size, orientation) {
        const sizeSelect = document.getElementById("printSize");
        const orientationSelect = document.getElementById("printOrientation");

        if (sizeSelect) sizeSelect.value = size;
        if (orientationSelect) orientationSelect.value = orientation;

        printMapTemplate();
    }

    function getPrintLayoutDimensions(options) {
        const isA3 = options.paperSize === "A3";
        const isLandscape = options.orientation === "landscape";

        return {
            pageLabel: `${options.paperSize} ${isLandscape ? "Horizontal" : "Vertical"}`,
            screenshotWidth: isLandscape ? (isA3 ? 1800 : 1500) : (isA3 ? 1300 : 1100),
            screenshotHeight: isLandscape ? (isA3 ? 1050 : 900) : (isA3 ? 1700 : 1400)
        };
    }

    function captureMapForPrint(options) {
        const dims = getPrintLayoutDimensions(options);

        return view.takeScreenshot({
            format: "png",
            quality: 100,
            width: dims.screenshotWidth,
            height: dims.screenshotHeight
        });
    }

    function buildVisibleLayersHtml() {
        const layers = getVisibleLayerTitles();

        if (!layers.length) {
            return "<li>No hay capas operacionales visibles.</li>";
        }

        return layers
            .map(title => `<li>${escapeHtml(title)}</li>`)
            .join("");
    }

    function buildPrintHtml(screenshot, options) {
        const date = new Date().toLocaleDateString("es-ES");
        const time = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
        const dims = getPrintLayoutDimensions(options);
        const activeBase = getActiveBaseTitle();
        const centerText = getCurrentCenterText();
        const scaleText = `1:${Math.round(view.scale).toLocaleString("es-ES")}`;
        const visibleLayersHtml = buildVisibleLayersHtml();
        const legendHtml = options.showLegend ? `
            <aside class="print-side-panel">
                <h3>Leyenda / capas visibles</h3>
                <ul>${visibleLayersHtml}</ul>
            </aside>
        ` : "";

        const layerSummary = options.showLayerList
            ? `<div><b>Capas visibles:</b> ${getVisibleLayerTitles().map(escapeHtml).join(", ") || "Ninguna"}</div>`
            : "";

        const metadataHtml = options.showMetadata ? `
            <div><b>Sistema de referencia:</b> EPSG:25829 · ETRS89 / UTM zona 29N</div>
            <div><b>Mapa base:</b> ${escapeHtml(activeBase)}</div>
            <div><b>Centro aproximado:</b> ${escapeHtml(centerText)}</div>
            <div><b>Escala aproximada:</b> ${escapeHtml(scaleText)}</div>
            ${layerSummary}
        ` : "";

        return `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="utf-8">
                <title>${escapeHtml(options.title)}</title>
                <style>
                    @page {
                        size: ${options.paperSize} ${options.orientation};
                        margin: 10mm;
                    }

                    * { box-sizing: border-box; }

                    body {
                        margin: 0;
                        font-family: Arial, Helvetica, sans-serif;
                        color: #24333b;
                        background: #eef3f7;
                    }

                    .preview-toolbar {
                        position: sticky;
                        top: 0;
                        z-index: 10;
                        display: flex;
                        gap: 8px;
                        align-items: center;
                        padding: 10px;
                        background: #084e7d;
                        color: white;
                        box-shadow: 0 2px 8px #0004;
                    }

                    .preview-toolbar button {
                        border: 0;
                        border-radius: 4px;
                        padding: 7px 12px;
                        cursor: pointer;
                        font-weight: bold;
                    }

                    .print-page {
                        width: 100%;
                        min-height: calc(100vh - 44px);
                        margin: 0 auto;
                        background: white;
                        display: flex;
                        flex-direction: column;
                        border: 2px solid #084e7d;
                    }

                    .print-header {
                        min-height: 74px;
                        display: flex;
                        align-items: center;
                        border-bottom: 2px solid #084e7d;
                        padding: 8px 14px;
                        gap: 14px;
                    }

                    .print-logo {
                        height: 56px;
                        max-width: 260px;
                        object-fit: contain;
                    }

                    .print-title-wrap {
                        flex: 1;
                        text-align: center;
                    }

                    .print-title {
                        font-size: 20px;
                        font-weight: bold;
                        color: #084e7d;
                    }

                    .print-subtitle {
                        margin-top: 4px;
                        font-size: 12px;
                        color: #51616d;
                    }

                    .print-date {
                        width: 125px;
                        text-align: right;
                        font-size: 11px;
                    }

                    .print-main {
                        flex: 1;
                        display: flex;
                        gap: 10px;
                        padding: 10px;
                        min-height: 0;
                    }

                    .print-map {
                        flex: 1;
                        min-width: 0;
                        border: 1px solid #aebdca;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #f8fafc;
                    }

                    .print-map img {
                        max-width: 100%;
                        max-height: 100%;
                        width: 100%;
                        object-fit: contain;
                    }

                    .print-side-panel {
                        width: 260px;
                        border: 1px solid #aebdca;
                        padding: 8px;
                        font-size: 11px;
                        overflow: hidden;
                    }

                    .print-side-panel h3 {
                        margin: 0 0 6px 0;
                        font-size: 12px;
                        color: #084e7d;
                    }

                    .print-side-panel ul {
                        margin: 0;
                        padding-left: 16px;
                    }

                    .print-side-panel li {
                        margin-bottom: 4px;
                    }

                    .print-footer {
                        border-top: 1px solid #aebdca;
                        padding: 7px 12px;
                        font-size: 10.5px;
                        display: grid;
                        grid-template-columns: 1fr auto;
                        gap: 8px;
                        align-items: end;
                    }

                    .print-footer-meta div {
                        margin: 2px 0;
                    }

                    .print-footer-page {
                        color: #5d6b75;
                        text-align: right;
                    }

                    @media print {
                        body { background: white; }
                        .preview-toolbar { display: none; }
                        .print-page {
                            min-height: 100vh;
                            border: 2px solid #084e7d;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="preview-toolbar">
                    <button onclick="window.print()">Imprimir</button>
                    <button onclick="downloadPreviewImage()">Descargar PNG</button>
                    <button onclick="window.close()">Cerrar</button>
                    <span>Vista previa · ${escapeHtml(dims.pageLabel)}</span>
                </div>

                <div class="print-page">
                    <div class="print-header">
                        <img class="print-logo" src="img/logo.png" alt="CHMS">
                        <div class="print-title-wrap">
                            <div class="print-title">${escapeHtml(options.title)}</div>
                            <div class="print-subtitle">${escapeHtml(options.subtitle)}</div>
                        </div>
                        <div class="print-date">${date}<br>${time}</div>
                    </div>

                    <div class="print-main">
                        <div class="print-map">
                            <img id="mapImage" src="${screenshot.dataUrl}" alt="Mapa">
                        </div>
                        ${legendHtml}
                    </div>

                    <div class="print-footer">
                        <div class="print-footer-meta">
                            ${metadataHtml}
                        </div>
                        <div class="print-footer-page">
                            Visor SIAMS v2<br>${escapeHtml(dims.pageLabel)}
                        </div>
                    </div>
                </div>

                <script>
                    function downloadPreviewImage() {
                        const link = document.createElement("a");
                        link.href = document.getElementById("mapImage").src;
                        link.download = "${safeFileName(options.title)}_${new Date().toISOString().slice(0, 10)}.png";
                        link.click();
                    }
                <\/script>
            </body>
            </html>
        `;
    }

    function printMapTemplate() {
        const options = getPrintOptions();

        captureMapForPrint(options)
            .then(screenshot => {
                const printWindow = window.open("", "_blank");

                if (!printWindow) {
                    alert("El navegador ha bloqueado la ventana emergente de impresión.");
                    return;
                }

                printWindow.document.open();
                printWindow.document.write(buildPrintHtml(screenshot, options));
                printWindow.document.close();
            })
            .catch(error => {
                console.error("Error generando vista previa de impresión:", error);
                alert("No se pudo generar la vista previa de impresión.");
            });
    }

    function downloadMapImage(format = "png") {
        const options = getPrintOptions();
        const isJpg = String(format).toLowerCase() === "jpg" || String(format).toLowerCase() === "jpeg";

        view.takeScreenshot({
            format: isJpg ? "jpg" : "png",
            quality: 100
        })
            .then(screenshot => {
                const link = document.createElement("a");
                const ext = isJpg ? "jpg" : "png";

                link.href = screenshot.dataUrl;
                link.download = `${safeFileName(options.title)}_${new Date().toISOString().slice(0, 10)}.${ext}`;
                link.click();
            })
            .catch(error => {
                console.error("Error descargando imagen:", error);
                alert("No se pudo descargar la imagen del mapa.");
            });
    }

    function copyMapImageToClipboard() {
        if (!navigator.clipboard || !window.ClipboardItem) {
            alert("Tu navegador no permite copiar imágenes al portapapeles desde esta página. Prueba desde HTTPS o localhost.");
            return;
        }

        view.takeScreenshot({
            format: "png",
            quality: 100
        })
            .then(screenshot => fetch(screenshot.dataUrl))
            .then(response => response.blob())
            .then(blob => navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob })
            ]))
            .then(() => alert("Imagen copiada al portapapeles."))
            .catch(error => {
                console.error("Error copiando imagen al portapapeles:", error);
                alert("No se pudo copiar la imagen. El navegador puede requerir HTTPS o permisos de portapapeles.");
            });
    }

    /* ============================================================
       VENTANAS FLOTANTES / UI
       ============================================================ */

    let topWindowZIndex = 40;

    function bringWindowToFront(win) {
        topWindowZIndex += 1;
        win.style.zIndex = topWindowZIndex;
    }

    function makeWindowsDraggable() {
        document.querySelectorAll(".tool-window").forEach(win => {
            const header = win.querySelector(".tool-window-header");

            if (!header) return;

            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;

            win.addEventListener("mousedown", () => bringWindowToFront(win));

            header.addEventListener("mousedown", e => {
                if (e.target.classList.contains("window-close")) return;

                e.preventDefault();
                isDragging = true;
                bringWindowToFront(win);

                const rect = win.getBoundingClientRect();
                const parentRect = win.parentElement.getBoundingClientRect();

                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;

                win.style.left = (rect.left - parentRect.left) + "px";
                win.style.top = (rect.top - parentRect.top) + "px";
                win.style.right = "auto";
                win.style.bottom = "auto";

                win.classList.add("dragging");
                document.body.style.userSelect = "none";
            });

            document.addEventListener("mousemove", e => {
                if (!isDragging) return;

                const parentRect = win.parentElement.getBoundingClientRect();
                const rect = win.getBoundingClientRect();

                let left = e.clientX - parentRect.left - offsetX;
                let top = e.clientY - parentRect.top - offsetY;

                left = Math.max(0, Math.min(left, parentRect.width - rect.width));
                top = Math.max(0, Math.min(top, parentRect.height - rect.height));

                win.style.left = left + "px";
                win.style.top = top + "px";
            });

            document.addEventListener("mouseup", () => {
                if (!isDragging) return;

                isDragging = false;
                win.classList.remove("dragging");
                document.body.style.userSelect = "";

                view.resize();
            });
        });
    }

    function toggleBox(id) {
        document.getElementById(id).classList.toggle("show");
    }

    function toggleSidebar() {
        const sidebar = document.querySelector(".left");

        if (!sidebar) return;

        sidebar.classList.toggle("collapsed");

        setTimeout(() => {
            view.resize();
        }, 250);
    }


    /* ============================================================
       UTILIDADES
       ============================================================ */

    function zoomToFeature(feature) {
        if (!feature || !feature.geometry) return;

        highlightFeature(feature);

        const geometry = feature.geometry;
        const target = geometry.extent ? geometry.extent.expand(1.5) : geometry;

        view.goTo({
            target: target,
            zoom: geometry.type === "point" ? 15 : undefined
        }, {
            duration: 450
        }).catch(() => {});
    }

    function highlightFeature(feature) {
        highlightLayer.removeAll();

        if (!feature || !feature.geometry) return;

        const geometry = feature.geometry;
        let symbol;

        if (geometry.type === "point" || geometry.type === "multipoint") {
            symbol = {
                type: "simple-marker",
                style: "circle",
                color: [255, 43, 0, 0.9],
                size: 10,
                outline: {
                    color: [255, 255, 255, 1],
                    width: 2
                }
            };
        } else if (geometry.type === "polyline") {
            symbol = {
                type: "simple-line",
                color: [255, 43, 0, 1],
                width: 4
            };
        } else {
            symbol = {
                type: "simple-fill",
                color: [255, 43, 0, 0.18],
                outline: {
                    color: [255, 43, 0, 1],
                    width: 3
                }
            };
        }

        highlightLayer.add(new Graphic({
            geometry,
            symbol,
            attributes: feature.attributes || {}
        }));
    }

    function formatAttributeValue(value) {
        if (value === null || value === undefined) return "";

        const text = String(value).trim();

        if (/^https?:\/\//i.test(text)) {
            return `<a href="${escapeHtml(text)}" target="_blank" rel="noopener noreferrer">🔗 Abrir enlace</a>`;
        }

        return escapeHtml(text);
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeSql(value) {
        return String(value).replace(/'/g, "''");
    }

    function csvValue(value) {
        return '"' + String(value).replace(/"/g, '""') + '"';
    }

    function safeFileName(value) {
        return String(value)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9_-]+/g, "_")
            .replace(/^_+|_+$/g, "") || "tabla_atributos";
    }

    function updateCoords(event) {

    const point = view.toMap({
        x: event.x,
        y: event.y
    });

    if (!point) return;

    document.getElementById("coords").textContent =
        `X: ${point.x.toFixed(2)}   Y: ${point.y.toFixed(2)} | Escala 1:${Math.round(view.scale).toLocaleString("es-ES")}`;
	}


function goToCoordinates() {
    const x = Number(document.getElementById("coordX").value);
    const y = Number(document.getElementById("coordY").value);

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        alert("Introduce coordenadas X e Y válidas.");
        return;
    }

    const point = {
        type: "point",
        x: x,
        y: y,
        spatialReference: APP.sr
    };

    coordMarkerLayer.removeAll();

    const marker = new Graphic({
        geometry: point,
        symbol: {
            type: "simple-marker",
            style: "circle",
            color: [255, 43, 0, 0.95],
            size: 14,
            outline: {
                color: [255, 255, 255, 1],
                width: 3
            }
        },
        attributes: {
            X: x,
            Y: y
        },
        popupTemplate: {
            title: "Coordenadas buscadas",
            content: `X: ${x}<br>Y: ${y}<br>EPSG:25829`
        }
    });

    coordMarkerLayer.add(marker);

    view.goTo({
        target: point,
        zoom: 15
    }, {
        duration: 600
    }).catch(() => {});
}

function clearCoordinateMarker() {
    coordMarkerLayer.removeAll();
}

    /* ============================================================
       EVENTOS E INICIALIZACIÓN
       ============================================================ */

    document.querySelectorAll(".tab").forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll(".tab, .panel").forEach(el => el.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        };
    });

    document.getElementById("layerSearch").addEventListener("input", renderServiceList);
    document.getElementById("searchLayer").addEventListener("change", renderSearchSubLayerSelect);
    document.getElementById("searchSubLayer").addEventListener("change", renderSearchFields);
    document.getElementById("tableLayerSelect").addEventListener("change", renderTableSubLayerSelect);
    document.getElementById("tableFilter").addEventListener("input", applyAttributeTableFilter);

    const addressInput = document.getElementById("addressSearchValue");
    if (addressInput) {
        addressInput.addEventListener("keydown", e => {
            if (e.key === "Enter") runAddressSearch();
        });
    }

    view.on("pointer-move", updateCoords);

    view.when(() => {
        initLogin();
        initBaseLayers();
        initOperationalLayers();
        makeWindowsDraggable();
        loadBookmarks();
        renderSearchLayerSelect();
        renderTableLayerSelect();
    });

/* ============================================================
   PNOA HISTÓRICO POR AÑO
   ============================================================ */
function setPnoaHistoricalYear(layerNames) {
    const layer = APP.layerById.get("base_pnoa_historico_year");

    if (!layer) {
        console.warn("No se encontró la capa PNOA histórico.");
        return;
    }

    const names = layerNames.split(",").map(name => name.trim());

    layer.sublayers.removeAll();

    names.forEach(name => {
        layer.sublayers.add({
            name: name
        });
    });

    setBase("pnoa_historico_year");
}


    /* ============================================================
       FUNCIONES GLOBALES PARA HTML
       ============================================================ */

    window.toggleSidebar = toggleSidebar;
    window.toggleBox = toggleBox;

    window.showAllServices = showAllServices;
    window.hideAllServices = hideAllServices;

    window.runAttributeSearch = runAttributeSearch;
    window.clearSearch = clearSearch;

    window.toggleMeasureBox = toggleMeasureBox;
    window.setMeasureTool = setMeasureTool;
    window.clearMeasurement = clearMeasurement;

    window.toggleAttributeTable = toggleAttributeTable;
    window.loadAttributeTable = loadAttributeTable;
    window.firstAttributePage = firstAttributePage;
    window.nextAttributePage = nextAttributePage;
    window.prevAttributePage = prevAttributePage;
    window.lastAttributePage = lastAttributePage;
    window.exportAttributeTableCsv = exportAttributeTableCsv;

    window.saveBookmark = saveBookmark;
    window.loadBookmarks = loadBookmarks;
    window.renderBookmarks = renderBookmarks;
    window.zoomToBookmark = zoomToBookmark;
    window.deleteBookmark = deleteBookmark;
    window.clearBookmarks = clearBookmarks;
    window.exportBookmarksJson = exportBookmarksJson;
    window.exportBookmarks = exportBookmarksJson;
    window.importBookmarks = importBookmarks;
    window.importBookmarksJson = importBookmarksJson;

    window.printMapTemplate = printMapTemplate;
    window.quickPrintPreset = quickPrintPreset;
    window.downloadMapImage = downloadMapImage;
    window.copyMapImageToClipboard = copyMapImageToClipboard;

	window.goToCoordinates = goToCoordinates;
	window.clearCoordinateMarker = clearCoordinateMarker;
	window.runAddressSearch = runAddressSearch;
	window.clearAddressSearch = clearAddressSearch;
	window.setPnoaHistoricalYear = setPnoaHistoricalYear;
})().catch(error => {
    console.error("Error iniciando el visor ArcGIS SDK 5.0:", error);

    const infoBody = document.getElementById("infoBody");
    if (infoBody) {
        infoBody.innerHTML = "<b>Error iniciando el visor:</b><br>" + String(error.message || error);
    }

    const loginError = document.getElementById("loginError");
    if (loginError) {
        loginError.textContent = "El login funciona, pero el SDK 5.0 no ha terminado de cargar. Revisa la consola del navegador.";
    }
});
