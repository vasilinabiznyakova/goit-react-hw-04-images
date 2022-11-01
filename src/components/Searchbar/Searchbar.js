import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Searchbox,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AiOutlineSearch } from 'react-icons/ai';

export const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchValue.trim() === '') {
      return toast.error('Please enter any value to search for');
    }

    onSubmit(searchValue);

    setSearchValue('');
    event.target.reset();
  };

  return (
    <Searchbox>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <AiOutlineSearch size="2em" />
          <SearchFormButtonLabel></SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          name="searchValue"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </SearchForm>
    </Searchbox>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
