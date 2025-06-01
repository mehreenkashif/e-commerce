import React, { useState } from "react";
import { useGetProductsQuery, useGetCategoriesQuery } from "../redux/apiSlice";
import { CircularProgress,Typography,Box,Button,Container,Paper,Stack,Alert,AlertTitle} from "@mui/material";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { filterAndSortProducts } from "../utils/filterProducts";
import FilterSection from "./FilterSection";

const ProductList = () => {

  const { data: products = [], isLoading, isError, error } = useGetProductsQuery();
  const { data: categories = [], isLoading: catLoading, isError: catError } = useGetCategoriesQuery();
  const deletedIds = useSelector((state) => state.products.deletedIds);

  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "all",
    sortOrder: "none"
  });

  if (isLoading || catLoading) return <LoadingState />;
  if (isError || catError) return <ErrorState error={error} />;


  const filteredProducts = filterAndSortProducts(products, deletedIds, filters);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
        My E-Commerce
      </Typography>

      <FilterSection filters={filters} categories={categories} onFilterChange={setFilters}/>

      <ProductsGrid products={filteredProducts} />
    </Container>
  );
};

const LoadingState = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
    <Stack alignItems="center" spacing={2}>
      <CircularProgress size={60} />
      <Typography variant="h6">Loading products...</Typography>
    </Stack>
  </Box>
);

const ErrorState = ({ error }) => (
  <Box sx={{ my: 4 }}>
    <Alert severity="error" sx={{ mb: 3 }}>
      <AlertTitle>Error Loading Data</AlertTitle>
      {error?.data?.message || "Failed to load products. Please try again later."}
    </Alert>
    <Button variant="contained" onClick={() => window.location.reload()}>
      Retry
    </Button>
  </Box>
);


const ProductsGrid = ({ products }) => {
  if (products.length === 0) return <NoProductsFound />;

  return (
    <Box sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: 2,
      width: "100%"
    }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};

const NoProductsFound = () => (
  <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
    <Typography variant="h6" color="textSecondary">
      No products found matching your criteria
    </Typography>
    <Button
      variant="text"
      onClick={() => window.location.reload()}
      sx={{ mt: 2 }}
    >
      Clear filters
    </Button>
  </Paper>
);

export default ProductList;