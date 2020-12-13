import React, { useState, useCallback } from 'react'
import { animated, useTransition, useSpring as useSpr } from 'react-spring'
import './projectsStyle.css'

const pages = [
    ({ style }) => {
      return (
        <animated.div style={{ ...style, display: 'flex', flexDirection: 'column'  }}>
            <iframe
                style={{ border: 'none', height: '50vh', width: '80%', margin: 'auto' }}
                volume="0" 
                allowFullScreen
                src='https://www.youtube.com/embed/O4IJs9kvR9U'>
            </iframe>
            <div style={{ fontSize: 15, margin: '5rem' }}>
                <h1 style={{ fontFamily:"'Montserrat', cursive", color:'#B9E4C9', color:'#FFF', textAlign: 'center' }}>
                    This is the first app that I released to the App Store.
                    <br />
                    <br />
                    It utilizes machine learning and computer vision to recognize food items and provide nutrition information
                </h1>
            </div>
        </animated.div>
    )},
    ({ style }) => (
        <animated.div style={{ ...style, marginTop: '20%' }}>
        <h1 style={{fontFamily:"'Montserrat', cursive", color:'#B9E4C9'}}>See the code: <i class="fab fa-github-alt"></i></h1>
        <h1 style={{fontFamily:"'Montserrat', cursive", color:'#B9E4C9'}}>Download the App: <i class="fab fa-app-store-ios"></i></h1>
    </animated.div> 
    )
  ]

const CalorieCam = () => {
    const [index, setIndex] = useState(0)
    const onClick = useCallback(() => setIndex(state => (state + 1) % 2), [])
    const transitions = useTransition(index, p => p, {
      from: { opacity: 0, /*transform: 'translate3d(100%,0,0)'*/ },
      enter: { opacity: 1, /*transform: 'translate3d(0%,0,0)'*/ },
      leave: { opacity: 0, /*transform: 'translate3d(-50%,0,0)'*/ },
    })



    return (
        <div style={{ /*height:'80vh', */backgroundColor:'#525252', marginBottom: 100, borderRadius: 5 }}>
            <h1 style={{ fontFamily: 'Knewave, cursive', fontSize:'7rem', textAlign: 'center', color: '#B9E4C9' }}>Calorie Cam</h1>
            {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} index={index} setIndex={setIndex} />
      })}
                    <div className="button-container">
                        <button className="project-button">PREV</button>
                        <button className="project-button" onClick={onClick}>NEXT</button>
                    </div>
          \
      </div>
    )
}

export default CalorieCam