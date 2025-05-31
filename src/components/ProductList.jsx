import React, { useState } from "react";
import { useGetProductsQuery, useGetCategoriesQuery } from "../redux/apiSlice";
import { TextField, Select,MenuItem,FormControl,InputLabel,CircularProgress,Typography,Box,Button,Container,Paper,Stack,Alert,AlertTitle} from "@mui/material";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductList = () => {
  // Data fetching
  const { data: products = [], isLoading, isError, error } = useGetProductsQuery();
  const { data: categories = [], isLoading: catLoading, isError: catError } = useGetCategoriesQuery();
  const deletedIds = useSelector((state) => state.products.deletedIds);

  // State management
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "all",
    sortOrder: "none"
  });

  // Loading and error states
  if (isLoading || catLoading) return <LoadingState />;
  if (isError || catError) return <ErrorState error={error} />;

  // Filter and sort products
  const filteredProducts = products
    .filter((p) => !deletedIds.includes(p.id))
    .filter((p) => 
      filters.searchTerm 
        ? p.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
        : true
    )
    .filter((p) => 
      filters.category !== "all" 
        ? p.category === filters.category 
        : true
    )
    .sort((a, b) => 
      filters.sortOrder === "low-high" 
        ? a.price - b.price 
        : filters.sortOrder === "high-low" 
          ? b.price - a.price 
          : 0
    );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
        My E-Commerce
      </Typography>

      <FiltersSection 
        filters={filters} 
        categories={categories}
        onFilterChange={setFilters}
      />

      <ProductsGrid products={filteredProducts} />
    </Container>
  );
};

// Sub-components for better organization
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

const FiltersSection = ({ filters, categories, onFilterChange }) => {
  const handleChange = (field) => (e) => 
    onFilterChange(prev => ({ ...prev, [field]: e.target.value }));

  const resetFilters = () => 
    onFilterChange({ searchTerm: "", category: "all", sortOrder: "none" });

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Filter Products
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }}>
        <TextField
          fullWidth
          placeholder="Search anything..."
          size="small"
          value={filters.searchTerm}
          onChange={handleChange("searchTerm")}
          sx={{ flex: 2 }}
        />

        <CategoryFilter 
          value={filters.category} 
          onChange={handleChange("category")} 
          categories={categories}
        />

        <SortFilter 
          value={filters.sortOrder} 
          onChange={handleChange("sortOrder")} 
        />

        <Button variant="outlined" onClick={resetFilters} sx={{ height: "40px" }}>
          Reset
        </Button>
      </Stack>
    </Paper>
  );
};

const CategoryFilter = ({ value, onChange, categories }) => (
  <FormControl fullWidth size="small" sx={{ flex: 1 }}>
    <InputLabel>Category</InputLabel>
    <Select value={value} onChange={onChange} label="Category">
      <MenuItem value="all">All Categories</MenuItem>
      {categories.map((cat) => (
        <MenuItem key={cat} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const SortFilter = ({ value, onChange }) => (
  <FormControl fullWidth size="small" sx={{ flex: 1 }}>
    <InputLabel>Sort by Price</InputLabel>
    <Select value={value} onChange={onChange} label="Sort by Price">
      <MenuItem value="none">None</MenuItem>
      <MenuItem value="low-high">Low to High</MenuItem>
      <MenuItem value="high-low">High to Low</MenuItem>
    </Select>
  </FormControl>
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