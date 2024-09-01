import React, { useCallback, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear"; // Import ClearIcon
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";

const SearchInput = ({ label, placeholder, onChange }) => {
    const [searchValue, setSearchValue] = useState("");

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    const memoizedOnChange = useCallback(
        debounce((text) => {
            onChange(text);
        }, 1000),
        [onChange]
    );

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearchValue(value);
        memoizedOnChange(value);
    };

    const handleClear = (e) => {
        e.preventDefault();
        setSearchValue("");
        onChange("");
    };

    return (
        <TextField
            label={label ?? "Search..."}
            placeholder={placeholder ?? "Search..."}
            onChange={handleChange}
            value={searchValue}
            InputProps={{
                endAdornment: 
          <InputAdornment position="end">
              <IconButton
                  onClick={handleClear}
                  edge="end"
                  aria-label="clear search"
              >
                  <ClearIcon fontSize="small" />
              </IconButton>
          </InputAdornment>
        
            }}
        />
    );
};

SearchInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default SearchInput;
