import React from 'react';
import { Card, Modal, Button, } from 'semantic-ui-react';
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
  error,
  setError,
  fetchArticles,
  fetchEvents,
  fetchGames,
}) => {
    /**
 * function that is performed once when the page is refreh
 */
if(!article){
  useEffect(() => {
   fetchArticles();
   fetchEvents(); 
   fetchGames(); 
 }, []);
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
      sendEditArticle();
      setOpen(false);
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

  if (!newTitle) {
    editNewTitle(article.title);
  }
  if (!newDescription) {
    editDescription(article.description);
  }
   /**
   * function that starts a timer to initialise the message after 30 seconds
   */
    if(error){
      setTimeout(() => {
        setError('')
      }, 30000);
    }
  return(
    <>
    {error && <p className="error">{error}</p>}
    {!editArticle && (
      <>
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
      {pseudo === article.authorPseudo && (
      <>
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
          <Modal.Description>
            <form autoComplete="off" onSubmit={handleEditArticleSubmit} className="addEvent">
              <Field
                name="newTitle"
                type="texte"
                placeholder="titre de votre article"
                onChange={changeFieldArticle}
                value={newTitle === '' ? article.title : newTitle}
                required
                focus
              />
              <div className="button-radio">

                <Field
                  name="newTagId"
                  type="radio"
                  id="news"
                  value="1"
                  onChange={changeFieldArticle}
                  required
                />
                <label htmlFor="news">News</label>

                <Field
                  name="newTagId"
                  type="radio"
                  id="evenement"
                  value="2"
                  onChange={changeFieldArticle}
                />
                <label htmlFor="evenement">Évenement</label>
                <Field
                  name="newTagId"
                  type="radio"
                  id="salons"
                  value="3"
                  onChange={changeFieldArticle}
                />
                <label htmlFor="salons">Salons</label>
              </div>
              <TextAreaDescription
                className="newDescription"
                name="newDescription"
                placeholder="écrivez votre article"
                onChange={changeFieldArticle}
                value={newDescription === '' ? article.description : newDescription}
                required
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
      {editArticle && (
        <>
        <p className="success">Votre article a bien été modifier</p>
        <p className="success" >Pour reprendre votre navigation cliquer sur<Link to="/">retourner à la page d'accueil"</Link></p>
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
      )}
       {deleteArticle && (
      <>
        <p className="succes">Votre article a bien été supprimé.Vous allez être redirigé vers la page d'accueil.</p>
        <Redirect to="/" exact />
        </>
      )}
     </>
  );
  };
OneArticle.propTypes = {
  article: PropTypes.object,
  newTagId: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  sendEditArticle: PropTypes.func.isRequired,
  sendDeleteArticle: PropTypes.func.isRequired,
  changeFieldArticle: PropTypes.func.isRequired,
  idArticleSelected: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  editNewTitle: PropTypes.func.isRequired,
  editDescription: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  editArticle: PropTypes.bool.isRequired,
  deleteArticle: PropTypes.bool.isRequired,
  newTitle: PropTypes.string.isRequired,
  newDescription: PropTypes.string.isRequired,
  error: PropTypes.string,
};
OneArticle.defaultProps = {
  article: {},
  newTitle: 'un titre',
  newDescription: 'un description',
}
export default OneArticle;
