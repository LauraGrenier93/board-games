import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import './style.css';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 47.48792579973978,
  lng: -0.5912258999910721,
};

const position = {
  lat: 47.48792579973978,
  lng: -0.5912258999910721,
};

function Contact({
  error,
  message,
  setMessage,
}) {
    /**
   * function that starts a timer to initialise the message after 20 seconds
   */
     if(message){
      setTimeout(() => {
        setMessage('', 'message')
      }, 20000);
    }
  return (
    <>
     {error && <p className="error">{error}</p>}
     {message && <p className="success">{message}</p>}
      <div className="contact_container">
        <LoadScript
          googleMapsApiKey="AIzaSyB4sN2eEQGY4eApvHI7LeUgajNi6HNhoXU"
        >
          <GoogleMap
            id="marker-gdl"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >

            <Marker
              position={position}
            />
          </GoogleMap>
        </LoadScript>
        <div className="contact_infos">
          <br />
          <h2>Pour nous retrouver :</h2>
          <p>Si vous avez envie de nous retrouver autour d'un jeu, vous serez les bienvenus !</p>

          <p>Nos locaux : 62 Allée des Châtaigniers, 49240 Avrillé </p>

          <h2>Nos horaires d'ouvertures :</h2>
          <br />

          <ul>
            <li>Mardi : 20h30 – 00h00</li>
            <li> Vendredi : 21h00 – 01h00</li>
            <li>Samedi : 14h00 – 01h00</li>
          </ul>
          <br />

          <h2>Nous contacter :</h2>

          <p>Si vous avez des questions, n'hésitez pas à nous envoyer un mail : <br />
            contact@lesgardiensdelalegende.fr

          </p>

        </div>

      </div>
    </>
  );
}
Contact.propTypes = {
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};
export default(Contact);
