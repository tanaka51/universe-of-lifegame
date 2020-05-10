import '../sass/main.scss'
import * as React from 'react';
import * as ReactDom from 'react-dom';

const Hello: React.FC<{name: string}> = (props) => {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}

ReactDom.render(
  <Hello name='lifegame' />, document.getElementById('root')
)
