import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ReceiptPage from "./pages/ReceiptPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="overflow-hidden p-4 md:p-6">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
