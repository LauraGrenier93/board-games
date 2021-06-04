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
  eventDate,
  createdDate,
  updatedDate,
  id,
}) => (
  <>
  <Card className="card article" as={Link} to={`/articles/${id}`}>
    <Card.Content textAlign="center" className="card__content">
      <Card.Header>{title}{eventDate && `pour la date du ${eventDate}`}</Card.Header>
      <Card.Header className="tag">{tagName}</Card.Header>
      <Card.Meta>
        <span className="author">{authorPseudo}</span>
        <span className="date">mise en ligne le {updatedDate || createdDate}</span>
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
  eventDate: PropTypes.string,
  createdDate: PropTypes.string,
  updatedDate: PropTypes.string,
  tagName: PropTypes.string,
  authorPseudo: PropTypes.string,
};

export default CardArticle;
