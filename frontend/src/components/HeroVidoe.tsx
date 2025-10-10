"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function HeroVideo() {
  const playerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const youtubeVideoId = "PO3YJJgmoGw";

  useEffect(() => {
    // Load YouTube IFrame API
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    function initializePlayer() {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 1,
          mute: 1, // Start muted
          loop: 1,
          playlist: youtubeVideoId,
          controls: 0, // Hide all YouTube controls
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onReady: (event: any) => {
            setIsLoaded(true);
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            // Loop the video when it ends
            if (event.data === window.YT.PlayerState.ENDED) {
              playerRef.current.playVideo();
            }
          },
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [youtubeVideoId]);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="w-full md:w-1/2 mt-2 bg-gray-100 rounded-lg overflow-hidden relative">
      <div className="relative pb-[56.25%] h-0">
        <div id="youtube-player" className="absolute top-0 left-0 w-full h-full" />
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading video...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom mute/unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all shadow-lg z-10"
        title={isMuted ? "Mute" : "Unmute"}
      >
        {!isMuted ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        )}
      </button>
    </div>
  );
}