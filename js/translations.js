/* Fichier de traductions centralisé */
const TRANSLATIONS = {
  fr: {
    metaTitle: "Gravel Segments – Explorer les chemins gravels en Belgique",
    metaDescription: "Gravel Segments : carte interactive pour découvrir les meilleurs segments de gravel à vélo en Belgique. Routes gravels, chemins techniques, pistes et sentiers. Basée sur OpenStreetMap.",
    metaKeywords: "gravel, gravel belgique, gravel segments, vélo gravel, chemins gravel, routes gravel, carte gravel, pistes gravel, chemins techniques, sentiers gravel, cyclocross, bikepacking, routes non-pavées, pistes dirt, chemins de terre, cycl'aventure, revêtement gravel, surfaces gravel, openstreetmap, belgique vélo, cyclisme de gravel, routes blanches, pistes VTT, chemin roulant",
    btnLoad: "Charger cette zone",
    btnLoadLoading: "Chargement…",
    useRadiusLabel: "Utiliser radius max si zone trop grande",
    about: "À propos",
    openOSM: "Suggérer une modification",
    donate: "Faire un don ❤️",
    legendTitle: "Revêtements",
    paves: "Pavés",
    gravel_roulant: "Vrais Gravels roulants",
    chemin_12: "Autres chemins roulants",
    grade3_surface: "Chemins Gravel plus techniques",
    grade3_unknown: "Chemins plus techniques",
    grade4: "Chemins engagés",
    osmInfo: "Données OpenStreetMap – indicatives uniquement",
    progressPreparing: "Préparation…",
    progressLoadingBBox: "Chargement de la bbox affichée …",
    progressLoadingRadius: "Chargement (mode radius centré) …",
    centerRadiusText: "Chargement centré (rayon {km} km)",
    tooltip_title: "Chemin",
    tooltip_type: "Type",
    tooltip_tracktype: "Tracktype",
    tooltip_surface: "Surface",
    tooltip_rideability: "Roulabilité",
    about_title: "Gravelsegments.com — À propos",
    about_text: `<p>
Cette carte classe les chemins selon leur <strong>roulabilité estimée</strong> à partir des données OpenStreetMap. 
Elle permet d'avoir un aperçu en un clic des chemins « gravel » potentiels dans la zone explorée. 
Les conditions réelles peuvent cependant différer des données OSM.
</p>

<p>
Pour un usage optimal, utilisez Google Street View, la vue satellite ou d'autres cartes pour compléter les informations mises en évidence sur cette carte interactive.
</p>

<p>
Les utilisateurs sont invités à contribuer et améliorer les données sur <a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">OpenStreetMap</a>.
</p>

<p><strong>Légende :</strong></p>
<ul>
  <li><span style="color:grey;">Gris :</span> Pavés</li>
  <li><span style="color:lightgreen;">Vert clair :</span> Chemins de gravier avec bonne roulabilité et revêtement solide (grade 1 et 2, roulabilité moyenne à excellente)</li>
  <li><span style="color:darkgreen;">Vert foncé :</span> Chemins avec bonne roulabilité mais revêtement non-gravier ou non renseigné (grade 1 et 2), incluant surfaces compactes et gravier fin</li>
  <li><span style="color:gold;">Jaune :</span> Chemins de gravier de grade 3 ou sentiers de gravier grade inconnu, roulabilité moyenne à excellente</li>
  <li><span style="color:orange;">Orange :</span> Chemins de grade 3 toutes surfaces sauf gravier ou surface inconnue, roulabilité moyenne à excellente</li>
  <li><span style="color:red;">Rouge :</span> Chemins de grade 4, surface irrégulière, pouvant nécessiter un très bon niveau technique</li>
</ul>

<p>
Afin d'aider <strong>Gravelsegments.com</strong> à rester gratuit, n'hésitez pas à faire un don. Chaque centime sera bien utilisé.
</p>`,
    donate_modal_title: "Faire un don ❤️",
    paypal_btn: "Faire un don via PayPal ❤️",
    buyme_btn: "Donner via Buy Me a Coffee ❤️"
  },
  en: {
    metaTitle: "Gravel Segments – Explore gravel cycling routes in Belgium",
    metaDescription: "Gravel Segments: interactive map to discover the best gravel cycling segments in Belgium. Gravel routes, technical trails, dirt roads and paths. Based on OpenStreetMap.",
    metaKeywords: "gravel, gravel belgium, gravel bike, gravel cycling, gravel map, gravel routes, gravel segments, gravel belgium map, unpaved roads, dirt roads, technical trails, gravel paths, bikepacking, cyclocross, offroad cycling, adventures, mountain biking, track roads, white roads, cycling map, openstreetmap, cycling belgium, route finder",
    btnLoad: "Load this area",
    btnLoadLoading: "Loading…",
    useRadiusLabel: "Use max radius if area too large",
    about: "About",
    openOSM: "Suggest an edit",
    donate: "Donate ❤️",
    legendTitle: "Surfaces",
    paves: "Paved / Cobbles",
    gravel_roulant: "True rideable gravels",
    chemin_12: "Other rideable tracks",
    grade3_surface: "More technical gravel",
    grade3_unknown: "Technical tracks",
    grade4: "Engaged / Hard tracks",
    osmInfo: "OpenStreetMap data – indicative only",
    progressPreparing: "Preparing…",
    progressLoadingBBox: "Loading displayed bbox …",
    progressLoadingRadius: "Loading (centered radius mode) …",
    centerRadiusText: "Centered load (radius {km} km)",
    tooltip_title: "Path",
    tooltip_type: "Type",
    tooltip_tracktype: "Tracktype",
    tooltip_surface: "Surface",
    tooltip_rideability: "Rideability",
    about_title: "Gravelsegments.com — About",
    about_text: `<p>
This map classifies paths according to their <strong>estimated rideability</strong> based on OpenStreetMap data. 
It provides an overview in one click of potential "gravel" paths in the explored area. 
However, actual conditions may differ from OSM data.
</p>

<p>
For optimal use, use Google Street View, satellite view or other maps to supplement the information highlighted on this interactive map.
</p>

<p>
Users are invited to contribute and improve data on <a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">OpenStreetMap</a>.
</p>

<p><strong>Legend:</strong></p>
<ul>
  <li><span style="color:grey;">Grey:</span> Paved/Cobbles</li>
  <li><span style="color:lightgreen;">Light green:</span> Gravel paths with good rideability and solid surface (grade 1 and 2, medium to excellent rideability)</li>
  <li><span style="color:darkgreen;">Dark green:</span> Paths with good rideability but non-gravel or unreported surface (grade 1 and 2), including compacted surfaces and fine gravel</li>
  <li><span style="color:gold;">Yellow:</span> Grade 3 gravel paths or gravel trails with unknown grade, medium to excellent rideability</li>
  <li><span style="color:orange;">Orange:</span> Grade 3 paths all surfaces except gravel or unknown surface, medium to excellent rideability</li>
  <li><span style="color:red;">Red:</span> Grade 4 paths, irregular surface, may require very good technical skills</li>
</ul>

<p>
To help <strong>Gravelsegments.com</strong> stay free, please consider making a donation. Every penny will be used well.
</p>`,
    donate_modal_title: "Donate ❤️",
    paypal_btn: "Donate with PayPal ❤️",
    buyme_btn: "Buy me a coffee ❤️"
  },
  nl: {
    metaTitle: "Gravel Segments – Verken gravelpaden en fietsen in België",
    metaDescription: "Gravel Segments: interactieve kaart om de beste gravelsegmenten in België te ontdekken. Gravelpaden, technische routes, onverharde wegen en trails. Gebaseerd op OpenStreetMap.",
    metaKeywords: "gravel, gravel fietsen, gravel belgie, gravel kaart, gravelpaden, onverharde wegen, gravel routes, gravelsegmenten, dirt roads, technische trails, bikepacking, cyclocross, mountainbike, offroad fietsen, avontuur, routes, tracks, kalkpaden, wielrennen, kaart, openstreetmap, belgie fietsen, routeplanner",
    btnLoad: "Laad dit gebied",
    btnLoadLoading: "Laden…",
    useRadiusLabel: "Gebruik maximale straal als gebied te groot is",
    about: "Over",
    openOSM: "Bewerkingsvoorstel",
    donate: "Doneer ❤️",
    legendTitle: "Oppervlakken",
    paves: "Kasseien / Verhard",
    gravel_roulant: "Echte rijdbare gravels",
    chemin_12: "Andere rijdbare paden",
    grade3_surface: "Technischere gravels",
    grade3_unknown: "Technische paden",
    grade4: "Zware paden",
    osmInfo: "OpenStreetMap-gegevens – alleen ter indicatie",
    progressPreparing: "Voorbereiden…",
    progressLoadingBBox: "Laadt zichtbare bbox …",
    progressLoadingRadius: "Laden (gecentreerde straalmodus) …",
    centerRadiusText: "Gecentreerde laad (straal {km} km)",
    tooltip_title: "Pad",
    tooltip_type: "Type",
    tooltip_tracktype: "Tracktype",
    tooltip_surface: "Oppervlak",
    tooltip_rideability: "Rijbaarheid",
    about_title: "Gravelsegments.com — Over",
    about_text: `<p>
Deze kaart classificeert paden volgens hun <strong>geschatte rijbaarheid</strong> op basis van OpenStreetMap-gegevens. 
Het biedt in één klik een overzicht van potentiële "gravel" paden in het verkende gebied. 
De werkelijke omstandigheden kunnen echter afwijken van OSM-gegevens.
</p>

<p>
Voor optimaal gebruik kunt u Google Street View, satellietweergave of andere kaarten gebruiken om de informatie op deze interactieve kaart aan te vullen.
</p>

<p>
Gebruikers worden uitgenodigd om bijdragen aan en gegevens op <a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">OpenStreetMap</a> te verbeteren.
</p>

<p><strong>Legenda:</strong></p>
<ul>
  <li><span style="color:grey;">Grijs:</span> Kasseien/Verhard</li>
  <li><span style="color:lightgreen;">Lichtgroen:</span> Gravelpaden met goede rijbaarheid en solide ondergrond (graad 1 en 2, gemiddelde tot uitstekende rijbaarheid)</li>
  <li><span style="color:darkgreen;">Donkergroen:</span> Paden met goede rijbaarheid maar niet-gravel of onvermelde ondergrond (graad 1 en 2), inclusief verdichte oppervlakken en fijn gravel</li>
  <li><span style="color:gold;">Geel:</span> Graad 3 gravelpaden of gravelpaden met onbekende graad, gemiddelde tot uitstekende rijbaarheid</li>
  <li><span style="color:orange;">Oranje:</span> Graad 3 paden, alle oppervlakken behalve gravel of onbekend oppervlak, gemiddelde tot uitstekende rijbaarheid</li>
  <li><span style="color:red;">Rood:</span> Graad 4 paden, onregelmatig oppervlak, kan zeer goede technische vaardigheden vereisen</li>
</ul>

<p>
Om <strong>Gravelsegments.com</strong> gratis te houden, overweeg alstublieft een donatie. Elk cent wordt goed besteed.
</p>`,
    donate_modal_title: "Doneer ❤️",
    paypal_btn: "Doneer via PayPal ❤️",
    buyme_btn: "Doneer via Buy Me a Coffee ❤️"
  }
};
