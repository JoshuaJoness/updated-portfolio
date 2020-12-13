import React from 'react'

const About = () => {
    return (
        <div style={{ backgroundColor:'#fff', height: '100vh', paddingTop: 50 }}>
            <h1 style={{ fontSize: 50, marginTop: 30, textAlign: 'center' }}>About Me :)</h1>
            <img src="/monkey.JPG" style={{ width: '60%', display: 'block', margin: 'auto' }} />
            <span>Ubud, Bali, 2019</span>
        </div>
    )
}

export default About