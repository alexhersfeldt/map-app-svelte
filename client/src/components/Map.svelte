<script>
  import {Map, View} from 'ol';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  import { onMount } from "svelte";
  import {get as getProjection} from 'ol/proj';
  import ImageLayer from 'ol/layer/Image';
  import ImageWMS from 'ol/source/ImageWMS';
  import 'ol/ol.css';
  import {Vector, Vector as VectorLayer, VectorImage} from 'ol/layer';
  import Draw from 'ol/interaction/Draw';
  import {useGeographic} from 'ol/proj';

  useGeographic();
  let x = 12
  let y = 55
  // Layers
  
  const osmMapLayer = new TileLayer({
        source: new OSM()
      });

  // creating variables to be used in map
  let map;
  let layers = [osmMapLayer]
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


</script>
    
<main>
  <div class="wrapper">
    <div class="dashboard1">
        <button class="button is-info is-light" on:click={() => updateCenterCord()}>Get Current Cordinate: </button>
        <span class="tag is-info is-light is-large"> {cord1} {cord2}</span>
        <br>
        <button class="button is-warning is-large" >Have been</button>
        <button class="button is-info is-large">Want to Visit</button>
        <button class="button is-danger is-large" >Dont want to Visit</button>
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
    border: rgb(31, 42, 85);
    border-width: 2px;
    border-style: solid;
    border-radius: 2px;
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