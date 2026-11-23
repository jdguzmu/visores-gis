define({
  root: {
    Help: {
      intro: "<br>The <b>Print Plus Widget</b> will create a print ready document in one of the following <b>formats</b>. " + 
             "The document will appear in a new tab or a new window, depending on your browser and its settings.<br>",
      clickToOpen: "Try it now",
      pdf: "PDF",
      jpg: "JPG",
      png8: "PNG8",
      png32: "PNG32",
      gif: "GIF",
      eps: "EPS",
      svg: "SVG",
      svgz: "SVGZ",
      letter_landscape: "Letter Landscape (ANSI A)",
      letter_portrait: "Letter Portrait (ANSI A)",
      tabloid_landscape: "Tabloid Landscape (ANSI B)",
      tabloid_portrait: "Tabloid Portrait (ANSI B)",
      a4_landscape: "A4 Landscape",
      a4_portrait: "A4 Portrait",
      a3_landscape: "A3 Landscape",
      a3_portrait: "A3 Portrait",
      map_only: "Just the Map (no title block or border)",
      mainContent: "<p>" +
                   "The map area and paper outline will be shown in <span style='color:red;'><b>red</b></span> over " +
                   "the map. The map can be moved with respect to the paper " +
                   "outline by dragging the map inside the paper outline. " +
                   "Dragging the map outside the paper will move the map and " +
                   "the paper outline together. The paper outline can be closed " +
                   "by clicking on the <b>X</b> in the upper right corner of the outline " +
                   "or toggled with the <b>Show Layout</b> checkbox." +
                   "</p><br><p>" + 
                   "The <b>print scale</b> can be adjusted by entering the " +
                   "desired scale or by using the scale slider control. As " +
                   "the print scale changes, the size of the paper outline " +
                   "will change." +
                   "</p><br><p>" + 
                   "If a paper size is selected and the <b>Use Title Block</b> " +
                   "checkbox is selected, the <b>Map Title</b>, <b>Author</b>, " +
                   "and <b>Copyright</b> text can be entered and the <b>Legend</b>" +
                   "can be toggled on and off. (The <b>Author</b>, <b>Copyright</b> " +
                   "and <b>Legend</b> checkbox are in the <b>Advanced</b> dropdown.)" +
                   "</p><br><p>" + 
                   "The <b>Print quality</b> (dots per inch, or DPI) can also be set " +
                   "in the <b>Advanced</b> dropdown. As the resolution increases, the " +
                   "time required to generate the map and the size of the map file " +
                   "also increases." + 
                   "</p><br><p>" + 
                   "When the layout template is set to <b>Just the Map</b> the " +
                   "map will be exported with no title block and no borders. " +
                   "There will be a diagram on the <b>Advanced</b> dropdown showing " +
                   "the outline of the map visible in the browser and the outline " +
                   "of the map to be exported. The portion of the map to be " +
                   "exported can be changed by adjusting the scale of the map, " +
                   "changing the <b>Preserve</b> setting, or changing the " +
                   "<b>Exported map size</b> or <b>Units</b>." +
                   "</p>"
    },
    title: "Titulo",
    format: "Formato",
    layout: "Diseño",
    settings: "Avanzado",
    mapScaleExtent: "Escala del mapa/extensión",
    preserve: "Preservar",
    mapScale: "Escala del mapa",
    mapExtent: "Extensión del Mapa",
    forceScale: "Forzar escala",
    getCurrentScale: "actual",
    mapMetadata: "metadato de diseño",
    author: "Autor",
    copyright: "Derechos de autor",
    fullLayoutOptions: "Opciones de diseño completo",
    scaleBarUnitsMetric: "Unidades barra de escala métrica",
    scaleBarUnitsNonMetric: "Unidades barra de escala no métrica",
    unitsMiles: "Millas",
    unitsKilometers: "Kilómetros",
    unitsMeters: "Metros",
    unitsFeet: "Pies",
    unitsYards: "Yardas",
    unitsNauticalMiles: "Millas náuticas",
    lncludeLegend: "Incluir leyenda",
    printQualityOptions: "Calidad impresión",
    dpi: "DPI",
    mapOnlyOptions: "Tamaño del mapa exportado",
    width: "Alto (px)",
    height: "Ancho (px)",
    print: "Imprimir",
    clearList: "Limpiar mapas",
    creatingPrint: "Creando mapas",
    printError: "Error, probar de nuevo",
    relativeScale: "Escala relativa",  //lcs
    titleBlock: "Title Block",  //lcs
    scale: "Escala",  //lcs
    widthNoUnits: "Alto",  //lcs
    heightNoUnits: "Ancho",  //lcs
    units: "Unidades",  //lcs
    unitsInches: "Pulgadas",  //lcs
    unitsCentimeters: "Centimetros",  //lcs
    mapOnScreen: "Mapa en pantalla",  //lcs
    printedMap: "Mapa impreso",  //lcs
    showLayout: "Mostrar diseños",  //lcs
    layoutInstruction: "     Mover el mapa dentro del marco para ajustar el área de impresión     ",  //lcs
    max: "Max",  //lcs
    min: "Min",  //lcs
    widgetOpacity: "Opacidad widget",  //lcs
    printScaleMessage: "Ha solicitado una impresión con una escala mayor que la escala máxima del mapa. Si continúa, algunas de las capas no se imprimirán."  //lcs
  },
  "zh-cn": true
});