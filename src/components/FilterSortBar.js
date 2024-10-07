import { Box, Select, Button, Input } from '@chakra-ui/react';

const FilterSortBar = ({ filters, setFilters, handleSearch }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box mb="4" display="flex" alignItems="center">
      <Select name="genre" placeholder="Filter by Genre" onChange={handleFilterChange} mr="4">
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="horror">Horror</option>
        <option value="animation">Animation</option>
      </Select>

      <Select name="sortBy" placeholder="Sort by" onChange={handleFilterChange} mr="4">
        <option value="title">Title</option>
        <option value="year">Year</option>
        <option value="rating">Rating</option>
      </Select>

      <Input
        name="rating"
        placeholder="Min IMDb Rating"
        type="number"
        min="0"
        max="10"
        onChange={handleFilterChange}
        w="150px"
        mr="4"
      />

      <Button onClick={handleSearch} colorScheme="blue">
        Apply
      </Button>
    </Box>
  );
};

export default FilterSortBar;
