<template>
    <div id="container">
<!--  <div class="container">-->
      <!-- 选中菜单结构 start-->
      <div id="menu">
        <button id="table" @click="transform('table')">表格</button>
        <button id="sphere" @click="transform('sphere')">球体</button>
        <button id="helix" @click="transform('helix')">螺旋体</button>
        <button id="grid" @click="transform('grid')">矩阵</button>
      </div>
      <!-- end -->
    </div>

</template>
<script>
import * as THREE from "three";
import {CSS3DRenderer,CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer";
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import {TWEEN} from 'three/examples/jsm/libs/tween.module.min.js'

export default {
  name:"full3DWall",

  data: function () {
    return {
      table:[],
      scene:null,
      camera:null,
      renderer:null,
      controls:null,
      layer:null,
      objects:[],
      targets:{},
      personArray:[],
      symbolList:[]
    }
  },
  created() {
    console.log(this.$route.query.showID)
    const db=this.$tcb.database()
    db.collection("demo-applyInfo").where({newid:this.$route.query.showID}).get().then(res=> {
      console.log(res.data)
      var arr = res.data
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].otherInfo == '') {
          arr.splice(i, 1);
        } else {
          if (arr[i].otherInfo.role == '1') {
            arr[i].otherInfo.role = '本科生'
          } else if (arr[i].otherInfo.role == '1.5') {
            arr[i].otherInfo.role = '研究生'
          } else if (arr[i].otherInfo.role == '2') {
            arr[i].otherInfo.role = '教师'
          }
        }
      }
      console.log(arr)
      for (i = 0; i < arr.length; i++) {
        this.personArray[i] = arr[i].peopleHead
        arr[i].otherInfo.name=arr[i].otherInfo.name.replace('thirdwx.qlogo.cn','wx.qlogo.cn')
        this.symbolList[i] = arr[i].otherInfo.name
      }
      console.log("personArray", this.personArray)
      console.log("symbolList", this.symbolList)
      this.init()
      this.animate()
    })
  },
  mounted(){
    this.init();
    this.animate();
  },
  methods:{
    init() {
      console.log("init")
      // const felidView = 40;
      const felidView = 50;
      const width = window.innerWidth;
      const height = window.innerHeight;
      //设置相机
      this.camera = new THREE.PerspectiveCamera(felidView, width / height, 1, 80000);
      //设置相机的位置
      // this.camera.position.z = 3000;
      this.camera.position.z = 3500;
      //场景
      this.scene = new THREE.Scene();

      for (var i = 0; i < this.personArray.length*5; i+=5) {
        var j=Math.floor(i/5);
        this.table[i]=this.symbolList[j]
        this.table[i+1]=this.personArray[j]
        this.table[i+2]='test'
        this.table[i+3]=j%10+1;
        this.table[i+4]=Math.floor(j/10)+1
      }

      this.targets = {
        table: [],//列表,
        grid: [],//网格
        helix: [],//环形
        sphere: []//球体
      };
      this.layer = new THREE.Object3D();

      var len = this.table.length;
      this.scene.add(this.layer);
      for (let i = 0; i < len; i += 5) {
        var element = document.createElement('div');
        element.className = 'element';
        element.style.backgroundColor = 'rgba( 238,237,221,' + (Math.random() * 0.5 + 0.25) + ')';
        element.style.width='120px';
        element.style.height='160px';
        element.style.cursor='default';
        element.style.textAlign='center';
        element.style.border='2px solid rgba( 254, 232, 235 0.25 )';
        element.style.boxShadow='0 0 12px rgba( 255, 250,227, 0.5 )';

        var number = document.createElement('div');
        number.className = 'number';
        number.textContent = i / 5 + 1;
        number.style.top='20px'
        number.style.left='100px'
        number.position= 'absolute';
        // number.style.top= '25px';
        number.style.right= '20px';
        number.style.fontSize= '12px';
        number.style.color= 'rgba(0,0,0,0.75)';
        number.style.textShadow='0 0 10px rgba(255, 255, 255, 0.95)';
        element.appendChild(number);

        var symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.textContent = this.table[i];
        symbol.style.position= 'relative';
        symbol.style.top='10px';
        symbol.style.left='0px';
        symbol.style.fontSize='30px';
        symbol.style.fontWeight='bold';
        symbol.style.color='rgba(2, 2, 2, 0.75)';
        symbol.style.textShadow='0 0 35px rgba(255, 255, 255, 0.98)';
        element.appendChild(symbol);

        var picture = document.createElement('img');
        console.log("detail",picture)
        picture.className = 'picture';
        picture.src=this.table[i+1];
        picture.width=80;
        picture.height=80;
        picture.style.position='relative'
        picture.style.top='20px'
        picture.style.left='0px'
        console.log("detail",picture.innerHTML)
        element.appendChild(picture);
        //表格
        var object = new CSS3DObject(element);
        // object = new THREE.CSS3DObject(element);
        // object.position.x = Math.random() * 4000 - 2000;
        // object.position.y = Math.random() * 4000 - 2000;
        // object.position.z = Math.random() * 4000 - 2000;
        object.position.x = Math.random() * 4000 - 1000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;
        // scene.add(object);
        this.layer.add(object);
        this.objects.push(object);

        var obj = new THREE.Object3D();
        // obj.position.x = ( this.table[ i + 3 ] * 140 ) - 620;
        // obj.position.y = - ( this.table[ i + 4 ] * 180 ) + 600;
        obj.position.x = ( this.table[ i + 3 ] * 140 ) - 2000;
        obj.position.y = - ( this.table[ i + 4 ] * 180 ) + 800;
        this.targets.table.push(obj);
      }

      //球体
      var vector = new THREE.Vector3();
      len = this.objects.length
      for (i = 0; i < len; ++i) {
        //弧度值
        let phi = Math.acos(-1 + (2 * i) / len);
        let theta = Math.sqrt(len * Math.PI) * phi;
        object = new THREE.Object3D();

        object.position.x = 900 * Math.cos(theta) * Math.sin(phi);
        object.position.y = 900 * Math.sin(theta) * Math.sin(phi);
        object.position.z = -900 * Math.cos(phi);
        //800影响半径
        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);
        this.targets.sphere.push(object);
      }

      //螺旋
      vector = new THREE.Vector3();
      len = this.objects.length
      for (i = 0; i < len; ++i) {
        // var phi = i * 0.213 + Math.PI;
        var phi = i * 0.4 + Math.PI;
        const object = new THREE.Object3D();
        // object.position.x = 500 * Math.sin(phi);
        object.position.x = 500 * Math.sin(phi)-400;
        object.position.y = -(i * 12) + 500;
        object.position.z = 500 * Math.cos(phi + Math.PI);
        //500和12影响半径、间距
        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;
        object.lookAt(vector);
        this.targets.helix.push(object);
      }

      //多重表格
      len = this.objects.length
      for (i=0;i<len;++i){
        object = new THREE.Object3D();
        object.position.x=((i%3)*300);
        object.position.y=(-(Math.floor(i/3)%3)*400)+500;
        object.position.z=(Math.floor(i/9))*500-2000;
        this.targets.grid.push(object);
      }

      this.renderer = new CSS3DRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.domElement.style.position='absolute';


      document.getElementById('container').appendChild(this.renderer.domElement);
      //轨迹球相机控制器
      this.controls = new TrackballControls(this.camera, this.renderer.domElement);
      this.controls.autoRotate = true;
      this.controls.rotateSpeed = 0.5;
      this.controls.minDistance = 100;
      this.controls.maxDistance = 10000;
      this.controls.addEventListener('change', this.render);

      const me = this;
      var button = document.getElementById('table');
      /*      button.addEventListener('click', function (e) {
              me.transform(this.targets.table, 1000);
            }, false);*/

      /* button = document.getElementById('sphere');
       button.addEventListener('click', function (e) {
         this.transform(this.targets.sphere, 1000);
       }, false);

       button = document.getElementById('helix');
       button.addEventListener('click', function (e) {
         this.transform(this.targets.helix, 1000);
       }, false);

       button = document.getElementById('grid');
       button.addEventListener('click', function (e) {
         this.transform(this.targets.grid, 1000);
       }, false);
 */
      this.transform('table', 1000);
      window.addEventListener('resize', this.onWindowResize, false);
    },

    transform( name, duration = 1000 ) {

      const targets = this.targets[name];
      TWEEN.removeAll();
      for (var i=0;i<this.objects.length;++i) {
        var object=this.objects[i];
        var target=targets[i];

        new TWEEN.Tween(object.position)
            .to({
              x: target.position.x,
              y: target.position.y,
              z: target.position.z
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
      }

      // 这个补间用来在位置与旋转补间同步执行，通过onUpdate在每次更新数据后渲染scene和camera
      new TWEEN.Tween(this)
          .to({}, duration * 2)
          .onUpdate(this.render)
          .start();
    },

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( window.innerWidth, window.innerHeight );

      this.render();
    },

    animate() {
      this.layer.rotation.y += 0.003;
      requestAnimationFrame(this.animate);
      TWEEN.update();
      this.controls.update();
      this.render()
    },

    render() {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
</script>
<style scoped>
#container {
  background-image:url(../../public/static/wall3D/img.png) ;
  /*background-color: #000000 !important;*/
  margin: 0;
  font-family: Helvetica, sans-serif;
  overflow: hidden;
  width: 1500px;
  height:1000px;
}

/*选择按钮样式start*/
#menu {
  position: absolute;
  z-index: 100;
  width: 100%;
  top: 50px;
  left:80px;
  text-align: center;
  font-size: 32px
}

button {
  border: none;
  background-color: transparent;
  color: rgba(253, 246, 185, 0.75);
  padding: 12px 24px;
  cursor: pointer;
  outline: 1px solid rgba(243, 230, 135, 0.75);
}

button:hover {
  background-color: rgba(250, 243, 216, 0.5)
}

button:active {
  background-color: rgba(255, 219, 127, 0.75)
}

</style>


