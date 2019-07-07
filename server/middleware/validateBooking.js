import Joi from '@hapi/joi';
import errorStrings from '../helpers/errorStrings';
import rules from '../helpers/rules';
import Validator from '../helpers/Validator';
import responseHelper from '../helpers/responseHelper';


/**
 *    @fileOverview Class to validate trip request body
 *    @class ValidateTrip
 *    @requires @hapi/joi
 *    @requires ../helpers/errorStrings
 *    @requires ../helpers/responseHelper
 *    @exports ValidateTrip
 */

const validId = Joi.string().regex(rules.validUuid).required();

class ValidateBooking {
  /**
   * validate create booking form data
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */
  static validateCreateBooking(request, response, next) {
    const createBookingSchema = Joi.object().keys({
      trip_id: validId.error(new Error(errorStrings.validTripId)),
      seat_number: Joi.number().min(1).required(),
    });

    const error = Validator.validateJoi(request.body, createBookingSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 400, error);
  }

  /**
   * validate delete booking endpoint params
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {Object} error
   */
  static validateDeleteBooking(request, response, next) {
    const deleteBookingSchema = Joi.object().keys({
      bookingId: validId.error(new Error(errorStrings.validBookingId)),
    });

    const error = Validator.validateJoi(request.params, deleteBookingSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 400, error);
  }

  /**
 * validate available seat numbers parameters
 * @param {Object} request
 * @param {Object} response
 * @callback {Function} next
 * @return {Object} error
 */
  static validateAvailableSeats(request, response, next) {
    const availableSeatsSchema = Joi.object().keys({
      tripId: validId.error(new Error(errorStrings.validTripId)),
    });

    const error = Validator.validateJoi({ tripId: request.params.tripId }, availableSeatsSchema);
    if (!error) {
      return next();
    }
    return responseHelper.error(response, 400, error);
  }
}

export default ValidateBooking;
