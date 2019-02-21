import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './style.scss';





// fait appraitre les bouton list et grid
const Filters = ({ handleSwitch, mode }) => (
  <Button.Group>
  <Button onClick={handleSwitch('list')} positive={mode === 'list'}>List</Button>
  <Button.Or />
  <Button onClick={handleSwitch('grid')} positive={mode === 'grid'}>Grid</Button>
</Button.Group>
);
// faire apparaitre sous forme de carte
const ResultCard = ({
  name, description, owner, url, handleRepoClick,
}) => (
  <Card
    onClick={handleRepoClick(url)}
    image={owner.avatar_url}
    header={name}
    meta={owner.login}
    description={description}
  />
);
// faire apparaitre sous forme de liste
const ResultItem = ({ name,handleRepoClick,url }) => (
  <Card fluid  header={name} onClick={handleRepoClick(url)} />
);
// on met nos infos format ici car il faut d'abord faire pop les 2 autres composants avant
const format = {
  grid: ResultCard,
  list: ResultItem,
};
// appiclation qui fait appraitre le resultat de l'input
const ReposResults = ({
  resultsList, searchTerm, handleRepoClick, handleSwitch, mode
}) => {
  const Viewer = format[mode];
  return (
    <div id="repos-results">
      <div className="header-results">
        La recherche pour {searchTerm} a donné {resultsList.length} résultat(s)
      </div>
      <Filters handleSwitch={handleSwitch} mode={mode} />
      <Card.Group>
        { resultsList.map(result => (
          <Viewer
            key={result.id}
            {...result}
            handleRepoClick={handleRepoClick}
          />
        )) }
      </Card.Group>
    </div>
  );
};

ResultCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }).isRequired,
  handleRepoClick: PropTypes.func.isRequired,
};

ResultCard.defaultProps = {
  description: '',
};

ReposResults.propTypes = {
  resultsList: PropTypes.array,
  handleRepoClick: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  mode: PropTypes.string.isRequired,
};

ReposResults.defaultProps = {
  resultsList: [],
  searchTerm: '',
};

Filters.propTypes = {
  handleSwitch: PropTypes.func.isRequired,
};

ResultItem.propTypes = {
  name: PropTypes.string.isRequired,
};
export default ReposResults;





