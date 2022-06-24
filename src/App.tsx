import React, { useState } from 'react';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// // import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
// library.add(fas);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import { Input } from './components/Input/input';
import Upload from './components/Upload/upload';


const App: React.FC = () => {
  const [ show, setShow ] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Upload action='http://jsonplaceholder.typicode.com/posts'/>
        <FontAwesomeIcon icon="magnifying-glass"/>
        <FontAwesomeIcon icon="magnifying-glass-dollar"/>
        <Input icon={'magnifying-glass'} size='sm' placeholder='请输入账号'/>
        <Icon icon='coffee' theme={'danger'} size={'10x'}/>
        <Icon icon='arrow-down' theme={'danger'} size={'10x'}/>
        <FontAwesomeIcon icon='coffee' size={'4x'}/>
        <Menu mode={'vertical'} defaultOpenSubMenus={['2']} defaultIndex={'0'} onSelect={(index) => {console.log(index)}}>
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
        <Button btnType='primary' size={'lg'} onClick={() => setShow(!show)}>Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
        >
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
          wrapper
        >
          <Button btnType='primary' size='lg'>A Large Button</Button>
        </Transition>
        {/* <Button disabled>Hello</Button>
        <Button onFocus={e => e.target.blur()} onClick={e => {e.preventDefault(); alert(123); console.log(e.target)}}>Default</Button>
        <Button btnType={ButtonType.Danger}>danger</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Small} href="https://www.baidu.com">Hello</Button>
        <Button disabled={true} btnType={ButtonType.Link} size={ButtonSize.Small} href="https://www.baidu.com">disabled</Button> */}
      </header>
    </div>
  );
}

export default App;
