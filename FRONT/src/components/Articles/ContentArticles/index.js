/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CardArticle from 'src/components/Articles/CardArticle';

const ContentArticles = ({ elements }) => (
  <section className="content">
    <Card.Group>
      {elements.map((element) => (<CardArticle key={element.id.toString()} {...element} />))}
    </Card.Group>
  </section>
);

ContentArticles.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ).isRequired,
};

export default ContentArticles;
