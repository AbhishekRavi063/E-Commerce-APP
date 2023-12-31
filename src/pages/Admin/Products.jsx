import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";

import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

function Products() {
  const [products, setProducts] = useState([]);
  const [photo, setPhoto] = useState([]);

  //GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-Product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //Lifecycle
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All products list</h1>
          <div className="d-flex">
            {products?.map((p) => {
              return (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2">
                    <img
                      src={`${process.env.REACT_APP_API}/api/vl/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
