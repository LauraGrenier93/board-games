import React from 'react';
import { Card } from 'semantic-ui-react'; 
import PropTypes from 'prop-types'; 
import CardGame from 'src/components/Games/CardGame'; 

const ContentGames = ({ elements }) => (
  <section className="content">
    <Card.Group>
      {elements.map((element) => (<CardGame key={element.id.toString()} {...element} />))}
    </Card.Group>
  </section>
);

ContentGames.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default ContentGames;
