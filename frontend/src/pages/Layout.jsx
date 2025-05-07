import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-4">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;