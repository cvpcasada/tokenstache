import { tokenize } from './tokenstache';

describe(`tokenize()`, () => {
  it(`should tokenize without handlebars`, () => {
    expect(tokenize(`hello world jimmy`)).toEqual([`hello world jimmy`]);
  });

  it(`should tokenize with handlebar using view object`, () => {
    expect(tokenize(`hello world {{user}}`, { user: `jimmy` })).toEqual([`hello world `, `jimmy`]);
  });

  it(`should not include handlebars that doesnt resolve with view object`, () => {
    expect(tokenize(`hello world {{notUser}}`, { user: `jimmy` })).toEqual([`hello world `]);
  });

  it(`can resolve view as function`, () => {
    expect(tokenize(`hello world {{user}}`, () => `jimmy`)).toEqual([`hello world `, `jimmy`]);
  });

  it(`can resolve view objects with functions`, () => {
    expect(tokenize(`hello world {{user}}`, { user: () => `jimmy` })).toEqual([`hello world `, `jimmy`]);
  });

  it(`functions in view will resolve with handlebar key and id parameter`, () => {
    expect(
      tokenize(`hello world {{user}}`, { user: (key, id) => `${key} - ${id}` })
    ).toEqual([`hello world `, `user - 1`]);
  });

  it(`view function will also resolve with handlebar key and id parameter`, () => {
    expect(
      tokenize(`hello world {{user}}`, (key, id) => `${key} - ${id}`)
    ).toEqual([`hello world `, `user - 1`]);
  });
});
