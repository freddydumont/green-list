import { Machine, assign } from 'xstate';
import { User } from './components/FormPageInfo';

export interface FormStateSchema {
  states: {
    home: {};
    info: {};
    skills: {};
    availability: {};
    validation: {};
    confirmation: {};
  };
}

export type FormEvent =
  | { type: 'START'; lang: Language }
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SUBMIT' };

type Language = 'en' | 'fr';

interface Skills {
  kitchen: {};
  maintenance: {};
  office: {};
  technology: {};
  finance: {};
  other: string;
  consent: boolean;
}

interface Availability {
  seasonal: boolean;
  betweenCourses: boolean;
  onCourses: boolean;
  dayZero: boolean;
  remote: boolean;
}

export interface FormContext {
  lang: Language;
  user: User;
  skills: Skills;
  availability: Availability;
}

const formMachine = Machine<FormContext, FormStateSchema, FormEvent>(
  {
    id: 'form',
    initial: 'home',
    states: {
      home: {
        on: {
          START: {
            target: 'info',
            actions: (context, event) =>
              assign({
                lang: event.lang,
              }),
          },
        },
      },
      info: {
        on: {
          NEXT: {
            target: 'skills',
            cond: 'validateFields',
          },
        },
      },
      skills: {
        on: {
          PREVIOUS: 'info',
          NEXT: {
            target: 'availability',
            cond: 'validateFields',
          },
        },
      },
      availability: {
        on: {
          PREVIOUS: 'skills',
          NEXT: {
            target: 'validation',
            cond: 'validateFields',
          },
        },
      },
      validation: {
        on: {
          PREVIOUS: 'availability',
          SUBMIT: {
            target: 'confirmation',
            cond: 'validateForm',
          },
        },
      },
      confirmation: {},
    },
  },
  {
    guards: {
      /**
       * This would validate the page's fields on the server before allowing
       * the user to proceed to the next page.
       */
      validateFields: (context, event) => {
        console.log('TCL: context, event', context, event);
        return true;
      },
      /**
       * Send the whole form to the server to be validated and written to the
       * database.
       */
      validateForm: (context, event) => {
        console.log('TCL: context, event', context, event);
        return true;
      },
    },
  }
);

export { formMachine };
