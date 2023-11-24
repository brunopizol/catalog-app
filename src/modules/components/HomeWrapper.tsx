import { useState } from "react";
import ProductGrid from "./ProductGrid";
import { Product } from "../types/Product";

const HomeWrapper: React.FC = () => {
    return(
         <div>
      <ProductGrid />
      </div>
    );
  
  }
  export default HomeWrapper;