/*
  Application principale - Carte Gravel Segments
  Logique commune à toutes les versions linguistiques
*/

const MAX_RADIUS_METERS = 30000;
const MAX_BBOX_DIAGONAL_METERS = 90000;

const map = L.map('map', { preferCanvas: true }).setView([50.6,4.5],8);
const tooltip = document.getElementById("tooltip");
const progressEl = document.getElementById("progress");
const centerRadiusEl = document.getElementById("center-radius");
const btnLoad = document.getElementById("btn-load");
const useRadiusCheckbox = document.getElementById("use-radius");

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:'© OpenStreetMap'
}).addTo(map);

const rendererCanvas = L.canvas();

const layers = {
  paves: L.layerGroup().addTo(map),
  gravel_roulant: L.layerGroup().addTo(map),
  chemin_12: L.layerGroup().addTo(map),
  grade3_surface: L.layerGroup().addTo(map),
  grade3_unknown: L.layerGroup().addTo(map),
  grade4: L.layerGroup().addTo(map)
};

let CURRENT_LANG = 'fr';

function setLang(lang){
  if(!TRANSLATIONS[lang]) lang = 'fr';
  CURRENT_LANG = lang;
  const t = TRANSLATIONS[lang];

  btnLoad.textContent = t.btnLoad;
  document.getElementById('use-radius-label').textContent = t.useRadiusLabel;
  document.getElementById('btn-about').textContent = t.about;
  document.getElementById('btn-osm').textContent = t.openOSM;
  document.getElementById('btn-donate').textContent = t.donate;
  document.getElementById('legend-title').textContent = t.legendTitle;
  document.getElementById('osm-info-text').textContent = t.osmInfo;

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(t[key]) el.textContent = t[key];
  });

  document.getElementById('about-title').textContent = t.about_title || t.about;
  document.getElementById('about-content').innerHTML = (t.about_text || '');

  document.getElementById('donate-title').textContent = t.donate_modal_title || t.donate;
  const donateButtonsHolder = document.getElementById('donate-buttons-placeholder');
  donateButtonsHolder.innerHTML = `
    <button class="donate-btn paypal" onclick="window.open('https://www.paypal.com/paypalme/RomainDlz','_blank')">${t.paypal_btn}</button>
    <button class="donate-btn buyme" onclick="window.open('https://buymeacoffee.com/gravelsegments','_blank')">${t.buyme_btn}</button>
  `;
}

function toggleLayer(n){ map.hasLayer(layers[n])?map.removeLayer(layers[n]):map.addLayer(layers[n]); }
function clearLayers(){ Object.values(layers).forEach(l=>l.clearLayers()); }

function showTooltip(e, tags){
  tooltip.style.display="block";
  tooltip.style.left=e.originalEvent.pageX+12+"px";
  tooltip.style.top=e.originalEvent.pageY+12+"px";
  const t = TRANSLATIONS[CURRENT_LANG];
  tooltip.innerHTML = `
  <strong>${t.tooltip_title}</strong><br>
  ${t.tooltip_type} : ${tags.highway || "—"}<br>
  ${t.tooltip_tracktype} : ${tags.tracktype || "—"}<br>
  ${t.tooltip_surface} : ${tags.surface || "—"}<br>
  <strong>${t.tooltip_rideability} :</strong> ${tags.smoothness || "—"}
`;
}
function hideTooltip(){ tooltip.style.display="none"; }

function openOSM(){
  const c=map.getCenter();
  window.open(`https://www.openstreetmap.org/#map=${map.getZoom()}/${c.lat}/${c.lng}`,'_blank');
}

function about(){
  document.getElementById('about-backdrop').style.display = 'block';
  document.getElementById('about-modal').style.display = 'block';
}

function hideAbout(){
  document.getElementById('about-backdrop').style.display = 'none';
  document.getElementById('about-modal').style.display = 'none';
}

function openDonateModal(){
  setLang(CURRENT_LANG);
  document.getElementById('donate-backdrop').style.display = 'block';
  document.getElementById('donate-modal').style.display = 'block';
}
function hideDonate(){
  document.getElementById('donate-backdrop').style.display = 'none';
  document.getElementById('donate-modal').style.display = 'none';
}

