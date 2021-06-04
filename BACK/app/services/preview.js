/**
* function to create a preview
* @param {Array} array - the object array to which we want to add a preview
*/
function getPreview(array) {
    for (const props of array) {
        props.preview = props.description.split(" ").splice(0, 30).join(' ');
    }
    return array;
};

module.exports = getPreview;