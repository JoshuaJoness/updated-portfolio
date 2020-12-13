import React from 'react'

const CalorieCam = () => {
    return (
        <div style={{ height:'80vh', backgroundColor:'#525252' }}>
            <h1 style={{ fontFamily: 'Knewave, cursive', fontSize:'7rem', textAlign: 'center', color: '#B9E4C9' }}>Calorie Cam</h1>
            <div style={{ display:'grid', gridTemplateColumns: '55% 45%',  }}>
                <iframe
                    style={{ border: 'none', height: '80%', width: '80%', margin: '5rem' }}
                    volume="0" 
                    allowFullScreen
                    src='https://www.youtube.com/embed/O4IJs9kvR9U'>
                </iframe>
                <div style={{ fontSize: 20, margin: '5rem' }}>
                    <h1 style={{fontFamily:"'Montserrat', cursive", color:'#B9E4C9', color:'#FFF'}}>
                        The first app that I released to the App Store.
                        <br />
                        <br />
                        It utilizes machine learning and computer vision to recognize food items and provide nutrition information
                    </h1>
                    <div style={{ marginTop: '20%' }}>
                        <h1 style={{fontFamily:"'Montserrat', cursive", color:'#B9E4C9'}}>See the code: <i class="fab fa-github-alt"></i></h1>
                        <h1 style={{fontFamily:"'Montserrat', cursive", color:'#B9E4C9'}}>Download the App: <i class="fab fa-app-store-ios"></i></h1>
                    </div>  
                </div>
            </div>
      </div>
    )
}

export default CalorieCam