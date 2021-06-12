import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CardEvent from 'src/components/Events/CardEvent';

const ContentEvents = ({ elements}) => {
return (
  <section className="content">
        <Card.Group>
    {elements.map((element) => (<CardEvent key={element.id.toString()} {...element} /> ))}
        </Card.Group>
  </section>
);
}
ContentEvents.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ).isRequired,
};

export default ContentEvents;
