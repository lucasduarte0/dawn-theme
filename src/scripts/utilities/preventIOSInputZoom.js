// This prevents iOS zoom on focused form elements with font size smaller than 16px.
// iOS 10+ allows pinch-zoom even if viewport is unscalaeable.
// We feature detect those browsers and apply additional rules.
if (
    window.CSS?.supports?.(
        '(font:-apple-system-body) and (-webkit-touch-callout:none) and (-webkit-tap-highlight-color:hotpink)'
    )
) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport !== null) {
        viewport.content = `${viewport.content},user-scalable=no`;
    }
}