
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { TextControl } from '@wordpress/components';
import '@wordpress/core-data';

registerBlockType('alodge/contact-form', {
  title: __('Contact form', 'alodge'),
  icon: 'analytics',
  category: 'alodge',
  edit: ({className, attributes, setAttributes }) => {

    return (
      <div className={className}>
        <form
          name="contact-form"
          className="contact-form"
          action="javascript: ;"
          method="post">
          <input type="text" name="first_name" placeholder="First Name" />
          <input type="text" name="last_name" placeholder="Last Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="tel" name="phone" placeholder="Phone" />
          <select name="reason" className="form-select contact-reason" required>
            <option value="" disabled selected>Reason for Inquiry</option>
            <option value="Booking-Room">Booking a Room</option>
            <option value="Booking-Van">Booking an Adventure Van</option>
            <option value="Experiences">Info about available Experiences</option>
            <option value="Amenities">Info about available Amenities and Services</option>
            <option value="General-Info">General Info</option>
          </select>
          <textarea name="message" placeholder="Message"></textarea>
          <button name="submit" type="submit" className="cta" id="contactform_submit_action">Submit</button>
        </form>
      </div>
    );
  },
  save: (props) => {
    return (
      <div>
        <form
          name="contact-form"
          className="contact-form"
          action="javascript: ;"
          method="post">
          <input type="text" name="first_name" placeholder="First Name" />
          <input type="text" name="last_name" placeholder="Last Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="tel" name="phone" placeholder="Phone" />
          <select name="reason" className="form-select contact-reason" required>
            <option value="" disabled selected>Reason for Inquiry</option>
            <option value="Booking-Room">Booking a Room</option>
            <option value="Booking-Van">Booking an Adventure Van</option>
            <option value="Experiences">Info about available Experiences</option>
            <option value="Amenities">Info about available Amenities and Services</option>
            <option value="General-Info">General Info</option>
          </select>
          <textarea name="message" placeholder="Message"></textarea>
          <button name="submit" type="submit" className="cta" id="contactform_submit_action">Submit</button>
        </form>
      </div>
    );
  },
});
