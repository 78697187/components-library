import React from "react";
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonType, ButtonSize, ButtonPorps} from './button';
const defaultProps = {
  onClick: jest.fn() // jest提供模拟函数调用的方法
}

const testProps: ButtonPorps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}

const disabledProps: ButtonPorps = {
  disabled: true,
  onClick: jest.fn()
}

// test('our first react test case', () => {
//   const warpper = render(<Button>Nice</Button>);
//   // const element = warpper.queryByText('abc');
//   const element = warpper.queryByText('Nice');
//   expect(element).toBeTruthy();
//   expect(element).toBeInTheDocument();
// })

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass('btn btn-default');
    // 测试用户的交互
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg klass');
  });
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="https://www.baidu.com">Link</Button>);
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  })
  it('should render disabled button when disabled set to true', () => {
    // const wrapper = render(<Button btnType={ButtonType.Link} href="https://www.baidu.com" {...disabledProps}>Link</Button>);
    const wrapper = render(<Button {...disabledProps}>Disabled</Button>)
    const element = wrapper.getByText('Disabled') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  })
})
