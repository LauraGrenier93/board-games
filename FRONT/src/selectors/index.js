/**
 * function that searches for the id in the received array
 * @param {Array} array
 * @param {string} slug
 * @return{object | undefined}
 */
export const findIdBySlug = (array, id) => array.find((item) => item.id == id);

/**
 * function that selects 2 ids at random and returns the received array data
 * @param {object} array
 */

export const randomArray = (array) => {
  const newArray = [];
  if (array[0].id !== 0) {
    do {
      const id = Math.floor(Math.random() * array.length);
      const same = newArray.find((element) => element.id === array[id].id);
      if (!same) {
        newArray.push(array[id]);
      }
    } while (newArray.length < 2);
    return newArray;
  }
  return array;
};

/**
 * function that returns the largest id
 * @param {array} array
 */
export const getHighestId = (array) => {
  const ids = array.map((item) => item.id);
  const maxID = ids.length === 0 ? 0 : Math.max(...ids);
  return maxID;
};

/**
 * function that selects the max id from the table and returns the associated data
 * @param {array} array 
 * @returns array
 */
export const lastArray = (array) => {
  const newLastArray = [];
  const maxId = getHighestId(array);

  newLastArray.push(array.find((item) => item.id == maxId));
  return newLastArray;
};

/**
 * function which gives the label of the article
 * @param {string} TagId
 */
 export const nameTagId = (tagId) => {
  let tag = '';
  if (tagId === '1') {
    tag = 'News';
  }
  else if (tagId === '2') {
    tag = 'Évenement';
  }
  else if (tagId === '3') {
    tag = 'Salons';
  }
  return tag;
};