function haversineMeters(a,b){
  const R = 6371000;
  const toRad = Math.PI/180;
  const dLat = (b[0]-a[0])*toRad;
  const dLon = (b[1]-a[1])*toRad;
  const lat1 = a[0]*toRad;
  const lat2 = b[0]*toRad;
  const sinDLat = Math.sin(dLat/2);
  const sinDLon = Math.sin(dLon/2);
  const aa = sinDLat*sinDLat + Math.cos(lat1)*Math.cos(lat2)*sinDLon*sinDLon;
  return R * 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
}

function simplifyCoords(coords, minDistMeters=2){
  if(!coords || coords.length<=2) return coords;
  const out=[coords[0]];
  for(let i=1;i<coords.length;i++){
    const last = out[out.length-1];
    const cur = coords[i];
    if(haversineMeters(last, cur) >= minDistMeters) out.push(cur);
  }
  if(out[out.length-1] !== coords[coords.length-1]) out.push(coords[coords.length-1]);
  return out;
}

function radiusToLatLngDeltaMeters(lat, meters){
  const latDeg = meters / 111320;
  const lngDeg = meters / (111320 * Math.cos(lat * Math.PI / 180) || 1);
  return { latDeg, lngDeg };
}

const bboxCache = new Map();

function bboxKey(b){ return `${b.s.toFixed(6)},${b.w.toFixed(6)},${b.n.toFixed(6)},${b.e.toFixed(6)}`; }

function updateProgress(show, txt){
  if(!show){ progressEl.style.display='none'; return; }
  progressEl.style.display='block';
  progressEl.textContent = txt || (TRANSLATIONS[CURRENT_LANG].btnLoadLoading || 'Chargement…');
}

async function fetchBBox(b){
  const key = bboxKey(b);
  if(bboxCache.has(key)) return bboxCache.get(key);

  const q = `[out:json][timeout:25];
(
  way["highway"~"track|path|cycleway|unclassified|service"](${b.s},${b.w},${b.n},${b.e});
);
out geom tags;`;

  try{
    const r = await fetch("https://overpass-api.de/api/interpreter", { method:"POST", body: q });
    if(!r.ok) throw new Error("overpass error "+r.status);
    const d = await r.json();
    bboxCache.set(key, d);
    return d;
  }catch(err){
    console.warn("Overpass fetch failed for bbox", b, err);
    return { elements: [] };
  }
}

function handleOverpassData(d){
  d.elements.forEach(el=>{
    if(!el.geometry) return;
    const c = el.geometry.map(p=>[p.lat,p.lon]);
    const t = el.tags||{};
    const s = t.surface;
    const g = t.tracktype;
    const sm = t.smoothness;

    let LYR=null, COL=null;

    if(["sett","unhewn_cobblestone","cobblestone","paving_stones"].includes(s)){
      LYR=layers.paves; COL="#999";
    }
    else if((g==="grade1"||g==="grade2") && ["compacted","gravel","fine_gravel","clay"].includes(s) && !["bad","very_bad","horrible"].includes(sm)){
      LYR=layers.gravel_roulant; COL="#7CFC00";
    }
    else if(((g==="grade1"||g==="grade2") && (!s || ["ground","dirt","earth","grass","woodchips","unpaved","compacted","fine_gravel"].includes(s))) && !["bad","very_bad","horrible"].includes(sm)){
      LYR=layers.chemin_12; COL="#228B22";
    }
    else if (!t.tracktype && ["compacted","fine_gravel","clay"].includes(t.surface) && !["asphalt","concrete","paved"].includes(t.surface)) {
      LYR = layers.chemin_12;
      COL = "#228B22";
    }
    else if(g==="grade3" && ["compacted","gravel","fine_gravel","clay"].includes(s) && !["bad","very_bad","horrible"].includes(sm)){
      LYR=layers.grade3_surface; COL="#FFD700";
    }
    else if(g==="grade3"){
      LYR=layers.grade3_unknown; COL="#FF8C00";
    }
    else if(g==="grade4"){
      LYR=layers.grade4; COL="#d32f2f";
    }

    if(LYR){
      const simplified = simplifyCoords(c, 2);
      const poly = L.polyline(simplified, {color:COL, weight:4, opacity:0.9, renderer: rendererCanvas, interactive: true});
      poly.on("mousemove", e => showTooltip(e, t));
      poly.on("mouseout", hideTooltip);
      poly.addTo(LYR);
    }
  });
}

