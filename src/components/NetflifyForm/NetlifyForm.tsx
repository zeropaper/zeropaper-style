/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { NetlifyForm as Original, Honeypot } from 'react-netlify-forms';

export interface RenderProps {
  handleChange: (...args: any[]) => any;
  success?: any;
  error?: any;
}

export { Honeypot };

interface ButtonAtts extends React.ButtonHTMLAttributes<HTMLButtonElement> { }
interface InputAttrs extends React.InputHTMLAttributes<HTMLInputElement> { }
interface TextareaAttrs extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
type InputPropTypes = Omit<InputAttrs | TextareaAttrs, 'name'> & {
  multiline?: boolean;
}
interface ButtonPropTypes extends Omit<ButtonAtts, 'name'> { }
interface FieldsetPropTypes extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> { }

export interface PropTypes {
  elements: {
    [name: string]: (InputPropTypes | ButtonPropTypes | FieldsetPropTypes)
  }
}

export const NetlifyForm = () => (
  <Original name="Contact" action="/thanks" honeypotName="bot-field">
    {({ handleChange, success, error }: RenderProps) => (
      <>
        <Honeypot />
        {success && <p>Thanks for contacting us!</p>}
        {error && (
          <p>Sorry, we could not reach our servers. Please try again later.</p>
        )}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            id="message"
            rows={4}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </>
    )}
  </Original>
);

export default NetlifyForm;
