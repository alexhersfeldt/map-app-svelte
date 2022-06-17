<script>
    import {Map, View} from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    import { onMount } from "svelte";
    import proj4 from "proj4";
    import { register } from "ol/proj/proj4";
    import {get as getProjection} from 'ol/proj';
    import ImageLayer from 'ol/layer/Image';
    import ImageWMS from 'ol/source/ImageWMS';
    import 'ol/ol.css';
    import {Vector, Vector as VectorLayer, VectorImage} from 'ol/layer';
    import Draw from 'ol/interaction/Draw';






    // creating CRS for Dennmark
    proj4.defs("EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs" )
    register(proj4)
    const dkProj = getProjection("EPSG:25832")
    let x = 667109
    let y = 6201711
    let x2;
    let y2;



    // Test array for hotstepper
    let cordArray = [
      {
        x: 725175,
        y: 6175526
      },
      {
        x: 586799,
        y: 6138794
      },
      {
        x: 575250,
        y: 6223614
      },
      {
        x: 556411,
        y: 6322700
      },
      {
        x: 465182,
        y: 6147701
      }
    ]

    // Layers
    
    const osmMapLayer = new TileLayer({
          source: new OSM()
        });
    const ortoMapLayer = new ImageLayer({
          source: new ImageWMS({
            url: 'https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar/1.0.0/Wms?servicename=orto_foraar&username=CAVCEPWVSC&password=JOB2020adgang!',
            params: {
                LAYERS: 'orto_foraar_12_5',
                TRANSPARENT: "TRUE",
                FORMAT: 'image/jpeg',
            }
          })
        });
    


    // creating variables to be used in map
    let map;
    let layers = [osmMapLayer, ortoMapLayer]
    let target = "map"
    let view = new View({
      projection: dkProj,
        center: [x, y],
        zoom: 7
    });



     // initializing map 
    onMount(() => {
        map = new Map({
      layers: layers,
      target: target,
      view: view
      })
    });
    //functions to manipulate map
    function updateXandY() {
      view.setCenter([x2, y2])
    }
    let count = 0;
    function updateXandYFromArray() {
      view.setCenter([cordArray[count].x, cordArray[count].y]);
      view.setZoom(12);
      if(count > cordArray.length-2) {
        count = 0;
      } else {
        count += 1;
      }
    }
    let centerCord;
    function updateCenterCord() {
      centerCord = view.getCenter();
    }

    const polygonLayer = new VectorImage({
        source: new Vector
    })


    </script>
    
    <main>
          
            <input bind:value={x2} placeholder="x-cord">
            <input bind:value={y2} placeholder="y-cord">
            <button on:click={() =>updateXandY()}>Zoom to cordinate</button>
            <button on:click={() =>updateXandYFromArray()}>Zoom to next City</button>
            <div>
              <p>Current Cordinate = {centerCord}</p>
              <button on:click={() => updateCenterCord()}>Get Current Cordinate</button>
            </div>
        <div id="mapdiv">
        <div id="map"></div>
    </div>
    </main>
     
    
    
    <style>
    #map {
    width:100%;
    height: 100%;
    }
    #mapdiv {
        display: flex;
        border: rgb(31, 42, 85);
        border-width: 10px;
        border-style: solid;
        border-radius: 10px;
        height:38vmax;
        width: 100%;
      }
    </style>