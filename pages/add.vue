<template>
    <div class="wrapper">
        <div class="model-wrapper" v-show="modalisEnable">
            <div class="model" v-show="modal[0]">
                <h3 class="model--title">Click on the map where the nade lands</h3>
                <div class="map Dust2">
                </div>
                <div class="model--group">
                    <button class="button" @click="cancelSetPos()">Cancel</button>
                    <button class="button" @click="modalToggle(0)">Save</button>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="columns">
                <div class="column">
                    <div class="card height-full">
                        <h3>General rules</h3>
                        <b>No Duplicates</b>
                        <p> Make sure your not adding a nade that allready is on the site. <br>
                            If your nade is thrown from a different position or using a different line up, that is fine.
                        </p>
                        <br>
                        <b>Crosshair Visibility</b><br>
                        <p>
                            Make sure your crosshair is very visisble in the video.<br>
                            Many crosshairs become almost invisible after video compression.<br>
                        </p><br>
                    

                        <p>I recommend using the crosshair casters use for professional live streams:</p>
                        <blockquote>CSGO-aNKFP-FzteR-6uRz5-4WP64-X6urD</blockquote>
                        <i>
                            Go into Settings and find the Crosshair section. <br>
                            Click "Share or Import" and paste the code above.<br>
                            Remember to backup your own by first clicking "Copy your code" and paste it somewhere you can find it later.
                        </i>
                        <img class="card--img" src="https://www.csgonades.com/images/crosshair_example.jpg" alt="">
                    </div>
                </div>
                <div class="column height-full">
                    <div class="columns is-direction-col">
                        <div class="column height-full">                            
                            <div class="card ">
                               <h3> Video requirements </h3><br>
                                <ul>
                                    <li>- Aspect ratio 16:9</li>
                                    <li>- Hide any clutter before recording.</li>
                                </ul>
                                <i>Use this command to only show your crosshair in the video:</i>
                                <blockquote>cl_draw_only_deathnotices 1; net_graph 0; r_drawviewmodel 1;</blockquote>                                
                                <p>Upload to Gfycat after recording and copy the link.</p>
                            </div>
                        </div>
                        <div class="column height-full">
                            <div class="card">
                               <h3>Screenshots</h3><br>
                                <p>You are going to need two images, one showing the end result and one for how to line it up.</p>
                                <div class="columns">
                                    <div class="column">
                                        <p>Result Image Example</p>
                                        <img width="100%" src="https://storage.googleapis.com/csgonades-3308a.appspot.com/nades/mdwoAZCKZI9NGbdZvi8QG_thumb.jpg" alt="">
                                    </div>
                                    <div class="column">
                                        <p>Line Up Image Example</p>
                                        <img width="100%" src="https://storage.googleapis.com/csgonades-3308a.appspot.com/lineup/-0tAWSl89Uag7wk2Mobo8.jpg" alt="">
                                    </div>
                                </div>
                                <blockquote>cl_draw_only_deathnotices 1; net_graph 0; r_drawviewmodel 1;</blockquote>                                
                                <p>Upload to Gfycat after recording and copy the link.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="columns">
                    <div class="column">
                        <h3>Information</h3>
                        <hr>
                        <div class="field">
                            <span>Map</span>
                            <select class="select is-darktheme is-fullwidth" v-model="mapSelect">
                                <option :value="item" v-for="(item, index) in maps" :key="index" v-html="item"></option>
                            </select>
                        </div>
                        <div class="field">
                            <span>OVERVIEW POSITION</span>
                            <button class="button is-primary is-fullwidth" @click="modalToggle(0)" :disabled="!mapSelect">set overview POSITION</button>
                        </div>
                        <div class="field">
                            <span>Type</span>
                            <select class="select is-darktheme is-fullwidth" v-model="typSelect">
                                <option :value="item" v-for="(item, index) in type" :key="index" v-html="item"></option>
                            </select>
                        </div>
                        <div class="field">
                            <span>GFYCAT VIDEO URL</span>
                            <input class="input is-darktheme is-fullwidth" type="text" placeholder="Example: https://gfycat.com/confusedwiltedamazonparrot" v-model="gfycat">
                        </div>
                        <div class="field">
                            <span>NADE END LOCATION</span>
                            <input class="input is-darktheme is-fullwidth" type="text" placeholder="Example: XBox" v-model="endlocaltion">
                        </div>
                        <div class="field">
                            <span>THROWN FROM</span>
                            <input class="input is-darktheme is-fullwidth" type="text" placeholder="Example: T Spawn" v-model="throwFrom">
                        </div>
                    </div>
                    <div class="column">
                        <div class="columns is-direction-col">
                            <div class="column">
                                <h3>Images</h3>
                                <hr>
                                <div class="field">
                                    <span>RESULT IMAGE</span>
                                    <button class="button is-primary is-fullwidth">Set Image (ONLY JPG)</button>
                                </div>
                                <div class="field">
                                    <span>LINE UP IMAGE</span>
                                    <button class="button is-primary is-fullwidth">Set Image (ONLY JPG)</button>
                                </div>
                            </div> 
                            <div class="column">
                                <h3>Meta Data</h3>
                                <hr>
                                <div class="field">
                                    <span>Team</span>
                                    <select class="select is-darktheme is-fullwidth" v-model="team">
                                        <option value="Both">Both</option>
                                        <option value="ct">Counter-Terrorist</option>
                                        <option value="t">Terrorist</option>
                                    </select>
                                </div>
                                <div class="field">
                                    <span>Movement</span>
                                    <select class="select is-darktheme is-fullwidth" v-model="movement">
                                        <option value="Crouching">Crouching</option>
                                        <option value="Crouchwalking">Crouchwalking</option>
                                        <option value="Running">Running</option>
                                        <option value="Stationary">Stationary</option>
                                        <option value="Walking">Walking</option>
                                    </select>
                                </div>
                                <div class="field">
                                    <span>Technique</span>
                                    <select class="select is-darktheme is-fullwidth" v-model="technique">
                                        <option value="mouse-left">Mouse Left</option>
                                        <option value="mouse-right">Mouse Right</option>
                                        <option value="mouse-both">Mouse Both</option>
                                        <option value="Jumpthrow">Jumpthrow</option>
                                        <option value="Jumpthrow+w">Jumpthrow +w</option>
                                        <option value="Jumpthrow-mouse-both">Jumpthrow - Mouse Both</option>
                                    </select>
                                </div>
                                <div class="field">
                                    <span>One Way</span>
                                    <input type="Checkbox">
                                </div>
                                <button class="button is-primary is-fullwidth" @click="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "add",
    computed:{
        
    },
    data(){
        return{
            maps: ["Mirage","Inferno","Dust2","Overpass","Nuke","Vertigo","Ancient"],
            type: ["smoke","molotov","flash","he"],
            modal:[false],
            mapSelect:null,
            typSelect:null,
            modalisEnable: false,
            pos:[0,0],
            gfycat: null,
            endlocaltion: null,
            throwFrom: null,
            team: null,
            movement: null,
            technique: null
        }
    },
    methods:{
        modalToggle(modal){
            this.modalisEnable = !this.modalisEnable;
            this.modal[modal] = !this.modal[modal];
            console.log(this.modal[modal]);
        },
        addpos(){
            const map = document.querySelector('.map');
            console.log("1");
            map.addEventListener("click", (e) => {   
                this.clearPos();
                this.pos[0] = ((e.clientX - map.offsetLeft)/(5.68));
                this.pos[1] = ((e.clientY - map.offsetTop)/(5.68));
                console.log(this.pos[0],this.pos[1]);
                this.drawPos();
            })
            
            
        },
        drawPos(){
            const map = document.querySelector('.map');
            let nade = document.createElement("div");
            nade.classList.add("point");            
            nade.style.top = (((this.pos[1]/100)*568)-5)+"px";
            nade.style.left = (((this.pos[0]/100)*568)-5)+"px";
            map.appendChild(nade);
        },
        clearPos(){
            const map = document.querySelector('.map');
            map.innerHTML = "";
        },
        cancelSetPos(){
            this.clearPos();
            this.modalToggle(0)
        },
        submit(){
            if(this.pos[0] == 0 || this.pos[0] == 0)return;
            if(this.mapSelect == "" || this.mapSelect == null)return;
            if(this.typSelect == "" || this.typSelect == null)return;
            if(this.gfycat == null || this.gfycat.trim() == "" || !this.gfycat.includes("https://gfycat.com/"))return;
            if(this.endlocaltion == null || this.endlocaltion.trim() == "")return;
            if(this.throwFrom == null || this.throwFrom.trim() == "")return;
            if(this.team == null || this.team.trim() == "")return;
            if(this.movement == null || this.movement.trim() == "")return;
            if(this.technique == null || this.technique.trim() == "")return;
            let tempObj = {
                type: this.typSelect,
                map: this.mapSelect,
                pos: this.pos,
                gfycat: this.gfycat,
                endlocaltion: this.endlocaltion,
                throwFrom: this.throwFrom,
                team: this.team,
                movement: this.movement,
                technique: this.technique
            }
            this.$store.dispatch("nadeStore/addNade", tempObj);
        }
    },
    mounted(){
        this.addpos();
    },
    watch:{
        mapSelect:(val, oldVal) => {
            const map = document.querySelector('.map');
            map.className = "map";
            map.classList.add(val);
        }
    }
}
</script>
<style>
    
    
    
    
    
</style>