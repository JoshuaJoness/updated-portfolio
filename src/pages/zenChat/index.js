import React from 'react'

const ZenChat = () => {
    return (
        <div style={{ backgroundColor:'#eee' }}>
            <h1 style={{ fontFamily: 'Knewave, cursive', fontSize:'7rem', textAlign: 'center', color: '#000' }}>Zen Chat</h1>
            <div style={{ display:'grid', gridTemplateColumns: '45% 55%' }}>
                <div style={{ fontSize: 20, margin: '5rem' }}>
                    <h1 style={{fontFamily:"'Montserrat', cursive", color:'#B9E4C9', color:'#000'}}>
                        This is a chat application that sends and receives messages in real time by utilizing web sockets.
                    </h1>
                </div>
                <img src="/zenChat.png" style={{ border: 'none', width: '80%', margin: '5rem' }} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns: '55% 45%' }}>
            <img src="/zenChat2.png" style={{ border: 'none', width: '80%', margin: '5rem' }} />
                <div style={{ fontSize: 20, margin: '5rem' }}>
                    <div style={{ marginTop: '20%' }}>
                        <h1 style={{fontFamily:"'Montserrat', cursive", color:'#000'}}>See the code: <i class="fab fa-github-alt"></i></h1>
                        <h1 style={{fontFamily:"'Montserrat', cursive", color:'#000'}}>Play with the App: <i class="fab fa-app-store-ios"></i></h1>
                    </div>  
                </div>
                
            </div>
      </div>
    )
}

export default ZenChat