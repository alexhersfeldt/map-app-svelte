<script>
  import {Map, View} from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import {OSM, Vector as VectorSource} from 'ol/source';
  import { onMount } from "svelte";
  import {get as getProjection} from 'ol/proj';
  import {Vector, Vector as VectorLayer, VectorImage} from 'ol/layer';
  import Draw from 'ol/interaction/Draw';
  import {useGeographic} from 'ol/proj';
  import 'ol/ol.css';
  import {Icon, Style} from 'ol/style';
  import Feature from 'ol/Feature';
  import Point from 'ol/geom/Point';

  useGeographic();
  let x = 12
  let y = 55
  // Layers
  
  const osmMapLayer = new TileLayer({
        source: new OSM()
      });

  let source = new VectorSource({});


  const iconFeature = new Feature({
  geometry: new Point([0, 0]),
  name: 'Null Island',
  population: 4000,
  rainfall: 500,
});

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'public/red.png',
  }),
});

iconFeature.setStyle(iconStyle);

const vectorSource = new VectorSource({
  features: [iconFeature],
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

  let vector = new VectorLayer({
  source: source,
  style: iconStyle
  });

  // creating variables to be used in map
  let map;
  let layers = [osmMapLayer, vector, vectorLayer]
  let target = "map"
  let view = new View({
      center: [x, y],
      zoom: 3
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
    view.setZoom(8);
    if(count > cordArray.length-2) {
      count = 0;
    } else {
      count += 1;
    }
  }

  // Function to up gps cordinates
  let centerCord;
  let cord1 = ""
  let cord2 = ""
  function updateCenterCord() {
    centerCord = view.getCenter();
    centerCord[0] = centerCord[0].toFixed(3);
    if (centerCord[0] >= 0.001) {
      cord1 = centerCord[0] + "E, "
    } else {
      cord1 = Math.abs(centerCord[0]) + "W, "
    };

    centerCord[1] = centerCord[1].toFixed(3);
    if (centerCord[1] >= 0.001) {
      cord2 = centerCord[1] + "N"
    } else {
      cord2 = Math.abs(centerCord[1]) + "S"
    }
  }

  const polygonLayer = new VectorImage({
      source: new Vector
  })

  // Draw point functions
 

  let draw; // global so we can remove it later
  function addInteraction(element) {
  let value = element;
    if (value !== 'None') {
      draw = new Draw({
        source: source,
        type: "Point",
      });
      map.addInteraction(draw);
    }
  }

  function handleBtnClick(type) {
  var element = type;
  map.removeInteraction(draw);
  addInteraction(element);
};

</script>
    
<main>
  <div class="wrapper">
    <div class="dashboard1">
        <button class="button is-info is-light" on:click={() => updateCenterCord()}>Get Current Cordinate: </button>
        <span class="tag is-info is-light is-large"> {cord1} {cord2}</span>
        <br>
        <span class="tag is-light is-large"> Add a location:</span>
        <button class="button is-warning is-large" on:click={() => handleBtnClick("yellow")}>Have been</button>
        <button class="button is-info is-large" on:click={() => handleBtnClick("blue")}>Want to Visit</button>
        <button class="button is-danger is-large" on:click={() => handleBtnClick("red")}>Dont want to Visit</button>
        <button class="button" on:click={() => handleBtnClick("None")}>Done</button>
    </div>
      <div id="mapdiv">
        <div id="map"></div>
      </div>
  </div>
 

</main>
     
    
    
<style>
#map {
width:100%;
height: 100%;
}
#mapdiv {
    display: flex;
    border: rgb(94, 111, 180);
    border-width: 5px;
    border-style: solid;
    border-radius: 5px;
    height:38vmax;
    width: 80%;
  }
.dashboard1 {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

}
</style>