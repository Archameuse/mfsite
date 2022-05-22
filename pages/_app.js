import 'bootstrap/dist/css/bootstrap.css'
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/globals.css";
import { ReactQueryDevtools } from "react-query/devtools";


import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}