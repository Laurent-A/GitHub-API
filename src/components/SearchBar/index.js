import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types'; 
// je vais cherche le form de nav bar dans mon semantic dans lequel je place un jsx dans mon event
import './style.scss';


const SearchBar = ({ handleChange, searchInput, handleSubmit,loading }) => {
  // je met handlesubmit ici car c'est propre à search bar le preventdefault
  // handleSubmitForm va appeler le props handleSubmit provenant de apps
  // il evitera le rechargement de la page
  const handleSubmitForm =(event) => {
    event.preventDefault();
    // empeche le rechargement de la page
    // appel le handlesubmit de la props app
    handleSubmit();
  }
  return (
    <div id="search-bar">
      <Form onSubmit={handleSubmitForm}>
        <Form.Field>
          <Input
            loading={loading}
            onChange={handleChange}
            type="text"
            value={searchInput}
            placeholder="Saisissez un repo à chercher"
          />
        </Form.Field>
      </Form>
    </div>
  );
};

SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  searchInput: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};
// défaut ca peut etre autre chose d'n string
SearchBar.defaultProps = {
  searchInput: '',
  loading:false,
};

export default SearchBar;

