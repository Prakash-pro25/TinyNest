import React, {forwardRef, useMemo, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {theme} from '../styles/theme';

const VIDEO_ID = 'M7lc1UVf-VE'; // Educational YouTube demo video

const EmbeddedYouTubePlayer = forwardRef(
  function EmbeddedYouTubePlayer(_, ref) {
    const [failed, setFailed] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const html = useMemo(
      () => `<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <style>
    html, body, #player {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #02050b;
    }
  </style>
</head>
<body>
  <div id="player"></div>
  <script>
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        width: '100%',
        height: '100%',
        videoId: '${VIDEO_ID}',
        playerVars: {
          autoplay: 0,
          controls: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          fs: 1,
          iv_load_policy: 3
        },
        events: {
          onReady: function() {
            window.tinynestPlayerReady = true;
          }
        }
      });
    }

    window.tinynestPlayerControl = function(action) {
      try {
        if (!player || !player.getPlayerState) return;
        if (action === 'pause') {
          player.pauseVideo();
        } else if (action === 'stop') {
          player.stopVideo();
        } else if (action === 'play') {
          player.playVideo();
        }
      } catch(e) {}
    };

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  </script>
</body>
</html>`,
      [],
    );

    return (
      <View style={styles.frame}>
        <WebView
          key={reloadKey}
          ref={ref}
          source={{html, baseUrl: 'https://www.youtube.com'}}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          scrollEnabled={false}
          originWhitelist={['*']}
          onError={() => setFailed(true)}
        />
        {failed && (
          <View style={styles.error}>
            <Text style={styles.title}>Video could not load</Text>
            <Text style={styles.copy}>
              Check the internet connection and try again.
            </Text>
            <Pressable
              focusable
              hasTVPreferredFocus
              onPress={() => {
                setFailed(false);
                setReloadKey(v => v + 1);
              }}
              style={({focused}) => [styles.retry, focused && styles.focused]}>
              <Text style={styles.retryText}>TRY AGAIN</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  error: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  copy: {
    color: theme.colors.muted,
    marginTop: 10,
  },
  retry: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: theme.colors.mint,
  },
  focused: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  retryText: {
    color: '#102033',
    fontWeight: '900',
  },
});

export default EmbeddedYouTubePlayer;
