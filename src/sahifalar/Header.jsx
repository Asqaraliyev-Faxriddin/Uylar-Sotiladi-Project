import React from 'react'
import {Link} from "react-router-dom"

function Header() {
  return (
   <>
   
    
    <div className='bg-[#0d263b]  justify-around flex  mx-auto items-center h-[70px] w-[1,440px]'>


        <div>
            <img src="./img/logo.png " alt="" />
        </div>

    <div className=''>
    <ul className='text-white flex gap-[30px] '>

<Link to={"/"} >Home</Link>
<Link >Properties</Link>
<Link >Contacts</Link>


</ul>
    </div>


    <div>
        <img src="./img/Vector.png" alt="" />
    </div>



    <div>
        
    </div>


    </div>
   
   
   
   </>
  )
}

export default Header