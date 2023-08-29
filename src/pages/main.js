

import BoxScene from "../threejs/myapp"
import '../styles/main.css'
import Info from "../components/info"
let HomePage = (props)=>{

    return(
        <>
            <div className="main">
            <div className="info" onClick={()=>props.setListener(!props.listener)}>
                    <div>
                        <Info></Info>
                    </div>
            </div>
               <div className="viewer">
                {
                     <BoxScene/>
                }
               </div>
            </div>
        </>
    )
}

export default HomePage