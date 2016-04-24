var alt = require('../alt');
var LocationSource = require('../sources/LocationSource.js');

class LocationActions {
  updateLocations(locations) {
    return locations;
  }

  fetchLocations() {
    return (dispatch) => {
      dispatch();
      LocationSource.fetch()
        .then(
          (locations) => {
            this.updateLocations(locations);
          })
        .catch((errorMessage) => {
          this.locationsFailed(errorMessage);
        });
    };
  }

  locationsFailed(errorMessage) {
    return errorMessage;
  }

  favoriteLocation(locationId) {
    this.dispatch(locationId);
  }
}

module.exports = alt.createActions(LocationActions);
