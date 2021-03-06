import React from 'react';
import { shallow } from 'enzyme';
import Presenter from './presenter';

jest.mock('lingui-react', () => ({
  withI18n: () => whatever => whatever,
  i18nMark: () => whatever => whatever,
}));

describe('component WithUpdateMessaTags', () => {
  it('render', () => {
    const reduxProps = {
      i18n: { _: id => id },
      tags: [{ label: 'Foo', name: 'foo' }, { label: 'Bar', name: 'bar' }],
      requestTags: jest.fn(() => {
        reduxProps.tags = [{ label: 'Foo', name: 'foo' }, { label: 'Bar', name: 'bar' }, { label: 'FooBar', name: 'foobar' }];

        return Promise.resolve(reduxProps.tags);
      }),
      createTag: jest.fn(),
      updateTagCollection: jest.fn(() => 'foo'),
    };

    const message = { tags: [{ label: 'Foo', name: 'foo' }] };
    const tags = [{ label: 'Foo', name: 'foo' }, { label: 'Bar' }, { label: 'FooBar' }];

    return new Promise((resolve) => {
      const render = jest.fn(async (updateEntityTags) => {
        const result = await updateEntityTags('message', message, { tags });
        expect(result).toEqual('foo');
        expect(reduxProps.createTag).toHaveBeenCalledWith({ label: 'FooBar' });
        expect(reduxProps.updateTagCollection).toHaveBeenCalledWith('message', message, {
          tags: ['foo', 'bar', 'foobar'],
        });

        resolve('done');
      });
      shallow(
        <Presenter render={render} {...reduxProps} />
      );
      expect(reduxProps.requestTags).not.toHaveBeenCalled();
    });
  });
});
