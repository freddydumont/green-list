import * as yup from 'yup';
import FormPageLayout from './FormPageLayout';
import { Divider, Flex, Label, Checkbox } from '@theme-ui/components';
// import { useContext } from 'react';
// import { useService } from '@xstate/react';
// import { ServiceContext } from '../pages';
import isEqual from 'lodash/isEqual';
import {
  Form,
  FormInputChoice,
  FormField,
  FormInputChoiceBox,
} from './FormComponents';
import FormNavButton from './FormNavButton';
import { useFormContext, Controller } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';

type Categories = 'kitchen' | 'maintenance' | 'technology' | 'accounting';
type SelectedSkills = Partial<{ [K in Categories]: Record<string, boolean> }>;

export const skillSchema = yup.object().shape({
  categories: yup.array(
    yup
      .mixed<Categories>()
      .oneOf(['kitchen', 'maintenance', 'technology', 'accounting'])
  ),
  skills: yup
    .mixed<SelectedSkills>()
    .notRequired()
    .test('skills', 'custom error message', function(
      this: yup.TestContext,
      skills: SelectedSkills
    ): boolean {
      // This is the whole form object that comes to the validation
      const formData = this?.options?.context as Skills;

      // when no category is selected, skills should be undefined
      if (isEmpty(formData.categories)) {
        return skills === undefined;
      }

      // the skills object should contain only and exactly the keys
      // that are selected in categories
      return isEqual(Object.keys(skills), formData.categories);

      // TODO: add validation for skills categories objects?
    }),
  other: yup.string().notRequired(),
  consent: yup.boolean(),
});

export type Skills = yup.InferType<typeof skillSchema>;

const FormPageSkills = () => {
  // const service = useContext(ServiceContext);
  // const [state, send] = useService(service);

  const onSubmit = (data: Skills) => {
    console.log(JSON.stringify(data, null, 2));

    // send({
    //   type: 'NEXT',
    //   data: {
    //     skills: data,
    //   },
    // });
  };

  return (
    <FormPageLayout
      title="Interests and skills"
      description="Choose your areas of interests in Dhamma service and select your skills if applicable"
    >
      <Form<Skills> onSubmit={onSubmit}>
        {/* validationSchema={skillSchema} */}
        <FormInputChoice
          type="checkbox"
          label="Areas of interest"
          name="categories"
          options={[
            { label: 'Kitchen', value: 'kitchen' },
            { label: 'Maintenance', value: 'maintenance' },
            { label: 'Technology', value: 'technology' },
            { label: 'Accounting', value: 'accounting' },
          ]}
        />

        <ConditionalCheckboxes />

        <FormField label="Other skills" name="other" />

        <FormInputChoice
          type="checkbox"
          name="consent"
          options={[
            {
              label:
                'I consent to being contacted by committees for recruitment purposes',
            },
          ]}
        />

        <input type="submit" />

        <Divider mx={0} mt={0} mb={4} />
        <Flex
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <FormNavButton />
        </Flex>
      </Form>
    </FormPageLayout>
  );
};

const skillsData = {
  kitchen: [
    'question 1',
    'question 2',
    'question 3',
    'question 4',
    'question 5',
    'question 6',
    'question 7',
    'question 8',
  ],
  maintenance: [
    'painting',
    'plumbing',
    'carpentry',
    'electricity',
    'architecture',
    'etc',
  ],
  technology: ['sysadmin', 'software development', 'tech support', 'etc'],
  accounting: ['accounting', 'bookkeeping', 'etc'],
};

/**
 * Skill selection checkboxes that appear when a category is selected
 * A `react-hook-form` Controller is used to register the checkbox group
 * as the component mounts. The checkboxes themselves are registered directly.
 */
const ConditionalCheckboxes = () => {
  const { watch, control, register } = useFormContext<Skills>();

  // when a category is selected, the component is rerendered
  // so we have an updated array of user-selected categories
  const selectedCategories = watch('categories');

  // skillsData is then rendered as a checkbox group for each category
  if (selectedCategories) {
    return (
      <>
        {selectedCategories.map((category) => (
          <Controller
            as={FormInputChoiceBox}
            key={category}
            label={category}
            control={control}
            // this template string creates a skill object with each
            // selected category as properties when the form is submitted
            name={`skills.${category}`}
          >
            {skillsData[category].map((skill) => (
              <Label key={skill}>
                <Checkbox
                  // and a skill property under the category
                  name={`skills[${category}][${skill}]`}
                  ref={register}
                />
                {skill}
              </Label>
            ))}
          </Controller>
        ))}
      </>
    );
  }

  return null;
};

export default FormPageSkills;
