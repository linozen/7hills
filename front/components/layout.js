import Footer from './footer';
import Meta from './meta';

// this defines the entire view, it wraps around everything
export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="min-w-full">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
