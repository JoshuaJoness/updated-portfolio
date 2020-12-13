import React from 'react'
import Emoji from "react-emoji-render";

const About = () => {
    return (
        <div style={{ backgroundColor:'#fff', height: '100vh', paddingTop: 50 }}>
            {/* <h1 style={{ fontSize: 50, marginTop: 30, textAlign: 'center' }}>About Me <Emoji text=":grinning_face:" /></h1>s */}
            <h1 style={{ fontFamily:"'Knewave', cursive", color:'#000', fontSize: 30, textAlign: 'center' }}>
                Hi there, I'm Joshua 
                <Emoji text=":waving_hand:" />
            </h1>
            <p style={{ marginTop:25 }}>
                A software developer currently working with the good folks over at
                <a 
                    href='https://www.boardera.ca/' 
                    target='blank' 
                    style={{fontFamily:"'Knewave', cursive", fontWeight:'bold', fontSize:30, color:'#3a8d6f'}}
                > 
                    Boardera.
                </a>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <img src="/monkey.JPG" style={{ width: '60%', margin: 'auto' }} />
                <span style={{ fontSize: 18, margin: 5, alignSelf: 'center' }}>Ubud, Bali, 2019</span>
            </div>
            <i class="fab fa-linkedin"></i>
            <i class="fab fa-github"></i>
            <i class="fab fa-youtube"></i>
            <i class="fab fa-instagram"></i>
            <i class="fas fa-phone-alt"></i>
            <i class="fas fa-envelope"></i>
            
        </div>
    )
}

export default About