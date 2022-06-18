import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon='coffee' theme={'danger'} size={'10x'}/>
        <Icon icon='arrow-down' theme={'danger'} size={'10x'}/>
        <FontAwesomeIcon icon='coffee' size={'4x'}/>
        <Menu defaultOpenSubMenus={['2']} mode={'vertical'} defaultIndex={'0'} onSelect={(index) => {console.log(index)}}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdowm 1
            </MenuItem>
            <MenuItem>
              dropdowm 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>

        {/* <Button disabled>Hello</Button>
        <Button onFocus={e => e.target.blur()} onClick={e => {e.preventDefault(); alert(123); console.log(e.target)}}>Default</Button>
        <Button btnType={ButtonType.Danger}>danger</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Small} href="https://www.baidu.com">Hello</Button>
        <Button disabled={true} btnType={ButtonType.Link} size={ButtonSize.Small} href="https://www.baidu.com">disabled</Button> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
