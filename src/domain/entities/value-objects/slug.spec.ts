import { expect, it } from 'vitest';

import { Slug } from './slug';

it('should be able to create a slug', () => {
  const slug = Slug.createFormText('Create a slug');

  expect(slug.value).toBe('create-a-slug');
});
