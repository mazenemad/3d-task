  import { createRoot } from 'react-dom/client'
  import React, { useRef, useState,useMemo } from 'react'
  import { Canvas, useFrame,useLoader } from '@react-three/fiber'
  import { PresentationControls ,OrbitControls, Loader, PointerLockControls, BBAnchor,Html, TransformControls} from '@react-three/drei'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import * as THREE from 'three'
  import loading from '../loading.gif'
  let global = {}
  let clickableObject = {
    "Moon_0":{vars:{color:'green',name:'Moon',options:['height:1m','width:1m']}},
    "mff_stone_mossy_0005_0":{vars:{color:'red',name:'Tower3',options:['height:1m','width:1m']}},
    "mff_island_small_0":{vars:{color:'blue',name:'small island 1',options:['height:1m','width:1m']}},
    "mff_island_large_0":{vars:{color:'blue',style:{width:5,background:'red'},name:'larg island',options:['height:1m','width:1m']}},
    
    
  }
  function Load(){
    let [display,setDisplay] = useState(false)
    global.setDisplay = setDisplay
    return <div className='loader'
    style={{display:!display?'block':'none',background:'#1874D2',position:'absolute',zIndex:'100',left:0,height:0,width:"100%",height:"100vh"}}>
      <h1 style={{color:'white',textAlign:'center',marginTop:'2'}}>loading...</h1>
      <img src={loading}></img>
    </div>
  }
  function Scene1() {
    const gltf = useLoader(GLTFLoader, '/map.glb', loader => {
      loader.manager.onLoad = ()=>{global.setDisplay(true)}
    })
    gltf.scene.children.forEach((mesh, i) => {
          mesh.castShadow = true;
      })
      gltf.castShadow = true;
      gltf.scene.castShadow = true;
      return (
          <primitive object={gltf.scene}/>
      );
  }
  const Annotation = (props) => {
    
    let {vars,found,position} = props
    vars = vars.vars
    if(!vars)
    return
  console.log(vars)
   return(
        <Html distanceFactor={1} occlude rotation={[0,0,Math.PI/4]} position={[position[0],position[1]+0.5,position[2]]}>
        <div style={vars.style}>
        <h1>{vars.name}</h1>
        <div style={
          {
            display: "flex",
            "flex-direction": "column",
            gap:'10px'
          }
        }>
          {  
              vars.options.map((e)=>{
                return <span>{e}</span>
              })
          }
          </div>
        </div>
      </Html>
   )
  };
  function BoxScene(props) {
    let [cameraPosition,setCameraPosition] = useState([0,5,20])
    let [object,setObject] = useState({object:'',position:[0,5,20]})
    console.log(object.position)
    return (
      <>
        <Load/>
        <div style={{height: "100vh"}}>
          <Canvas shadows flat dpr={[1, 2]} camera={{ zoom:1,fov: 25, position:object.position }}>
            <ambientLight intensity={0.8} />
            <color attach="background" args={['#e0b7ff']} />
            <directionalLight position={[64.19672, 11.82403, 11.82403]} intensity={3} color="yellow" />
            <OrbitControls makeDefault />
            {/* <PresentationControls snap zom global zoom={3} rotation={[0, -Math.PI / 4, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}> */}
                  <group onClick={(e)=>{
                    console.log(e.object.name);
                    for(let key in clickableObject){
                      if(key === e.object.name)
                      setObject({object:clickableObject[`${key}`],position:[e.point.x,e.point.y,e.point.z]})
                    }
                    
                }
                
                } scale={0.08}>
                  <Scene1></Scene1>
                  </group>
                  {/* </PresentationControls> */}
                  <Annotation vars={object.object??false} position={object.position} />
      
          </Canvas>
        </div>
      </>
    )
  }



  export default BoxScene