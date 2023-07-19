import type { NextPage } from 'next';
import Navbar from '../Navbar';
import Footer from '../Footer';


const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout;

