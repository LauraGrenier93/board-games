/* eslint-disable linebreak-style */
import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';

const CardArticle = ({
  title,
  preview,
  tagName,
  authorPseudo,
  createdDate,
  updateDate,
  id,
}) => (
  <>
    <Card className="card article" as={Link} to={`/articles/${id}`}>
      <Card.Content textAlign="center" className="card__content">
        <Card.Header>{title}</Card.Header>
        <Card.Header className="tag">{tagName}</Card.Header>
        <Card.Meta>
          <span className="author">{authorPseudo}</span>
          {createdDate
            ? <span> mise en ligne le { createdDate } </span>
            : <span> mise en ligne le { updateDate } </span>}

        </Card.Meta>
        <Card.Description>
          {preview}...
        </Card.Description>
      </Card.Content>
    </Card>
  </>
);

CardArticle.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  createdDate: PropTypes.string.isRequired,
  updateDate: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  authorPseudo: PropTypes.string.isRequired,
};

export default CardArticle;
