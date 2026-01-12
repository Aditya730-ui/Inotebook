import React, { useContext } from 'react'

import Notes from './Notes';
import Addnote from './Addnote';
import Noteitem from './Noteitem';

export default function Home(props) {
  const {showalert}=props
  return (
    <>
  
<Notes showalert={showalert}/>
    </>
  )
}


