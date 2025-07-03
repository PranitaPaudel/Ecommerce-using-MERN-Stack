import Navbar from "../components/navbar";
import Categories from "../components/categories";
import Footer from "../components/footer";
import MainHome from "../components/mainhome";

function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div
            className="col-md-3 col-lg-2 d-none d-md-block p-0"
            style={{
              position: "sticky",
              top: "70px",
              height: "calc(100vh - 70px)",
              overflowY: "auto",
            }}
          >
            <Categories />
          </div>
          <div className="col-md-9 col-lg-10 p-3">
            <MainHome />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
