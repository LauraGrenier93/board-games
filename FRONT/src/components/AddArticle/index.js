/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Field from 'src/components/Field';
import { Link } from 'react-router-dom';
import TextAreaDescription from 'src/components/TextAreaDescription';
import { Button, Card } from 'semantic-ui-react';
import './styles.css';
import { nameTagIdArticle } from 'src/selectors';

const AddArticle = ({
  handleAddArticle,
  changeFieldArticle,
  newTitle,
  newDescription,
  newArticle,
  newTagId,
  handleBlur,
  error,
  errornewTitle,
  errornewDescription,
  errorAddArticle,
  pseudo,
}) => {
  const errorsNewArticle = ['errornewTitle', 'errornewDescription', 'errorAddArticle'];
  const errors = [errornewTitle, errornewDescription, errorAddArticle, error];
  const date = new Date();
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };

  /**
   * function that triggers when the form is submitted and triggers a function
   * to add the article to the database
   * @param {Event} evt
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (newTitle && newDescription && newTagId) {
      handleAddArticle();
    }
    else {
      handleBlur('Il faut un titre et une description de plus de 15 caractères à votre article.', 'errorEditArticle');
    }
  };
  /**
   * function that starts a timer to initialise the error message or after 60 seconds
   */
  if (errorsNewArticle) {
    for (const errorArticle of errorsNewArticle) {
      setTimeout(() => {
        handleBlur('', errorArticle);
      }, 60000);
    }
  }

  return (
    <>
      <h1>Ajout d'un article</h1>
      { errors && errors.map((oneError, index) => (<p key={index.toString()} className="error">{oneError}</p>))}
      {newArticle ? (
        <>
          <p className="success">Votre article est bien enregistré, vous pouvez modifier
            votre article en allant sur celui-ci dans la page d'accueil.
          </p>
          <p className="success">Pour reprendre votre navigation cliquer sur<Link to="/"> retourner à la page d'accueil"</Link></p>

          <Card className="card oneArticle">
            <Card.Content textAlign="center" className="card__content">
              <Card.Header>{newTitle}</Card.Header>
              <Card.Header className="tag">{nameTagIdArticle(newTagId)}</Card.Header>
              <Card.Meta>
                <span className="author">{pseudo}</span>
                <span className="date">mise en ligne le { date.toLocaleDateString('fr-FR', options)}</span>
              </Card.Meta>
              <Card.Description>
                {newDescription}
              </Card.Description>
            </Card.Content>
          </Card>
        </>
      ) : (
        <form autoComplete="off" onSubmit={handleSubmit} className="addEvent">
          <Field
            name="newTitle"
            type="texte"
            placeholder="titre de votre article"
            onChange={changeFieldArticle}
            onBlur={handleBlur}
            value={newTitle}
          />
          <div className="button-radio">

            <Field
              name="newTagId"
              type="radio"
              id="news"
              value="1"
              onBlur={handleBlur}
              onChange={changeFieldArticle}
              checked="checked"
            />
            <label htmlFor="news">News</label>

            <Field
              name="newTagId"
              type="radio"
              id="evenement"
              value="2"
              onBlur={handleBlur}
              onChange={changeFieldArticle}
            />
            <label htmlFor="evenement">Évenement</label>

            <Field
              name="newTagId"
              type="radio"
              id="salons"
              value="3"
              onBlur={handleBlur}
              onChange={changeFieldArticle}
            />
            <label htmlFor="salons">Salons</label>
          </div>

          <TextAreaDescription
            className="newDescription"
            name="newDescription"
            type="text"
            placeholder="écrivez votre article"
            onChange={changeFieldArticle}
            value={newDescription}
            onBlur={handleBlur}
          />

          <Button onClick={handleSubmit}>
            Valider
          </Button>
        </form>
      )}
    </>
  );
};

AddArticle.propTypes = {
  newArticle: PropTypes.bool.isRequired,
  handleAddArticle: PropTypes.func.isRequired,
  changeFieldArticle: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newDescription: PropTypes.string.isRequired,
  errornewTitle: PropTypes.string.isRequired,
  errornewDescription: PropTypes.string.isRequired,
  errorAddArticle: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  newTagId: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
};

export default AddArticle;
