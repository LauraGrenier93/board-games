import React from 'react';
import PropTypes from 'prop-types';
import Field from 'src/components/Field';
import { Link } from 'react-router-dom';
import TextAreaDescription from 'src/components/TextAreaDescription';
import { Button, Card } from 'semantic-ui-react';
import './styles.css';
import { nameTagId } from 'src/selectors';

const AddArticle = ({
  handleAddArticle,
  changeFieldArticle,
  newTitle,
  newDescription,
  newArticle,
  newTagId,
  handleBlur,
  errornewTagId,
  errornewTitle,
  errornewDescription,
  errorAddArticle,
  pseudo,
}) => {
  const errorsNewArticle= ['errornewTitle','errornewTagId','errornewDescription', 'errorAddArticle'];
  const errors = [errornewTitle,errornewDescription,errornewTagId, errorAddArticle];
  const date = new Date();
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  /**
   * function that triggers when the form is submitted and triggers a function to add the article to the database
   * @param {Event} evt 
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddArticle();
  };
   /**
   * function that starts a timer to initialise the error message or after 60 seconds
   */
    if(errorsNewArticle){
      for(const error of errorsNewArticle){
      setTimeout(() => {
        handleBlur('', error);
      }, 60000);
    }
    }
    
  return (
    <>
      <h1>Ajout d'un article</h1>
      { errors && errors.map((error,index)=>(<p key={index.toString()} className="error">{error}</p>))}
      {newArticle ? (
      <>
            <p className="success">Votre article est bien enregistré, vous pouvez modifier
              votre article en allant sur celui-ci dans la page d'accueil </p>
            <p className="success" >Pour reprendre votre navigation cliquer sur<Link to="/"> retourner à la page d'accueil"</Link></p>

            <Card className="card oneArticle">
              <Card.Content textAlign="center" className="card__content">
                <Card.Header>{newTitle}</Card.Header>
                <Card.Header className="tag">{nameTagId(newTagId)}</Card.Header>
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
        ):(
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
  errornewTitle:PropTypes.string,
  errornewDescription:PropTypes.string,
  errorAddArticle:PropTypes.string,
  handleBlur: PropTypes.func,
  newTagId: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
};


export default AddArticle;
