import React from "react";
import { Link } from "react-router-dom";

export default function Input(props) {
  const regular = (
      <div className="form-group mb-4">
          <div className="d-flex align-items-center justify-content-between">
              <div>
                  <label className="form-control-label">{props.label}</label>
              </div>
              {props.isLoginPasswordInput && props.forgotPassword ? (
                  <div className="mb-2">
                      <Link
                          to="/auth/recover"
                          className="small text-muted text-underline--dashed border-primary">
                          Lost password?
                      </Link>
                  </div>
              ) : (
                  ''
              )}
          </div>
          <div className="input-group input-group-merge">
              {props.initialPrepend ? (
                  <div className="input-group-prepend">
                      <span className="input-group-text">
                          {props.initialPrependsvg}
                      </span>
                  </div>
              ) : (
                  ''
              )}
              <input
                  type={props.type}
                  className="form-control"
                  id={props.id || ''}
                  placeholder={props.placeholder}
                  onChange={props.changed}
                  value={props.value}
              />
              {props.finalAppend ? (
                  <div className="input-group-append">
                      <span className="input-group-text">
                          <a
                              href="/#"
                              data-toggle="password-text"
                              data-target="#input-password">
                              {props.finalAppendsvg}
                          </a>
                      </span>
                  </div>
              ) : (
                  ''
              )}
          </div>
      </div>
  )
  const checkbox = (
      <div className="my-4">
          <div className="custom-control custom-checkbox mb-3">
              <input
          type="checkbox"
          selected={ props.selected }
          className="custom-control-input"
          onSelect={ props.clicked }
          id="check-terms"
        />
              <label className="custom-control-label" htmlFor="check-terms">
                  {props.children}
              </label>
          </div>
      </div>
  );
  switch (props.fieldtype) {
    case "checkbox":
      return checkbox;

    default:
      return regular;
  }
}
