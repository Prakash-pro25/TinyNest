// Controls the existing embedded YouTube IFrame player. No external YouTube app is launched.
export function controlPlayer(webViewRef, action) {
  if (!['play', 'pause', 'stop'].includes(action)) {
    return;
  }
  webViewRef.current?.injectJavaScript(
    `window.tinynestPlayerControl && window.tinynestPlayerControl('${action}'); true;`,
  );
}
