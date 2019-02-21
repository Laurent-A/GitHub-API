import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const RepoList = ({ contents }) => (
  <div id="repo-list">
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Git Repository</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { contents.map(element => (
          <TableRow key={element.sha} {...element} />
        ))
        }
      </Table.Body>
    </Table>
  </div>
);

const TableRow = ({ name, type }) => (
  <Table.Row>
    <Table.Cell collapsing>
      <Icon name={type === 'file' ? 'file outline' : 'folder'} />
      { name }
    </Table.Cell>
  </Table.Row>
);

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

RepoList.propTypes = {
  contents: PropTypes.array,
};

RepoList.defaultProps = {
  contents: [],
};

export default RepoList;
