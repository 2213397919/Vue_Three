<template>
  <div></div>
</template>

<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
import Stats from 'stats-js'
import dat from 'dat.gui'

export default {
  name: 'scene',
  data () {
    return {
      renderer: null,
      camera: null,
      scene: null,
      gui: null,
      light: null,
      stats: null,
      controls: null,
      datGui: null,
      helper: null,
      loader: null
    }
  },
  methods: {
    // 渲染
    initRender () {
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      // 告诉渲染器需要阴影效果
      this.renderer.setClearColor(0xffffff)
      document.body.appendChild(this.renderer.domElement)
    },
    // 相机
    initCamera () {
      this.camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth / window.innerHeight,
        0.2,
        1000
      )
      this.camera.position.set(0, 100, 100)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    },
    // 场景
    initScene () {
      this.scene = new THREE.Scene()
    },
    // 初始化dat.GUI简化试验流程
    initGui () {
      // 声明一个保存需求修改的相关数据的对象
      this.datGui = new dat.GUI()
      this.datGui.add(this.camera)
      // 将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    },
    // 光点
    initLight () {
      this.scene.add(new THREE.AmbientLight(0x444444))
      this.light = new THREE.PointLight(0xffffff)
      this.light.position.set(0, 0, 500)
      // 告诉平行光需要开启阴影投射
      this.light.castShadow = true
      this.scene.add(this.light)
    },
    // 通过第三方库加载外部文件
    initModel () {
      // 辅助工具
      // this.helper = new THREE.AxesHelper(50)
      // this.scene.add(this.helper)
      // 加载OBJ格式的模型
      var mtlLoder = new MTLLoader()
      var that = this
      mtlLoder.load('/static/obj/2.mtl', materials => {
        // console.log(55555, materials)
        materials.preload()
        var loader = new OBJLoader()
        loader.setMaterials(materials)
        loader.load('/static/obj/2.obj', obj => {
          // console.log(11111, obj)
          obj.position.y = 0
          obj.rotation.x = 0
          obj.scale.set(0.6, 0.6, 0.6)
          that.scene.add(obj)
        })
      })
    },

    // 初始化性能插件
    initStats () {
      this.stats = new Stats()
      document.body.appendChild(this.stats.dom)
    },

    // 用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放(第三方库)
    initControls () {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // 如果使用animate方法时，将此函数删除
      // controls.addEventListener( 'change', render )
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controls.enableDamping = true
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
      // controls.dampingFactor = 0.25
      // 是否可以缩放
      this.controls.enableZoom = true
      // 是否自动旋转
      this.controls.autoRotate = true
      // 设置相机距离原点的最远距离
      this.controls.minDistance = 1
      // 设置相机距离原点的最远距离
      this.controls.maxDistance = 200
      // 是否开启右键拖拽
      this.controls.enablePan = true
    },
    // 渲染在场景中
    render () {
      this.renderer.render(this.scene, this.camera)
    },

    // 窗口变动触发的函数
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.render()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    // 动画
    animate () {
      // 更新控制器
      this.render()
      // 更新性能插件
      this.stats.update()
      this.controls.update()
      requestAnimationFrame(this.animate)
    },
    // 依次调用各函数渲染。
    draw: function () {
      this.initRender()
      this.initScene()
      this.initCamera()
      this.initLight()
      this.initModel()
      this.render()
      this.initControls()
      this.initStats()
      this.animate()
      this.initGui()
      // window.onresize = onWindowResize
    }
  },
  mounted () {
    this.draw()
  }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
