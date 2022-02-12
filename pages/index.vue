<template>
  <div class="wrapper">
    <div class="sidebar">
      <a href="#" class="sidebar__item" v-for="(item,index) in maps" :key="index" @click="selectMap(item.name)">
        <span>I</span><span v-html="item.name"></span>
      </a>
    </div>
    <div class="subsidebar">
      <div class="subsidebar__item">
        <NuxtLink to="/add" class="subsidebar__item__btn">
          <span>add</span>
        </NuxtLink>
      </div>
      <div class="subsidebar__item">
        <div class="subsidebar__item--title">Fav</div>
        <div class="subsidebar__item__btn">
          <div class="subsidebar__item__btn--icon star"></div>
        </div>
      </div>
      <div class="subsidebar__item">
        <div class="subsidebar__item--title">Type</div>
        <div class="subsidebar__item__group" id="submenu-nade-type">
          <div class="subsidebar__item__group__btn">
            <div class="subsidebar__item__group__btn--icon smoke" @click="setType(0)"></div>
          </div>
          <div class="subsidebar__item__group__btn">
            <div class="subsidebar__item__group__btn--icon molotov" @click="setType(1)"></div>
          </div>
          <div class="subsidebar__item__group__btn">
            <div class="subsidebar__item__group__btn--icon flash" @click="setType(2)"></div>
          </div>
          <div class="subsidebar__item__group__btn">
            <div class="subsidebar__item__group__btn--icon he" @click="setType(3)"></div>
          </div>
        </div>
      </div>
      <div class="subsidebar__item">
        <div class="subsidebar__item--title">Tick</div>
        <div class="subsidebar__item__btn" @click="nextTick" v-html="tick.data[tick.active]"></div>
      </div>
      <div class="subsidebar__item">
        <div class="subsidebar__item--title">Team</div>
        <div class="subsidebar__item__btn" @click="nextTeam" v-html="team.data[team.active]">any</div>
      </div>
    </div>
    <div class="content is-flex is-direction-row is-full-center">
      <div class="map Dust2" data-map="Dust2"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'IndexPage',
  data(){
    return{
      maps: [
        {iconPath:"null", name: "Mirage"},
        {iconPath:"null", name: "Inferno"},
        {iconPath:"null", name: "Dust2"},
        {iconPath:"null", name: "Overpass"},
        {iconPath:"null", name: "Nuke"},
        {iconPath:"null", name: "Vertigo"},
        {iconPath:"null", name: "Ancient"}
      ],
      mapSelector:0,
      nadeTypeSelector:{active: 0, data:["smoke","molotov","flash","he"]},
      tick:{active: 0, data:["any","128","64"]},
      team:{active: 0, data:["any","T","CT"]},
      mapAttr:{width:0, height: 0}
    }
  },
  computed: {
    ...mapState({
      nades: (state) => state.nadeStore.nades,
    }),
  },
  mounted(){
    this.selectMap("Dust2");
    this.addNades();
    this.isactiveType();
  },
  methods:{
    selectMap(item){      
      const maps = document.querySelectorAll(".sidebar__item"); 
      let temp = "";
      maps.forEach(el => {
        el.classList.remove("active");
      })
      maps.forEach(el => {
        console.log(el);
        if(el.lastElementChild.innerHTML == item){
          el.classList.add("active");
        }
      })
      const map = document.querySelector('.map');
      map.className = "map";
      map.dataset.map = item;
      map.classList.add(item);
      this.clearNades();
      this.drawNadesOnMap(item);
    },
    drawNadesOnMap(map){
      this.nades.forEach(item => {
        if(map !== item.map) return;
        if(this.nadeTypeSelector.data[this.nadeTypeSelector.active] != item.type) return;
          this.drawNades(item.pos, item.type);        
      });
    },
    clearNades(){
      const map = document.querySelector('.map');
      map.innerHTML = '';
    },
    drawNades(pos, type){
      let nade = document.createElement("div");
      nade.classList.add("nade");
      nade.classList.add("grenade");
      nade.classList.add(type);
      nade.style.top = (((pos[1]/100)*960)-20)+"px";
      nade.style.left = (((pos[0]/100)*960)-20)+"px";
      const map = document.querySelector('.map');
      map.appendChild(nade);
      console.log("hey");
    },
    addNades(){
      const map = document.querySelector('.map');
      map.addEventListener("click", (e) => {
        
        let tempTop = ((e.clientY - map.offsetTop)/(9.60));
        let tempLeft = ((e.clientX - map.offsetLeft)/(9.60));
        let tempObj = {
          type: this.nadeTypeSelector.data[this.nadeTypeSelector.active],
          map: map.dataset.map,
          pos: [tempLeft,tempTop]
        }
        this.$store.dispatch("nadeStore/addNade", tempObj);
        this.drawNades(tempObj.pos, tempObj.type);
      })
    },
    nextTick(){
      let temp = this.tick.active
      temp++;
      if(temp >= 3){this.tick.active = 0;return;}
      this.tick.active = temp;
    },
    nextTeam(){
      let temp = this.team.active
      temp++;
      if(temp >= 3){this.team.active = 0;return;}
      this.team.active = temp;
    },
    isactiveType(){
      const type = document.querySelector("#submenu-nade-type");
      for(let el of type.children){
        el.classList.remove("active");      }
      type.children[this.nadeTypeSelector.active].classList.add("active");
      const maps = document.querySelectorAll(".sidebar__item"); 
      let map = "";
      maps.forEach(el => {
        if(el.classList[1] == "active"){
          map = el.lastElementChild.innerText;
        }
      })
      console.log(map);
      this.clearNades();
      this.drawNadesOnMap(map);
    },
    setType(index){
      this.nadeTypeSelector.active = index;
      this.isactiveType();
    }
  }
}
</script>
<style> 
  .content .map{
    width: 60em;
    height: 60em;
    background-size: 60em;
    position: relative;
  }  
  .grenade{
    background-size: 40px;
    width: 40px;
    height: 40px;
  }
  .smoke{
    background-image: url("@/components/svg/smoke.svg?inline");    
  }
  .flash{
    background-image: url("@/components/svg/flash.svg?inline");
  }
  .molotov{
    background-image: url("@/components/svg/molotov.svg?inline");
  }
  .he{
    background-image: url("@/components/svg/he.svg?inline");
  }  
  .star{
    background-image: url("@/components/svg/star.svg?inline");
  }
  
</style>