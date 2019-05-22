<template>
  <div id="demo"></div>
</template>

<script>
import * as THREE from 'three'

export default {
  data () {
    return {}
  },
  methods: {
    init () {
      var scene = new THREE.Scene()
      var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      var renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.getElementById('demo').appendChild(renderer.domElement)

      var geometry = new THREE.BoxGeometry(1, 1, 1)
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      var cube = new THREE.Mesh(geometry, material)
      scene.add(cube)
      camera.position.z = 5
      var animate = function () {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
      }
      animate()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
}
#demo {
  width: 500px;
  height: 500px;
}
canvas {
  width: 500px!important;
  height: 500px!important;
}
</style>
