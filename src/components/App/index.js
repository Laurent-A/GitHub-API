/**
 * Npm import
 */
import React, { Component } from 'react';
import axios from 'axios';
/**
 * Local import
 */

import SearchBar from 'src/components/SearchBar';
import ErrorMessage from 'src/components/ErrorMessage';
import ReposResults from 'src/components/ReposResults';
import RepoList from 'src/components/ReposList';

import 'semantic-ui-css/semantic.min.css';
import './app.scss';
/**
 * Code
 */
class App extends Component {
  state = {
    mode: 'grid'
  };

  // je crée mon listener de mon input
  onInputChange = (event) => {
    const { value } = event.target;
    // je stock dans le state search input qui recuperera la valeur de l'input
    this.setState({
      searchInput: value,
    });
  }

  // cette methode va envoyer la requete à l'api
  // je creer une const de l'url de l'api
  // je vais chercher mon searchinput
  // et dans ma requete jje lui met en fin d'url la valeur de l'input via searchinput `https://api.github.com/search/repositories?q=${searchInput}`;
  // j'importe la requete get axios car j'interroge l'api axios // Post je lui envoi une information pour que l'api le transform, (je veux poster un article)
  // // je vais mettre dans mon state a traver resultList l'ensemble de la liste d'objet provenant ddu result de l'api github

  onFormSubmit = () => {
    this.setState({ loading: true })
    const { searchInput } = this.state;
    const url = `https://api.github.com/search/repositories?q=${searchInput}`;
    axios.get(url)
      .then((result) => {
        this.setState({
          resultsList: result.data.items,
          errorMessage: false,
          view: 'results',
          loading:false,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
          loading:false,
        });
      });
  }

  onRepoClick = url => () => {
    this.setState({loading: true });
    const completeUrl = `${url}/contents`;
    axios.get(completeUrl)
      .then((result) => {
        this.setState({
          contents: result.data,
          view: 'contents',
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false, });
      });
  };

  onSwitch = mode => () => {
    this.setState({
      mode,
    })
  };

render() {
  const {
    searchInput, resultsList, errorMessage, contents, view, loading, mode
  } = this.state;
  return (
    <div id="app">
      <SearchBar
        loading={loading}
        handleSubmit={this.onFormSubmit}
        searchInput={searchInput}
        handleChange={this.onInputChange}
      />
      { errorMessage && <ErrorMessage message={errorMessage} />}
      { view === 'contents' && (
        <RepoList
          contents={contents}
        />
      )
      }
      { view === 'results' && (
      <ReposResults
        mode = {mode}
        handleSwitch={this.onSwitch}
        handleRepoClick={this.onRepoClick}
        searchTerm={searchInput}
        resultsList={resultsList}
      />
      )
      }
    </div>
  );
}
}



/**
 * Export
 */
export default App;
