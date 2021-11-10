import "styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-mauve1 text-mauve12">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
