import React from "react";
import {TextField,Select,MenuItem,FormControl,InputLabel,Button,Paper,Stack,Typography} from "@mui/material";

const FilterSection = ({ filters, categories, onFilterChange }) => {
  const handleChange = (field) => (e) =>
    onFilterChange((prev) => ({ ...prev, [field]: e.target.value }));

  const resetFilters = () =>
    onFilterChange({ searchTerm: "", category: "all", sortOrder: "none" });

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Filter Products
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
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

        <SortFilter value={filters.sortOrder} onChange={handleChange("sortOrder")} />

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

export default FilterSection;
