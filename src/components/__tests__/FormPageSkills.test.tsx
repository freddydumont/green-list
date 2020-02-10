import { skillSchema } from '../FormPageSkills';

describe('skillSchema', () => {
  it("should be invalid because categories and skills keys don't match", () => {
    const formData = {
      categories: ['kitchen'],
      skills: {
        maintenance: {
          test: true,
        },
      },
      other: 'test',
      consent: false,
    };

    expect.assertions(1);

    return expect(
      skillSchema.isValid(formData, { context: skillSchema.cast(formData) })
    ).resolves.toBe(false);
  });

  it('should be valid', () => {
    const formData = {
      categories: ['kitchen'],
      skills: {
        kitchen: {
          test: true,
        },
      },
      other: 'test',
      consent: false,
    };

    expect.assertions(1);

    return expect(
      skillSchema.isValid(formData, { context: skillSchema.cast(formData) })
    ).resolves.toBe(true);
  });
});
