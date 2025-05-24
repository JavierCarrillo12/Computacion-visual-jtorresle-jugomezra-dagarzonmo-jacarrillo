import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

// Component that creates a 360° video sphere using Three.js
function VideoSphere({ onVideoReady, isPlaying, showMessage }) {
  const meshRef = useRef()
  const videoRef = useRef()
  const [videoTexture, setVideoTexture] = useState(null)

  useEffect(() => {
    // Create video element and set its properties
    const video = document.createElement('video')
    video.src = '/video360.mp4' // Video file must be placed in the public folder
    video.crossOrigin = 'anonymous' // Enable CORS for video loading
    video.loop = true // Enable video looping
    video.muted = true // Required for autoplay in modern browsers
    video.playsInline = true // Play inline on mobile devices

    videoRef.current = video

    // Create Three.js video texture
    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter // Set texture filtering for better quality
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat

    setVideoTexture(texture)

    // Video event handlers
    const handleCanPlay = () => {
      onVideoReady(true, () => {
        if (isPlaying) {
          video.play().catch(console.error)
        } else {
          video.pause()
        }
      })
    }

    const handleError = () => {
      console.log('Error loading video - using demo video')
      onVideoReady(false, null)
    }

    // Add event listeners for video state
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)

    // Cleanup function to remove event listeners and stop video
    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
      video.pause()
      video.src = ''
    }
  }, [])

  // Handle play/pause state changes
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error)
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  // Render the 360° sphere with video texture
  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[10, 60, 40]} /> {/* Create sphere with radius 10 and segments */}
      <meshBasicMaterial
        map={videoTexture}
        side={THREE.BackSide} // Render on inside of sphere
        color={showMessage ? '#444' : 'white'} // Darken sphere when showing message
      />
    </mesh>
  )
}

// Main component that manages video state and controls
function VideoScene360() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showMessage, setShowMessage] = useState(true)
  const [togglePlayCallback, setTogglePlayCallback] = useState(null)

  // Handle video ready state
  const handleVideoReady = (ready, callback) => {
    setShowMessage(!ready)
    setTogglePlayCallback(() => callback)
  }

  // Toggle play/pause state
  const togglePlayPause = useCallback(() => {
    if (togglePlayCallback) {
      setIsPlaying(!isPlaying)
    }
  }, [togglePlayCallback, isPlaying])

  // Create portal for video controls outside of Canvas
  useEffect(() => {
    const controlsDiv = document.createElement('div')
    controlsDiv.id = 'video-controls-portal'
    document.body.appendChild(controlsDiv)

    return () => {
      const existingDiv = document.getElementById('video-controls-portal')
      if (existingDiv) {
        document.body.removeChild(existingDiv)
      }
    }
  }, [])

  // Render video controls
  useEffect(() => {
    const controlsDiv = document.getElementById('video-controls-portal')
    if (controlsDiv) {
      controlsDiv.innerHTML = ''

      // Create controls container with styling
      const controls = document.createElement('div')
      controls.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        background: rgba(17, 17, 17, 0.85);
        padding: 12px 24px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 15px;
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        opacity: 0;
      `

      // Add hover effect to show controls
      controls.onmouseover = () => {
        controls.style.opacity = '1'
      }
      controls.onmouseout = () => {
        controls.style.opacity = '0'
      }

      if (showMessage) {
        // Show error message if video is not ready
        controls.innerHTML = `
          <div style="color: #ff6b6b; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.2rem;">⚠️</span>
            Add video360.mp4 to the public folder
          </div>
        `
      } else {
        // Create play/pause button
        const button = document.createElement('button')
        button.style.cssText = `
          background: rgba(0, 198, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 15px rgba(0, 114, 255, 0.2);
        `
        button.innerHTML = isPlaying ? '⏸️' : '▶️'
        button.onclick = togglePlayPause

        // Add hover effects
        button.onmouseover = () => {
          button.style.background = 'rgba(0, 198, 255, 0.3)'
          button.style.border = '2px solid rgba(255, 255, 255, 0.3)'
          button.style.transform = 'scale(1.05)'
          button.style.boxShadow = '0 6px 20px rgba(0, 114, 255, 0.3)'
        }
        button.onmouseout = () => {
          button.style.background = 'rgba(0, 198, 255, 0.2)'
          button.style.border = '2px solid rgba(255, 255, 255, 0.2)'
          button.style.transform = 'scale(1)'
          button.style.boxShadow = '0 4px 15px rgba(0, 114, 255, 0.2)'
        }

        // Add video description
        const span = document.createElement('span')
        span.style.cssText = `
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        `
        span.textContent = '360° Video - Free Navigation'

        controls.appendChild(button)
        controls.appendChild(span)
      }

      controlsDiv.appendChild(controls)
    }
  }, [isPlaying, togglePlayPause, showMessage])

  return (
    <>
      <VideoSphere
        onVideoReady={handleVideoReady}
        isPlaying={isPlaying}
        showMessage={showMessage}
      />
      <ambientLight intensity={1} /> {/* Add ambient light to the scene */}
    </>
  )
}

export default VideoScene360
