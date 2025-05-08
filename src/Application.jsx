import { useState } from "react"
import React from 'react'

const styles = {
    color: 'blue',
    fontStyle: 'italic',
}
const styles1 = {
    color: 'green',
    fontStyle: 'italic',
}
const str = <h1 style={styles}>Sabaiydee</h1>
function get(username,lastname) {
    return `Welcomeder :${username} :${lastname}`
}
const login = true;
const error = true;
const items = [
    'tao',
    'lon',
    'vai'
]

function Fuccomponent(){
    return <h1>this is func</h1>;
}
class ClassComponent extends React.Component {
    render(){
        return <h1>this is Class</h1>;

    }
}
function handleevent(e){
    alert('clicked')
    console.log(e);
}

function Application() {
  return (
    <>
    {str}
    <h1 style={styles1}>{get('Tao','inthavong')} </h1>
    {error && <div style={{color:'red'}}>name error</div> }
    {(login) ? 'welcome': "byebye"}
    List: <ul>
        {items.map(item => <li>{item}</li>)}
    </ul>
    <Fuccomponent/>
    <ClassComponent/>
    <button onClick={handleevent}>click</button>
    </>
  )
}

export default Application