import { mount } from '@vue/test-utils';
import UserForm from '../../src/components/UserForm';

describe('submit form', () => {
  it('submits form on button click', async () => {
    const wrapper = mount(UserForm, {
      propsData: {
        data: {
          email: 'test@gmail.com'
        }
      }
    });
    expect(wrapper.props().data.email).toBe('test@gmail.com');
    wrapper.find('#btnSubmit').trigger('click');
  });
});
