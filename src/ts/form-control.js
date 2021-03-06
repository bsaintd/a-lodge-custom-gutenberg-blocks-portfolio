/**
 * @module submitForm
 * @description This module simply looks for a form by specified name attribute,
 * verifies user is not a bot with Google ReCaptcha v3 and passes the FormData to
 * a webhook specified in project endpoints
 */
import axios from 'axios'
import { CONTACT_FORM_HOOK, EVENT_FORM_HOOK, NL_FORM_HOOK } from './project-endpoints.js'
//import { showMessage } from './snackbar-notification.js'
const showMessage = () => {}

// define form config interface

// forms config and messaging
const contactForm = {
  hook: CONTACT_FORM_HOOK,
  name: 'contact-form',
  successMsg: 'Thanks, we\'ll be in touch soon!'
}
const eventsForm = {
  hook: EVENT_FORM_HOOK,
  name: 'events-form',
  successMsg: 'Thanks, we\'ll be in touch soon!'
}
const newsLtrForm = {
  hook: NL_FORM_HOOK,
  name: 'nl-signup-form',
  successMsg: 'Thank you for signing up for the A Lodge Newsletter!',
  failMsg: 'Huh, that didn\'t work, please try again.'
}
const defaultSuccess = 'Submission successfully received!'
const defaultFail = 'Sorry, there was a problem, please try again.'

// verify recaptcha token with Google via recaptcha.php
function verifyRecaptcha() {
  let verified = false
  return new Promise((resolve, reject)=>{
    grecaptcha.ready(function () {
      // A-Lodge Site Key
      const gRecapSiteKey = '6LcJVLcUAAAAAB4RtgKu--t9-iXKAKEGjnwCJbB8';
      // localhost testing Site Key
      // const gRecapSiteKeyTest: string = '6Lcm97cUAAAAAIapbzX_CnBZr0mzKOSWI_VUjjfK';
      grecaptcha.execute(gRecapSiteKey, { action: 'forms' })
      .then(function (token) {
        jQuery.ajax({
          type: 'POST',
          url: '/wp-content/themes/fueled-on-bacon/recaptcha.php',
          data: {
            responseToken: token
          },
          success: function(response) {
            // maintains var type (boolean) defined in recaptcha php
            let boolResponse = JSON.parse(response)
            resolve(boolResponse)
          },
          error: function(res){
            reject()
          }
        })
      })
    })
  })
}

// form data handler / send to external API
function submitForm(event) {
  // confirm submission isn't from a bot
  verifyRecaptcha()
  .then((result)=>{
    if ( result ) {
      // define form data
      const data = new FormData(this)
      // send to external API hook and provide status to user via snackbar
      axios.post(event.data.hook, data)
        .then(({ data }) => {
          if (event.data.success) {
            showMessage(event.data.success)
          } else {
            showMessage(defaultSuccess)
          }
          this.reset()
        })
        .catch((res) => {
          if (event.data.fail) {
            showMessage(event.data.fail)
          } else {
            showMessage(defaultFail)
          }
        })
    // form submission might be from a bot...
    } else {
      if (event.data.fail) {
        showMessage(event.data.fail)
      } else {
        showMessage(defaultFail)
      }
    }
  })
  .catch(()=> {
    if (event.data.fail) {
      showMessage(event.data.fail)
    } else {
      showMessage(defaultFail)
    }
  })
}

// jQuery listeners for submit on each project form
// contact form
jQuery(`form[name=${contactForm.name}]`).on('submit',
  {
    name: contactForm.name,
    hook: contactForm.hook,
    success: contactForm.successMsg,
    fail: contactForm.failMsg
  },
  submitForm
);

// events page inquiry form
jQuery(`form[name=${eventsForm.name}]`).on('submit',
  {
    name: eventsForm.name,
    hook: eventsForm.hook,
    success: eventsForm.successMsg,
    fail: eventsForm.failMsg
  },
  submitForm
);

// footer newsletter signup form
jQuery(`form[name=${newsLtrForm.name}]`).on('submit',
  {
    name: newsLtrForm.name,
    hook: newsLtrForm.hook,
    success: newsLtrForm.successMsg,
    fail: newsLtrForm.failMsg
  },
  submitForm
);
