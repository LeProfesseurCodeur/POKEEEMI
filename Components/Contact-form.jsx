import * as React from "react";
import { useForm, ValidationError } from "@formspree/react";
import formStyles from "../styles/form.module.css";

export default function ContactForm() {
    const [state, handleSubmit] = useForm("xrgjvgje");
    if (state.succeeded) {
      return <p>Nous vous confirmons que nous avons bien reçu votre message.</p>;
    } 
    return (
      <form onSubmit={handleSubmit} className={formStyles.container}>
        <label htmlFor="email" className={formStyles.labels}>
          Votre email :
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className={formStyles.inputs}
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className={formStyles.fieldErrors}
        />
        <label htmlFor="message" className={formStyles.labels}>
          Votre message :
        </label>
        <textarea
          id="message"
          name="message"
          className={`${formStyles.inputs} ${formStyles.textarea}`}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className={formStyles.fieldErrors}
        />
        <button
          type="submit"
          disabled={state.submitting}
          className={`${formStyles.inputs} ${formStyles.button}`}
        >
          Envoyer
        </button>
        <ValidationError
          errors={state.errors}
          className={formStyles.formErrors}
        />
      </form>
    );
  }
  