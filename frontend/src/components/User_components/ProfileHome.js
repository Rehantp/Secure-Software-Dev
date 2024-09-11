import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import VideoBG from '../../assets/Backround_video.mp4';

export default function ProfileHome() {
  return (
    <div style={{ position: 'relative' }}>
      <video
        src={VideoBG}
        autoPlay
        loop
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        title="Background Video"
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Adjusted height to cover the entire viewport
        }}
      >
        <h1 style={{ fontFamily: 'Poppins', fontSize: '60px', color: 'black' }}>Sight Sense</h1>
        <Link to="/login">
          <Button type="primary" size="large" style={{ fontSize: '24px', width: '200px', height: '60px', backgroundColor: "#6AB187"}}>
            Get Started!
          </Button>
        </Link>
      </div>
    </div>
  );
}
