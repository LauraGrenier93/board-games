import React, { useEffect } from 'react';
import { Card, Modal, Button, Loader } from 'semantic-ui-react';
import { nameTagId } from 'src/selectors';
import { Redirect, Link } from 'react-router-dom';
import TextAreaDescription from 'src/components/TextAreaDescription';
import Field from 'src/components/Field';
import PropTypes from 'prop-types';
import './styles.css';

const OneArticle = ({
  pseudo,
  article,
  sendEditArticle,
  changeFieldArticle,
  idArticleSelected,
  newTitle,
  newDescription,
  editArticle,
  deleteArticle,
  newTagId,
  editNewTitle,
  editDescription,
  sendDeleteArticle,
  setUserIsSignIn,
  loadingArticles,
  error,
  errornewTitle,
  errornewDescription,
  errorArticles,
  errorEditArticle,
  errorDeleteArticle,
  handleBlur,
  fetchArticles,
  fetchEvents,
  fetchGames,
  setMessage,
  message,
}) => {
  const errorsEditArticle= ['errornewTitle','errornewDescription', 'errorEditArticle'];
  const errors = [errornewTitle,errornewDescription, errorEditArticle];
  console.log('components onearticle errors', errors);
    /**
 * function that is performed once when the page is displayed
 */
  useEffect(() => {
   fetchArticles();
   fetchEvents(); 
   fetchGames();
   if (!newTitle) {
    editNewTitle(article.title);
  }
  if (!newDescription) {
    editDescription(article.description);
  }
 }, [!article]);

    /**
 * function that starts a timer to initialise the message after 20 seconds
 */
     if(message){
      setTimeout(() => {
        setMessage('', 'message');
        setUserIsSignIn(false);
      }, 60000);
    }
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    /**
     * function that is triggered when the form is submitted to modify an article
     * @param {Event} evt 
     */
    const handleEditArticleSubmit = (evt) => {
      evt.preventDefault();
      idArticleSelected(article.id);
     if(newTitle || newDescription){
      sendEditArticle();
      setOpen(false);
     } else {
        handleBlur('Il faut un titre et une description de plus de 15 caractères à votre article.', 'errorEditArticle');
      }
    };
        /**
     * function that is triggered when the form is submitted to delete an item
     * @param {Event} evt 
     */
         const handleDeleteArticleSubmit = (evt) => {
          evt.preventDefault();
          idArticleSelected(article.id);
          sendDeleteArticle();
          setOpenModalDelete(false);
        };
   /**
   * function that starts a timer to initialise the message after 60 seconds
   */
    if(errorsEditArticle){
      for(const error of errorsEditArticle){
      setTimeout(() => {
        handleBlur('', error);
      }, 60000);
    }
    }
  return(
   <>
    {error && <p className="error">{error}</p>}
    {message && <p className="success">{message}</p>}
    {(loadingArticles)?
        <Loader active inline="centered" />
       :(<>
        {errorArticles? 
        <p className="error">{errorArticles}</p> 
        :(
          <>
      {pseudo === article.authorPseudo && (
      <>
      {deleteArticle && (
      <>
        <p className="succes">Votre article a bien été supprimé.Vous allez être redirigé vers la page d'accueil.</p>
        <Redirect to="/" exact />
        </>
      )}
      <Modal
                id="delete"
                onClose={() => setOpenModalDelete(false)}
                onOpen={() => setOpenModalDelete(true)}
                open={openModalDelete}
                trigger={<Button>Supprimer l'article</Button>}
              >

                <Modal.Header>supprimer l'article {article.title}</Modal.Header>
                <Modal.Description>
                  <p>
                    voulez-vous supprimer l'article {article.title}?
                  </p>
                </Modal.Description>
                <Modal.Actions>
                  <Button onClick={() => setOpenModalDelete(false)}>
                    Non
                  </Button>
                  <Button
                    content="Oui"
                    labelPosition="right"
                    onClick={handleDeleteArticleSubmit}
                  />
                </Modal.Actions>
              </Modal>

        <Modal
          size="fullscreen"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button content="Modifier votre article" labelPosition="left" icon="edit" />}
        >
          <Modal.Header>Modifier votre article</Modal.Header>
          { errors && errors.map((error,index)=>(<p key={index.toString()} className="error">{error}</p>))}
          <Modal.Description>
            <form autoComplete="off" onSubmit={handleEditArticleSubmit} className="addEvent">
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
                  onChange={changeFieldArticle}
                  onBlur={handleBlur}
                  checked="checked"
                />
                <label htmlFor="news">News</label>

                <Field
                  name="newTagId"
                  type="radio"
                  id="evenement"
                  value="2"
                  onChange={changeFieldArticle}
                  onBlur={handleBlur}
                />
                <label htmlFor="evenement">Évenement</label>
                <Field
                  name="newTagId"
                  type="radio"
                  id="salons"
                  value="3"
                  onChange={changeFieldArticle}
                  onBlur={handleBlur}
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

              <Button open={open} onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleEditArticleSubmit}>
                Valider
              </Button>
            </form>
          </Modal.Description>
        </Modal>
      </>
      )}
      {editArticle?
        (<>
        <p className="success">Votre article a bien été modifié</p>
        <p className="success" >Pour reprendre votre navigation cliquer sur<Link to="/"> retourner à la page d'accueil"</Link></p>
        <Card className="card oneArticle">
          <Card.Content textAlign="center" className="card__content">
            <Card.Header>{newTitle}</Card.Header>
            <Card.Header className="tag">{nameTagId(newTagId)}</Card.Header>
            <Card.Meta>
              <span className="author">{article.authorPseudo}</span>
              <span className="date">mise en ligne le { article.updatedDate || article.createdDate }</span>
            </Card.Meta>
            <Card.Description>
              {newDescription}
            </Card.Description>
          </Card.Content>
        </Card>
        </>
      )
      :(
        <>
        {errorEditArticle && <p className="error">{errorEditArticle}</p>}
        {errorDeleteArticle && <p className="error">{errorDeleteArticle}</p>}
      <Card className="card oneArticle">
          <Card.Content textAlign="center" className="card__content">
            <Card.Header>{article.title}{article.eventDate && `pour la date du ${article.eventDate}`}</Card.Header>
            <Card.Header className="tag">{article.tagName}</Card.Header>
            <Card.Meta>
              <span className="author">{article.authorPseudo}</span>
              <span className="date">mise en ligne le { article.updatedDate || article.createdDate }</span>
            </Card.Meta>
            <Card.Description>
              {article.description}
            </Card.Description>
          </Card.Content>
        </Card>
        </>
      )}
      </>
      )}
    </>
  )}
  </>
  );
  };
OneArticle.propTypes = {
  sendEditArticle: PropTypes.func.isRequired,
  sendDeleteArticle: PropTypes.func.isRequired,
  changeFieldArticle: PropTypes.func.isRequired,
  idArticleSelected: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setUserIsSignIn: PropTypes.func.isRequired,
  editNewTitle: PropTypes.func.isRequired,
  editDescription: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  editArticle: PropTypes.bool.isRequired,
  deleteArticle: PropTypes.bool.isRequired,
  loadingArticles: PropTypes.bool.isRequired,
  newTitle: PropTypes.string.isRequired,
  newDescription: PropTypes.string.isRequired,
  newTagId: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  errornewTitle:PropTypes.string,
  errornewDescription:PropTypes.string,
  errorEditArticle:PropTypes.string,
  errorDeleteArticle:PropTypes.string,
  errorArticle:PropTypes.string,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  article: PropTypes.object,
};
OneArticle.defaultProps = {
  article: {},
  newTitle: 'un titre',
  newDescription: 'un description',
};

export default OneArticle;
