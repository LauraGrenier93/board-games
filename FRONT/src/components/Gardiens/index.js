import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';

const Gardiens = ({
  error,
  message,
  setMessage,
}) => {
    /**
   * function that starts a timer to initialise the message after 20 seconds
   */
     if(message){
      setTimeout(() => {
        setMessage('', 'message')
      }, 20000);
    }
  return(
  <>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
    <div className="gardiens">

      <h1>À propos des Gardiens</h1>

      <p>Club fondé en 1987 au sein de la <Link to="https://www.mjc-avrille.asso.fr/" target="_blank">MJC d’Avrillé</Link>, les Gardiens De la Légende ont pour valeurs de sensibiliser, responsabiliser les joueurs et de mettre en avant le partage et le plaisir du jeu.</p>

      <p>​Nous pratiquons :</p>

      <ul>
        <li>Jeux de Rôle</li>

        <li>Grandeur Nature</li>

        <li>Jeux de Plateau</li>

        <li>Jeux de Cartes</li>

        <li>Jeux de Figurines</li>

        <li>Jeux Vidéo</li>
      </ul>

      <p>​Le club est ouvert toute l’année, à tous,
        enfants comme adultes, pour partager notre passion du jeu.
      </p>

      <p>Venez jouer avec nous durant 3 essais gratuits</p>

      <p>Si notre club vous convient, rejoignez-nous et …</p>

      <h1>Devenez un Gardien</h1>

      <p>L’équipe de Référents pour 2020/2021</p>

      <ul>
        <li>Alexis Fournier alias L-Cie</li>
        <li>Guillaume Jadeau alias Guillaume</li>
        <li>Frank CAPON alias AzhaLem</li>
      </ul> <br />
    </div>
  </>
);
  }
Gardiens.propTypes = {
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default Gardiens;