let currentCircle = null;

function showCenterCircle(center, radiusMeters){
  if(currentCircle) map.removeLayer(currentCircle);
  currentCircle = L.circle([center.lat, center.lng], { radius: radiusMeters, color:'#2e7d32', weight:1.5, fill:false, pane: 'overlayPane' }).addTo(map);
  centerRadiusEl.style.display='block';
  const t = TRANSLATIONS[CURRENT_LANG];
  const km = Math.round(radiusMeters/1000);
  const textTemplate = t.centerRadiusText || `Chargement centré (rayon {km} km)`;
  centerRadiusEl.textContent = textTemplate.replace('{km}', km);
}
function hideCenterCircle(){
  if(currentCircle){ map.removeLayer(currentCircle); currentCircle=null; }
  centerRadiusEl.style.display='none';
}

async function loadData(){
  btnLoad.disabled = true;
  btnLoad.textContent = TRANSLATIONS[CURRENT_LANG].btnLoadLoading || "Chargement…";
  updateProgress(true, TRANSLATIONS[CURRENT_LANG].progressPreparing || "Préparation…");
  hideTooltip();

  clearLayers();
  hideCenterCircle();

  const bounds = map.getBounds();
  const sw = [bounds.getSouth(), bounds.getWest()];
  const ne = [bounds.getNorth(), bounds.getEast()];
  const diagonal = haversineMeters(sw, ne);

  let bboxToFetch = null;
  let usedRadiusMode = false;
  if(useRadiusCheckbox.checked && diagonal > MAX_BBOX_DIAGONAL_METERS){
    usedRadiusMode = true;
    const center = map.getCenter();
    const radiusMeters = Math.min(MAX_RADIUS_METERS, Math.floor(diagonal/4));
    const delta = radiusToLatLngDeltaMeters(center.lat, radiusMeters);
    bboxToFetch = { s: center.lat - delta.latDeg, w: center.lng - delta.lngDeg, n: center.lat + delta.latDeg, e: center.lng + delta.lngDeg };
    showCenterCircle(center, radiusMeters);
    updateProgress(true, TRANSLATIONS[CURRENT_LANG].progressLoadingRadius || "Chargement (mode radius centré) …");
  }else{
    bboxToFetch = { s: bounds.getSouth(), w: bounds.getWest(), n: bounds.getNorth(), e: bounds.getEast() };
    updateProgress(true, TRANSLATIONS[CURRENT_LANG].progressLoadingBBox || "Chargement de la bbox affichée …");
  }

  try{
    const data = await fetchBBox(bboxToFetch);
    handleOverpassData(data);
  }catch(err){
    console.error(err);
  }finally{
    updateProgress(false);
    btnLoad.disabled = false;
    btnLoad.textContent = TRANSLATIONS[CURRENT_LANG].btnLoad || "Charger cette zone";
    setTimeout(()=>{ if(currentCircle) hideCenterCircle(); }, 8000);
  }
}

map.on('movestart', ()=> {
  try{
    const op = map.getPanes().overlayPane;
    op.style.pointerEvents = 'none';
    op.style.display = 'none';
  }catch(e){ }
  hideTooltip();
});

map.on('moveend', ()=> {
  try{
    const op = map.getPanes().overlayPane;
    op.style.display = '';
    op.style.pointerEvents = '';
  }catch(e){ }
});

map.on('click', hideTooltip);

map.on('zoomend', ()=>{
  const z = map.getZoom();
  const weight = Math.max(1, Math.round(4 * (z / 12)));
  Object.values(layers).forEach(lg => {
    lg.eachLayer(layer => {
      if(layer.setStyle) layer.setStyle({ weight });
    });
  });
});