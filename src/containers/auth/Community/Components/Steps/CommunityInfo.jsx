import React,{ useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom'

import * as APPURL from '../../../../../config/url'
import { checkValidity } from '../../../../../utility/shared';
import countyJson from '../../../../../utility/country.json'

import Spinner from '../../../../../components/Partials/Preloader'
import Alert from '../../../../../components/Partials/Alert/Alert';

function CommunityInfo(props) {
    const { isValidatedAndShouldProceed,oldData } = props;

const mappedCountry = countyJson.map((country) => {
    return { value: `${country.code}`, displayValue: `${country.name}` }
})
     const [formControls, setFormControlState] = useState({
         controls: {
             communityName: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 5,
                 },
                 valid: false,
             },
             communityAcronym: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 2,
                 },
                 valid: false,
             },
             communityWebsite: {
                 touched: false,
                 value: '',
                 validation: {
                     required: false,
                     minLength: 5,
                     url: true,
                 },
                 valid: true,
             },
             communityAffiliation: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 2,
                 },
                 valid: false,
             },
             communityCity: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 5,
                 },
                 valid: false,
             },
             communityCountry: {
                 touched: false,
                 value: '',
                 validation: {
                     required: true,
                     minLength: 2,
                 },
                 options:mappedCountry,
                 valid: false,
             },
         },
         formisvalid: false,
         formisSubmitted: false,
     });

     useLayoutEffect(() => {
         if (oldData) {
           const updatedConrols = formControls.controls;
           for (const key in oldData) {
             updatedConrols[key].value = oldData[key];
             updatedConrols[key].valid = true;
             updatedConrols[key].touched = true;
           }
           setFormControlState({...formControls,contols:updatedConrols,formisvalid: true});
         }
     },[oldData]);
     
      const handleInputChage = (e) => {
          const controlName = e.target.name
          const updatedControls = {
              ...formControls.controls,
              [controlName]: {
                  ...formControls.controls[controlName],
                  value: e.target.value,
                  valid: checkValidity(
                      e.target.value,
                      formControls.controls[controlName].validation
                  ),
                  touched: true,
              },
          }

          if(controlName == "communityWebsite"){
            if(updatedControls[controlName].value.trim() === ''){
              updatedControls[controlName].valid =  true;
            }
          }
                    if (
                        updatedControls[controlName].valid &&
                        updatedControls[controlName].touched
                    ) {
                        e.target.classList.add('is-valid')
                        e.target.classList.remove('is-invalid')
                    } else {
                        e.target.classList.remove('is-valid')
                        e.target.classList.add('is-invalid')
                    }


          let formisvalid = true
          for (const inputIdentifier in updatedControls) {
              formisvalid =
                  updatedControls[inputIdentifier].valid && formisvalid
          }
          setFormControlState((formControl) => {
              return { ...formControl, controls: updatedControls, formisvalid }
          })
      }
      
    const handleFormSubmission = (event) => {
        event.preventDefault();

        const formisSubmitted = true
        setFormControlState({ ...formControls, formisSubmitted })

        const formData = {};
        if (formControls.formisvalid) {
            for (const formElementIdentifier in formControls.controls) {
                formData[formElementIdentifier] =
                    formControls.controls[formElementIdentifier].value;
            }
            setTimeout(() => isValidatedAndShouldProceed(2,formData),1500);

        } else {
            
            setFormControlState({
                ...formControls,
                alertType: 'error',
                formErrored: true,
                formErrorMessage: 'Form Validation Failed, please check inputs and try again'
            });

            return false
        }
    }
  return (
      <div>
          <div class="row">
              <div className="mb-5 text-left" style={{ paddingLeft: '15px' }}>
                  <h6 className="h3 mb-1">
                      <b>Community Information</b>
                  </h6>
                  <p className="text-muted mb-0">
                      let's get to know your community to serve you better
                  </p>
                  <Alert 
                  type={formControls.alertType}
                  display={formControls.formErrored}
                  >
                  {formControls.formErrorMessage}
                  </Alert>
              </div>
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">
                          Community Name{' '}
                          <span className="text-danger pl-1">*</span>
                      </label>
                      <input
                          class="form-control"
                          type="text"
                          name="communityName"
                          value={formControls.controls.communityName.value}
                          onChange={handleInputChage}
                          placeholder="Enter your communities name"
                      />
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">
                          Acronymn
                          <span className="text-danger pl-1">*</span>
                      </label>
                      <input
                          class="form-control"
                          type="text"
                          name="communityAcronym"
                          value={formControls.controls.communityAcronym.value}
                          onChange={handleInputChage}
                          placeholder="GDG Owerri"
                      />
                  </div>
              </div>
          </div>
          <div class="row align-items-center">
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">Public Website</label>
                      <input
                          type="text"
                          class="form-control"
                          name="communityWebsite"
                          value={formControls.controls.communityWebsite.value}
                          onChange={handleInputChage}
                          placeholder="https://gdgowerri.dev"
                      />
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">
                          Affiliation{' '}
                          <span className="text-danger pl-1">*</span>
                      </label>
                      <select
                          class="form-control"
                          name="communityAffiliation"
                          value={
                              formControls.controls.communityAffiliation.value
                          }
                          onChange={handleInputChage}
                          data-toggle="select">
                          <option value={0}>Select Affiliation</option>
                          <option value="GDG">Google Developer Group</option>
                          <option value="FDC">Facebook Developer Circle</option>
                          <option value="RNS">Rather not say</option>
                      </select>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">
                          City <span className="text-danger pl-1">*</span>
                      </label>
                      <input
                          class="form-control"
                          type="text"
                          placeholder="Lagos"
                          name="communityCity"
                          value={formControls.controls.communityCity.value}
                          onChange={handleInputChage}
                      />
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="form-group">
                      <label class="form-control-label">
                          Country <span className="text-danger pl-1">*</span>
                      </label>
                      <select
                          class="form-control"
                          onChange={handleInputChage}
                          name="communityCountry"
                          data-toggle="select"
                          value={formControls.controls.communityCountry.value}>
                          {mappedCountry.map((c) => (
                              <option key={c.value} value={c.value}>
                                  {c.displayValue}
                              </option>
                          ))}
                      </select>
                  </div>
              </div>
              <div className="flex align-items-center d-flex w-100 justify-content-between">
                  <span className="text-primary font-weight-bolder ml-2">
                      <Link to={APPURL.COMMUNITY_ACCOUNT_LOGIN_PAGE}>
                          Sign in instead
                      </Link>
                  </span>
                  <button
                      style={{ marginLeft: '15px' }}
                      type="button"
                      disabled={formControls.formisvalid ? false : true}
                      onClick={handleFormSubmission}
                      class="btn btn-primary hover-translate-y-n3 mr-2">
                      {formControls.formisSubmitted && formControls.formisvalid ? (<Spinner />) : 'Next'}
                  </button>
              </div>
          </div>
      </div>
  )
}

export default CommunityInfo
